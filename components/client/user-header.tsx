"use client"

import { useState } from "react"
import { Bell, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

export function UserHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const cartItemCount = 3 // This would come from your cart state

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-sage bg-cream px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 md:hidden" />
        <div className="relative hidden md:flex">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-pine" />
          <Input type="search" placeholder="Cari menu..." className="w-[200px] pl-8 md:w-[300px] border-sage" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="relative border-sage text-pine" asChild>
          <Link href="/client/transaksi">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs bg-forest text-cream">
                {cartItemCount}
              </Badge>
            )}
          </Link>
        </Button>

        <Button variant="outline" size="icon" className="border-sage text-pine">
          <Bell className="h-5 w-5" />
        </Button>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-sage text-evergreen">BS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-evergreen">Budi Santoso</p>
                  <p className="text-xs leading-none text-pine">budi@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/client/profil" className="flex w-full">
                  Profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/client/riwayat" className="flex w-full">
                  Riwayat Pesanan
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/client/settings" className="flex w-full">
                  Pengaturan
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Keluar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="default" onClick={() => setIsLoggedIn(true)} className="bg-forest hover:bg-pine text-cream">
            <User className="mr-2 h-4 w-4" />
            Masuk
          </Button>
        )}
      </div>
    </header>
  )
}
