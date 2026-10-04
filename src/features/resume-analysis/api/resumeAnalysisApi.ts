import { z } from 'zod'
import axios from 'axios'
import { apiClient } from '../../../services/apiClient'
import { API_ENDPOINTS } from '../../../services/endpoints'
import type { ExtractSkillsRequest, ExtractSkillsResponse } from '../../../types/resume'
import { getAccessKeyCookie } from '../../access-key/accessKeyCookie'
import { getResumeStatus, isResumeStatus } from '../utils/getResumeStatus'

const resumeSkillSchema = z.object({
  name: z.string(),
  is_available_in_resume: z.boolean(),
})

const extractSkillsResponseSchema = z.object({
  comma_separated_missing_skills: z.string().default(''),
  resume_score_in_percentage: z.number(),
  resume_status: z.string(),
  skills: z.array(resumeSkillSchema),
  total_matching_skills_in_resume: z.number(),
  total_missing_skills_in_resume: z.number(),
  total_required_skills_in_job_description: z.number(),
})

const ACCESS_KEY_ERROR_MESSAGE = 'Access key is required. Please enter a valid access key to continue.'
const accessKeyFailureMessages = new Set(['Access key is required', 'Invalid access key'])

export class AccessKeyValidationError extends Error {
  constructor() {
    super(ACCESS_KEY_ERROR_MESSAGE)
    this.name = 'AccessKeyValidationError'
  }
}

function hasAccessKeyFailureMessage(data: unknown): boolean {
  if (!data || typeof data !== 'object' || !('error' in data)) return false
  return accessKeyFailureMessages.has(String(data.error))
}

export function isAccessKeyValidationError(error: unknown): boolean {
  return error instanceof AccessKeyValidationError
}

export function normalizeExtractSkillsResponse(data: unknown): ExtractSkillsResponse {
  const parsed = extractSkillsResponseSchema.parse(data)
  const score = Math.max(0, Math.min(100, parsed.resume_score_in_percentage))

  return {
    ...parsed,
    resume_score_in_percentage: score,
    resume_status: isResumeStatus(parsed.resume_status)
      ? parsed.resume_status
      : getResumeStatus(score),
  }
}

export async function extractSkills(
  request: ExtractSkillsRequest,
): Promise<ExtractSkillsResponse> {
  try {
    const response = await apiClient.post<unknown>(API_ENDPOINTS.extractSkills, {
      ...request,
      access_key: getAccessKeyCookie(),
    })

    if (hasAccessKeyFailureMessage(response.data)) {
      throw new AccessKeyValidationError()
    }

    return normalizeExtractSkillsResponse(response.data)
  } catch (error) {
    if (isAccessKeyValidationError(error)) throw error

    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 400 ||
        error.response?.status === 401 ||
        hasAccessKeyFailureMessage(error.response?.data))
    ) {
      throw new AccessKeyValidationError()
    }

    throw error
  }
}
