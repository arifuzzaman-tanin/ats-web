import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ExtractSkillsResponse } from '../../../types/resume'
import { SkillsComparison } from './SkillsComparison'

let writeTextMock: ReturnType<typeof vi.fn>

const result: ExtractSkillsResponse = {
  comma_separated_missing_skills: 'docker, aws',
  resume_score_in_percentage: 78,
  resume_status: 'Excellent',
  skills: [
    { name: 'React', is_available_in_resume: true },
    { name: 'Docker', is_available_in_resume: false },
    { name: 'AWS', is_available_in_resume: false },
  ],
  total_matching_skills_in_resume: 1,
  total_missing_skills_in_resume: 2,
  total_required_skills_in_job_description: 3,
}

describe('SkillsComparison', () => {
  beforeEach(() => {
    writeTextMock = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    })
  })

  it('groups missing skills before found skills', () => {
    render(<SkillsComparison result={result} />)

    expect(screen.getByRole('heading', { name: 'Needs attention' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Already matched' })).toBeInTheDocument()
    expect(screen.queryByText('Add or highlight')).not.toBeInTheDocument()
    expect(screen.queryByText('Matched')).not.toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('copies missing and found skill lists', () => {
    render(<SkillsComparison result={result} />)

    fireEvent.click(screen.getByLabelText('Copy skills not found in your resume'))
    expect(writeTextMock).toHaveBeenCalledWith('Docker, AWS')

    fireEvent.click(screen.getByLabelText('Copy skills found in your resume'))
    expect(writeTextMock).toHaveBeenCalledWith('React')
  })

  it('copies an individual skill from its row', async () => {
    render(<SkillsComparison result={result} />)

    fireEvent.click(screen.getByLabelText('Copy Docker'))

    expect(writeTextMock).toHaveBeenCalledWith('Docker')
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Copied')
  })
})
