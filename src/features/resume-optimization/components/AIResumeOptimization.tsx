import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CircleAlert, CircleCheck, Sparkles, X } from 'lucide-react'
import { Button } from '../../../components/ui/Button/Button'
import { useResumeStore } from '../../../store/resumeStore'
import { OptimizedResumeDownloads } from './OptimizedResumeDownloads'

export function AIResumeOptimization() {
  const [isUnavailableModalOpen, setIsUnavailableModalOpen] = useState(false)
  const optimizeButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const optimizedResume = useResumeStore((state) => state.optimizedResume)

  useEffect(() => {
    if (!isUnavailableModalOpen) return

    const optimizeButton = optimizeButtonRef.current
    closeButtonRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsUnavailableModalOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      optimizeButton?.focus()
    }
  }, [isUnavailableModalOpen])

  return (
    <div className="ai-tab">
      <div className="ai-tab__intro">
        <h2>Optimize Your Resume Using AI</h2>
        <p>
          Let AI enhance your resume by adding relevant missing skills, improving content, and
          making it ATS-friendly based on the job description.
        </p>
      </div>

      <div className="ai-tab__workspace">
        <div className="ai-tab__action-column">
          <ul className="benefits-list">
            <li><CircleCheck size={20} />Add missing skills from the job description</li>
            <li><CircleCheck size={20} />Make your resume ATS-friendly</li>
            <li><CircleCheck size={20} />Improve content and structure</li>
            <li><CircleCheck size={20} />Keep your original experience and tone</li>
          </ul>
          <Button
            ref={optimizeButtonRef}
            type="button"
            className="ai-tab__optimize-button"
            icon={<Sparkles size={20} />}
            onClick={() => setIsUnavailableModalOpen(true)}
          >
            Optimize My Resume
            <ArrowRight size={20} />
          </Button>
        </div>

        <OptimizedResumeDownloads content={optimizedResume} />
      </div>

      {isUnavailableModalOpen ? (
        <div
          className="service-modal__backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsUnavailableModalOpen(false)
          }}
        >
          <section
            className="service-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            aria-describedby="service-modal-description"
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="service-modal__close"
              aria-label="Close"
              onClick={() => setIsUnavailableModalOpen(false)}
            >
              <X size={20} />
            </button>
            <div className="service-modal__icon" aria-hidden="true">
              <CircleAlert size={30} />
            </div>
            <h2 id="service-modal-title">AI resume generation is unavailable</h2>
            <p id="service-modal-description">
              This service is currently disabled. Please check back later or use the Prompt
              Builder to improve your resume in the meantime.
            </p>
            <Button type="button" onClick={() => setIsUnavailableModalOpen(false)}>
              Got it
            </Button>
          </section>
        </div>
      ) : null}
    </div>
  )
}
