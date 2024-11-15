import { useRouter } from "@navigation"
import { Routes } from "@shared/constants"
import { useEffect } from "react"

export function useRedirectIfNoPermission(condition: boolean, companyId: number) {
  const router = useRouter()
  const redirectPath = `${Routes.COMPANIES}/${companyId}`

  useEffect(() => {
    if (condition) {
      router.push(redirectPath)
    }
  }, [condition, redirectPath, router])
}
