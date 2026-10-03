interface ScanLoaderProps {
  fullscreen?: boolean
}

export function ScanLoader({ fullscreen = false }: ScanLoaderProps) {
  return (
    <div
      className={`scan-loader${fullscreen ? ' scan-loader--fullscreen' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="scan-loader__visual" aria-hidden="true">
        <div className="scan-loader__document">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="scan-loader__beam" />
      </div>
      <div className="scan-loader__copy">
        <strong>Scanning your resume</strong>
        <span>Matching skills and job requirements...</span>
      </div>
    </div>
  )
}
