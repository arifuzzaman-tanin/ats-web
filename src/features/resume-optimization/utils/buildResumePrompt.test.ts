import { describe, expect, it } from 'vitest'
import { buildResumePrompt } from './buildResumePrompt'

describe('buildResumePrompt', () => {
  it('includes the factuality rules and source material', () => {
    const prompt = buildResumePrompt({
      resume: 'My resume',
      jobDescription: 'The job',
      missingSkills: ['Docker'],
      foundSkills: ['React'],
      includeQuantitativeAchievements: true,
      resumeScore: 78,
      resumeStatus: 'Excellent',
    })

    expect(prompt).toContain('Never invent technologies')
    expect(prompt).toContain('Never fabricate numbers')
    expect(prompt).toContain('Docker')
    expect(prompt).toContain('React')
    expect(prompt).toContain('My resume')
    expect(prompt).toContain('The job')
  })
})
