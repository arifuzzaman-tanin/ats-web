import type {
  ResumeOptimizationRequest,
  ResumeOptimizationResult,
} from '../../../types/resume'

export interface ResumeOptimizationService {
  optimize(request: ResumeOptimizationRequest): Promise<ResumeOptimizationResult>
}

export const resumeOptimizationService: ResumeOptimizationService = {
  async optimize(request) {
    const optimizedResume = [
      'Optimized Resume Draft',
      '',
      request.resume,
      '',
      'ATS alignment notes:',
      `Relevant missing skills to evaluate honestly: ${request.missingSkills.join(', ') || 'None'}`,
      `Existing aligned skills: ${request.foundSkills.join(', ') || 'None'}`,
      request.includeQuantitativeAchievements
        ? 'Add measurable outcomes only where your real records support them.'
        : 'Preserve existing metrics without adding new numbers.',
    ].join('\n')

    return { optimizedResume }
  },
}
