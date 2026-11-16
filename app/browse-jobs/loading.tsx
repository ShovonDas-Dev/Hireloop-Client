// Loading skeleton for /browse-jobs — mirrors the page layout with dark
// pulsing blocks so the swap from loading to content stays seamless.

const pulseClass = "animate-pulse rounded-xl bg-[#141418]"

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0e0e11] pb-16">
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className={`h-[68px] ${pulseClass}`} />

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[280px_1fr]">
          <div className={`h-64 ${pulseClass}`} />

          <div className="min-w-0 space-y-5">
            <div className="h-7 w-56 animate-pulse rounded-md bg-[#141418]" />

            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className={`h-36 ${pulseClass}`} />
              ))}
            </div>

            <div className="flex justify-center gap-2 pt-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="size-9 animate-pulse rounded-lg bg-[#141418]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
