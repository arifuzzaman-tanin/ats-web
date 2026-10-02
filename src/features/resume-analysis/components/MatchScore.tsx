import type { CSSProperties } from 'react'
import type { ResumeStatus } from '../../../types/resume'
import { RESUME_STATUS_COLORS } from '../utils/getResumeStatus'

interface MatchScoreProps {
  score: number
  status: ResumeStatus
}

export function MatchScore({ score, status }: MatchScoreProps) {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)))
  const style = {
    '--status-color': RESUME_STATUS_COLORS[status],
  } as CSSProperties

  return (
    <div
      className="match-score"
      role="progressbar"
      aria-label="Resume match score"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={normalizedScore}
      style={style}
    >
      <svg className="match-score__ring" viewBox="0 0 120 120" aria-hidden="true">
        <circle className="match-score__track" cx="60" cy="60" r="52" />
        <circle
          className="match-score__fill"
          cx="60"
          cy="60"
          r="52"
          pathLength="100"
          strokeDasharray={`${normalizedScore} 100`}
          visibility={normalizedScore === 0 ? 'hidden' : undefined}
        />
      </svg>
      <div className="match-score__inner">
        <strong>{normalizedScore}<small>%</small></strong>
        <span>Match Score</span>
      </div>
    </div>
  )
}
