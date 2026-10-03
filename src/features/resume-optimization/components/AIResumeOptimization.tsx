import { ArrowRight, CircleCheck, Sparkles } from 'lucide-react'
import { Button } from '../../../components/ui/Button/Button'
import { Spinner } from '../../../components/ui/Spinner/Spinner'
import { useResumeStore } from '../../../store/resumeStore'
import type { ExtractSkillsResponse } from '../../../types/resume'
import { summarizeSkills } from '../../resume-analysis/utils/skillUtils'
import { useOptimizeResumeMutation } from '../hooks/useOptimizeResumeMutation'
import { OptimizedResumeDownloads } from './OptimizedResumeDownloads'

interface AIResumeOptimizationProps {
  result: ExtractSkillsResponse
}

export function AIResumeOptimization({ result }: AIResumeOptimizationProps) {
  const resumeText = useResumeStore((state) => state.resumeText)
  const jobDescription = useResumeStore((state) => state.jobDescription)
  const includeQuantitativeAchievements = useResumeStore(
    (state) => state.includeQuantitativeAchievements,
  )
  const optimizedResume = useResumeStore((state) => state.optimizedResume)
  const optimizeMutation = useOptimizeResumeMutation()
  const { missingSkillNames, foundSkillNames } = summarizeSkills(result)

  const optimize = () => {
    optimizeMutation.mutate({
      resume: resumeText,
      jobDescription,
      missingSkills: missingSkillNames,
      foundSkills: foundSkillNames,
      includeQuantitativeAchievements,
    })
  }

  return (
    <div className="ai-tab">
      <div className="ai-tab__intro">
        <h2>Optimize Your Resume Using AI</h2>
        <p>
          Let AI enhance your resume by adding relevant missing skills, improving content, and
          making it ATS-friendly based on the job description.
        </p>
      </div>

      <div className="ai-tab__workspace">
        <div className="ai-tab__action-column">
          <ul className="benefits-list">
            <li><CircleCheck size={20} />Add missing skills from the job description</li>
            <li><CircleCheck size={20} />Make your resume ATS-friendly</li>
            <li><CircleCheck size={20} />Improve content and structure</li>
            <li><CircleCheck size={20} />Keep your original experience and tone</li>
          </ul>
          <Button
            type="button"
            className="ai-tab__optimize-button"
            icon={optimizeMutation.isPending ? <Spinner /> : <Sparkles size={20} />}
            onClick={optimize}
            disabled={optimizeMutation.isPending}
          >
            {optimizeMutation.isPending ? 'Optimizing Resume...' : 'Optimize My Resume'}
            {!optimizeMutation.isPending ? <ArrowRight size={20} /> : null}
          </Button>
          {optimizeMutation.error ? (
            <p className="field-error">Unable to optimize resume. Please try again.</p>
          ) : null}
        </div>

        <OptimizedResumeDownloads content={optimizedResume} />
      </div>
    </div>
  )
}
