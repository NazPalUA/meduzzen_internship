"use client"

import { useCallback, useState } from "react"
import { healthApi } from "../api/health"

export const useHealthCheck = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null)

  const checkHealth = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await healthApi.checkHealth()
      setIsHealthy(response.status === 200)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check health")
      setIsHealthy(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    isLoading,
    error,
    isHealthy,
    checkHealth,
  }
}
