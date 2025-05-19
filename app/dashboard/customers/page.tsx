"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { CustomerDialog } from "@/components/dashboard/customer-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CustomersPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<any>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("Semua")

  // Sample customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      email: "budi@example.com",
      phone: "081234567890",
      type: "Regular",
      visits: 12,
      lastVisit: "15 Mei 2025",
      points: 120,
      notes: "Suka meja di dekat jendela",
    },
    {
      id: 2,
      name: "Siti Rahayu",
      email: "siti@example.com",
      phone: "081234567891",
      type: "VIP",
      visits: 25,
      lastVisit: "10 Mei 2025",
      points: 350,
      notes: "Alergi kacang",
    },
    {
      id: 3,
      name: "Ahmad Hidayat",
      email: "ahmad@example.com",
      phone: "081234567892",
      type: "Regular",
      visits: 5,
      lastVisit: "5 Mei 2025",
      points: 50,
      notes: "",
    },
    {
      id: 4,
      name: "Dewi Lestari",
      email: "dewi@example.com",
      phone: "081234567893",
      type: "VIP",
      visits: 18,
      lastVisit: "12 Mei 2025",
      points: 220,
      notes: "Ulang tahun: 23 Juni",
    },
    {
      id: 5,
      name: "Rudi Hartono",
      email: "rudi@example.com",
      phone: "081234567894",
      type: "Regular",
      visits: 3,
      lastVisit: "2 Mei 2025",
      points: 30,
      notes: "",
    },
    {
      id: 6,
      name: "Rina Wijaya",
      email: "rina@example.com",
      phone: "081234567895",
      type: "VIP",
      visits: 30,
      lastVisit: "16 Mei 2025",
      points: 450,
      notes: "Suka wine merah",
    },
  ])

  const handleAddCustomer = (data: any) => {
    // In a real app, you would send this to your API
    const newCustomer = {
      id: customers.length + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      visits: 0,
      lastVisit: "-",
      points: 0,
      notes: data.notes || "",
    }
    setCustomers([...customers, newCustomer])
  }

  const handleEditCustomer = (data: any) => {
    if (!editingCustomer) return

    // In a real app, you would send this to your API
    const updatedCustomers = customers.map((customer) => {
      if (customer.id === editingCustomer.id) {
        return {
          ...customer,
          name: data.name,
          email: data.email,
          phone: data.phone,
          type: data.type,
          notes: data.notes || "",
        }
      }
      return customer
    })

    setCustomers(updatedCustomers)
    setEditingCustomer(undefined)
  }

  const openAddDialog = () => {
    setEditingCustomer(undefined)
    setOpenDialog(true)
  }

  const openEditDialog = (customer: any) => {
    setEditingCustomer({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      type: customer.type,
      notes: customer.notes,
    })
    setOpenDialog(true)
  }

  // Calculate summary stats
  const totalCustomers = customers.length
  const vipCustomers = customers.filter((c) => c.type === "VIP").length
  const regularCustomers = customers.filter((c) => c.type === "Regular").length

  // Customer types for filtering
  const types = ["Semua", "VIP", "Regular"]

  // Filter customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesType = selectedType === "Semua" || customer.type === selectedType
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    return matchesType && matchesSearch
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Pelanggan</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Tambah Pelanggan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <User className="mr-2 h-4 w-4" />
              Total Pelanggan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
              Pelanggan VIP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vipCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((vipCustomers / totalCustomers) * 100)}% dari total pelanggan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
              Pelanggan Regular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regularCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((regularCustomers / totalCustomers) * 100)}% dari total pelanggan
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari nama, email, atau telepon..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter Tipe
              {selectedType !== "Semua" && (
                <Badge variant="secondary" className="ml-2">
                  {selectedType}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Tipe Pelanggan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {types.map((type) => (
              <DropdownMenuItem
                key={type}
                className={selectedType === type ? "bg-muted" : ""}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>
            {filteredCustomers.length} pelanggan {selectedType !== "Semua" ? `dengan tipe ${selectedType}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Tipe</TableHead>
                  <TableHead>Kunjungan</TableHead>
                  <TableHead>Poin</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Tidak ada pelanggan yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={customer.name} />
                            <AvatarFallback>
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{customer.name}</div>
                            {customer.notes && <div className="text-xs text-muted-foreground">{customer.notes}</div>}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{customer.email}</span>
                          <span className="text-xs text-muted-foreground">{customer.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`font-normal ${
                            customer.type === "VIP" ? "bg-purple-50 text-purple-800" : "bg-blue-50 text-blue-800"
                          }`}
                        >
                          {customer.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{customer.visits} kunjungan</span>
                          <span className="text-xs text-muted-foreground">Terakhir: {customer.lastVisit}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-amber-50 text-amber-800">
                          {customer.points} poin
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(customer)}>
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

      <CustomerDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingCustomer}
        onSubmit={editingCustomer ? handleEditCustomer : handleAddCustomer}
      />
    </div>
  )
}
