"use client"

import Link from "next/link"

import { toast } from "@/components/ui/toast"
import {
  AuthDivider,
  AuthField,
  AuthInput,
  GoogleIcon,
} from "@/components/shared/auth-form"
import {
  authCardClass,
  authGoogleButtonClass,
  authPrimaryButtonClass,
} from "@/lib/form-styles"
import { authClient, signIn } from "@/lib/auth-client"

export default function SignInPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const { error } = await authClient.signIn.email({
      email: String(data.email),
      password: String(data.password),
      rememberMe: true,
      callbackURL: "/",
    })

    if (error) {
      toast.add({
        title: "Sign-in failed",
        description: error.message ?? "Please check your email and password.",
        type: "error",
      })
      return
    }

    toast.add({
      title: "Signed in successfully",
      description: "Welcome back! You are now logged in.",
      type: "success",
    })
  }

  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    })
    if (error) {
      console.error("Google sign-in error:", error)
      toast.add({
        title: "Google sign-in failed",
        description:
          "An error occurred while signing in with Google. Please try again.",
        type: "error",
      })
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-88px)] items-center justify-center px-4 py-10">
      <div className={authCardClass}>
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-white">Sign In</h1>
        <p className="mt-1 text-sm text-white/60">
          Welcome back! Enter your details to continue.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
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
            />
          </AuthField>

          <button type="submit" className={authPrimaryButtonClass}>
            Sign In
          </button>

          <AuthDivider />

          {/* Google login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={authGoogleButtonClass}
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </form>

        {/* Switch to sign up */}
        <p className="mt-6 text-center text-[13px] text-white/60">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-[#8b7ff8] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  )
}
