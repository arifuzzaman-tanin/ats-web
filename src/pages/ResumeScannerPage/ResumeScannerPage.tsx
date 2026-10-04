import { zodResolver } from '@hookform/resolvers/zod'
import { LockKeyhole } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Card } from '../../components/ui/Card/Card'
import { AccessKeyModal } from '../../features/access-key/AccessKeyModal'
import { requestFreeAccessKey } from '../../features/access-key/accessKeyApi'
import {
  getAccessKeyCookie,
  removeAccessKeyCookie,
  setAccessKeyCookie,
} from '../../features/access-key/accessKeyCookie'
import { isAccessKeyValidationError } from '../../features/resume-analysis/api/resumeAnalysisApi'
import { useAnalyzeResumeMutation } from '../../features/resume-analysis/hooks/useAnalyzeResumeMutation'
import { JobDescriptionInput } from '../../features/resume-scanner/components/JobDescriptionInput'
import { ResumeInput } from '../../features/resume-scanner/components/ResumeInput'
import { ScanResumeButton } from '../../features/resume-scanner/components/ScanResumeButton'
import {
  resumeScannerSchema,
  type ResumeScannerFormValues,
} from '../../features/resume-scanner/schemas/resumeScannerSchema'
import { useResumeStore } from '../../store/resumeStore'
import type { ExtractSkillsRequest } from '../../types/resume'

export function ResumeScannerPage() {
  const resumeText = useResumeStore((state) => state.resumeText)
  const jobDescription = useResumeStore((state) => state.jobDescription)
  const resetAnalysis = useResumeStore((state) => state.resetAnalysis)
  const [accessKey, setAccessKey] = useState('')
  const [accessKeyError, setAccessKeyError] = useState('')
  const [isAccessKeyModalOpen, setIsAccessKeyModalOpen] = useState(false)
  const [isGettingAccessKey, setIsGettingAccessKey] = useState(false)
  const [pendingRequest, setPendingRequest] = useState<ExtractSkillsRequest>()
  const analyzeMutation = useAnalyzeResumeMutation({
    onAccessKeyFailure: () => {
      removeAccessKeyCookie()
      setAccessKey('')
      setAccessKeyError('Access key is required. Please enter a valid access key to continue.')
      setIsAccessKeyModalOpen(true)
    },
  })

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
    const request = {
      resume: values.resumeText,
      job_description: values.jobDescription,
    }

    setPendingRequest(request)

    if (!getAccessKeyCookie()) {
      setAccessKey('')
      setAccessKeyError('')
      setIsAccessKeyModalOpen(true)
      return
    }

    analyzeMutation.mutate(request)
  }

  const handleAccessKeyChange = (value: string) => {
    setAccessKey(value)
    if (accessKeyError) setAccessKeyError('')
  }

  const handleContinue = () => {
    const trimmedAccessKey = accessKey.trim()

    if (!trimmedAccessKey) {
      setAccessKeyError('Access key is required. Please enter a valid access key to continue.')
      return
    }

    if (!pendingRequest) return

    setAccessKeyCookie(trimmedAccessKey)
    setAccessKeyError('')
    setIsAccessKeyModalOpen(false)
    analyzeMutation.mutate(pendingRequest)
  }

  const handleGetAccessKey = async () => {
    setIsGettingAccessKey(true)
    setAccessKeyError('')

    try {
      const freeAccessKey = await requestFreeAccessKey()
      setAccessKey(freeAccessKey)
    } catch {
      setAccessKeyError('Unable to get an access key. Please try again.')
    } finally {
      setIsGettingAccessKey(false)
    }
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
          <div className="scanner-card__actions">
            <ScanResumeButton isPending={analyzeMutation.isPending} />
          </div>
        </Card>

        {analyzeMutation.error && !isAccessKeyValidationError(analyzeMutation.error) ? (
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

      <AccessKeyModal
        accessKey={accessKey}
        error={accessKeyError || undefined}
        isGettingAccessKey={isGettingAccessKey}
        isOpen={isAccessKeyModalOpen}
        onAccessKeyChange={handleAccessKeyChange}
        onContinue={handleContinue}
        onGetAccessKey={handleGetAccessKey}
      />
    </main>
  )
}
