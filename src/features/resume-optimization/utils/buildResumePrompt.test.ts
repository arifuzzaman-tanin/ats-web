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
    expect(prompt).toContain('# PHASE 1 - SOURCE INTAKE AND VALIDATION')
    expect(prompt).toContain('Directly Demonstrated, Transferable / Adjacent, Unsupported')
    expect(prompt).toContain('Critical Qualification Gaps')
    expect(prompt).toContain('Never default to SAP Fieldglass')
    expect(prompt).toContain('Do not double-count overlapping roles')
    expect(prompt).toContain('add ALL listed skills to the optimized resume')
    expect(prompt).toContain('candidate explicitly confirms')
    expect(prompt).toContain('Do not invent an employer, project, responsibility')
    expect(prompt).toContain('every candidate-confirmed missing skill appears in the Skills section exactly as supplied')
    expect(prompt).toContain('Use every missing skill exactly as written below')
    expect(prompt).toContain('Do not change its wording, capitalization, spelling, orientation, or word order')
    expect(prompt).toContain('checking the current or most recent company first')
    expect(prompt).toContain('never create a number')
    expect(prompt).toContain('consistent real paragraph border or simple horizontal rule')
    expect(prompt).toContain('consistent indentation and hanging indents')
    expect(prompt).toContain('Avoid photos, profile pictures, logos')
    expect(prompt).toContain('Do not bold individual keywords')
    expect(prompt).toContain('## IDENTIFIED MISSING SKILLS\n\n')
    expect(prompt).toContain('- Docker')
    expect(prompt).toContain('- React')
    expect(prompt).toContain('<resume>\nMy complete resume\n</resume>')
    expect(prompt).toContain(
      '<job_description>\nThe complete job description\n</job_description>',
    )
    expect(prompt).toContain('- Match score: 78%')
    expect(prompt).toContain('- Resume status: Excellent')
    expect(prompt).toContain('End of application-specific source material')
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
