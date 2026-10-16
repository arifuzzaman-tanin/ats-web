import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import type { ExtractSkillsResponse } from '../../../types/resume'
import { useResumeStore } from '../../../store/resumeStore'
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
  beforeEach(() => {
    useResumeStore.getState().resetAll()
  })

  it('shows the prompt builder without generation tabs', () => {
    render(<ResumeImprovementTabs result={result} />)

    expect(screen.queryByRole('tab')).not.toBeInTheDocument()
    expect(screen.queryByText('AI Resume Generation')).not.toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Build your tailored prompt' }),
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/strengthen measurable results already in the resume/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: 'Strengthen measurable impact' }),
    ).toBeChecked()
  })

  it('checks quantitative achievements by default for every new result', () => {
    useResumeStore.getState().setIncludeQuantitativeAchievements(false)
    useResumeStore.getState().setAnalysisResult(result)

    render(<ResumeImprovementTabs result={result} />)

    expect(
      screen.getByRole('checkbox', { name: 'Strengthen measurable impact' }),
    ).toBeChecked()
  })
})
