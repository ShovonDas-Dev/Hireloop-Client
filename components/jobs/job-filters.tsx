"use client"

import { Check } from "lucide-react"
import { useSearchParams } from "next/navigation"

import type { JobType } from "@/types/job"
import { useUpdateParams } from "./use-update-params"

// Types shown in the sidebar, per the design.
const FILTER_JOB_TYPES: JobType[] = ["Full-time", "Contract", "Freelance"]

function FilterCheckbox({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string
  count: number
  checked: boolean
  onToggle: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1.5">
      <span className="flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="grid size-[18px] place-items-center rounded-md border border-white/15 transition-colors peer-checked:border-[#6c5cf6] peer-checked:bg-[#6c5cf6] [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100"
        >
          <Check className="size-3 text-white" strokeWidth={3} />
        </span>
        <span
          className={`text-sm transition-colors ${checked ? "text-white" : "text-[#a0a0ab]"}`}
        >
          {label}
        </span>
      </span>

      <span className="text-[13px] text-[#5a5a60] tabular-nums">{count}</span>
    </label>
  )
}

export function JobFilters({ counts }: { counts: Record<string, number> }) {
  const searchParams = useSearchParams()
  const updateParams = useUpdateParams()

  const selected = new Set(
    (searchParams.get("jobType") ?? "")
      .split(",")
      .map((type) => type.trim())
      .filter(Boolean)
  )

  const toggle = (type: string) => {
    const next = new Set(selected)
    if (next.has(type)) next.delete(type)
    else next.add(type)

    updateParams({
      jobType: next.size > 0 ? Array.from(next).join(",") : null,
    })
  }

  return (
    <aside className="rounded-xl bg-[#141418] p-5 ring-1 ring-white/[0.07]">
      <h2 className="mb-3 text-base font-semibold text-white">Filters</h2>

      <p className="text-sm font-medium text-[#a0a0ab]">Job Type</p>
      <div className="mt-2">
        {FILTER_JOB_TYPES.map((type) => (
          <FilterCheckbox
            key={type}
            label={type}
            count={counts[type] ?? 0}
            checked={selected.has(type)}
            onToggle={() => toggle(type)}
          />
        ))}
      </div>
    </aside>
  )
}
