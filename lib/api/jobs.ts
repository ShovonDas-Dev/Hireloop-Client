const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = "") => {
  const response = await fetch(`${BASE_URL}/jobs?${query}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status}`)
  }

  const collection = await response.json()
  return collection
}
