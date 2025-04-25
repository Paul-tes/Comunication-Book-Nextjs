import type React from "react"
import { ParentSidebar } from "@/components/parent/parent-sidebar"
import { TopNavbar } from "@/components/parent/top-navbar"

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <ParentSidebar />
      <div className="flex flex-1 flex-col">
        <TopNavbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
