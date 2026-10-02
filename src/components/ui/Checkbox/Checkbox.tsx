import { Check } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  description?: string
}

export function Checkbox({ label, description, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`checkbox ${className}`.trim()}>
      <span className="checkbox__box" aria-hidden="true">
        {props.checked ? <Check size={16} strokeWidth={3} /> : null}
      </span>
      <input type="checkbox" {...props} />
      <span className="checkbox__content">
        <span className="checkbox__label">{label}</span>
        {description ? <span className="checkbox__description">{description}</span> : null}
      </span>
    </label>
  )
}
