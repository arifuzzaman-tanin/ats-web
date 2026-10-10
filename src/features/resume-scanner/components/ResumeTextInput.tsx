import { X } from 'lucide-react'

interface ResumeTextInputProps {
  value: string
  onChange: (value: string) => void
}

export function ResumeTextInput({ value, onChange }: ResumeTextInputProps) {
  return (
    <>
      <textarea
        className="resume-textarea resume-textarea--resume"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste your resume text here..."
        aria-label="Resume text"
      />
      {value ? (
        <button
          type="button"
          className="resume-textarea__clear"
          aria-label="Clear resume text"
          onClick={() => onChange('')}
        >
          <X size={18} strokeWidth={2.3} aria-hidden="true" />
        </button>
      ) : null}
    </>
  )
}
