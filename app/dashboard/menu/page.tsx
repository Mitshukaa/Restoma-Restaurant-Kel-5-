"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search } from "lucide-react"
import { MenuDialog, type MenuFormValues } from "@/components/dashboard/menu-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MenuPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingMenu, setEditingMenu] = useState<(MenuFormValues & { id: number }) | undefined>()

  // Sample menu data
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Nasi Goreng Spesial",
      category: "Makanan Utama",
      price: 45000,
      status: "Tersedia",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Mie Goreng Seafood",
      category: "Makanan Utama",
      price: 50000,
      status: "Tersedia",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Sate Ayam",
      category: "Makanan Utama",
      price: 35000,
      status: "Tersedia",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Es Teh Manis",
      category: "Minuman",
      price: 10000,
      status: "Tersedia",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Jus Alpukat",
      category: "Minuman",
      price: 15000,
      status: "Habis",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "Ayam Bakar",
      category: "Makanan Utama",
      price: 55000,
      status: "Tersedia",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 7,
      name: "Soto Ayam",
      category: "Makanan Utama",
      price: 30000,
      status: "Tersedia",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 8,
      name: "Es Jeruk",
      category: "Minuman",
      price: 12000,
      status: "Tersedia",
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const handleAddMenu = (data: MenuFormValues) => {
    // In a real app, you would send this to your API
    const newMenu = {
      id: menuItems.length + 1,
      name: data.name,
      category: data.category,
      price: data.price,
      status: data.status ? "Tersedia" : "Habis",
      image: data.image ? URL.createObjectURL(data.image) : "/placeholder.svg?height=80&width=80",
    }
    setMenuItems([...menuItems, newMenu])
  }

  const handleEditMenu = (data: MenuFormValues) => {
    if (!editingMenu) return

    // In a real app, you would send this to your API
    const updatedMenus = menuItems.map((item) => {
      if (item.id === editingMenu.id) {
        return {
          ...item,
          name: data.name,
          category: data.category,
          price: data.price,
          status: data.status ? "Tersedia" : "Habis",
          image: data.image ? URL.createObjectURL(data.image) : item.image,
        }
      }
      return item
    })

    setMenuItems(updatedMenus)
    setEditingMenu(undefined)
  }

  const openAddDialog = () => {
    setEditingMenu(undefined)
    setOpenDialog(true)
  }

  const openEditDialog = (menu: any) => {
    setEditingMenu({
      id: menu.id,
      name: menu.name,
      category: menu.category,
      price: menu.price,
      status: menu.status === "Tersedia",
      description: "",
    })
    setOpenDialog(true)
  }

  // Categories for filtering
  const categories = ["Semua", "Makanan Utama", "Makanan Pembuka", "Makanan Penutup", "Minuman", "Camilan"]
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter menu items
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Menu</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Tambah Menu
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari menu..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {selectedCategory !== "Semua" && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCategory}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Kategori</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                className={selectedCategory === category ? "bg-muted" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daftar Menu</CardTitle>
          <CardDescription>
            {filteredMenuItems.length} menu {selectedCategory !== "Semua" ? `dalam kategori ${selectedCategory}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMenuItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Tidak ada menu yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMenuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 overflow-hidden rounded-md border">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="line-clamp-2">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">
                          {item.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">Rp {item.price.toLocaleString("id-ID")}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            item.status === "Tersedia" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <MenuDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingMenu}
        onSubmit={editingMenu ? handleEditMenu : handleAddMenu}
      />
    </div>
  )
}
