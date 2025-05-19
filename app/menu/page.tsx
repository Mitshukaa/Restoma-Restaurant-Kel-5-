"use client"

import { useState } from "react"
import { UserSidebar } from "@/components/user/user-sidebar"
import { UserHeader } from "@/components/user/user-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { MenuItemDialog } from "@/components/user/menu-item-dialog"

export default function MenuPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const openItemDialog = (item: MenuItem) => {
    setSelectedItem(item)
    setOpenDialog(true)
  }

  // Filter menu items based on search query
  const filteredFoodItems = foodItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDrinkItems = drinkItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <UserSidebar />
        <main className="flex-1">
          <UserHeader />

          <div className="mx-auto max-w-7xl p-4 md:p-8">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <h1 className="text-3xl font-bold">Menu Kami</h1>
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari menu..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="food" className="mt-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="food">Makanan</TabsTrigger>
                <TabsTrigger value="drinks">Minuman</TabsTrigger>
              </TabsList>

              <TabsContent value="food" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredFoodItems.length === 0 ? (
                    <div className="col-span-full py-12 text-center">
                      <p className="text-lg text-muted-foreground">Tidak ada menu yang ditemukan.</p>
                    </div>
                  ) : (
                    filteredFoodItems.map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden transition-all hover:shadow-md"
                        onClick={() => openItemDialog(item)}
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                          {item.isBestSeller && (
                            <Badge className="absolute right-2 top-2 bg-amber-500 text-white">Best Seller</Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">Rp {item.price.toLocaleString("id-ID")}</p>
                            </div>
                          </div>
                          <Button className="mt-4 w-full">Lihat Detail</Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="drinks" className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredDrinkItems.length === 0 ? (
                    <div className="col-span-full py-12 text-center">
                      <p className="text-lg text-muted-foreground">Tidak ada menu yang ditemukan.</p>
                    </div>
                  ) : (
                    filteredDrinkItems.map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden transition-all hover:shadow-md"
                        onClick={() => openItemDialog(item)}
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                          {item.isBestSeller && (
                            <Badge className="absolute right-2 top-2 bg-amber-500 text-white">Best Seller</Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">Rp {item.price.toLocaleString("id-ID")}</p>
                            </div>
                          </div>
                          <Button className="mt-4 w-full">Lihat Detail</Button>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {selectedItem && <MenuItemDialog open={openDialog} onOpenChange={setOpenDialog} item={selectedItem} />}
    </SidebarProvider>
  )
}

// Types
interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  isBestSeller?: boolean
  ingredients?: string[]
}

// Sample data
const foodItems: MenuItem[] = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan telur, ayam, udang, dan sayuran segar, disajikan dengan kerupuk dan acar.",
    price: 45000,
    image: "/placeholder.svg?height=200&width=300",
    isBestSeller: true,
    ingredients: ["Nasi", "Telur", "Ayam", "Udang", "Sayuran", "Bumbu rahasia"],
  },
  {
    id: 2,
    name: "Mie Goreng Seafood",
    description: "Mie goreng dengan campuran seafood segar seperti udang, cumi, dan kerang.",
    price: 50000,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Mie", "Udang", "Cumi", "Kerang", "Sayuran", "Bumbu spesial"],
  },
  {
    id: 3,
    name: "Sate Ayam",
    description: "Sate ayam dengan bumbu kacang khas, disajikan dengan lontong dan acar.",
    price: 35000,
    image: "/placeholder.svg?height=200&width=300",
    isBestSeller: true,
    ingredients: ["Ayam", "Bumbu kacang", "Lontong", "Acar"],
  },
  {
    id: 4,
    name: "Ayam Bakar",
    description: "Ayam bakar dengan bumbu rempah khas Indonesia, disajikan dengan sambal dan lalapan.",
    price: 55000,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Ayam", "Bumbu rempah", "Sambal", "Lalapan"],
  },
  {
    id: 5,
    name: "Soto Ayam",
    description: "Soto ayam dengan kuah bening, disajikan dengan nasi, telur, dan emping.",
    price: 30000,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Ayam", "Kuah kaldu", "Telur", "Emping", "Bumbu rempah"],
  },
  {
    id: 6,
    name: "Rendang Sapi",
    description: "Rendang sapi dengan bumbu rempah khas Padang, dimasak hingga empuk dan meresap.",
    price: 65000,
    image: "/placeholder.svg?height=200&width=300",
    isBestSeller: true,
    ingredients: ["Daging sapi", "Santan", "Bumbu rendang", "Rempah-rempah"],
  },
]

const drinkItems: MenuItem[] = [
  {
    id: 101,
    name: "Es Teh Manis",
    description: "Teh manis segar dengan es batu.",
    price: 10000,
    image: "/placeholder.svg?height=200&width=300",
    isBestSeller: true,
    ingredients: ["Teh", "Gula", "Es batu"],
  },
  {
    id: 102,
    name: "Jus Alpukat",
    description: "Jus alpukat segar dengan susu dan sirup coklat.",
    price: 15000,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Alpukat", "Susu", "Sirup coklat", "Es batu"],
  },
  {
    id: 103,
    name: "Es Jeruk",
    description: "Jeruk segar diperas dengan es batu.",
    price: 12000,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Jeruk", "Gula", "Es batu"],
  },
  {
    id: 104,
    name: "Kopi Hitam",
    description: "Kopi hitam dengan biji kopi pilihan.",
    price: 15000,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Biji kopi", "Air panas"],
  },
  {
    id: 105,
    name: "Lemon Tea",
    description: "Teh dengan perasan lemon segar dan es batu.",
    price: 13000,
    image: "/placeholder.svg?height=200&width=300",
    isBestSeller: true,
    ingredients: ["Teh", "Lemon", "Gula", "Es batu"],
  },
  {
    id: 106,
    name: "Milkshake Coklat",
    description: "Milkshake coklat dengan es krim vanilla dan whipped cream.",
    price: 20000,
    image: "/placeholder.svg?height=200&width=300",
    ingredients: ["Susu", "Coklat", "Es krim vanilla", "Whipped cream"],
  },
]
