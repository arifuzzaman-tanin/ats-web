import { useState } from 'react'
import { FileText, Sparkles } from 'lucide-react'
import { Card } from '../../../components/ui/Card/Card'
import { Tabs, type TabItem } from '../../../components/ui/Tabs/Tabs'
import type { ExtractSkillsResponse } from '../../../types/resume'
import { AIResumeOptimization } from './AIResumeOptimization'
import { ResumePrompt } from './ResumePrompt'

interface ResumeImprovementTabsProps {
  result: ExtractSkillsResponse
}

export function ResumeImprovementTabs({ result }: ResumeImprovementTabsProps) {
  const [activeTab, setActiveTab] = useState('resume-prompt')
  const tabs: TabItem[] = [
    {
      id: 'resume-prompt',
      label: 'Prompt Builder',
      icon: <FileText size={22} />,
      panel: <ResumePrompt result={result} />,
    },
    {
      id: 'ai-resume-optimization',
      label: 'AI Resume Generation',
      icon: <Sparkles size={22} />,
      panel: <AIResumeOptimization />,
    },
  ]

  return (
    <Card className="improvement-card">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
    </Card>
  )
}
