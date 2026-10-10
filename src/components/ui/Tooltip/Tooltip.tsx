import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps extends PropsWithChildren {
  label: string
}

export function Tooltip({ label, children }: TooltipProps) {
  const tooltipId = useId()
  const triggerRef = useRef<HTMLSpanElement>(null)
  const contentRef = useRef<HTMLSpanElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null)
  const isVisible = isHovered || isFocused || isClicked

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    const content = contentRef.current

    if (!trigger || !content) return

    const triggerRect = trigger.getBoundingClientRect()
    const contentRect = content.getBoundingClientRect()
    const viewportWidth = document.documentElement.clientWidth || window.innerWidth
    const viewportHeight = document.documentElement.clientHeight || window.innerHeight
    const edge = 8
    const gap = 8
    const left = Math.min(
      Math.max(triggerRect.right - contentRect.width, edge),
      Math.max(edge, viewportWidth - contentRect.width - edge),
    )
    const top = triggerRect.top >= contentRect.height + gap + edge
      ? triggerRect.top - contentRect.height - gap
      : Math.min(triggerRect.bottom + gap, viewportHeight - contentRect.height - edge)

    setPosition({ left, top: Math.max(edge, top) })
  }, [])

  useLayoutEffect(() => {
    if (!isVisible) return

    updatePosition()
  }, [isVisible, label, updatePosition])

  useEffect(() => {
    if (!isVisible) return

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!triggerRef.current?.contains(event.target as Node)) setIsClicked(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsClicked(false)
    }

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isVisible, updatePosition])

  return (
    <>
      <span
        ref={triggerRef}
        className="tooltip"
        aria-describedby={isVisible ? tooltipId : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false)
        }}
        onClick={() => setIsClicked(true)}
      >
        {children}
      </span>
      {isVisible && typeof document !== 'undefined'
        ? createPortal(
            <span
              ref={contentRef}
              id={tooltipId}
              role="tooltip"
              className="tooltip__content"
              style={position ? { left: position.left, top: position.top } : undefined}
            >
              {label}
            </span>,
            document.body,
          )
        : null}
    </>
  )
}
