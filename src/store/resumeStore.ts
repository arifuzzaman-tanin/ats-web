import { create } from 'zustand'
import type { ExtractSkillsResponse, UploadedFileMetadata } from '../types/resume'

interface ResumeState {
  resumeText: string
  jobDescription: string
  uploadedFileName?: string
  uploadedFileMetadata?: UploadedFileMetadata
  analysisResult?: ExtractSkillsResponse
  isScanAnimationVisible: boolean
  includeQuantitativeAchievements: boolean
  optimizedResume?: string
  setResumeText: (resumeText: string) => void
  setJobDescription: (jobDescription: string) => void
  setUploadedFileName: (uploadedFileName?: string) => void
  setUploadedFileMetadata: (metadata?: UploadedFileMetadata) => void
  setAnalysisResult: (analysisResult: ExtractSkillsResponse) => void
  setScanAnimationVisible: (isVisible: boolean) => void
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
  isScanAnimationVisible: false,
  includeQuantitativeAchievements: true,
  optimizedResume: undefined,
}

export const useResumeStore = create<ResumeState>((set) => ({
  ...initialState,
  setResumeText: (resumeText) => set({ resumeText }),
  setJobDescription: (jobDescription) => set({ jobDescription }),
  setUploadedFileName: (uploadedFileName) => set({ uploadedFileName }),
  setUploadedFileMetadata: (uploadedFileMetadata) => set({ uploadedFileMetadata }),
  setAnalysisResult: (analysisResult) =>
    set({ analysisResult, includeQuantitativeAchievements: true }),
  setScanAnimationVisible: (isScanAnimationVisible) => set({ isScanAnimationVisible }),
  setIncludeQuantitativeAchievements: (includeQuantitativeAchievements) =>
    set({ includeQuantitativeAchievements }),
  setOptimizedResume: (optimizedResume) => set({ optimizedResume }),
  resetAnalysis: () =>
    set({
      analysisResult: undefined,
      includeQuantitativeAchievements: true,
      optimizedResume: undefined,
    }),
  resetAll: () => set({ ...initialState }),
}))
