import { describe, expect, it } from 'vitest'
import { resumeScannerSchema } from './resumeScannerSchema'

describe('resumeScannerSchema', () => {
  it('requires resume text and job description', () => {
    const result = resumeScannerSchema.safeParse({ resumeText: '', jobDescription: '' })
    expect(result.success).toBe(false)
  })

  it('accepts valid scanner input', () => {
    const result = resumeScannerSchema.safeParse({
      resumeText: 'Experienced React developer',
      jobDescription: 'React and TypeScript role',
    })
    expect(result.success).toBe(true)
  })
})
