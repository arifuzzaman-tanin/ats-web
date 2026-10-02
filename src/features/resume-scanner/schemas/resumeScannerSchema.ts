import { z } from 'zod'

export const resumeScannerSchema = z.object({
  resumeText: z.string().trim().min(1, 'Please add your resume text.'),
  jobDescription: z.string().trim().min(1, 'Please paste the job description.'),
})

export type ResumeScannerFormValues = z.infer<typeof resumeScannerSchema>
