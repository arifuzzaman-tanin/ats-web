import { FileText } from 'lucide-react'
import { useResumeStore } from '../../../store/resumeStore'

interface JobDescriptionInputProps {
  error?: string
}

export function JobDescriptionInput({ error }: JobDescriptionInputProps) {
  const jobDescription = useResumeStore((state) => state.jobDescription)
  const setJobDescription = useResumeStore((state) => state.setJobDescription)

  return (
    <section className="input-section" aria-labelledby="job-description-title">
      <div className="input-section__heading">
        <span className="input-section__icon input-section__icon--green">
          <FileText size={26} />
        </span>
        <h2 id="job-description-title">Job Description</h2>
      </div>
      <textarea
        className="resume-textarea resume-textarea--job"
        value={jobDescription}
        onChange={(event) => setJobDescription(event.target.value)}
        placeholder="Paste the job description here..."
        aria-label="Job description"
      />
      {error ? <p className="field-error">{error}</p> : null}
    </section>
  )
}
