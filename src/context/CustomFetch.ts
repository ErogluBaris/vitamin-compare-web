// src/api/customFetch.ts
import { setGlobalLoading } from './LoadingHandler'

let requestCount = 0

export async function customFetch<TResponse = any>(
  url: string,
  options: RequestInit = {}
): Promise<TResponse> {
  requestCount++
  setGlobalLoading(true)

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`HTTP ${response.status} - ${text}`)
    }

    // Eğer response 204 No Content gibi bir şeyse boş dön
    if (response.status === 204) return {} as TResponse

    return await response.json()
  } catch (err) {
    throw err
  } finally {
    requestCount--
    if (requestCount === 0) setGlobalLoading(false)
  }
}
