// Shared job types, option lists, and API shapes used by recruiter pages,
// job forms, and the jobs API layer.

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type JobCategory =
  | "Engineering & Tech"
  | "Design & Creative"
  | "Marketing"
  | "Sales"
  | "Customer Support"
  | "Finance"
  | "Other"

export type SalaryFrequency = "per hour" | "per month" | "per year"

export interface JobFormData {
  jobTitle: string
  companyName: string
  category: JobCategory | ""
  jobType: JobType
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: SalaryFrequency
  responsibilities: string
  requirements: string
}

export type JobPost = JobFormData & {
  _id: string
  applicants: number
  postedAt: string
}

// Option lists
export const JOB_TYPES: JobType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
]

export const JOB_CATEGORIES: JobCategory[] = [
  "Engineering & Tech",
  "Design & Creative",
  "Marketing",
  "Sales",
  "Customer Support",
  "Finance",
  "Other",
]

export const FREQUENCIES: SalaryFrequency[] = [
  "per hour",
  "per month",
  "per year",
]
