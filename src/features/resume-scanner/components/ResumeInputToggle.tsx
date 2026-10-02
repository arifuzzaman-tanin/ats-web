import { ClipboardList, UploadCloud } from 'lucide-react'
import type { ResumeInputMode } from '../../../types/resume'

interface ResumeInputToggleProps {
  mode: ResumeInputMode
  onChange: (mode: ResumeInputMode) => void
}

export function ResumeInputToggle({ mode, onChange }: ResumeInputToggleProps) {
  const isUploadMode = mode === 'upload'
  const nextMode = isUploadMode ? 'paste' : 'upload'
  const label = isUploadMode ? 'Paste text' : 'Upload resume'
  const Icon = isUploadMode ? ClipboardList : UploadCloud

  return (
    <div className="resume-toggle">
      <button
        type="button"
        className="resume-toggle__item"
        onClick={() => onChange(nextMode)}
      >
        <Icon size={18} />
        {label}
      </button>
    </div>
  )
}
