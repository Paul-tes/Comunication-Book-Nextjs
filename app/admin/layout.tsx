import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopNavbar } from "@/components/admin/admin-top-navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex w-full flex-1 flex-col overflow-hidden">
        <AdminTopNavbar />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
