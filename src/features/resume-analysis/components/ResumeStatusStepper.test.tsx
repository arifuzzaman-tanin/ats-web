import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ResumeStatusStepper } from './ResumeStatusStepper'

describe('ResumeStatusStepper', () => {
  it('activates statuses through Excellent and leaves Best inactive', () => {
    render(<ResumeStatusStepper status="Excellent" />)

    expect(screen.getByText('Below Average').closest('.status-stepper__step')).toHaveClass(
      'is-active',
    )
    expect(screen.getByText('Average').closest('.status-stepper__step')).toHaveClass('is-active')
    expect(screen.getByText('Good').closest('.status-stepper__step')).toHaveClass('is-active')
    expect(screen.getByText('Excellent').closest('.status-stepper__step')).toHaveClass(
      'is-active',
      'is-current',
    )
    expect(screen.getByText('Best').closest('.status-stepper__step')).not.toHaveClass('is-active')
  })
})
