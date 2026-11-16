import type { JobFormData } from "@/types/job"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

// Create Post
export const createJobs = async (data: JobFormData) => {
  const res = await fetch(`${BASE_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => "")
    throw new Error(`Failed to create job: ${res.status} ${errorText}`)
  }

  return await res.json()
}

// Delete Post
export const deleteJobs = async ({ jobId }: { jobId: string }) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const errorText = await res.text().catch(() => "")
    throw new Error(`Failed to delete job: ${res.status} ${errorText}`)
  }

  const data = await res.json().catch(() => null)
  return data
}
