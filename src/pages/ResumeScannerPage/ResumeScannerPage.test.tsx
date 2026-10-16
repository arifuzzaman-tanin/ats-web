import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { apiClient } from '../../services/apiClient'
import { useResumeStore } from '../../store/resumeStore'
import { ResumeScannerPage } from './ResumeScannerPage'

function renderScanner() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ResumeScannerPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('resume scanner flow', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    useResumeStore.getState().resetAll()
    useResumeStore.getState().setResumeText('Experienced software developer')
    useResumeStore.getState().setJobDescription('Looking for a software developer')
  })

  it('offers a link back to the home page', () => {
    renderScanner()

    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/')
    expect(
      screen.getByText('Upload your resume and add the job description to see how well they match.'),
    ).toBeInTheDocument()
  })

  it('submits the resume and job description directly', async () => {
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
    renderScanner()

    fireEvent.click(screen.getByRole('button', { name: 'Scan Resume' }))

    await waitFor(() =>
      expect(post).toHaveBeenCalledWith('/extract_skills', {
        resume: 'Experienced software developer',
        job_description: 'Looking for a software developer',
      }),
    )
  })

  it('clears the pasted resume text and job description independently', () => {
    renderScanner()

    fireEvent.click(screen.getByRole('button', { name: 'Paste text' }))
    fireEvent.click(screen.getByRole('button', { name: 'Clear resume text' }))

    expect(screen.getByLabelText('Resume text')).toHaveValue('')
    expect(screen.queryByRole('button', { name: 'Clear resume text' })).not.toBeInTheDocument()
    expect(screen.getByLabelText('Job description')).toHaveValue(
      'Looking for a software developer',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Clear job description' }))

    expect(screen.getByLabelText('Job description')).toHaveValue('')
    expect(
      screen.queryByRole('button', { name: 'Clear job description' }),
    ).not.toBeInTheDocument()
  })
})
