import { create } from 'zustand'
import type { ExtractSkillsResponse, UploadedFileMetadata } from '../types/resume'

interface ResumeState {
  resumeText: string
  jobDescription: string
  uploadedFileName?: string
  uploadedFileMetadata?: UploadedFileMetadata
  analysisResult?: ExtractSkillsResponse
  includeQuantitativeAchievements: boolean
  optimizedResume?: string
  setResumeText: (resumeText: string) => void
  setJobDescription: (jobDescription: string) => void
  setUploadedFileName: (uploadedFileName?: string) => void
  setUploadedFileMetadata: (metadata?: UploadedFileMetadata) => void
  setAnalysisResult: (analysisResult: ExtractSkillsResponse) => void
  setIncludeQuantitativeAchievements: (includeQuantitativeAchievements: boolean) => void
  setOptimizedResume: (optimizedResume?: string) => void
  resetAnalysis: () => void
  resetAll: () => void
}

const initialState = {
  resumeText: '',
  jobDescription: '',
  uploadedFileName: undefined,
  uploadedFileMetadata: undefined,
  analysisResult: undefined,
  includeQuantitativeAchievements: true,
  optimizedResume: undefined,
}

export const useResumeStore = create<ResumeState>((set) => ({
  ...initialState,
  setResumeText: (resumeText) => set({ resumeText }),
  setJobDescription: (jobDescription) => set({ jobDescription }),
  setUploadedFileName: (uploadedFileName) => set({ uploadedFileName }),
  setUploadedFileMetadata: (uploadedFileMetadata) => set({ uploadedFileMetadata }),
  setAnalysisResult: (analysisResult) => set({ analysisResult }),
  setIncludeQuantitativeAchievements: (includeQuantitativeAchievements) =>
    set({ includeQuantitativeAchievements }),
  setOptimizedResume: (optimizedResume) => set({ optimizedResume }),
  resetAnalysis: () => set({ analysisResult: undefined, optimizedResume: undefined }),
  resetAll: () => set({ ...initialState }),
}))
