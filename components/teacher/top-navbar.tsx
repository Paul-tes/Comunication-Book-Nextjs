"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { ChevronDown, User, Settings, LogOut } from "lucide-react"
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

// Mock data for classes
const classes = [
  { id: 1, name: "Grade 5A", subject: "Mathematics" },
  { id: 2, name: "Grade 3B", subject: "Science" },
  { id: 3, name: "Grade 4C", subject: "English" },
]

export function TeacherTopNavbar() {
  const [selectedClass, setSelectedClass] = useState(classes[0])
  const pathname = usePathname()

  // Get page title based on pathname
  const getPageTitle = () => {
    if (pathname === "/teacher") return "Students"
    if (pathname === "/teacher/attendance") return "Attendance Taker"
    if (pathname === "/teacher/marks") return "Mark List"
    if (pathname === "/teacher/homework") return "Homework & Engagement"
    if (pathname === "/teacher/messages") return "Messages"
    return "Teacher Dashboard"
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-4 border-b bg-background px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex flex-1 items-center justify-between">
        <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
              <span>{selectedClass.name}</span>
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {classes.map((classItem) => (
                <DropdownMenuItem key={classItem.id} onClick={() => setSelectedClass(classItem)}>
                  <div className="flex flex-col">
                    <span>{classItem.name}</span>
                    <span className="text-xs text-muted-foreground">{classItem.subject}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Teacher" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>My Profile</span>
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
