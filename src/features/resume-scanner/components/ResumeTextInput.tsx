interface ResumeTextInputProps {
  value: string
  onChange: (value: string) => void
}

export function ResumeTextInput({ value, onChange }: ResumeTextInputProps) {
  return (
    <textarea
      className="resume-textarea resume-textarea--resume"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Paste your resume text here..."
      aria-label="Resume text"
    />
  )
}
