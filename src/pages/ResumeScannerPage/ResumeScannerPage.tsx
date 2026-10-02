import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card } from '../../components/ui/Card/Card'
import { useAnalyzeResumeMutation } from '../../features/resume-analysis/hooks/useAnalyzeResumeMutation'
import { JobDescriptionInput } from '../../features/resume-scanner/components/JobDescriptionInput'
import { ResumeInput } from '../../features/resume-scanner/components/ResumeInput'
import { ScanResumeButton } from '../../features/resume-scanner/components/ScanResumeButton'
import {
  resumeScannerSchema,
  type ResumeScannerFormValues,
} from '../../features/resume-scanner/schemas/resumeScannerSchema'
import { useResumeStore } from '../../store/resumeStore'

export function ResumeScannerPage() {
  const resumeText = useResumeStore((state) => state.resumeText)
  const jobDescription = useResumeStore((state) => state.jobDescription)
  const resetAnalysis = useResumeStore((state) => state.resetAnalysis)
  const analyzeMutation = useAnalyzeResumeMutation()

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResumeScannerFormValues>({
    resolver: zodResolver(resumeScannerSchema),
    values: { resumeText, jobDescription },
  })

  useEffect(() => {
    resetAnalysis()
  }, [resetAnalysis])

  useEffect(() => {
    setValue('resumeText', resumeText, { shouldValidate: false })
    setValue('jobDescription', jobDescription, { shouldValidate: false })
  }, [jobDescription, resumeText, setValue])

  const onSubmit = (values: ResumeScannerFormValues) => {
    analyzeMutation.mutate({
      resume: values.resumeText,
      job_description: values.jobDescription,
    })
  }

  return (
    <main className="scanner-page">
      <header className="page-heading">
        <h1>Check Your Resume Against a Job Description</h1>
        <span className="page-heading__accent" />
      </header>

      <form className="scanner-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card className="scanner-card">
          <div className="scanner-card__grid" aria-busy={analyzeMutation.isPending}>
            <ResumeInput error={errors.resumeText?.message} />
            <JobDescriptionInput error={errors.jobDescription?.message} />
          </div>
          {analyzeMutation.isPending ? (
            <div className="scan-loader" role="status" aria-live="polite">
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
          ) : null}
          <div className="scanner-card__actions">
            <ScanResumeButton isPending={analyzeMutation.isPending} />
          </div>
        </Card>

        {analyzeMutation.error ? (
          <p className="form-error" role="alert">
            {analyzeMutation.error instanceof Error
              ? analyzeMutation.error.message
              : 'Unable to scan resume. Please try again.'}
          </p>
        ) : null}

        <div className="scanner-actions">
          <p className="privacy-note">
            <LockKeyhole size={17} />
            Your files are only used for this scan and are not stored.
          </p>
        </div>
      </form>
    </main>
  )
}
