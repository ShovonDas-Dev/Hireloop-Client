import Link from "next/link"
import {
  Briefcase,
  ChevronRight,
  Code,
  MapPin,
  Megaphone,
  Palette,
  Plus,
  Users,
} from "lucide-react"

import { getJobs } from "@/lib/api/jobs"
import type { JobPost } from "@/types/job"
import Button from "./Button"

const CATEGORY_COLORS: Record<string, string> = {
  "Engineering & Tech": "text-[#38bdf8]",
  "Design & Creative": "text-[#f97316]",
  Marketing: "text-[#c3c0ff]",
  Sales: "text-[#4ade80]",
  "Customer Support": "text-[#38bdf8]",
  Finance: "text-[#818cf8]",
  Other: "text-[#a0a0ab]",
}

const CATEGORY_ICONS: Record<string, typeof Code> = {
  "Engineering & Tech": Code,
  "Design & Creative": Palette,
  Marketing: Megaphone,
  Sales: Briefcase,
  "Customer Support": Briefcase,
  Finance: Briefcase,
  Other: Briefcase,
}

const formatLocation = (job: JobPost) =>
  job.isRemote ? `Remote (${job.location})` : job.location

const formatSalary = (job: JobPost) => {
  const unit = job.frequency === "per year" ? "k" : ""
  const period = job.frequency.replace("per ", "")
  return `€${job.minSalary}${unit} – €${job.maxSalary}${unit} / ${period}`
}

const isExpired = (deadline: string) =>
  new Date(deadline) < new Date(new Date().toDateString())

const formatDate = (deadline: string) =>
  new Date(deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

const headerCellClass =
  "px-5 py-3.5 text-left text-xs font-semibold tracking-wide text-[#a0a0ab] uppercase whitespace-nowrap"

const bodyCellClass = "px-5 py-4 whitespace-nowrap"

export default async function ManageJobs() {
  const { jobs: JOBS } = await getJobs()

  return (
    <div className="min-h-screen w-full bg-[#131314] text-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-[13px]">
              <span className="text-[#a0a0ab]">Manage Jobs</span>
              <ChevronRight className="h-3 w-3 text-[#a0a0ab]" />
              <span className="font-medium text-[#c3c0ff]">
                Job Listings &amp; Postings
              </span>
            </div>
            <h1 className="text-2xl font-medium text-white sm:text-[32px] sm:leading-tight">
              Manage Job Posts
            </h1>
            <p className="text-sm text-[#a0a0ab]">
              Review live listings, monitor applicants, and update job details
              across your organization.
            </p>
          </div>
          <Link
            href="/dashboard/recruiter/add-job"
            className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#5c53fe] px-5 text-sm font-medium text-white transition-colors hover:bg-[#4a42e8]"
          >
            <Plus className="h-4 w-4" />
            New Job Post
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#232327] bg-[#151516]">
          <table className="w-full min-w-[960px] text-left">
            <thead className="border-b border-[#232327] bg-[#0b0b0c]">
              <tr>
                <th className={headerCellClass}>Job Title &amp; Dept</th>
                <th className={headerCellClass}>Company &amp; Location</th>
                <th className={headerCellClass}>Type</th>
                <th className={headerCellClass}>Compensation</th>
                <th className={headerCellClass}>Applicants</th>
                <th className={headerCellClass}>Status</th>
                <th className={headerCellClass}>Deadline</th>
                <th className={`${headerCellClass} pr-6`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232327]">
              {JOBS.map((job: JobPost) => {
                const expired = isExpired(job.deadline)
                const Icon = CATEGORY_ICONS[job.category] ?? Briefcase
                return (
                  <tr key={job._id}>
                    <td className={bodyCellClass}>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                          <Icon className="h-5 w-5 text-[#5c53fe]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {job.jobTitle}
                          </p>
                          <p
                            className={`text-[11px] font-medium ${
                              CATEGORY_COLORS[job.category] ?? "text-[#a0a0ab]"
                            }`}
                          >
                            {job.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={bodyCellClass}>
                      <p className="text-[13px] font-medium text-white">
                        {job.companyName}
                      </p>
                      <p className="flex items-center gap-1.5 text-xs text-[#a0a0ab]">
                        <MapPin className="h-3.5 w-3.5" />
                        {formatLocation(job)}
                      </p>
                    </td>
                    <td className={bodyCellClass}>
                      <span className="inline-flex items-center rounded-full border border-[#232327] bg-[#1f1f1f] px-2.5 py-1 text-[11px] font-medium text-[#d4d4d8]">
                        {job.jobType}
                      </span>
                    </td>
                    <td className={bodyCellClass}>
                      <span className="text-[13px] font-medium text-white">
                        {formatSalary(job)}
                      </span>
                    </td>
                    <td className={bodyCellClass}>
                      <span
                        className={`flex items-center gap-1.5 text-[13px] font-semibold ${
                          job.applicants >= 10
                            ? "text-[#c3c0ff]"
                            : "text-[#d4d4d8]"
                        }`}
                      >
                        <Users className="h-4 w-4" />
                        {job.applicants} Candidates
                      </span>
                    </td>
                    <td className={bodyCellClass}>
                      {expired ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1f1f1f] px-2.5 py-1 text-[11px] font-medium text-[#a0a0ab]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#5a5a60]" />
                          Expired
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#14532d] px-2.5 py-1 text-[11px] font-medium text-[#4ade80]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                          Active
                        </span>
                      )}
                    </td>
                    <td className={bodyCellClass}>
                      <p
                        className={`text-[13px] font-medium ${
                          expired ? "text-[#a0a0ab]" : "text-white"
                        }`}
                      >
                        {formatDate(job.deadline)}
                      </p>
                      <p className="text-[11px] text-[#5a5a60]">
                        {expired ? "Closed" : job.postedAt}
                      </p>
                    </td>
                    <td className={`${bodyCellClass} pr-6`}>
                      <Button jobId={job._id} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
