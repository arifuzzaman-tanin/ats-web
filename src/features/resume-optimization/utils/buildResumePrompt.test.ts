import { describe, expect, it } from 'vitest'
import { buildResumePrompt } from './buildResumePrompt'

describe('buildResumePrompt', () => {
  it('builds a complete prompt with factuality rules and all source material', () => {
    const prompt = buildResumePrompt({
      resume: 'My complete resume',
      jobDescription: 'The complete job description',
      missingSkills: ['Docker'],
      foundSkills: ['React'],
      includeQuantitativeAchievements: true,
      resumeScore: 78,
      resumeStatus: 'Excellent',
    })

    expect(prompt).toContain('# UNIVERSAL ATS RESUME + COVER LETTER OPTIMIZATION PROMPT')
    expect(prompt).toContain('Never invent or assume experience')
    expect(prompt).toContain('never create a number')
    expect(prompt).toContain('clean, consistent underline or simple horizontal rule')
    expect(prompt).toContain('aligned hanging indents')
    expect(prompt).toContain('Remove all unnecessary photos')
    expect(prompt).toContain('Do not use bold text in the middle of a sentence')
    expect(prompt).toContain('## IDENTIFIED MISSING SKILLS\n\n')
    expect(prompt).toContain('- Docker')
    expect(prompt).toContain('- React')
    expect(prompt).toContain('<resume>\nMy complete resume\n</resume>')
    expect(prompt).toContain(
      '<job_description>\nThe complete job description\n</job_description>',
    )
    expect(prompt).toContain('- Match score: 78%')
    expect(prompt).toContain('- Resume status: Excellent')
  })

  it('does not encourage new metrics when quantitative achievements are disabled', () => {
    const prompt = buildResumePrompt({
      resume: '  Full resume text  ',
      jobDescription: '  Full job description  ',
      missingSkills: [],
      foundSkills: [],
      includeQuantitativeAchievements: false,
      resumeScore: 40,
      resumeStatus: 'Below Average',
    })

    expect(prompt).toContain('Do not add new quantitative achievements or metrics.')
    expect(prompt).toContain('- None identified by the ATS scan')
    expect(prompt).toContain('<resume>\nFull resume text\n</resume>')
    expect(prompt).not.toContain('{{QUANTITATIVE_ACHIEVEMENTS_RULE}}')
  })
})
