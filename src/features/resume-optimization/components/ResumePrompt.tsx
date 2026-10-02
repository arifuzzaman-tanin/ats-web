import { Copy, FilePlus2, Info } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../../components/ui/Button/Button'
import { Checkbox } from '../../../components/ui/Checkbox/Checkbox'
import { useResumeStore } from '../../../store/resumeStore'
import type { ExtractSkillsResponse } from '../../../types/resume'
import { summarizeSkills } from '../../resume-analysis/utils/skillUtils'
import { buildResumePrompt } from '../utils/buildResumePrompt'

interface ResumePromptProps {
  result: ExtractSkillsResponse
}

export function ResumePrompt({ result }: ResumePromptProps) {
  const [copied, setCopied] = useState(false)
  const resumeText = useResumeStore((state) => state.resumeText)
  const jobDescription = useResumeStore((state) => state.jobDescription)
  const includeQuantitativeAchievements = useResumeStore(
    (state) => state.includeQuantitativeAchievements,
  )
  const setIncludeQuantitativeAchievements = useResumeStore(
    (state) => state.setIncludeQuantitativeAchievements,
  )
  const { missingSkillNames, foundSkillNames } = summarizeSkills(result)

  const prompt = useMemo(
    () =>
      buildResumePrompt({
        resume: resumeText,
        jobDescription,
        missingSkills: missingSkillNames,
        foundSkills: foundSkillNames,
        includeQuantitativeAchievements,
        resumeScore: result.resume_score_in_percentage,
        resumeStatus: result.resume_status,
      }),
    [
      foundSkillNames,
      includeQuantitativeAchievements,
      jobDescription,
      missingSkillNames,
      result.resume_score_in_percentage,
      result.resume_status,
      resumeText,
    ],
  )

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="prompt-tab">
      <div className="improvement-heading">
        <span className="input-section__icon input-section__icon--blue">
          <FilePlus2 size={26} />
        </span>
        <div>
          <h2>Generate a Resume Improvement Prompt</h2>
          <p>
            Get a ready-to-use prompt for ChatGPT to create a new resume with the missing skills and
            improvements.
          </p>
        </div>
      </div>

      <Checkbox
        checked={includeQuantitativeAchievements}
        onChange={(event) => setIncludeQuantitativeAchievements(event.target.checked)}
        label="Include quantitative achievements"
        description='Add instructions to include measurable results (e.g., "improved performance by 40%", "led a team of 5", etc.).'
      />

      <div className="prompt-actions">
        <Button
          type="button"
          variant="secondary"
          icon={<Copy size={20} />}
          onClick={() => void copyPrompt()}
        >
          Copy Prompt
        </Button>
        <span className="copy-feedback" aria-live="polite">
          {copied ? 'Copied' : ''}
        </span>
      </div>

      <div className="usage-note">
        <div className="usage-note__title">
          <Info size={18} />
          <h3>How to use this prompt?</h3>
        </div>
        <ol>
          <li>Click "Copy Prompt" to copy the detailed prompt.</li>
          <li>
            Paste it in any AI tool like ChatGPT, Gemini, or Claude and generate your improved
            resume.
          </li>
        </ol>
      </div>
    </div>
  )
}
