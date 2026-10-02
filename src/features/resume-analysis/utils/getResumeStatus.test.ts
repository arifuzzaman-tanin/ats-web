import { describe, expect, it } from 'vitest'
import { getResumeStatus } from './getResumeStatus'

describe('getResumeStatus', () => {
  it.each([
    [10, 'Below Average'],
    [30, 'Average'],
    [50, 'Good'],
    [70, 'Excellent'],
    [90, 'Best'],
    [0, 'Below Average'],
    [Number.NaN, 'Below Average'],
  ])('maps %s to %s', (score, expected) => {
    expect(getResumeStatus(score)).toBe(expected)
  })
})
