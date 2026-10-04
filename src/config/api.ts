const LOCAL_API_URL = 'http://localhost:5000'
const PRODUCTION_API_URL = 'https://arifuzzamantanin.pythonanywhere.com'

const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim()

export const API_BASE_URL = (
  configuredApiUrl || (import.meta.env.PROD ? PRODUCTION_API_URL : LOCAL_API_URL)
).replace(/\/+$/, '')
