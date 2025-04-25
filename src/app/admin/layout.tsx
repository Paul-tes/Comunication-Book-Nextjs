import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopNavbar } from "@/components/admin/admin-top-navbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopNavbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
