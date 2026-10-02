import type { CSSProperties } from 'react'

interface MatchScoreProps {
  score: number
}

export function MatchScore({ score }: MatchScoreProps) {
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)))
  const style = {
    '--score': normalizedScore,
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
      <div className="match-score__inner">
        <strong>{normalizedScore}%</strong>
        <span>Match Score</span>
      </div>
    </div>
  )
}
