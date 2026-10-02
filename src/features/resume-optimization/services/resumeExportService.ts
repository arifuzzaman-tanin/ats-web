export interface ResumeExportService {
  exportDocx(content: string): Promise<Blob>
  exportPdf(content: string): Promise<Blob>
}

function createTextBlob(content: string, type: string) {
  return new Blob([content], { type })
}

export const resumeExportService: ResumeExportService = {
  async exportDocx(content) {
    return createTextBlob(
      content,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    )
  },
  async exportPdf(content) {
    return createTextBlob(content, 'application/pdf')
  },
}
