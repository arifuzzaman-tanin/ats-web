import type { CSSProperties } from 'react'
import type { ResumeStatus } from '../../../types/resume'
import { RESUME_STATUSES, RESUME_STATUS_COLORS } from '../utils/getResumeStatus'

interface ResumeStatusStepperProps {
  status: ResumeStatus
}

export function ResumeStatusStepper({ status }: ResumeStatusStepperProps) {
  const currentIndex = RESUME_STATUSES.indexOf(status)

  return (
    <div
      className="status-stepper"
      style={{ '--status-color': RESUME_STATUS_COLORS[status] } as CSSProperties}
      aria-label={`Resume status: ${status}`}
    >
      {RESUME_STATUSES.map((item, index) => {
        const isActive = index <= currentIndex
        const isCurrent = index === currentIndex

        return (
          <div
            className={`status-stepper__step ${isActive ? 'is-active' : ''} ${
              isCurrent ? 'is-current' : ''
            }`.trim()}
            key={item}
          >
            <span className="status-stepper__bar" aria-hidden="true" />
            <span className="status-stepper__label">{item}</span>
          </div>
        )
      })}
    </div>
  )
}
