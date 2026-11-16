"use client"

import { cn } from "@/lib/utils"
import { authInputClass, authLabelClass } from "@/lib/form-styles"

// Small inline Google logo for social sign-in buttons
export function GoogleIcon() {
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

// Labeled field wrapper used by the auth forms
export function AuthField({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className={authLabelClass}>
        {label}
      </label>
      {children}
    </div>
  )
}

// Styled text input for the auth forms
export function AuthInput(props: React.ComponentProps<"input">) {
  return <input {...props} className={cn(authInputClass, props.className)} />
}

// "or" divider between the primary submit and social login buttons
export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="mt-2 flex items-center gap-3">
      <span className="h-px flex-1 bg-white/10" />
      <span className="text-xs text-white/40">{label}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  )
}
