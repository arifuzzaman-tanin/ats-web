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
          <div className="scan-loader__document-header">
            <span className="scan-loader__avatar" />
            <div>
              <span />
              <span />
            </div>
          </div>
          <div className="scan-loader__document-lines">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="scan-loader__beam">
            <span />
          </div>
        </div>
        <div className="scan-loader__corners">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="scan-loader__copy">
        <strong>Scanning your resume</strong>
        <span>Matching skills and job requirements...</span>
        <div className="scan-loader__steps" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}
