// Shared class constants for forms so sign-in, sign-up, and recruiter
// pages stay visually consistent without repeating Tailwind strings.

// --- Auth forms (sign-in / sign-up) ---

export const authCardClass =
  "w-full max-w-sm rounded-2xl bg-[#1b1b1f] p-8 shadow-lg ring-1 ring-white/5"

export const authLabelClass = "text-[13px] text-white/80"

export const authInputClass =
  "h-10 rounded-lg bg-white/5 px-3 text-sm text-white ring-1 ring-white/10 outline-none placeholder:text-white/30 focus:ring-2 focus:ring-[#6c5cf6]"

export const authPrimaryButtonClass =
  "mt-2 h-10 rounded-lg bg-[#6c5cf6] text-sm font-medium text-white transition-colors hover:bg-[#5b4be6] disabled:opacity-60"

export const authGoogleButtonClass =
  "mt-2 flex h-10 items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-[#1b1b1f] transition-opacity hover:opacity-90"

// --- Job forms (recruiter pages) ---

export const jobInputClass =
  "h-11 w-full rounded-xl border border-transparent bg-[#1e1e21] px-4 text-sm text-white outline-none placeholder:text-[#5a5a60] focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/30 [color-scheme:dark]"

export const jobLabelClass = "block text-sm font-medium text-[#f4f4f5]"

export const jobTextareaClass =
  "w-full rounded-xl border border-transparent bg-[#1e1e21] p-4 text-sm text-white outline-none placeholder:text-[#5a5a60] focus:border-[#5c53fe] focus:ring-2 focus:ring-[#5c53fe]/30"
