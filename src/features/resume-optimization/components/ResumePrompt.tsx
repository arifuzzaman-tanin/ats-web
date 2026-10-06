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
      <div className="prompt-tab__intro">
        <span className="prompt-tab__icon" aria-hidden="true">
          <FilePlus2 size={22} />
        </span>
        <div>
          <h2>Build your tailored prompt</h2>
          <p>
            Create a ready-to-use prompt that improves your resume while keeping every claim grounded
            in your experience.
          </p>
        </div>
      </div>

      <div className="prompt-option">
        <div className="prompt-option__meta">
          <span>Optional enhancement</span>
          <span className="prompt-option__badge">Recommended</span>
        </div>
        <Checkbox
          className="prompt-option__checkbox"
          aria-label="Strengthen measurable impact"
          checked={includeQuantitativeAchievements}
          onChange={(event) => setIncludeQuantitativeAchievements(event.target.checked)}
          description="Strengthens supported metrics and flags possible additions for you to verify. It never invents numbers."
          label={
            <span className="quantitative-achievements-label">
              Strengthen measurable impact
              <Tooltip label={quantitativeAchievementsHelp}>
                <span
                  className="quantitative-achievements-help"
                  aria-label={quantitativeAchievementsHelp}
                  tabIndex={0}
                  onClick={(event) => event.preventDefault()}
                >
                  <CircleHelp size={17} />
                </span>
              </Tooltip>
            </span>
          }
        />
      </div>

      <div className="prompt-tab__action">
        <div className="prompt-actions">
          <Button
            type="button"
            icon={<Copy size={19} />}
            onClick={() => void copyPrompt()}
          >
            Copy prompt
          </Button>
          <span className="copy-feedback" aria-live="polite">
            {copied ? 'Copied to clipboard' : ''}
          </span>
        </div>
        <p>Paste it into ChatGPT, Claude, Gemini, or another AI assistant.</p>
      </div>
    </div>
  )
}
