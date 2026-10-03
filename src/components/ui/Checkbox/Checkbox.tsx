import { Check } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  description?: string
}

export function Checkbox({ label, description, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`checkbox ${className}`.trim()}>
      <input type="checkbox" {...props} />
      <span className="checkbox__box" aria-hidden="true">
        <Check size={17} strokeWidth={3} />
      </span>
      <span className="checkbox__content">
        <span className="checkbox__label">{label}</span>
        {description ? <span className="checkbox__description">{description}</span> : null}
      </span>
    </label>
  )
}
