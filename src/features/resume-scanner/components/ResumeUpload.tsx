import { CloudUpload, X } from 'lucide-react'
import { useRef, type DragEvent, type KeyboardEvent, type MouseEvent } from 'react'

interface ResumeUploadProps {
  fileName?: string
  onFileSelect: (file: File) => void
  onClearFile: () => void
}

export function ResumeUpload({ fileName, onFileSelect, onClearFile }: ResumeUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files.item(0)
    if (file) onFileSelect(file)
  }

  const handleClearFile = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (inputRef.current) inputRef.current.value = ''
    onClearFile()
  }

  const stopClearFileKeydown = (event: KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation()
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
      {fileName ? (
        <div className="resume-upload__file">
          <span className="resume-upload__file-name">{fileName}</span>
          <button
            type="button"
            className="resume-upload__clear"
            aria-label="Remove uploaded resume"
            onClick={handleClearFile}
            onKeyDown={stopClearFileKeydown}
          >
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>
      ) : (
        <>
          <p className="resume-upload__title">Drag and drop your resume here</p>
          <p className="resume-upload__meta">or click anywhere to choose a file</p>
        </>
      )}
    </div>
  )
}
