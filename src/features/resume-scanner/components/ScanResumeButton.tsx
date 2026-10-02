import { Button } from '../../../components/ui/Button/Button'
import { Spinner } from '../../../components/ui/Spinner/Spinner'

interface ScanResumeButtonProps {
  isPending: boolean
}

export function ScanResumeButton({ isPending }: ScanResumeButtonProps) {
  return (
    <Button type="submit" disabled={isPending} className="scan-button">
      {isPending ? <Spinner /> : null}
      {isPending ? 'Scanning Resume...' : 'Scan Resume'}
    </Button>
  )
}
