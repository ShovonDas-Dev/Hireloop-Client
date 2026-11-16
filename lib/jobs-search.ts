// Shared contract between the browse-jobs page, its filter UI, and the
// jobs API: URL/searchParams parsing, the query string sent to the backend,
// and formatting helpers for job fields.

import { JOB_TYPES, type JobPost, type JobType } from "@/types/job"

// Sort tokens sent to the backend as ?sort=*
export const JOB_SORTS = ["recent", "oldest", "salary", "relevant"] as const
export type JobSort = (typeof JOB_SORTS)[number]

export const JOB_SORT_OPTIONS: { value: JobSort; label: string }[] = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "salary", label: "Highest Salary" },
  { value: "relevant", label: "Most Relevant" },
]

// Filter state as parsed from the URL (?search=&jobType=Full-time&...)
export type JobFilterValues = {
  search: string
  jobTypes: JobType[]
  category: string // empty string = all categories
  remoteOnly: boolean
  sort: JobSort
}

const DEFAULT_FILTERS: JobFilterValues = {
  search: "",
  jobTypes: [],
  category: "",
  remoteOnly: false,
  sort: "recent",
}

type RawParams = Record<string, string | string[] | undefined>

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

export function parseJobFilters(params: RawParams): JobFilterValues {
  const values = { ...DEFAULT_FILTERS }

  const search = first(params.search)
  if (search) values.search = search

  const jobTypes = params.jobType
    ? Array.isArray(params.jobType)
      ? params.jobType
      : [params.jobType]
    : []
  values.jobTypes = jobTypes.filter((type) =>
    (JOB_TYPES as string[]).includes(type)
  )

  const category = first(params.category)
  if (category) values.category = category

  if (first(params.remote) === "1") values.remoteOnly = true

  return values
}

export function parseJobPage(params: RawParams, totalPages: number): number {
  const page = Number(first(params.page))
  if (!Number.isInteger(page) || page < 1) return 1
  return totalPages > 0 ? Math.min(page, totalPages) : 1
}

// Query string for GET /jobs — repeated jobType keys, empty values omitted.
// Pagination is applied on the client, so ?page= is not sent.
export function jobsQueryString(filters: JobFilterValues): string {
  const params = new URLSearchParams()

  if (filters.search) params.set("search", filters.search)
  filters.jobTypes.forEach((type) => params.append("jobType", type))
  if (filters.category) params.set("category", filters.category)
  if (filters.remoteOnly) params.set("remote", "1")
  params.set("sort", filters.sort)

  return params.toString()
}

// Pager: pages to render, with `null` entries marking an ellipsis gap.
export function paginationPages(page: number, totalPages: number): (number | null)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const keep = new Set<number>([1, totalPages])
  for (let p = page - 1; p <= page + 1; p++) {
    if (p > 1 && p < totalPages) keep.add(p)
  }

  const pages = [...keep].sort((a, b) => a - b)
  const pageList: (number | null)[] = []
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) pageList.push(null)
    pageList.push(p)
  })
  return pageList
}

// --- Display helpers ---

export const formatJobLocation = (job: JobPost) =>
  job.isRemote ? `Remote (${job.location})` : job.location

export function formatSalaryRange(job: JobPost): string {
  const min = Number(job.minSalary)
  const max = Number(job.maxSalary)
  const unit = job.frequency === "per year" ? "k" : ""

  const range = `$${min}${unit} - $${max}${unit}`
  return job.frequency === "per year"
    ? range
    : `${range} / ${job.frequency.replace("per ", "")}`
}
