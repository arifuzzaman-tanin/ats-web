import type { ResumeStatus } from '../../../types/resume'
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
  return (
    <div className="status-summary">
      <h2>Resume Status</h2>
      <ResumeStatusStepper status={status} />
      <p>{descriptions[status]}</p>
    </div>
  )
}
