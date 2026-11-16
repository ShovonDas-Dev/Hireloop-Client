import type { JobPost } from "@/types/job"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Shape returned by GET /jobs
export type JobsResponse = {
  jobs: JobPost[]
  total: number
  page: number
  totalPages: number
  counts?: Record<string, number>
}

export const getJobs = async (query = ""): Promise<JobsResponse> => {
  const response = await fetch(`${BASE_URL}/jobs?${query}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status}`)
  }

  const collection: JobsResponse = await response.json()
  return collection
}
