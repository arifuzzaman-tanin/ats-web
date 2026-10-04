import { CheckCircle2, Copy, FileText, XCircle } from 'lucide-react'
import { useState } from 'react'
import { Tooltip } from '../../../components/ui/Tooltip/Tooltip'
import type { ExtractSkillsResponse, ResumeSkill } from '../../../types/resume'
import { getFoundSkills, getMissingSkills, toSkillNames } from '../utils/skillUtils'

interface SkillsComparisonProps {
  result: ExtractSkillsResponse
}

type CopyGroup = 'missing' | 'found'

function SkillRows({ skills, available }: { skills: ResumeSkill[]; available: boolean }) {
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null)

  const copySkill = async (skillName: string) => {
    await navigator.clipboard.writeText(skillName)
    setCopiedSkill(skillName)
    window.setTimeout(() => setCopiedSkill(null), 1500)
  }

  return (
    <>
      {skills.map((skill) => (
        <tr
          className="skills-table__skill-row"
          key={`${skill.name}-${available ? 'found' : 'missing'}`}
        >
          <td className="skills-table__skill-name">
            <span>{skill.name}</span>
            <Tooltip label={copiedSkill === skill.name ? 'Copied' : `Copy ${skill.name}`}>
              <button
                type="button"
                className={`icon-action skill-row-copy${copiedSkill === skill.name ? ' is-copied' : ''}`}
                aria-label={`Copy ${skill.name}`}
                onClick={() => void copySkill(skill.name)}
              >
                {copiedSkill === skill.name ? 'Copied' : <Copy size={18} />}
              </button>
            </Tooltip>
          </td>
          <td>
            {available ? (
              <CheckCircle2 className="skill-icon skill-icon--success" size={23} />
            ) : (
              <XCircle className="skill-icon skill-icon--error" size={23} />
            )}
          </td>
        </tr>
      ))}
    </>
  )
}

export function SkillsComparison({ result }: SkillsComparisonProps) {
  const [copiedGroup, setCopiedGroup] = useState<CopyGroup | null>(null)
  const missingSkills = getMissingSkills(result.skills)
  const foundSkills = getFoundSkills(result.skills)

  const copySkills = async (group: CopyGroup, skills: ResumeSkill[]) => {
    await navigator.clipboard.writeText(toSkillNames(skills).join(', '))
    setCopiedGroup(group)
    window.setTimeout(() => setCopiedGroup(null), 1500)
  }

  return (
    <section className="skills-panel" aria-labelledby="skills-comparison-title">
      <div className="skills-panel__title">
        <span className="input-section__icon input-section__icon--green">
          <FileText size={25} />
        </span>
        <h2 id="skills-comparison-title">Skills Comparison</h2>
      </div>
      <div
        className="skills-table-wrap"
        role="region"
        aria-labelledby="skills-comparison-title"
        tabIndex={0}
      >
        <table className="skills-table">
          <thead>
            <tr>
              <th>Skills in job description</th>
              <th>Found in resume</th>
            </tr>
          </thead>
          <tbody>
            <tr className="skills-table__section">
              <td>Missing Skills ({result.total_missing_skills_in_resume})</td>
              <td>
                <Tooltip label="Copy missing skills">
                  <button
                    type="button"
                    className="icon-action"
                    aria-label="Copy missing skills"
                    onClick={() => void copySkills('missing', missingSkills)}
                  >
                    <Copy size={20} />
                  </button>
                </Tooltip>
                <span aria-live="polite">{copiedGroup === 'missing' ? 'Copied' : ''}</span>
              </td>
            </tr>
            <SkillRows skills={missingSkills} available={false} />
            <tr className="skills-table__spacer">
              <td colSpan={2} />
            </tr>
            <tr className="skills-table__section">
              <td>Found Skills ({result.total_matching_skills_in_resume})</td>
              <td>
                <Tooltip label="Copy found skills">
                  <button
                    type="button"
                    className="icon-action"
                    aria-label="Copy found skills"
                    onClick={() => void copySkills('found', foundSkills)}
                  >
                    <Copy size={20} />
                  </button>
                </Tooltip>
                <span aria-live="polite">{copiedGroup === 'found' ? 'Copied' : ''}</span>
              </td>
            </tr>
            <SkillRows skills={foundSkills} available />
          </tbody>
        </table>
      </div>
    </section>
  )
}
