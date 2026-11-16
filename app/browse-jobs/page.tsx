import { AlertTriangle, SearchX } from "lucide-react"
import type { ReactNode } from "react"

import { JobCard } from "@/components/jobs/job-card"
import { JobFilters } from "@/components/jobs/job-filters"
import { JobPagination } from "@/components/jobs/job-pagination"
import { JobSearchBar } from "@/components/jobs/job-search-bar"
import { JobSort } from "@/components/jobs/job-sort"
import { getJobs, type JobsResponse } from "@/lib/api/jobs"
import { jobsQueryString, parseJobFilters } from "@/lib/jobs-search"

type SearchParams = {
  [key: string]: string | string[] | undefined
}

const surfaceClass = "rounded-xl bg-[#141418] ring-1 ring-white/[0.07]"

function NoticeCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <div
      className={`flex flex-col items-center gap-3 px-6 py-14 text-center ${surfaceClass}`}
    >
      <div className="grid size-12 place-items-center rounded-full bg-[#1e1e23] text-[#a0a0ab]">
        {icon}
      </div>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="max-w-sm text-sm text-[#a0a0ab]">{children}</p>
    </div>
  )
}

const BrowseJobs = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  const search = await searchParams
  const filters = parseJobFilters(search)

  let data: JobsResponse | null = null
  let errorMessage: string | null = null

  try {
    data = await getJobs(jobsQueryString(filters))
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Something went wrong."
  }

  const jobs = data?.jobs ?? []

  return (
    <div className="min-h-screen bg-[#0e0e11] pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <JobSearchBar />

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[280px_1fr]">
          <JobFilters counts={data?.counts ?? {}} />

          <div className="min-w-0 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-lg font-semibold text-white sm:text-xl">
                Found {data?.total ?? 0} Professional Jobs
              </h1>
              <JobSort />
            </div>

            {errorMessage ? (
              <NoticeCard
                icon={<AlertTriangle className="size-5" strokeWidth={1.5} />}
                title="Failed to load jobs"
              >
                {errorMessage} Please make sure the API server is running and
                try again.
              </NoticeCard>
            ) : jobs.length === 0 ? (
              <NoticeCard
                icon={<SearchX className="size-5" strokeWidth={1.5} />}
                title="No jobs found"
              >
                Try adjusting your search or removing some filters to see more
                results.
              </NoticeCard>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}

            {data && (
              <JobPagination page={data.page} totalPages={data.totalPages} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowseJobs
