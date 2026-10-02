export type ResumeStatus =
  | 'Below Average'
  | 'Average'
  | 'Good'
  | 'Excellent'
  | 'Best'

export type ResumeInputMode = 'upload' | 'paste'

export interface ResumeSkill {
  name: string
  is_available_in_resume: boolean
}

export interface ExtractSkillsRequest {
  job_description: string
  resume: string
}

export interface ExtractSkillsResponse {
  comma_separated_missing_skills: string
  resume_score_in_percentage: number
  resume_status: ResumeStatus
  skills: ResumeSkill[]
  total_matching_skills_in_resume: number
  total_missing_skills_in_resume: number
  total_required_skills_in_job_description: number
}

export interface UploadedFileMetadata {
  name: string
  size: number
  type: string
}

export interface ResumeOptimizationRequest {
  resume: string
  jobDescription: string
  missingSkills: string[]
  foundSkills: string[]
  includeQuantitativeAchievements: boolean
}

export interface ResumeOptimizationResult {
  optimizedResume: string
  docxDownloadUrl?: string
  pdfDownloadUrl?: string
}
