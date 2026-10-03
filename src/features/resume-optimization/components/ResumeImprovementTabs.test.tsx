import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import type { ExtractSkillsResponse } from '../../../types/resume'
import { ResumeImprovementTabs } from './ResumeImprovementTabs'

const result: ExtractSkillsResponse = {
  comma_separated_missing_skills: 'Docker',
  resume_score_in_percentage: 75,
  resume_status: 'Good',
  skills: [{ name: 'Docker', is_available_in_resume: false }],
  total_matching_skills_in_resume: 0,
  total_missing_skills_in_resume: 1,
  total_required_skills_in_job_description: 1,
}

describe('ResumeImprovementTabs', () => {
  it('opens with Prompt Builder selected', () => {
    render(<ResumeImprovementTabs result={result} />)

    expect(screen.getByRole('tab', { name: 'Prompt Builder' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'AI Resume Generation' })).toHaveAttribute(
      'aria-selected',
      'false',
    )
    expect(
      screen.getByRole('heading', { name: 'Generate a Resume Improvement Prompt' }),
    ).toBeInTheDocument()
  })
})
