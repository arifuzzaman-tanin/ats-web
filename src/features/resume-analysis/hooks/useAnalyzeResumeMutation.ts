import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useResumeStore } from '../../../store/resumeStore'
import type { ExtractSkillsRequest, ExtractSkillsResponse } from '../../../types/resume'
import {
  extractSkills,
  isAccessKeyValidationError,
} from '../api/resumeAnalysisApi'

interface UseAnalyzeResumeMutationOptions {
  onAccessKeyFailure?: () => void
}

export function useAnalyzeResumeMutation(options: UseAnalyzeResumeMutationOptions = {}) {
  const navigate = useNavigate()
  const setAnalysisResult = useResumeStore((state) => state.setAnalysisResult)
  const setScanAnimationVisible = useResumeStore((state) => state.setScanAnimationVisible)

  return useMutation<ExtractSkillsResponse, Error, ExtractSkillsRequest>({
    mutationFn: (request: ExtractSkillsRequest) => extractSkills(request),
    onMutate: () => setScanAnimationVisible(true),
    onSuccess: (result) => {
      setAnalysisResult(result)
      navigate('/analysis')
    },
    onError: (error) => {
      setScanAnimationVisible(false)
      if (isAccessKeyValidationError(error)) options.onAccessKeyFailure?.()
    },
  })
}
