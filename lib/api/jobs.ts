const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"

export const getJobs = async () => {
  const response = await fetch(`${BASE_URL}/jobs`)

  if (!response.ok) {
    throw new Error(`Failed to fetch jobs: ${response.status}`)
  }

  const collection = await response.json()
  return collection
}
