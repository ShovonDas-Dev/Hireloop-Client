import { Geist, Geist_Mono, Inter, Instrument_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@wrksz/themes/next"
import { ThemeHotkey } from "@/components/ui/theme-provider"
import { NavbarWrapper } from "@/components/Navbar/NavbarWrapper"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        inter.variable,
        instrumentSans.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeHotkey />
          <NavbarWrapper/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}