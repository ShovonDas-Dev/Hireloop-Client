"use client"

import { Search } from "lucide-react"
import { useSearchParams } from "next/navigation"
import type { FormEvent } from "react"

import { useUpdateParams } from "./use-update-params"

export function JobSearchBar() {
  const searchParams = useSearchParams()
  const updateParams = useUpdateParams()
  const current = searchParams.get("search") ?? ""

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = new FormData(event.currentTarget).get("search")
    updateParams({ search: String(value ?? "").trim() })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl bg-[#141418] p-3 ring-1 ring-white/[0.07] sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <Search
          className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#5a5a60]"
          strokeWidth={2}
        />
        {/* key remounts the input on URL changes so defaultValue stays in sync */}
        <input
          key={current}
          type="search"
          name="search"
          defaultValue={current}
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          className="h-10 w-full rounded-lg bg-transparent pr-4 pl-11 text-sm text-white placeholder:text-[#5a5a60] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="h-10 shrink-0 rounded-lg bg-white px-5 text-sm font-semibold text-[#141418] transition-colors hover:bg-white/90"
      >
        Search Jobs
      </button>
    </form>
  )
}
