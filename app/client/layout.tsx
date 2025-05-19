import type React from "react"
import type { Metadata } from "next"
import { SidebarProvider } from "@/components/ui/sidebar"
import { UserSidebar } from "@/components/client/user-sidebar"
import { UserHeader } from "@/components/client/user-header"

export const metadata: Metadata = {
  title: "Restoran Saya - Pengalaman Kuliner Terbaik",
  description: "Nikmati hidangan lezat di restoran kami dengan suasana yang nyaman dan pelayanan terbaik.",
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <UserSidebar />
        <main className="flex-1">
          <UserHeader />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
