import { Wand2 } from 'lucide-react'
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
      <div className="improvement-heading">
        <span className="input-section__icon input-section__icon--blue">
          <Wand2 size={24} />
        </span>
        <div>
          <h2>Optimize Your Resume Using AI</h2>
          <p>Let AI enhance your resume using the job description and analysis results.</p>
        </div>
      </div>
      <ul className="benefits-list">
        <li>Add relevant missing skills where appropriate</li>
        <li>Make your resume ATS-friendly</li>
        <li>Improve content and structure</li>
        <li>Preserve your original experience and tone</li>
      </ul>
      <Button
        type="button"
        icon={optimizeMutation.isPending ? <Spinner /> : <Wand2 size={18} />}
        onClick={optimize}
        disabled={optimizeMutation.isPending}
      >
        {optimizeMutation.isPending ? 'Optimizing Resume...' : 'Optimize My Resume with AI'}
      </Button>
      {optimizeMutation.error ? (
        <p className="field-error">Unable to optimize resume. Please try again.</p>
      ) : null}
      {optimizedResume ? <OptimizedResumeDownloads content={optimizedResume} /> : null}
    </div>
  )
}
