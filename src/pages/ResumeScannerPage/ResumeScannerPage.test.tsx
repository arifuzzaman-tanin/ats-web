import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getAccessKeyCookie,
  removeAccessKeyCookie,
} from '../../features/access-key/accessKeyCookie'
import { apiClient } from '../../services/apiClient'
import { useResumeStore } from '../../store/resumeStore'
import { ResumeScannerPage } from './ResumeScannerPage'

function renderScanner() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ResumeScannerPage />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('resume scanner access-key flow', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    removeAccessKeyCookie()
    useResumeStore.getState().resetAll()
    useResumeStore.getState().setResumeText('Experienced software developer')
    useResumeStore.getState().setJobDescription('Looking for a software developer')
  })

  it('waits for Continue and reopens the modal when the response body rejects the key', async () => {
    const post = vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      data: { error: 'Access key is required' },
    })
    renderScanner()

    fireEvent.click(screen.getByRole('button', { name: 'Scan Resume' }))

    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(post).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText('Access key'), { target: { value: 'OLD_KEY' } })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))

    expect(
      await screen.findByText(
        'Access key is required. Please enter a valid access key to continue.',
      ),
    ).toBeInTheDocument()
    expect(post).toHaveBeenCalledTimes(1)
    expect(getAccessKeyCookie()).toBeUndefined()
    expect(useResumeStore.getState().analysisResult).toBeUndefined()
    expect(useResumeStore.getState().isScanAnimationVisible).toBe(false)
  })

  it('fills a free key without scanning until Continue is clicked', async () => {
    const get = vi.spyOn(apiClient, 'get').mockResolvedValueOnce({
      data: { access_key: 'ARIF_100' },
    })
    const post = vi.spyOn(apiClient, 'post').mockResolvedValueOnce({
      data: { error: 'Access key is required' },
    })
    renderScanner()

    fireEvent.click(screen.getByRole('button', { name: 'Scan Resume' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Get an access key free' }))

    await waitFor(() => expect(screen.getByLabelText('Access key')).toHaveValue('ARIF_100'))
    expect(get).toHaveBeenCalledTimes(1)
    expect(post).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    await waitFor(() => expect(post).toHaveBeenCalledTimes(1))
  })

  it('closes the access-key modal from the backdrop and close button', async () => {
    renderScanner()

    fireEvent.click(screen.getByRole('button', { name: 'Scan Resume' }))
    const dialog = await screen.findByRole('dialog')
    fireEvent.mouseDown(dialog.parentElement as HTMLElement)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Scan Resume' }))
    await screen.findByRole('dialog')
    fireEvent.click(screen.getByRole('button', { name: 'Close access key dialog' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('clears the pasted resume text and job description independently', () => {
    renderScanner()

    fireEvent.click(screen.getByRole('button', { name: 'Paste text' }))
    fireEvent.click(screen.getByRole('button', { name: 'Clear resume text' }))

    expect(screen.getByLabelText('Resume text')).toHaveValue('')
    expect(screen.queryByRole('button', { name: 'Clear resume text' })).not.toBeInTheDocument()
    expect(screen.getByLabelText('Job description')).toHaveValue(
      'Looking for a software developer',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Clear job description' }))

    expect(screen.getByLabelText('Job description')).toHaveValue('')
    expect(
      screen.queryByRole('button', { name: 'Clear job description' }),
    ).not.toBeInTheDocument()
  })
})
