import type { ResumeOptimizationRequest } from '../../../types/resume'

interface BuildResumePromptInput extends ResumeOptimizationRequest {
  resumeScore: number
  resumeStatus: string
}

export function buildResumePrompt({
  resume,
  jobDescription,
  missingSkills,
  foundSkills,
  includeQuantitativeAchievements,
  resumeScore,
  resumeStatus,
}: BuildResumePromptInput) {
  return [
    'Optimize my resume for the job description below while preserving my actual career history.',
    '',
    `Current ATS match score: ${resumeScore}%`,
    `Current resume status: ${resumeStatus}`,
    `Missing skills to consider only if supported by real experience: ${missingSkills.join(', ') || 'None'}`,
    `Skills already found: ${foundSkills.join(', ') || 'None'}`,
    '',
    'Rules:',
    '- Improve ATS keyword alignment, clarity, structure, and professional wording.',
    '- Naturally add relevant missing skills only when the original resume supports them.',
    '- Keep employers, dates, job titles, projects, certifications, and responsibilities factual.',
    '- Never invent technologies, employers, projects, responsibilities, certifications, achievements, or metrics.',
    '- Preserve the resume owner’s actual career history and professional formatting.',
    includeQuantitativeAchievements
      ? '- Include quantitative achievements only when valid data exists. Never fabricate numbers.'
      : '- Do not add new quantitative achievements unless they already exist in the resume.',
    '',
    'Original resume:',
    resume,
    '',
    'Job description:',
    jobDescription,
  ].join('\n')
}
