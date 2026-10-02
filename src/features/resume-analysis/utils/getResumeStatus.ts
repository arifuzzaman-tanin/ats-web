import type { ResumeStatus } from '../../../types/resume'

export const RESUME_STATUS_COLORS: Record<ResumeStatus, string> = {
  'Below Average': '#ef4444',
  Average: '#f59e0b',
  Good: '#10b981',
  Excellent: '#2563eb',
  Best: '#7c3aed',
}

export const RESUME_STATUSES: ResumeStatus[] = [
  'Below Average',
  'Average',
  'Good',
  'Excellent',
  'Best',
]

export function isResumeStatus(value: unknown): value is ResumeStatus {
  return typeof value === 'string' && RESUME_STATUSES.includes(value as ResumeStatus)
}

export function getResumeStatus(score: number): ResumeStatus {
  if (!Number.isFinite(score) || score <= 0) return 'Below Average'
  if (score <= 20) return 'Below Average'
  if (score <= 40) return 'Average'
  if (score <= 60) return 'Good'
  if (score <= 80) return 'Excellent'
  return 'Best'
}
