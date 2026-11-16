"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"

import {
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Globe,
  MapPin,
  Send,
} from "lucide-react"
import { toast } from "@/components/ui/toast"
import { createJobs } from "@/lib/acction/jobs"
import {
  jobInputClass as inputClass,
  jobLabelClass as labelClass,
  jobTextareaClass as textareaClass,
} from "@/lib/form-styles"
import {
  FREQUENCIES,
  JOB_CATEGORIES,
  JOB_TYPES,
  type JobFormData,
  type JobType,
} from "@/types/job"

// Initial Form
const initialForm: JobFormData = {
  jobTitle: "",
  companyName: "",
  category: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  requirements: "",
}

export default function AddJob() {
  const [form, setForm] = useState<JobFormData>(initialForm)
  const [submitting, setSubmitting] = useState<boolean>(false)

  // Handle Input Changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle Job Type
  const handleJobType = (type: JobType): void => {
    setForm((prev) => ({
      ...prev,
      jobType: type,
    }))
  }

  // Handle Remote Toggle
  const handleRemoteToggle = (): void => {
    setForm((prev) => ({
      ...prev,
      isRemote: !prev.isRemote,
    }))
  }

  // Handle Form Submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await createJobs(form)

      toast.add({
        title: "Job published successfully!",
        description: "Your job listing is now live.",
        type: "success",
      })
      setForm({ ...initialForm })
    } catch (err) {
      console.error(err)
      toast.add({
        title: "Failed to publish job",
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
        type: "error",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen w-full bg-[#131314] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 border-b border-[#2a2a2b] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium">
              <span className="text-[#a0a0ab]">Manage Jobs</span>
              <ChevronRight className="h-3 w-3 text-[#5a5a60]" />
              <span className="text-[#c3c0ff]">Create New Listing</span>
            </div>

            <h1 className="text-2xl font-medium text-white sm:text-[32px] sm:leading-tight">
              Post a New Job
            </h1>

            <p className="text-[13px] text-[#a0a0ab]">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#5c53fe] px-6 text-sm font-medium text-white transition-colors hover:bg-[#4a42e8] disabled:opacity-60 sm:shrink-0"
          >
            {submitting ? "Publishing..." : "Publish Job"}
            <Send className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Section 1: Basic Information */}
          <section className="space-y-5 rounded-2xl bg-[#151516] p-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#5c53fe]" />
              <h2 className="text-base font-medium text-white">
                1. Basic Information
              </h2>
            </div>

            {/* Job Title */}
            <div className="space-y-1.5">
              <label htmlFor="jobTitle" className={labelClass}>
                Job Title *
              </label>

              <input
                id="jobTitle"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                required
                placeholder="Frontend Developer"
                className={inputClass}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label htmlFor="companyName" className={labelClass}>
                  Company Name *
                </label>

                <div className="relative">
                  <Building2 className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#a0a0ab]" />

                  <input
                    id="companyName"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                    placeholder="HirePulse Network"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Job Category */}
              <div className="space-y-1.5">
                <label htmlFor="category" className={labelClass}>
                  Job Category *
                </label>

                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>

                    {JOB_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#a0a0ab]" />
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-1.5">
              <span className={labelClass}>Job Type *</span>

              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {JOB_TYPES.map((type) => {
                  const isActive = form.jobType === type

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleJobType(type)}
                      className={`h-11 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "border border-[#5c53fe] bg-[#232327] text-white"
                          : "border border-transparent bg-[#1e1e21] text-[#a0a0ab] hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Section 2: Location & Salary */}
          <section className="space-y-5 rounded-2xl bg-[#151516] p-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#5c53fe]" />

              <h2 className="text-base font-medium text-white">
                2. Location, Compensation &amp; Timeline
              </h2>
            </div>

            {/* Remote Toggle */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-[#232327] bg-[#1e1e21] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                  <Globe className="h-4 w-4 text-[#c3c0ff]" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Remote Work Allowed (isRemote)
                  </p>

                  <p className="text-[13px] text-[#a0a0ab]">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRemoteToggle}
                role="switch"
                aria-checked={form.isRemote}
                aria-label="Remote work allowed"
                className={`h-6 w-11 shrink-0 rounded-full p-1 transition-colors ${
                  form.isRemote ? "bg-[#5c53fe]" : "bg-[#1f1f1f]"
                }`}
              >
                <span
                  className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                    form.isRemote ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Location */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <label htmlFor="location" className={labelClass}>
                    Job Location (location)
                  </label>

                  <span className="text-xs font-medium text-[#5a5a60]">
                    Required
                  </span>
                </div>

                <div className="relative">
                  <MapPin className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#a0a0ab]" />

                  <input
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    required
                    placeholder="New York, USA"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-1.5">
                <label htmlFor="deadline" className={labelClass}>
                  Application Deadline (deadline)
                </label>

                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute top-1/2 left-4 z-10 h-4 w-4 -translate-y-1/2 text-[#a0a0ab]" />

                  <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={handleChange}
                    required
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className="grid gap-5 md:grid-cols-3">
              {/* Minimum Salary */}
              <div className="space-y-1.5">
                <label htmlFor="minSalary" className={labelClass}>
                  Min Salary / Rate
                </label>

                <div className="relative">
                  <DollarSign className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#a0a0ab]" />

                  <input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    min="0"
                    value={form.minSalary}
                    onChange={handleChange}
                    placeholder="25"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Maximum Salary */}
              <div className="space-y-1.5">
                <label htmlFor="maxSalary" className={labelClass}>
                  Max Salary / Rate
                </label>

                <div className="relative">
                  <DollarSign className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#a0a0ab]" />

                  <input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    min="0"
                    value={form.maxSalary}
                    onChange={handleChange}
                    placeholder="40"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              {/* Frequency */}
              <div className="space-y-1.5">
                <label htmlFor="frequency" className={labelClass}>
                  Frequency
                </label>

                <div className="relative">
                  <select
                    id="frequency"
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {FREQUENCIES.map((frequency) => (
                      <option key={frequency} value={frequency}>
                        {frequency}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#a0a0ab]" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Responsibilities & Requirements */}
          <section className="space-y-5 rounded-2xl bg-[#151516] p-6">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#5c53fe]" />

              <h2 className="text-base font-medium text-white">
                3. Responsibilities &amp; Requirements
              </h2>
            </div>

            {/* Responsibilities */}
            <div className="space-y-1.5">
              <label htmlFor="responsibilities" className={labelClass}>
                Key Responsibilities *
              </label>

              <textarea
                id="responsibilities"
                name="responsibilities"
                value={form.responsibilities}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe what the person will do day to day..."
                className={textareaClass}
              />
            </div>

            {/* Requirements */}
            <div className="space-y-1.5">
              <label htmlFor="requirements" className={labelClass}>
                Qualifications &amp; Requirements *
              </label>

              <textarea
                id="requirements"
                name="requirements"
                value={form.requirements}
                onChange={handleChange}
                required
                rows={4}
                placeholder={
                  "• 3+ years of experience with React\n• Solid understanding of modern tools"
                }
                className={textareaClass}
              />
            </div>
          </section>
        </div>
      </div>
    </form>
  )
}
