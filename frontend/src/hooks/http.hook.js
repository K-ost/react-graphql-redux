import { useState, useCallback } from 'react'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null) => {
    setLoading(true)
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await response.json()

      if ( !response.ok ) {
        setError(data)
      }
      setLoading(false)
      return data
    } catch(e) {
      setLoading(false)
      setError(e)
    }
  }, [])

  const cleanError = useCallback(() => setError(null), [])

  return { request, loading, error, cleanError }
}