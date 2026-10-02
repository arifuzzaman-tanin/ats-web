import type { ResumeStatus } from '../../../types/resume'
import { RESUME_STATUSES } from '../utils/getResumeStatus'

interface ResumeStatusStepperProps {
  status: ResumeStatus
}

export function ResumeStatusStepper({ status }: ResumeStatusStepperProps) {
  const currentIndex = RESUME_STATUSES.indexOf(status)

  return (
    <div className="status-stepper" aria-label={`Resume status: ${status}`}>
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
            <span className="status-stepper__line" aria-hidden="true" />
            <span className="status-stepper__dot" aria-hidden="true" />
            <span className="status-stepper__label">{item}</span>
          </div>
        )
      })}
    </div>
  )
}
