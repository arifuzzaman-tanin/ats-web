import { CheckCircle2, CloudUpload, File, FileText, FileType, X } from 'lucide-react'
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

  if (fileName) {
    const extension = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()
    const fileType = extension === 'pdf' ? 'pdf'
      : extension === 'doc' || extension === 'docx' ? 'word'
      : extension === 'txt' ? 'text' : 'other'
    const FileIcon = fileType === 'pdf' ? FileType : fileType === 'word' ? FileText : File
    const formatLabel = fileType === 'pdf' ? 'PDF'
      : fileType === 'word' ? 'WORD' : fileType === 'text' ? 'TXT' : ''

    return (
      <div className="resume-upload resume-upload--selected" aria-label="Selected resume file">
        <div className="resume-upload__selected-card">
          <span
            className={`resume-upload__selected-icon resume-upload__selected-icon--${fileType}`}
            role="img"
            aria-label={formatLabel ? `${formatLabel} file` : 'File'}
          >
            <FileIcon size={26} strokeWidth={1.9} aria-hidden="true" />
            {formatLabel ? <span className="resume-upload__format" aria-hidden="true">{formatLabel}</span> : null}
          </span>
          <div className="resume-upload__selected-copy">
            <span className="resume-upload__selected-label">
              <CheckCircle2 size={17} strokeWidth={2.3} />
              Resume selected
            </span>
            <span className="resume-upload__file-name">{fileName}</span>
          </div>
          <button
            type="button"
            className="resume-upload__clear"
            aria-label="Remove uploaded resume"
            onClick={handleClearFile}
            onKeyDown={stopClearFileKeydown}
          >
            <X size={18} strokeWidth={2.3} />
          </button>
        </div>
      </div>
    )
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
      <p className="resume-upload__title">Drag and drop your resume here</p>
      <p className="resume-upload__meta">or click anywhere to choose a file</p>
    </div>
  )
}
