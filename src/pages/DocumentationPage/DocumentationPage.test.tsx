import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { DocumentationPage } from './DocumentationPage'

describe('DocumentationPage', () => {
  it('shows verified package setup and API guidance', () => {
    render(<MemoryRouter><DocumentationPage /></MemoryRouter>)

    expect(screen.getByRole('heading', { name: /ATS Optimizer Python library/i })).toBeInTheDocument()
    expect(screen.getByText(/pip install --index-url https:\/\/test\.pypi\.org\/simple\/ ats-optimizer/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Work with structured results' })).toBeInTheDocument()
    expect(screen.getByText('Free for any project')).toBeInTheDocument()
  })
})
