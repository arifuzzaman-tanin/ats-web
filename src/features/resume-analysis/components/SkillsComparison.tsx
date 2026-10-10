import { Check, CircleAlert, Copy, ListChecks, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Tooltip } from '../../../components/ui/Tooltip/Tooltip'
import type { ExtractSkillsResponse, ResumeSkill } from '../../../types/resume'
import { getFoundSkills, getMissingSkills, toSkillNames } from '../utils/skillUtils'

interface SkillsComparisonProps {
  result: ExtractSkillsResponse
}

type CopyGroup = 'missing' | 'found'

function SkillRows({
  skills,
  available,
  label,
}: {
  skills: ResumeSkill[]
  available: boolean
  label: string
}) {
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null)

  const copySkill = async (skillName: string) => {
    await navigator.clipboard.writeText(skillName)
    setCopiedSkill(skillName)
    window.setTimeout(() => setCopiedSkill(null), 1500)
  }

  return (
    <ul className="skill-list" aria-label={label} tabIndex={0}>
      {skills.map((skill) => (
        <li
          className="skill-list__item"
          key={`${skill.name}-${available ? 'found' : 'missing'}`}
        >
          <span className={`skill-list__marker skill-list__marker--${available ? 'matched' : 'missing'}`}>
            {available ? <Check size={15} /> : <CircleAlert size={15} />}
          </span>
          <span className="skill-list__name">{skill.name}</span>
          <span className="skill-list__copy">
            <Tooltip label={copiedSkill === skill.name ? 'Copied' : `Copy ${skill.name}`}>
              <button
                type="button"
                className={`icon-action skill-row-copy${copiedSkill === skill.name ? ' is-copied' : ''}`}
                aria-label={`Copy ${skill.name}`}
                onClick={() => void copySkill(skill.name)}
              >
                {copiedSkill === skill.name ? (
                  <>
                    <Check size={17} />
                    <span className="visually-hidden">Copied</span>
                  </>
                ) : (
                  <Copy size={17} />
                )}
              </button>
            </Tooltip>
          </span>
        </li>
      ))}
      {skills.length === 0 ? <li className="skill-list__empty">No skills in this group.</li> : null}
    </ul>
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
      <div className="skills-panel__header">
        <div className="skills-panel__title">
          <span className="skills-panel__icon">
            <ListChecks size={22} />
          </span>
          <div>
            <h2 id="skills-comparison-title">Your skills at a glance</h2>
            <p>See what matches the role and what you may want to add or highlight.</p>
          </div>
        </div>
      </div>
      <div className="skills-board">
        <section className="skill-group skill-group--missing" aria-labelledby="missing-skills-title">
          <div className="skill-group__header">
            <div className="skill-group__heading">
              <span className="skill-group__icon"><CircleAlert size={18} /></span>
              <div>
                <h3 id="missing-skills-title">Needs attention</h3>
                <p>Skills to add or highlight</p>
              </div>
            </div>
            <div className="skill-group__actions">
              <span className="skill-group__count">{result.total_missing_skills_in_resume}</span>
              <Tooltip label="Copy skills not found in your resume">
                <button
                  type="button"
                  className={`icon-action skill-group-copy${copiedGroup === 'missing' ? ' is-copied' : ''}`}
                  aria-label="Copy skills not found in your resume"
                  onClick={() => void copySkills('missing', missingSkills)}
                  disabled={missingSkills.length === 0}
                >
                  {copiedGroup === 'missing' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedGroup === 'missing' ? 'Copied' : 'Copy all'}
                </button>
              </Tooltip>
            </div>
          </div>
          <SkillRows skills={missingSkills} available={false} label="Missing skills" />
        </section>

        <section className="skill-group skill-group--matched" aria-labelledby="matched-skills-title">
          <div className="skill-group__header">
            <div className="skill-group__heading">
              <span className="skill-group__icon"><Sparkles size={18} /></span>
              <div>
                <h3 id="matched-skills-title">Already matched</h3>
                <p>Skills found in your resume</p>
              </div>
            </div>
            <div className="skill-group__actions">
              <span className="skill-group__count">{result.total_matching_skills_in_resume}</span>
              <Tooltip label="Copy skills found in your resume">
                <button
                  type="button"
                  className={`icon-action skill-group-copy${copiedGroup === 'found' ? ' is-copied' : ''}`}
                  aria-label="Copy skills found in your resume"
                  onClick={() => void copySkills('found', foundSkills)}
                  disabled={foundSkills.length === 0}
                >
                  {copiedGroup === 'found' ? <Check size={16} /> : <Copy size={16} />}
                  {copiedGroup === 'found' ? 'Copied' : 'Copy all'}
                </button>
              </Tooltip>
            </div>
          </div>
          <SkillRows skills={foundSkills} available label="Found skills" />
        </section>
        <span className="visually-hidden" aria-live="polite">
          {copiedGroup ? 'Skills copied' : ''}
        </span>
      </div>
    </section>
  )
}
