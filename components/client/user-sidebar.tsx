"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpenCheck, Home, Menu, Receipt, Settings, Store, Table } from "lucide-react"

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
  SidebarRail,
} from "@/components/ui/sidebar"

export function UserSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Beranda",
      icon: Home,
      href: "/client",
      isActive: pathname === "/client",
    },
    {
      title: "Menu",
      icon: Menu,
      href: "/client/menu",
      isActive: pathname === "/client/menu",
    },
    {
      title: "Meja",
      icon: Table,
      href: "/client/meja",
      isActive: pathname === "/client/meja",
    },
    {
      title: "Reservasi",
      icon: BookOpenCheck,
      href: "/client/reservasi",
      isActive: pathname === "/client/reservasi",
    },
    {
      title: "Transaksi",
      icon: Receipt,
      href: "/client/transaksi",
      isActive: pathname === "/client/transaksi",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/client">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-forest text-cream">
                  <Store className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Restoran Saya</span>
                  <span className="text-xs text-sidebar-foreground/70">Pengalaman Kuliner Terbaik</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.href}>
                  <SidebarMenuButton asChild isActive={route.isActive}>
                    <Link href={route.href}>
                      <route.icon className="size-4" />
                      <span>{route.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pengaturan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/client/settings"}>
                  <Link href="/client/settings">
                    <Settings className="size-4" />
                    <span>Pengaturan</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-center text-sm text-sidebar-foreground/70">
          <p>© 2025 Restoran Saya</p>
          <p className="mt-1">Jl. Merdeka No. 123, Jakarta</p>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
