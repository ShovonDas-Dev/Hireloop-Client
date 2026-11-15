"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  Briefcase,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  Users,
  Wallet,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient, useSession } from "@/lib/auth-client"

// Menu items for each role.
// "href" is relative to the role basePath, e.g. "" -> "/dashboard/recruiter"
const menuByRole = {
  recruiter: {
    label: "Recruiter",
    basePath: "/dashboard/recruiter",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, href: "" },
      { title: "Add Job", icon: PlusCircle, href: "/add-job" },
      { title: "Manage Jobs", icon: Briefcase, href: "/manage-jobs" },
      { title: "Applications", icon: FileText, href: "/applications" },
      { title: "Settings", icon: Settings, href: "/settings" },
    ],
  },
  seeker: {
    label: "Seeker",
    basePath: "/dashboard/seeker",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, href: "" },
      { title: "Jobs", icon: Briefcase, href: "/jobs" },
      { title: "Saved Jobs", icon: Bookmark, href: "/saved-jobs" },
      { title: "Applications", icon: FileText, href: "/applications" },
      { title: "Billing", icon: CreditCard, href: "/billing" },
      { title: "Settings", icon: Settings, href: "/settings" },
    ],
  },
  admin: {
    label: "Admin",
    basePath: "/dashboard/admin",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, href: "" },
      { title: "Users", icon: Users, href: "/users" },
      { title: "Companies", icon: Building2, href: "/companies" },
      { title: "Jobs", icon: Briefcase, href: "/jobs" },
      { title: "Payments", icon: Wallet, href: "/payments" },
      { title: "Settings", icon: Settings, href: "/settings" },
    ],
  },
}

// Top part of the sidebar: logo
function SidebarLogo() {
  return (
    <SidebarHeader>
      <Link href="/" className="flex items-center px-2 py-3">
        <Image
          src="/logo.png"
          alt="HireLoop"
          width={110}
          height={36}
          priority
        />
      </Link>
    </SidebarHeader>
  )
}

// Bottom part of the sidebar: logged in user details + log out
function SidebarUser() {
  const { data: session } = useSession()
  const user = session?.user

  const handleLogout = async () => {
    await authClient.signOut()
  }

  return (
    <SidebarFooter>
      <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#6c5cf6] text-sm font-semibold text-white">
          {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            {user?.name ?? "Guest"}
          </p>
          <p className="truncate text-xs text-white/50">
            {user?.email ?? "Not signed in"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Log out"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </SidebarFooter>
  )
}

// One menu group: the label (role) + all links for that role
function RoleMenuGroup({ role }: { role: keyof typeof menuByRole }) {
  const pathname = usePathname()
  const menu = menuByRole[role]

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs tracking-wider text-white/50 uppercase">
        {menu.label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {menu.items.map((item) => {
            const fullHref = menu.basePath + item.href
            const isActive = pathname === fullHref

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={<Link href={fullHref} />}
                  isActive={isActive}
                  className="text-white/80 hover:bg-white/10 hover:text-white data-[active=true]:bg-[#6c5cf6] data-[active=true]:text-white"
                >
                  <Link href={fullHref}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

// Main sidebar — shows the menu that matches the logged in user's role
export function AppSidebar() {
  const { data: session } = useSession()
  const role = session?.user?.role as keyof typeof menuByRole | undefined

  return (
    <Sidebar className="border-r border-white/10 bg-[#1b1b1f]">
      <SidebarLogo />
      <SidebarContent>
        <RoleMenuGroup role={role ?? "seeker"} />
      </SidebarContent>
      <SidebarUser />
    </Sidebar>
  )
}
