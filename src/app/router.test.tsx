import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { ResumeAnalysisPage } from '../pages/ResumeAnalysisPage/ResumeAnalysisPage'
import { ResumeScannerPage } from '../pages/ResumeScannerPage/ResumeScannerPage'
import { useResumeStore } from '../store/resumeStore'

function TestRoutes() {
  const analysisResult = useResumeStore((state) => state.analysisResult)

  return (
    <Routes>
      <Route path="/" element={<ResumeScannerPage />} />
      <Route path="/analysis" element={analysisResult ? <ResumeAnalysisPage /> : <ResumeScannerPage />} />
    </Routes>
  )
}

describe('analysis routing guard', () => {
  it('shows scanner when analysis is opened without data', () => {
    useResumeStore.getState().resetAll()
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/analysis']}>
          <TestRoutes />
        </MemoryRouter>
      </QueryClientProvider>,
    )

    expect(screen.getByText('Check Your Resume Against a Job Description')).toBeInTheDocument()
  })
})
