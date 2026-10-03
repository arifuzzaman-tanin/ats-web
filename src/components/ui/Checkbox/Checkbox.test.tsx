import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { Checkbox } from './Checkbox'

function ControlledCheckbox() {
  const [checked, setChecked] = useState(true)

  return (
    <Checkbox
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
      label="Include quantitative achievements"
    />
  )
}

describe('Checkbox', () => {
  it('toggles when its label is clicked', () => {
    render(<ControlledCheckbox />)

    const checkbox = screen.getByRole('checkbox', {
      name: 'Include quantitative achievements',
    })

    expect(checkbox).toBeChecked()
    fireEvent.click(screen.getByText('Include quantitative achievements'))
    expect(checkbox).not.toBeChecked()
    fireEvent.click(screen.getByText('Include quantitative achievements'))
    expect(checkbox).toBeChecked()
  })
})
