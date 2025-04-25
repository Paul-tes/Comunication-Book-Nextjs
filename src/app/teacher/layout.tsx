import type React from "react"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { TeacherTopNavbar } from "@/components/teacher/top-navbar"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <div className="flex flex-1 flex-col">
        <TeacherTopNavbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
