"use client"

import { Users, Settings, LayoutDashboard, Home, LogOut, PanelLeftClose, PanelLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()
  const { state, toggleSidebar } = useSidebar()

  const routes = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      href: "/admin",
      isActive: pathname === "/admin",
    },
    {
      title: "User Management",
      icon: Users,
      href: "/admin/users",
      isActive: pathname === "/admin/users" || pathname.startsWith("/admin/users/"),
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings",
      isActive: pathname === "/admin/settings",
    },
  ]

  return (
    <Sidebar collapsible="icon" className="z-20">
      <SidebarHeader className="flex items-center gap-2 px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Home className="h-6 w-6 cursor-pointer hover:text-primary" />
          </Link>
          {state === "expanded" && <span className="text-lg font-semibold">Admin Portal</span>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={route.isActive} tooltip={route.title}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleSidebar}
              tooltip={state === "expanded" ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {state === "expanded" ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeft className="h-5 w-5" />}
              <span>Toggle Sidebar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="/login" className="text-red-500">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
