import { fireEvent, render, screen } from '@testing-library/react'
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
    expect(
      screen.getByLabelText(/Add instructions to include measurable results/),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: /Include quantitative achievements/ }),
    ).toBeChecked()
  })

  it('checks quantitative achievements by default for every new result', () => {
    useResumeStore.getState().setIncludeQuantitativeAchievements(false)
    useResumeStore.getState().setAnalysisResult(result)

    render(<ResumeImprovementTabs result={result} />)

    expect(
      screen.getByRole('checkbox', { name: /Include quantitative achievements/ }),
    ).toBeChecked()
  })

  it('shows a service-disabled modal instead of starting AI optimization', () => {
    render(<ResumeImprovementTabs result={result} />)

    fireEvent.click(screen.getByRole('tab', { name: 'AI Resume Generation' }))
    fireEvent.click(screen.getByRole('button', { name: 'Optimize My Resume' }))

    const dialog = screen.getByRole('dialog', {
      name: 'AI resume generation is unavailable',
    })
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveTextContent('This service is currently disabled.')

    fireEvent.click(screen.getByRole('button', { name: 'Got it' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
