import { Download, FileText, Info } from 'lucide-react'
import { useState } from 'react'
import { resumeExportService } from '../services/resumeExportService'

interface OptimizedResumeDownloadsProps {
  content?: string
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

export function OptimizedResumeDownloads({ content }: OptimizedResumeDownloadsProps) {
  const [error, setError] = useState('')
  const isReady = Boolean(content)

  const handleExport = async (type: 'docx' | 'pdf') => {
    if (!content) return
    setError('')
    try {
      const blob =
        type === 'docx'
          ? await resumeExportService.exportDocx(content)
          : await resumeExportService.exportPdf(content)
      downloadBlob(blob, `optimized-resume.${type}`)
    } catch {
      setError('Unable to export resume. Please try again.')
    }
  }

  return (
    <div className="download-area">
      <h3>Optimized Resume Output</h3>
      <div className="download-area__grid">
        <button
          type="button"
          className="download-area__button download-area__button--word"
          disabled={!isReady}
          onClick={() => void handleExport('docx')}
        >
          <span className="download-area__file-icon"><FileText size={22} /></span>
          <span className="download-area__label">
            <strong>Download as Word</strong>
            <small>.docx (Recommended)</small>
          </span>
          <Download className="download-area__download-icon" size={21} />
        </button>
        <button
          type="button"
          className="download-area__button download-area__button--pdf"
          disabled={!isReady}
          onClick={() => void handleExport('pdf')}
        >
          <span className="download-area__file-icon"><FileText size={22} /></span>
          <span className="download-area__label">
            <strong>Download as PDF</strong>
            <small>.pdf (ATS Friendly)</small>
          </span>
          <Download className="download-area__download-icon" size={21} />
        </button>
      </div>
      <p className={`download-area__hint${isReady ? ' download-area__hint--ready' : ''}`}>
        <Info size={20} />
        <span>
          {isReady ? (
            <>
              Both files include the AI-optimized version with improved content and missing skills
              added. <strong>AI-generated content, please review it manually before use.</strong>
            </>
          ) : (
            'Available after Generate with AI.'
          )}
        </span>
      </p>
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  )
}
