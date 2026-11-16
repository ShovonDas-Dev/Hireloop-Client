import { Banknote, Bookmark, Briefcase, Globe, MapPin } from "lucide-react"
import type { ReactNode } from "react"

import { formatJobLocation, formatSalaryRange } from "@/lib/jobs-search"
import type { JobPost } from "@/types/job"

// Shared surface look: soft border + dark fill used by both cards.
const surfaceClass = "bg-[#141418] ring-1 ring-white/[0.07] rounded-xl"
// Coin/contact badge look from the design: dark pill with 10% border.
const badgeClass =
  "flex h-[30px] items-center gap-2 rounded-lg bg-[#1a1a1f] px-3 text-[13px] font-medium text-[#ededef] ring-1 ring-white/10 [&_svg]:shrink-0 [&_svg]:text-[#e5e2e3]"

function JobBadge({ children }: { children: ReactNode }) {
  return <span className={badgeClass}>{children}</span>
}

export function JobCard({ job }: { job: JobPost }) {
  const initials = job.companyName
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <article className={`flex gap-5 p-6 ${surfaceClass}`}>
      <div
        aria-hidden="true"
        className="grid size-16 shrink-0 place-items-center rounded-lg bg-[#222228] text-lg font-semibold text-[#a0a0ab] ring-1 ring-white/10"
      >
        {initials || "?"}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-[#ededef] sm:text-[22px] sm:leading-7">
              {job.jobTitle}
            </h3>
            <p className="text-base font-semibold text-[#6e6e78]">
              {job.companyName} <span aria-hidden="true">•</span>{" "}
              <MapPin className="inline size-4" aria-hidden="true" />{" "}
              {formatJobLocation(job)}
            </p>
          </div>

          <button
            type="button"
            aria-label={`Save ${job.jobTitle} to saved jobs`}
            className="grid size-10 shrink-0 place-items-center rounded-lg text-[#8e9192] transition-colors hover:bg-white/5 hover:text-white"
          >
            <Bookmark className="size-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <JobBadge>
            <Banknote className="size-3.5" strokeWidth={1.5} />
            {formatSalaryRange(job)}
          </JobBadge>
          <JobBadge>
            <Briefcase className="size-3.5" strokeWidth={1.5} />
            {job.jobType}
          </JobBadge>
          {job.isRemote && (
            <JobBadge>
              <Globe className="size-3.5" strokeWidth={1.5} />
              Remote
            </JobBadge>
          )}
        </div>
      </div>
    </article>
  )
}
