"use client"

import { ChevronDown } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { JOB_SORT_OPTIONS } from "@/lib/jobs-search"
import { useUpdateParams } from "./use-update-params"

export function JobSort() {
  const searchParams = useSearchParams()
  const updateParams = useUpdateParams()
  const current = searchParams.get("sort") ?? "newest"

  return (
    <label className="relative flex items-center gap-2 text-sm text-[#a0a0ab]">
      <span className="hidden sm:inline">Sort by:</span>

      <select
        value={current}
        onChange={(event) => updateParams({ sort: event.target.value })}
        aria-label="Sort jobs"
        className="h-9 appearance-none rounded-lg bg-[#141418] py-0 pr-9 pl-3 text-sm text-white ring-1 ring-white/[0.07] outline-none"
      >
        {JOB_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-3 size-4 text-[#a0a0ab]"
        aria-hidden="true"
      />
    </label>
  )
}
