import type { CSSProperties } from 'react'
import { Gauge } from 'lucide-react'
import type { ResumeStatus } from '../../../types/resume'
import { RESUME_STATUS_COLORS } from '../utils/getResumeStatus'
import { ResumeStatusStepper } from './ResumeStatusStepper'

interface ResumeStatusSummaryProps {
  status: ResumeStatus
}

const descriptions: Record<ResumeStatus, string> = {
  'Below Average':
    'Your resume needs stronger alignment with this role. Start by adding relevant supported skills from the job description.',
  Average:
    'Your resume covers some job requirements, but several important skills or phrases may need clearer placement.',
  Good:
    'Your resume is reasonably aligned with the job requirements. A few targeted additions can improve keyword coverage.',
  Excellent:
    'Your resume is well-aligned with the job requirements. Consider adding a few more skills to further improve your score.',
  Best: 'Your resume is highly aligned with the job requirements. Review the details for final polish before applying.',
}

export function ResumeStatusSummary({ status }: ResumeStatusSummaryProps) {
  const style = { '--status-color': RESUME_STATUS_COLORS[status] } as CSSProperties

  return (
    <div className="status-summary" style={style}>
      <div className="status-summary__heading">
        <div>
          <span className="status-summary__eyebrow">Resume status</span>
        </div>
        <span className="status-summary__badge">
          <Gauge size={16} aria-hidden="true" />
          {status}
        </span>
      </div>
      <ResumeStatusStepper status={status} />
      <p className="status-summary__description">{descriptions[status]}</p>
    </div>
  )
}
