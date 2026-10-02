import { CloudUpload } from 'lucide-react'
import { useRef, type DragEvent } from 'react'

interface ResumeUploadProps {
  fileName?: string
  onFileSelect: (file: File) => void
}

export function ResumeUpload({ fileName, onFileSelect }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files.item(0)
    if (file) onFileSelect(file)
  }

  return (
    <div
      className="resume-upload"
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click()
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      aria-label="Upload resume file"
    >
      <input
        ref={inputRef}
        className="visually-hidden"
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={(event) => {
          const file = event.target.files?.item(0)
          if (file) onFileSelect(file)
        }}
      />
      <div className="resume-upload__icon">
        <CloudUpload size={54} strokeWidth={1.7} />
      </div>
      <p className="resume-upload__title">
        {fileName ? fileName : 'Drag and drop your resume here'}
      </p>
      <p className="resume-upload__meta">
        {fileName ? 'File selected' : 'or click anywhere to choose a file'}
      </p>
    </div>
  )
}
