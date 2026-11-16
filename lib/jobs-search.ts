// Shared contract between the browse-jobs page, its filter UI, and the
// jobs API: URL/searchParams parsing, the query string sent to the backend,
// and formatting helpers for job fields.

import { JOB_TYPES, type JobPost, type JobType } from "@/types/job"

// Jobs per page — sent to the backend as ?limit=
export const JOBS_PER_PAGE = 6

// Sort tokens sent to the backend as ?sort=*
export const JOB_SORTS = ["newest", "oldest", "salary"] as const
export type JobSort = (typeof JOB_SORTS)[number]

export const JOB_SORT_OPTIONS: { value: JobSort; label: string }[] = [
  { value: "newest", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "salary", label: "Highest Salary" },
]

// Filter state as parsed from the URL (?search=&jobType=Full-time,Contract&...)
export type JobFilterValues = {
  search: string
  jobTypes: JobType[]
  sort: JobSort
  page: number
}

const DEFAULT_FILTERS: JobFilterValues = {
  search: "",
  jobTypes: [],
  sort: "newest",
  page: 1,
}

type RawParams = Record<string, string | string[] | undefined>

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

export function parseJobFilters(params: RawParams): JobFilterValues {
  const values = { ...DEFAULT_FILTERS }

  const search = first(params.search)
  if (search) values.search = search

  // jobType is stored comma-separated in the URL (?jobType=Full-time,Contract)
  const jobType = first(params.jobType)
  if (jobType) {
    values.jobTypes = jobType
      .split(",")
      .map((type) => type.trim())
      .filter((type): type is JobType =>
        (JOB_TYPES as readonly string[]).includes(type)
      )
  }

  const sort = first(params.sort)
  if (sort && (JOB_SORTS as readonly string[]).includes(sort)) {
    values.sort = sort as JobSort
  }

  const page = Number(first(params.page))
  if (Number.isInteger(page) && page > 1) values.page = page

  return values
}

// Query string for GET /jobs — includes pagination and sort.
export function jobsQueryString(filters: JobFilterValues): string {
  const params = new URLSearchParams()

  if (filters.search) params.set("search", filters.search)
  if (filters.jobTypes.length > 0) {
    params.set("jobType", filters.jobTypes.join(","))
  }
  params.set("sort", filters.sort)
  params.set("page", String(filters.page))
  params.set("limit", String(JOBS_PER_PAGE))

  return params.toString()
}

// Pager: pages to render, with `null` entries marking an ellipsis gap.
export function paginationPages(
  page: number,
  totalPages: number
): (number | null)[] {
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
  job.isRemote ? `${job.location} (Remote)` : job.location

export function formatSalaryRange(job: JobPost): string {
  const min = Number(job.minSalary)
  const max = Number(job.maxSalary)
  const unit = job.frequency === "per year" ? "k" : ""

  const range = `$${min}${unit} - $${max}${unit}`
  return job.frequency === "per year"
    ? range
    : `${range} / ${job.frequency.replace("per ", "")}`
}
