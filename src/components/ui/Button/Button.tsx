import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  icon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', icon, className = '', children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={`button button--${variant} ${className}`.trim()} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  )
})
