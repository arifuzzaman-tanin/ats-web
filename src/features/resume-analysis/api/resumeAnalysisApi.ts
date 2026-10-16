import { z } from 'zod'
import { apiClient } from '../../../services/apiClient'
import { API_ENDPOINTS } from '../../../services/endpoints'
import type { ExtractSkillsRequest, ExtractSkillsResponse } from '../../../types/resume'
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
  const response = await apiClient.post<unknown>(API_ENDPOINTS.extractSkills, request)
  return normalizeExtractSkillsResponse(response.data)
}
