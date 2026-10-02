import { FileText } from 'lucide-react'
import { useState } from 'react'
import { useResumeStore } from '../../../store/resumeStore'
import type { ResumeInputMode } from '../../../types/resume'
import { extractResumeText } from '../services/resumeTextExtractor'
import { ResumeInputToggle } from './ResumeInputToggle'
import { ResumeTextInput } from './ResumeTextInput'
import { ResumeUpload } from './ResumeUpload'

interface ResumeInputProps {
  error?: string
}

export function ResumeInput({ error }: ResumeInputProps) {
  const [mode, setMode] = useState<ResumeInputMode>('upload')
  const [fileError, setFileError] = useState('')
  const resumeText = useResumeStore((state) => state.resumeText)
  const uploadedFileName = useResumeStore((state) => state.uploadedFileName)
  const setResumeText = useResumeStore((state) => state.setResumeText)
  const setUploadedFileName = useResumeStore((state) => state.setUploadedFileName)
  const setUploadedFileMetadata = useResumeStore((state) => state.setUploadedFileMetadata)

  const handleFileSelect = async (file: File) => {
    setFileError('')
    setUploadedFileName(file.name)
    setUploadedFileMetadata({ name: file.name, size: file.size, type: file.type })

    try {
      const text = await extractResumeText(file)
      setResumeText(text)
    } catch (caughtError) {
      setFileError(caughtError instanceof Error ? caughtError.message : 'Unable to read file.')
    }
  }

  const handleClearFile = () => {
    setFileError('')
    setUploadedFileName(undefined)
    setUploadedFileMetadata(undefined)
    setResumeText('')
  }

  return (
    <section className="input-section" aria-labelledby="resume-input-title">
      <div className="input-section__heading">
        <span className="input-section__icon input-section__icon--blue">
          <FileText size={26} />
        </span>
        <h2 id="resume-input-title">Your Resume</h2>
      </div>
      <div className="resume-input-shell">
        {mode === 'upload' ? (
          <ResumeUpload
            fileName={uploadedFileName}
            onFileSelect={handleFileSelect}
            onClearFile={handleClearFile}
          />
        ) : (
          <ResumeTextInput value={resumeText} onChange={setResumeText} />
        )}
        <ResumeInputToggle mode={mode} onChange={setMode} />
      </div>
      {fileError ? <p className="field-error">{fileError}</p> : null}
      {error ? <p className="field-error">{error}</p> : null}
    </section>
  )
}
