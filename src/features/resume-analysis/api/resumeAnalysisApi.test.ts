import { describe, expect, it } from 'vitest'
import { normalizeExtractSkillsResponse } from './resumeAnalysisApi'
import { summarizeSkills } from '../utils/skillUtils'

describe('resumeAnalysisApi transformation', () => {
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
})
