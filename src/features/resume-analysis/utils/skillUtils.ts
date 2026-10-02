import type { ExtractSkillsResponse, ResumeSkill } from '../../../types/resume'

export function getMissingSkills(skills: ResumeSkill[]) {
  return skills.filter((skill) => !skill.is_available_in_resume)
}

export function getFoundSkills(skills: ResumeSkill[]) {
  return skills.filter((skill) => skill.is_available_in_resume)
}

export function toSkillNames(skills: ResumeSkill[]) {
  return skills.map((skill) => skill.name)
}

export function summarizeSkills(response: ExtractSkillsResponse) {
  const missingSkills = getMissingSkills(response.skills)
  const foundSkills = getFoundSkills(response.skills)

  return {
    missingSkills,
    foundSkills,
    missingSkillNames: toSkillNames(missingSkills),
    foundSkillNames: toSkillNames(foundSkills),
  }
}
