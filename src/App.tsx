import { AppProviders } from './app/providers/AppProviders'
import { AppRouter } from './app/router'
import { ScanLoader } from './features/resume-scanner/components/ScanLoader'
import { useResumeStore } from './store/resumeStore'

export default function App() {
  const isScanAnimationVisible = useResumeStore((state) => state.isScanAnimationVisible)

  return (
    <AppProviders>
      <AppRouter />
      {isScanAnimationVisible ? <ScanLoader fullscreen /> : null}
    </AppProviders>
  )
}
