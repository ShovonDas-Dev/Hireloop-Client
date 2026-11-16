"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useTransition } from "react"

// Updates the URL query string so the server component refetches.
// Values of null/"" delete the key. Unless `page` is explicitly passed,
// it is dropped so filter/search/sort changes reset to page 1.
export function useUpdateParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  return useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams)

      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value)
        else params.delete(key)
      }

      if (!("page" in updates)) params.delete("page")

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname, searchParams]
  )
}
