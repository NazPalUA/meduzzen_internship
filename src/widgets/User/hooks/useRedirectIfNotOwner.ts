import { useRouter } from "@navigation"
import { Routes } from "@shared/constants"
import { useEffect } from "react"

export function useRedirectIfNotOwner(isOwner: boolean, userId: number) {
  const router = useRouter()
  const redirectPath = `${Routes.USERS}/${userId}`

  useEffect(() => {
    if (!isOwner) {
      router.push(redirectPath)
    }
  }, [isOwner, redirectPath, router])
}
