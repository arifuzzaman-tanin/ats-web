import { ArrowLeft } from 'lucide-react'
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

  if (!result) return null

  return (
    <main className="analysis-page">
      <Button variant="ghost" icon={<ArrowLeft size={22} />} onClick={() => navigate('/')}>
        Back & Rescan
      </Button>

      <header className="page-heading page-heading--analysis">
        <h1>Resume Analysis Result</h1>
        <span className="page-heading__accent" />
      </header>

      <div className="analysis-layout">
        <div className="analysis-layout__left">
          <Card className="score-card">
            <MatchScore score={result.resume_score_in_percentage} />
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
