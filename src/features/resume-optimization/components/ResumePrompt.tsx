import { CircleHelp, Copy, FilePlus2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Button } from '../../../components/ui/Button/Button'
import { Checkbox } from '../../../components/ui/Checkbox/Checkbox'
import { Tooltip } from '../../../components/ui/Tooltip/Tooltip'
import { useResumeStore } from '../../../store/resumeStore'
import type { ExtractSkillsResponse } from '../../../types/resume'
import { summarizeSkills } from '../../resume-analysis/utils/skillUtils'
import { buildResumePrompt } from '../utils/buildResumePrompt'

interface ResumePromptProps {
  result: ExtractSkillsResponse
}

export function ResumePrompt({ result }: ResumePromptProps) {
  const quantitativeAchievementsHelp =
    'Ask the AI to strengthen measurable results already in the resume and flag possible additions for manual verification.'
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
            Get a ready-to-use prompt that optimizes your resume and incorporates missing skills only
            when your experience supports them.
          </p>
        </div>
      </div>

      <Checkbox
        checked={includeQuantitativeAchievements}
        onChange={(event) => setIncludeQuantitativeAchievements(event.target.checked)}
        label={
          <span className="quantitative-achievements-label">
            Include quantitative achievements
            <Tooltip label={quantitativeAchievementsHelp}>
              <span
                className="quantitative-achievements-help"
                aria-label={quantitativeAchievementsHelp}
                tabIndex={0}
                onClick={(event) => event.preventDefault()}
              >
                <CircleHelp size={18} />
              </span>
            </Tooltip>
          </span>
        }
      />

      <p className="quantitative-achievements-note">
        <strong>Recommended:</strong> Existing metrics show impact; unsupported numbers are never added.
      </p>

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
        Copy the prompt and paste it into ChatGPT, Claude, Gemini, or another AI assistant.
      </div>
    </div>
  )
}
