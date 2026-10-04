import { z } from 'zod'
import { apiClient } from '../../services/apiClient'
import { API_ENDPOINTS } from '../../services/endpoints'

const accessKeyResponseSchema = z.object({
  access_key: z.string().trim().min(1),
})

export async function requestFreeAccessKey(): Promise<string> {
  const response = await apiClient.get<unknown>(API_ENDPOINTS.accessKey)
  return accessKeyResponseSchema.parse(response.data).access_key
}
