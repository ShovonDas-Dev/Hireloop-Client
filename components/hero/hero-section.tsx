"use client"

import Image from "next/image"
import {
  Briefcase,
  Building2,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react"

const trendingRoles = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

function TrendingChip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
      {label}
    </span>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Briefcase
  value: string
  label: string
}) {
  return (
    <div className="rounded-xl bg-black/40 p-4 ring-1 ring-white/10 sm:p-5">
      <Icon className="h-5 w-5 text-white/70" strokeWidth={1.5} />
      <p className="mt-4 text-3xl font-semibold text-white sm:mt-6 md:text-4xl">
        {value}
      </p>
      <p className="mt-1 text-xs text-white/50">{label}</p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100svh-88px)] flex-col overflow-hidden bg-[#050507]">
      {/* Globe image, cropped by the section's bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[420px] w-[140%] max-w-[1440px] -translate-x-1/2 sm:h-[520px] sm:w-[110%] lg:h-[600px]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 25%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%)",
        }}
      >
        <Image
          src="/image/hero-globe.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1440px) 1440px, 140vw"
          className="object-cover object-[50%_58%] opacity-90"
        />
      </div>

      {/* Grid arc layered above the globe, following its horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 z-[1] h-[420px] w-[140%] max-w-[1440px] -translate-x-1/2 opacity-40 sm:h-[520px] sm:w-[110%] lg:h-[600px]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, black 30%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 30%)",
        }}
      >
        <Image
          src="/image/hero-grid.png"
          alt=""
          fill
          sizes="(min-width: 1440px) 1440px, 140vw"
          className="object-cover object-top"
        />
      </div>

      {/* Subtle dark gradient so the heading stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-56 bg-gradient-to-b from-black/80 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-1 flex-col px-4 pb-8 pt-10 sm:px-6 sm:pb-12 sm:pt-16">
        {/* Top badge */}
        <div className="flex items-center justify-center gap-4">
          <div className="hidden h-px max-w-[180px] flex-1 bg-gradient-to-r from-transparent to-white/15 sm:block" />
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-white/5 px-4 py-2 ring-1 ring-white/10">
            <Briefcase
              className="h-3.5 w-3.5 text-orange-400"
              strokeWidth={1.5}
            />
            <span className="font-mono text-xs font-bold text-white">
              50,000+
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50">
              New jobs this month
            </span>
          </div>
          <div className="hidden h-px max-w-[180px] flex-1 bg-gradient-to-l from-transparent to-white/15 sm:block" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 px-2 text-center text-3xl font-semibold tracking-tight text-white sm:mt-8 sm:text-4xl md:text-5xl">
          Find Your Dream Job Today
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-4 max-w-md px-2 text-center text-sm leading-relaxed text-white/50">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search bar */}
        <form
          onSubmit={(event) => event.preventDefault()}
          className="mx-auto mt-6 flex w-full max-w-[520px] flex-col gap-1 rounded-xl bg-white/5 p-2 ring-1 ring-white/10 sm:mt-8 sm:flex-row sm:items-center sm:gap-2"
        >
          <div className="flex flex-1 items-center gap-2 px-2 py-2">
            <Search
              className="h-4 w-4 shrink-0 text-white/40"
              strokeWidth={1.5}
            />
            <label htmlFor="hero-job" className="sr-only">
              Job title, skill or company
            </label>
            <input
              id="hero-job"
              type="text"
              placeholder="Job title, skill or company"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/30 sm:text-xs"
            />
          </div>

          {/* Divider: horizontal on mobile, vertical from sm up */}
          <div className="mx-2 h-px bg-white/10 sm:hidden" />
          <div className="hidden h-6 w-px bg-white/10 sm:block" />

          <div className="flex flex-1 items-center gap-2 px-2 py-2">
            <MapPin
              className="h-4 w-4 shrink-0 text-white/40"
              strokeWidth={1.5}
            />
            <label htmlFor="hero-location" className="sr-only">
              Location or Remote
            </label>
            <input
              id="hero-location"
              type="text"
              placeholder="Location or Remote"
              className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/30 sm:text-xs"
            />
          </div>

          <button
            type="submit"
            aria-label="Search jobs"
            className="mt-1 flex h-10 w-full shrink-0 items-center justify-center rounded-lg bg-[#6c5cf6] text-white transition-colors hover:bg-[#5b4be6] sm:mt-0 sm:w-10"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </form>

        {/* Trending row */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="mr-1 w-full text-center text-xs text-white/50 sm:w-auto">
            Trending Position
          </span>
          {trendingRoles.map((role) => (
            <TrendingChip key={role} label={role} />
          ))}
        </div>

        {/* Overlay text on the globe */}
        <p className="mx-auto mt-auto max-w-md px-2 pt-12 text-center text-xl leading-snug text-white/60 sm:pt-16 sm:text-2xl md:text-[28px]">
          Assisting over{" "}
          <span className="font-semibold text-white">15,000</span> job seekers
          find their dream positions.
        </p>

        {/* Stats grid */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}