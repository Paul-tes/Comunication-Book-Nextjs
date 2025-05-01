"use client"
import { usePathname } from "next/navigation"
import { User, Settings, LogOut } from "lucide-react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function TopNavbar() {
  const pathname = usePathname()

  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/parent") return "My Kids Overview"
    if (pathname.startsWith("/parent/student/")) return "Student Details"
    if (pathname === "/parent/profile") return "Profile"
    if (pathname === "/parent/notifications") return "Notifications"
    if (pathname === "/parent/messages") return "Messages"
    return "Parent Dashboard"
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        <div className="flex items-center gap-4">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Parent" />
                <AvatarFallback>PJ</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/parent/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Account Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login" className="flex items-center gap-2 text-red-500">
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
