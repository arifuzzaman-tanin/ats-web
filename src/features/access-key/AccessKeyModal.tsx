import { ArrowRight, Gift, KeyRound, ShieldCheck } from 'lucide-react'
import { useEffect, useRef, type FormEvent } from 'react'
import { Button } from '../../components/ui/Button/Button'
import { Spinner } from '../../components/ui/Spinner/Spinner'

interface AccessKeyModalProps {
  accessKey: string
  error?: string
  isGettingAccessKey: boolean
  isOpen: boolean
  onAccessKeyChange: (accessKey: string) => void
  onContinue: () => void
  onGetAccessKey: () => void
}

export function AccessKeyModal({
  accessKey,
  error,
  isGettingAccessKey,
  isOpen,
  onAccessKeyChange,
  onContinue,
  onGetAccessKey,
}: AccessKeyModalProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onContinue()
  }

  return (
    <div className="access-key-modal" role="presentation">
      <section
        className="access-key-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="access-key-title"
        aria-describedby="access-key-description"
      >
        <div className="access-key-modal__intro">
          <span className="access-key-modal__icon" aria-hidden="true">
            <KeyRound size={26} strokeWidth={2.2} />
          </span>
          <div>
            <span className="access-key-modal__eyebrow">One last step</span>
            <h2 id="access-key-title">Unlock your resume scan</h2>
            <p id="access-key-description">
              Enter your access key to continue. Don&apos;t have one yet? Get one free below.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="access-key-modal__label-row">
            <label htmlFor="access-key">Access key</label>
            <span>Required</span>
          </div>
          <div className="access-key-modal__input-wrap">
            <KeyRound size={19} aria-hidden="true" />
            <input
              ref={inputRef}
              id="access-key"
              name="access-key"
              type="text"
              value={accessKey}
              onChange={(event) => onAccessKeyChange(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'access-key-error' : 'access-key-hint'}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Paste your key here"
            />
          </div>
          {error ? (
            <p id="access-key-error" className="access-key-modal__error" role="alert">
              {error}
            </p>
          ) : (
            <p id="access-key-hint" className="access-key-modal__hint">
              <ShieldCheck size={15} aria-hidden="true" />
              Your key is saved securely on this device.
            </p>
          )}

          <div className="access-key-modal__actions">
            <Button type="submit" icon={<ArrowRight size={18} aria-hidden="true" />}>
              Continue
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onGetAccessKey}
              disabled={isGettingAccessKey}
              icon={isGettingAccessKey ? <Spinner /> : <Gift size={19} aria-hidden="true" />}
            >
              {isGettingAccessKey ? 'Getting key...' : 'Get an access key free'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
