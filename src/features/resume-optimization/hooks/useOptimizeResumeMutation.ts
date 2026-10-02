import { useMutation } from '@tanstack/react-query'
import { useResumeStore } from '../../../store/resumeStore'
import type { ResumeOptimizationRequest } from '../../../types/resume'
import { resumeOptimizationService } from '../services/resumeOptimizationService'

export function useOptimizeResumeMutation() {
  const setOptimizedResume = useResumeStore((state) => state.setOptimizedResume)

  return useMutation({
    mutationFn: (request: ResumeOptimizationRequest) =>
      resumeOptimizationService.optimize(request),
    onSuccess: (result) => setOptimizedResume(result.optimizedResume),
  })
}
