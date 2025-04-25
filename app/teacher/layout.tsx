import type React from "react"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { TeacherTopNavbar } from "@/components/teacher/top-navbar"

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full">
      <TeacherSidebar />
      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <TeacherTopNavbar />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
