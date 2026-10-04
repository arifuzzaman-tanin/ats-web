export const ACCESS_KEY_COOKIE_NAME = 'access_key'

export function getAccessKeyCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined

  const prefix = `${ACCESS_KEY_COOKIE_NAME}=`
  const cookie = document.cookie
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith(prefix))

  if (!cookie) return undefined

  try {
    return decodeURIComponent(cookie.slice(prefix.length)) || undefined
  } catch {
    return undefined
  }
}

export function setAccessKeyCookie(accessKey: string) {
  if (typeof document === 'undefined') return

  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ACCESS_KEY_COOKIE_NAME}=${encodeURIComponent(accessKey)}; Path=/; Max-Age=2592000; SameSite=Lax${secure}`
}

export function removeAccessKeyCookie() {
  if (typeof document === 'undefined') return

  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${ACCESS_KEY_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax${secure}`
}
