import mammoth from 'mammoth'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'

GlobalWorkerOptions.workerSrc = pdfWorkerUrl

const SUPPORTED_EXTENSIONS = ['pdf', 'docx', 'txt'] as const

export type SupportedResumeExtension = (typeof SUPPORTED_EXTENSIONS)[number]

function getResumeFileExtension(file: File): SupportedResumeExtension | undefined {
  const extension = file.name.split('.').pop()?.toLowerCase()

  if (!extension || !SUPPORTED_EXTENSIONS.includes(extension as SupportedResumeExtension)) {
    return undefined
  }

  return extension as SupportedResumeExtension
}

export function validateResumeFile(file: File): void {
  if (!getResumeFileExtension(file)) {
    throw new Error('Unsupported file. Please upload a PDF, DOCX, or TXT resume.')
  }
}

async function extractPdfText(file: File): Promise<string> {
  const pdf = await getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise
  const pageTexts: string[] = []

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber)
    const textContent = await page.getTextContent()
    const text = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .trim()

    if (text) pageTexts.push(text)
  }

  return pageTexts.join('\n\n')
}

async function extractDocxText(file: File): Promise<string> {
  const { value } = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })
  return value
}

export async function extractResumeText(file: File): Promise<string> {
  validateResumeFile(file)
  const extension = getResumeFileExtension(file)

  if (file.type.startsWith('text/') || extension === 'txt') {
    return file.text()
  }

  if (extension === 'pdf') {
    return extractPdfText(file)
  }

  if (extension === 'docx') {
    return extractDocxText(file)
  }

  throw new Error('Unsupported file. Please upload a PDF, DOCX, or TXT resume.')
}
