import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useResumeStore } from '../../../store/resumeStore'
import type { ExtractSkillsRequest } from '../../../types/resume'
import { extractSkills } from '../api/resumeAnalysisApi'

export function useAnalyzeResumeMutation() {
  const navigate = useNavigate()
  const setAnalysisResult = useResumeStore((state) => state.setAnalysisResult)
  const setScanAnimationVisible = useResumeStore((state) => state.setScanAnimationVisible)

  return useMutation({
    mutationFn: (request: ExtractSkillsRequest) => extractSkills(request),
    onMutate: () => setScanAnimationVisible(true),
    onSuccess: (result) => {
      setAnalysisResult(result)
      navigate('/analysis')
    },
    onError: () => setScanAnimationVisible(false),
  })
}
