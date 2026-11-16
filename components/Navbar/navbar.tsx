"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { authClient, useSession } from "@/lib/auth-client"

// 2. Small pieces so the main Navbar stays easy to read

function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image src="/logo.png" alt="HireLoop" width={110} height={36} priority />
    </Link>
  )
}

function NavLink({
  label,
  href,
  onClick,
}: {
  label: string
  href: string
  onClick?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-[13px] text-white/80 transition-colors hover:text-white",
        isActive && "font-semibold text-white"
      )}
    >
      {label}
    </Link>
  )
}

// 3. Main navbar — dark floating pill like the design
export function Navbar() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const user = session?.user

  const navLinks = [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Company", href: "/company" },
    { label: "Pricing", href: "/pricing" },
    { label: "Dashboard", href: `dashboard/${user?.role || "seeker"}` },
  ]

  const handleLogout = async () => {
    await authClient.signOut()
  }

  return (
    <div className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded bg-[#1b1b1f] px-5 shadow-lg ring-1 ring-white/5">
        {/* Left: logo */}
        <Logo />

        {/* Center: links (desktop only) */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>

        {/* Right: sign in + get started */}

        {user ? (
          <div className="flex gap-4">
            <p>Wellcome {user?.name}</p>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-[#f33535] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#f60a0a]"
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <div className="hidden items-center gap-5 md:flex">
              <Link
                href="/sign-in"
                className="text-[13px] text-white/80 transition-colors hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-[#6c5cf6] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#5b4be6]"
              >
                Get Started
              </Link>
            </div>
          </>
        )}

        {/* Mobile: hamburger button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="mx-auto mt-2 max-w-5xl rounded-2xl bg-[#1b1b1f] px-5 py-4 shadow-lg ring-1 ring-white/5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                {...link}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg py-2 text-center text-[13px] text-white/80"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg bg-[#6c5cf6] py-2 text-center text-[13px] font-medium text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
