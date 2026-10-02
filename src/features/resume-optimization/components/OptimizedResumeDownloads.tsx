import { Download } from 'lucide-react'
import { useState } from 'react'
import { resumeExportService } from '../services/resumeExportService'

interface OptimizedResumeDownloadsProps {
  content: string
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

  const handleExport = async (type: 'docx' | 'pdf') => {
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
        <button type="button" onClick={() => void handleExport('docx')}>
          <Download size={18} />
          <span>Download as Word</span>
          <small>.docx</small>
        </button>
        <button type="button" onClick={() => void handleExport('pdf')}>
          <Download size={18} />
          <span>Download as PDF</span>
          <small>.pdf</small>
        </button>
      </div>
      {error ? <p className="field-error">{error}</p> : null}
    </div>
  )
}
