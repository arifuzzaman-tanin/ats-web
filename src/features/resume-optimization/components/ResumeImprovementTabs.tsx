import { Card } from '../../../components/ui/Card/Card'
import type { ExtractSkillsResponse } from '../../../types/resume'
import { ResumePrompt } from './ResumePrompt'

interface ResumeImprovementTabsProps {
  result: ExtractSkillsResponse
}

export function ResumeImprovementTabs({ result }: ResumeImprovementTabsProps) {
  return (
    <Card className="improvement-card">
      <ResumePrompt result={result} />
    </Card>
  )
}
