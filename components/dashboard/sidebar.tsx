"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpenCheck,
  LayoutDashboard,
  Menu,
  Receipt,
  Settings,
  Store,
  Table,
  Users,
  User,
  ShoppingBag,
  CreditCard,
  Tags,
} from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      isActive: pathname === "/dashboard",
    },
    {
      title: "Menu",
      icon: Menu,
      href: "/dashboard/menu",
      isActive: pathname === "/dashboard/menu",
    },
    {
      title: "Meja",
      icon: Table,
      href: "/dashboard/meja",
      isActive: pathname === "/dashboard/meja",
    },
    {
      title: "Reservasi",
      icon: BookOpenCheck,
      href: "/dashboard/reservasi",
      isActive: pathname === "/dashboard/reservasi",
    },
    {
      title: "Transaksi",
      icon: Receipt,
      href: "/dashboard/transaksi",
      isActive: pathname === "/dashboard/transaksi",
    },
    {
      title: "Pesanan",
      icon: ShoppingBag,
      href: "/dashboard/orders",
      isActive: pathname === "/dashboard/orders",
    },
    {
      title: "Pelanggan",
      icon: User,
      href: "/dashboard/customers",
      isActive: pathname === "/dashboard/customers",
    },
    {
      title: "Kategori",
      icon: Tags,
      href: "/dashboard/categories",
      isActive: pathname === "/dashboard/categories",
    },
    {
      title: "Metode Pembayaran",
      icon: CreditCard,
      href: "/dashboard/payment-methods",
      isActive: pathname === "/dashboard/payment-methods",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-forest text-cream">
                  <Store className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Restoran Saya</span>
                  <span className="text-xs text-sidebar-foreground/70">Dashboard Admin</span>
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
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/staff"}>
                  <Link href="/dashboard/staff">
                    <Users className="size-4" />
                    <span>Staff</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                  <Link href="/dashboard/settings">
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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar className="size-6">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback className="bg-sage text-evergreen">AS</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">Admin Restoran</span>
                    <span className="text-xs text-sidebar-foreground/70">admin@restoran.com</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 size-4" />
                  <span>Pengaturan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
