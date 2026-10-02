import { Navigate, Route, Routes } from 'react-router-dom'
import { ResumeAnalysisPage } from '../pages/ResumeAnalysisPage/ResumeAnalysisPage'
import { ResumeScannerPage } from '../pages/ResumeScannerPage/ResumeScannerPage'
import { useResumeStore } from '../store/resumeStore'

function AnalysisRoute() {
  const analysisResult = useResumeStore((state) => state.analysisResult)
  return analysisResult ? <ResumeAnalysisPage /> : <Navigate to="/" replace />
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ResumeScannerPage />} />
      <Route path="/analysis" element={<AnalysisRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
