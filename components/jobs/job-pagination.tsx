"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { paginationPages } from "@/lib/jobs-search"
import { useUpdateParams } from "./use-update-params"

const pageButtonClass =
  "grid size-9 place-items-center rounded-lg text-sm transition-colors"

export function JobPagination({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) {
  const updateParams = useUpdateParams()

  if (totalPages <= 1) return null

  const pages = paginationPages(page, totalPages)
  const goTo = (target: number) => updateParams({ page: String(target) })

  return (
    <nav
      aria-label="Job listing pagination"
      className="flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
        className={`${pageButtonClass} text-[#a0a0ab] hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40`}
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((item, index) =>
        item === null ? (
          <span
            key={`gap-${index}`}
            className="px-1 text-sm text-[#5a5a60]"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => goTo(item)}
            aria-current={item === page ? "page" : undefined}
            className={`${pageButtonClass} ${
              item === page
                ? "bg-white font-semibold text-[#141418]"
                : "text-[#a0a0ab] hover:bg-white/5 hover:text-white"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={`${pageButtonClass} text-[#a0a0ab] hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40`}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
