"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"

// Edit these hrefs to match your routes
const navLinks: { label: string; href: string }[] = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/")

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#141418]">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="HireLoop"
            width={154}
            height={44}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden h-full items-center gap-6 bg-[#1a1a1f] px-6 lg:flex">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-base tracking-[-0.01em] text-[#ededef] transition-opacity hover:opacity-80",
                    isActive(link.href) ? "font-bold underline" : "font-normal"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <span className="h-6 w-px bg-[#a8a8a8]/40" aria-hidden="true" />

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="flex h-[38px] items-center rounded-lg border border-[#090a15]/10 bg-white px-4 font-[family-name:var(--font-inter)] text-[18px] font-semibold text-[#645bff] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-opacity hover:opacity-90"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="flex h-[52px] items-center rounded-lg border border-[#090a15]/10 bg-[#5c53fe] px-4 font-[family-name:var(--font-instrument)] text-[18px] font-medium text-[#ededef] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] transition-opacity hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </nav>

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#ededef] lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-white/[0.07] bg-[#1a1a1f] px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block text-base tracking-[-0.01em] text-[#ededef]",
                    isActive(link.href) ? "font-bold underline" : "font-normal"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.07] pt-4">
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="flex h-[38px] items-center justify-center rounded-lg border border-[#090a15]/10 bg-white px-4 font-[family-name:var(--font-inter)] text-[18px] font-semibold text-[#645bff]"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setOpen(false)}
              className="flex h-[52px] items-center justify-center rounded-lg border border-[#090a15]/10 bg-[#5c53fe] px-4 font-[family-name:var(--font-instrument)] text-[18px] font-medium text-[#ededef]"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
