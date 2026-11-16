"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { toast } from "@/components/ui/toast"
import {
  AuthDivider,
  AuthField,
  AuthInput,
  GoogleIcon,
} from "@/components/shared/auth-form"
import { cn } from "@/lib/utils"
import {
  authCardClass,
  authGoogleButtonClass,
  authPrimaryButtonClass,
} from "@/lib/form-styles"
import { authClient } from "@/lib/auth-client"

// Role options for the account type picker (seeker is the default)
const roleOptions = [
  {
    value: "seeker",
    label: "Job Seeker",
    description: "Find and apply for jobs",
  },
  { value: "recruiter", label: "Recruiter", description: "Hire great talent" },
  { value: "admin", label: "Admin", description: "Manage the platform" },
]

export default function SignUpPage() {
  const [role, setRole] = useState("seeker")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)

    const { error } = await authClient.signUp.email({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role,
    })

    setLoading(false)

    if (error) {
      toast.add({
        title: "Sign-up failed",
        description: error.message ?? "Could not create your account.",
        type: "error",
      })
      return
    }

    toast.add({
      title: "Account created successfully!",
      type: "success",
    })
    router.push("/")
    router.refresh()
  }

  const handleGoogleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const { error } = await authClient.signIn.social({
      provider: "google",
    })

    if (error) {
      toast.add({
        title: "Google sign-in failed",
        description: error.message ?? "Could not sign in with Google.",
        type: "error",
      })
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <div className={authCardClass}>
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
            <div className="flex gap-2">
              {roleOptions.map((option) => (
                <label
                  onClick={() => setRole(option.value)}
                  key={option.value}
                  className={cn(
                    "flex flex-1 cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 ring-1 transition-colors",
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

          <AuthField label="Full Name" htmlFor="name">
            <AuthInput
              id="name"
              name="name"
              type="text"
              placeholder="John Doe"
              required
            />
          </AuthField>

          <AuthField label="Email" htmlFor="email">
            <AuthInput
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </AuthField>

          <AuthField label="Password" htmlFor="password">
            <AuthInput
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </AuthField>

          <button
            type="submit"
            disabled={loading}
            className={authPrimaryButtonClass}
          >
            {loading ? "Creating account..." : "Get Started"}
          </button>

          <AuthDivider />

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className={authGoogleButtonClass}
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>

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
