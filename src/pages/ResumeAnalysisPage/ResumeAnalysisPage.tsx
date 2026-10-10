import { ArrowLeft, CircleCheck } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/Button/Button'
import { Card } from '../../components/ui/Card/Card'
import { MatchScore } from '../../features/resume-analysis/components/MatchScore'
import { ResumeStatusSummary } from '../../features/resume-analysis/components/ResumeStatusSummary'
import { SkillsComparison } from '../../features/resume-analysis/components/SkillsComparison'
import { ResumeImprovementTabs } from '../../features/resume-optimization/components/ResumeImprovementTabs'
import { useResumeStore } from '../../store/resumeStore'

export function ResumeAnalysisPage() {
  const navigate = useNavigate()
  const result = useResumeStore((state) => state.analysisResult)
  const setScanAnimationVisible = useResumeStore((state) => state.setScanAnimationVisible)

  useEffect(() => {
    if (!result) return
    setScanAnimationVisible(false)
  }, [result, setScanAnimationVisible])

  if (!result) return null

  return (
    <main className="analysis-page">
      <Button variant="ghost" icon={<ArrowLeft size={22} />} onClick={() => navigate('/')}>
        Back & Rescan
      </Button>

      <header className="analysis-header">
        <div className="analysis-header__eyebrow">
          <CircleCheck size={16} aria-hidden="true" />
          Analysis complete
        </div>
        <div>
          <h1>Resume analysis</h1>
          <p>Your match score, keyword coverage, and next steps in one place.</p>
        </div>
      </header>

      <div className="analysis-layout">
        <div className="analysis-layout__left">
          <Card className="score-card">
            <MatchScore score={result.resume_score_in_percentage} status={result.resume_status} />
            <ResumeStatusSummary status={result.resume_status} />
          </Card>
          <ResumeImprovementTabs result={result} />
        </div>
        <Card className="analysis-layout__right">
          <SkillsComparison result={result} />
        </Card>
      </div>
    </main>
  )
}
