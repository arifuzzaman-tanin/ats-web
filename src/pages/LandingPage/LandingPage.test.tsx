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

  it('presents every available feature as free forever', () => {
    renderLandingPage()
    expect(screen.getByRole('heading', { name: 'Free Forever' })).toBeVisible()
    expect(screen.getByText(/without subscriptions, trials, upgrades, or paywalls/i)).toBeVisible()
    expect(screen.queryByText(/premium/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$50/i)).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Pricing' })).not.toBeInTheDocument()
  })

  it('explains the free-forever commitment in the FAQ', () => {
    renderLandingPage()
    const trigger = screen.getByRole('button', { name: 'Is ATS Optimizer really free?' })
    fireEvent.click(trigger)
    expect(screen.getByText(/free to use forever/i)).toBeVisible()
    expect(screen.getByText(/no subscription, trial, upgrade, or credit card required/i)).toBeVisible()
  })

  it('does not show unavailable account, subscription, or footer links', () => {
    renderLandingPage()
    expect(screen.queryByRole('button', { name: /sign in/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /subscribe/i })).not.toBeInTheDocument()
    expect(screen.queryByText('Resume Tips')).not.toBeInTheDocument()
    expect(screen.queryByText('Privacy Policy')).not.toBeInTheDocument()
    expect(screen.queryByText('Cookies')).not.toBeInTheDocument()
  })
})
