import { fireEvent, render, screen, within } from '@testing-library/react'
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

  it('opens the navigation drawer and closes it with Escape', () => {
    renderLandingPage()
    const openButton = screen.getByRole('button', { name: 'Open navigation' })

    fireEvent.click(openButton)
    const navigation = screen.getByRole('navigation', { name: 'Mobile navigation' })
    expect(openButton).toHaveAttribute('aria-expanded', 'true')
    expect(navigation.closest('.mobile-nav-layer')).toHaveClass('mobile-nav-layer--open')
    expect(document.body).toHaveStyle({ overflow: 'hidden' })

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(openButton).toHaveAttribute('aria-expanded', 'false')
    expect(navigation.closest('.mobile-nav-layer')).not.toHaveClass('mobile-nav-layer--open')
    expect(document.body).not.toHaveStyle({ overflow: 'hidden' })
  })

  it('shows the Premium monthly subscription and its featured benefits', () => {
    renderLandingPage()
    const trialLink = screen.getByRole('link', { name: /start 7-day free trial/i })
    const premiumCard = trialLink.closest('article')
    expect(premiumCard).not.toBeNull()
    const premium = within(premiumCard as HTMLElement)
    expect(premium.getByText(/7 days free/i)).toBeVisible()
    expect(premium.getByText('$0')).toBeVisible()
    expect(premium.getByText('for 7 days')).toBeVisible()
    expect(premium.getByText('Then $50 USD per month')).toBeVisible()
    expect(trialLink).toHaveAttribute('href', '/resume-scanner')
    ;[
      'Deep X-Ray analysis of your resume and job description',
      'Automatic job discovery across multiple trusted sources',
      'Best-fit opportunities ranked by your skills and preferences',
      'Duplicate, expired, and suspicious job detection',
      'A tailored resume and cover letter for every application',
      'AI video mock interviews with Jack, tailored to the job description',
      'Leadership and people-management interview practice',
      'Ownership and accountability interview practice',
      'Technical and role-specific interview practice',
      'Behavioral and situational interview practice',
      'Realistic follow-up questions and post-interview feedback',
      'Multilingual interview practice',
    ].forEach((feature) => expect(screen.getByText(feature)).toBeVisible())
  })

  it('explains the Premium trial terms in the FAQ', () => {
    renderLandingPage()
    const trigger = screen.getByRole('button', { name: 'How does the Premium free trial work?' })
    fireEvent.click(trigger)
    expect(screen.getByText(/try Premium features free for 7 days/i)).toBeVisible()
    expect(screen.getByText(/costs \$50 USD per month/i)).toBeVisible()
  })

  it('describes the planned AI mock interview feature accurately', () => {
    renderLandingPage()
    expect(screen.getByRole('heading', { name: 'AI Mock Interviews with Jack' })).toBeVisible()

    const trigger = screen.getByRole('button', { name: 'How do AI mock interviews with Jack work?' })
    fireEvent.click(trigger)

    expect(screen.getByText(/leadership, ownership, behavioral, technical, or role-specific interview track/i)).toBeVisible()
    expect(screen.getByText(/AI mock interviews are not currently active/i)).toBeVisible()
  })
})
