import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LandingPage } from './LandingPage'

function renderLandingPage() {
  return render(<MemoryRouter><LandingPage /></MemoryRouter>)
}

describe('LandingPage', () => {
  it('links the main conversion actions to the resume scanner', () => {
    renderLandingPage()
    const scannerLinks = screen.getAllByRole('link', { name: /scan my resume/i })
    expect(scannerLinks.length).toBeGreaterThanOrEqual(3)
    scannerLinks.forEach((link) => expect(link).toHaveAttribute('href', '/resume-scanner'))
  })

  it('opens and closes an FAQ item accessibly', () => {
    renderLandingPage()
    const trigger = screen.getByRole('button', { name: 'How does ATS Optimizer work?' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/compares your resume with a target job description/i)).toBeVisible()
  })

  it('shows the Premium monthly subscription and its featured benefits', () => {
    renderLandingPage()
    expect(screen.getByText('$50 USD')).toBeVisible()
    expect(screen.getByText('per month')).toBeVisible()
    expect(screen.getByRole('link', { name: /get premium/i })).toHaveAttribute('href', '/resume-scanner')
    ;[
      'Deep X-Ray analysis of your resume and job description',
      'Automatic job discovery across multiple trusted sources',
      'Best-fit opportunities ranked by your skills and preferences',
      'Duplicate, expired, and suspicious job detection',
      'A tailored resume and cover letter for every application',
      'AI video mock interviews with Jack, tailored to the job description',
      'Realistic follow-up questions and post-interview feedback',
      'Multilingual interview practice',
    ].forEach((feature) => expect(screen.getByText(feature)).toBeVisible())
  })

  it('describes the planned AI video interview feature accurately', () => {
    renderLandingPage()
    expect(screen.getByRole('heading', { name: 'AI Video Interviews with Jack' })).toBeVisible()

    const trigger = screen.getByRole('button', { name: 'How do AI video interviews with Jack work?' })
    fireEvent.click(trigger)

    expect(screen.getByText(/AI video interviews are not currently active/i)).toBeVisible()
  })
})
