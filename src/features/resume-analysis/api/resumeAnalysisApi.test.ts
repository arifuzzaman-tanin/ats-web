import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '../../../services/apiClient'
import {
  removeAccessKeyCookie,
  setAccessKeyCookie,
} from '../../access-key/accessKeyCookie'
import {
  AccessKeyValidationError,
  extractSkills,
  normalizeExtractSkillsResponse,
} from './resumeAnalysisApi'
import { summarizeSkills } from '../utils/skillUtils'

describe('resumeAnalysisApi transformation', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    removeAccessKeyCookie()
  })

  it('normalizes response and derives missing/found skills', () => {
    const response = normalizeExtractSkillsResponse({
      comma_separated_missing_skills: 'docker',
      resume_score_in_percentage: 78,
      resume_status: 'Excellent',
      skills: [
        { name: 'python', is_available_in_resume: true },
        { name: 'docker', is_available_in_resume: false },
      ],
      total_matching_skills_in_resume: 1,
      total_missing_skills_in_resume: 1,
      total_required_skills_in_job_description: 2,
    })

    const summary = summarizeSkills(response)

    expect(response.resume_status).toBe('Excellent')
    expect(summary.missingSkillNames).toEqual(['docker'])
    expect(summary.foundSkillNames).toEqual(['python'])
  })

  it('treats an access-key error in a successful JSON response as validation failure', async () => {
    vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      data: { error: 'Access key is required' },
    })

    await expect(
      extractSkills({ resume: 'Resume', job_description: 'Job' }),
    ).rejects.toBeInstanceOf(AccessKeyValidationError)
  })

  it('includes the saved access key in the extract-skills request body', async () => {
    setAccessKeyCookie('ARIF_100')
    const post = vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      data: {
        comma_separated_missing_skills: '',
        resume_score_in_percentage: 100,
        resume_status: 'Best',
        skills: [],
        total_matching_skills_in_resume: 0,
        total_missing_skills_in_resume: 0,
        total_required_skills_in_job_description: 0,
      },
    })

    await extractSkills({ resume: 'Resume', job_description: 'Job' })

    expect(post).toHaveBeenCalledWith('/extract_skills', {
      resume: 'Resume',
      job_description: 'Job',
      access_key: 'ARIF_100',
    })
  })

  it.each([400, 401])('treats HTTP %i as an access-key validation failure', async (status) => {
    vi.spyOn(apiClient, 'post').mockRejectedValueOnce({
      isAxiosError: true,
      response: { status, data: {} },
    })

    await expect(
      extractSkills({ resume: 'Resume', job_description: 'Job' }),
    ).rejects.toBeInstanceOf(AccessKeyValidationError)
  })

  it('matches an access-key error body even on another HTTP status', async () => {
    vi.spyOn(apiClient, 'post').mockRejectedValueOnce({
      isAxiosError: true,
      response: { status: 500, data: { error: 'Invalid access key' } },
    })

    await expect(
      extractSkills({ resume: 'Resume', job_description: 'Job' }),
    ).rejects.toBeInstanceOf(AccessKeyValidationError)
  })
})
