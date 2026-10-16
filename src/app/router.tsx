import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage/LandingPage'
import { useResumeStore } from '../store/resumeStore'

const ResumeAnalysisPage = lazy(() =>
  import('../pages/ResumeAnalysisPage/ResumeAnalysisPage').then((module) => ({ default: module.ResumeAnalysisPage })),
)
const ResumeScannerPage = lazy(() =>
  import('../pages/ResumeScannerPage/ResumeScannerPage').then((module) => ({ default: module.ResumeScannerPage })),
)
const DocumentationPage = lazy(() =>
  import('../pages/DocumentationPage/DocumentationPage').then((module) => ({ default: module.DocumentationPage })),
)

function AnalysisRoute() {
  const analysisResult = useResumeStore((state) => state.analysisResult)
  return analysisResult ? <ResumeAnalysisPage /> : <Navigate to="/resume-scanner" replace />
}

export function AppRouter() {
  return (
    <Suspense fallback={<main className="route-loading" role="status">Loading…</main>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
        <Route path="/resume-scanner" element={<ResumeScannerPage />} />
        <Route path="/analysis" element={<AnalysisRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
