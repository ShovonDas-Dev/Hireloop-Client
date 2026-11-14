"use client"

import { useState } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { authClient, signIn } from "@/lib/auth-client"

// Role options for the account type picker (seeker is the default)
const roleOptions = [
  { value: "seeker", label: "Job Seeker", description: "Find and apply for jobs" },
  { value: "recruiter", label: "Recruiter", description: "Hire great talent" },
  { value: "admin", label: "Admin", description: "Manage the platform" },
]

// Small inline Google logo for the button
function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.72 12 .72 7.44.72 3.56 3.3 1.68 7.04l3.66 2.84C6.24 7.14 8.88 5.04 12 5.04z"
      />
      <path
        fill="#4285F4"
        d="M23.28 12.26c0-.8-.08-1.56-.2-2.26H12v4.52h6.34c-.28 1.48-1.1 2.74-2.34 3.58l3.62 2.8c2.1-1.94 3.66-4.8 3.66-8.64z"
      />
      <path
        fill="#FBBC05"
        d="M5.34 14.12a6.9 6.9 0 0 1 0-4.24L1.68 7.04a11.28 11.28 0 0 0 0 9.92l3.66-2.84z"
      />
      <path
        fill="#34A853"
        d="M12 23.28c2.96 0 5.46-.98 7.28-2.66l-3.62-2.8c-1 .68-2.28 1.1-3.66 1.1-3.12 0-5.76-2.1-6.66-4.94l-3.66 2.84c1.88 3.74 5.76 6.46 10.32 6.46z"
      />
    </svg>
  )
}

// Sign-up page — form data is just collected for now (auth comes later)
export default function SignUpPage() {
  const [role, setRole] = useState("seeker")
  const [message, setMessage] = useState("")

  const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
   
   
    

  }

  const handleGoogleSignUp = async () => {
    
  }

  return (
    <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl bg-[#1b1b1f] p-8 shadow-lg ring-1 ring-white/5">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-white">Sign Up</h1>
        <p className="mt-1 text-sm text-white/60">
          Create an account to get started.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">

             {/* Account type picker */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[13px] text-white/80">Account Type</span>
            <div className="flex  gap-2">
              {roleOptions.map((option) => (
                <label
                  onClick={() => setRole(option.value)}
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 ring-1 transition-colors",
                    role === option.value
                      ? "bg-[#6c5cf6]/15 ring-[#6c5cf6]"
                      : "bg-white/5 ring-white/10 hover:ring-white/20"
                  )}
                >
                  <span>
                    <span className="block text-[13px] font-medium text-white">
                      {option.label}
                    </span>
                    <span className="block text-xs text-white/50">
                      {option.description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>



          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-[13px] text-white/80">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className="h-10 rounded-lg bg-white/5 px-3 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-white/30 focus:ring-2 focus:ring-[#6c5cf6]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[13px] text-white/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="h-10 rounded-lg bg-white/5 px-3 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-white/30 focus:ring-2 focus:ring-[#6c5cf6]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[13px] text-white/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              className="h-10 rounded-lg bg-white/5 px-3 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-white/30 focus:ring-2 focus:ring-[#6c5cf6]"
            />
          </div>

         

          <button
            type="submit"
            className="mt-2 h-10 rounded-lg bg-[#6c5cf6] text-sm font-medium text-white transition-colors hover:bg-[#5b4be6]"
          >
            Get Started
          </button>

          {/* Divider */}
          <div className="mt-2 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-white/40">or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="mt-2 flex h-10 items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-[#1b1b1f] transition-opacity hover:opacity-90"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>

        {message && <p className="mt-4 text-xs text-emerald-400">{message}</p>}

        {/* Switch to sign in */}
        <p className="mt-6 text-center text-[13px] text-white/60">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#8b7ff8] hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}
