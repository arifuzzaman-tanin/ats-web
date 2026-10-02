import type { ReactNode } from 'react'

export interface TabItem {
  id: string
  label: string
  panel: ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  activeTab: string
  onChange: (tabId: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  const activePanel = tabs.find((tab) => tab.id === activeTab)?.panel

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label="Resume improvement options">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTab}
            aria-controls={`${tab.id}-panel`}
            id={`${tab.id}-tab`}
            className="tabs__trigger"
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`${activeTab}-panel`}
        role="tabpanel"
        aria-labelledby={`${activeTab}-tab`}
        className="tabs__panel"
      >
        {activePanel}
      </div>
    </div>
  )
}
