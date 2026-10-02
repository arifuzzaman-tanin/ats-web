import { ClipboardList, UploadCloud } from 'lucide-react'
import type { ResumeInputMode } from '../../../types/resume'

interface ResumeInputToggleProps {
  mode: ResumeInputMode
  onChange: (mode: ResumeInputMode) => void
}

export function ResumeInputToggle({ mode, onChange }: ResumeInputToggleProps) {
  return (
    <div className="resume-toggle" role="tablist" aria-label="Resume input method">
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'upload'}
        className="resume-toggle__item"
        onClick={() => onChange('upload')}
      >
        <UploadCloud size={18} />
        Upload
      </button>
      <span className="resume-toggle__divider" />
      <button
        type="button"
        role="tab"
        aria-selected={mode === 'paste'}
        className="resume-toggle__item"
        onClick={() => onChange('paste')}
      >
        <ClipboardList size={18} />
        Paste text
      </button>
    </div>
  )
}
