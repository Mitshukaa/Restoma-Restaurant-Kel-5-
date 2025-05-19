"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Tags } from "lucide-react"
import { CategoryDialog } from "@/components/dashboard/category-dialog"

export default function CategoriesPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(undefined)

  // Sample category data
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Makanan Utama",
      description: "Menu makanan utama untuk makan siang dan makan malam",
      itemCount: 8,
      color: "bg-red-100 text-red-800",
    },
    {
      id: 2,
      name: "Makanan Pembuka",
      description: "Hidangan pembuka untuk memulai santapan",
      itemCount: 5,
      color: "bg-amber-100 text-amber-800",
    },
    {
      id: 3,
      name: "Makanan Penutup",
      description: "Hidangan penutup dan dessert",
      itemCount: 4,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      name: "Minuman",
      description: "Berbagai minuman segar dan hangat",
      itemCount: 6,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 5,
      name: "Camilan",
      description: "Makanan ringan dan camilan",
      itemCount: 3,
      color: "bg-green-100 text-green-800",
    },
  ])

  const handleAddCategory = (data: any) => {
    // In a real app, you would send this to your API
    const newCategory = {
      id: categories.length + 1,
      name: data.name,
      description: data.description,
      itemCount: 0,
      color: data.color,
    }
    setCategories([...categories, newCategory])
  }

  const handleEditCategory = (data: any) => {
    if (!editingCategory) return

    // In a real app, you would send this to your API
    const updatedCategories = categories.map((category) => {
      if (category.id === editingCategory.id) {
        return {
          ...category,
          name: data.name,
          description: data.description,
          color: data.color,
        }
      }
      return category
    })

    setCategories(updatedCategories)
    setEditingCategory(undefined)
  }

  const openAddDialog = () => {
    setEditingCategory(undefined)
    setOpenDialog(true)
  }

  const openEditDialog = (category: any) => {
    setEditingCategory({
      id: category.id,
      name: category.name,
      description: category.description,
      color: category.color,
    })
    setOpenDialog(true)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Kategori Menu</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Tambah Kategori
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daftar Kategori</CardTitle>
          <CardDescription>Kelola kategori menu restoran Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Jumlah Item</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <Tags className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2">
                          {category.name}
                          <Badge className={category.color}>{category.name.split(" ")[0]}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{category.itemCount} item</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(category)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <CategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingCategory}
        onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
      />
    </div>
  )
}
