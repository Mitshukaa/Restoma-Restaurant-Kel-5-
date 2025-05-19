"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search, ShoppingBag } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { OrderDialog } from "@/components/dashboard/order-dialog"

export default function OrdersPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingOrder, setEditingOrder] = useState<any>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Semua")

  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: 1001,
      table: "Meja 2",
      customer: "Budi Santoso",
      items: [
        { name: "Nasi Goreng Spesial", quantity: 2, price: 45000 },
        { name: "Es Teh Manis", quantity: 2, price: 10000 },
      ],
      total: 110000,
      status: "Selesai",
      time: "19:45",
      date: "17 Mei 2025",
    },
    {
      id: 1002,
      table: "Meja 5",
      customer: "Siti Rahayu",
      items: [
        { name: "Mie Goreng Seafood", quantity: 1, price: 50000 },
        { name: "Ayam Bakar", quantity: 1, price: 55000 },
        { name: "Jus Alpukat", quantity: 2, price: 15000 },
      ],
      total: 135000,
      status: "Diproses",
      time: "20:15",
      date: "17 Mei 2025",
    },
    {
      id: 1003,
      table: "Meja 1",
      customer: "Ahmad Hidayat",
      items: [
        { name: "Sate Ayam", quantity: 2, price: 35000 },
        { name: "Es Jeruk", quantity: 2, price: 12000 },
      ],
      total: 94000,
      status: "Selesai",
      time: "18:30",
      date: "17 Mei 2025",
    },
    {
      id: 1004,
      table: "Meja 7",
      customer: "Dewi Lestari",
      items: [
        { name: "Nasi Goreng Spesial", quantity: 1, price: 45000 },
        { name: "Soto Ayam", quantity: 1, price: 30000 },
        { name: "Es Teh Manis", quantity: 2, price: 10000 },
      ],
      total: 95000,
      status: "Diproses",
      time: "20:30",
      date: "17 Mei 2025",
    },
    {
      id: 1005,
      table: "Meja 3",
      customer: "Rudi Hartono",
      items: [
        { name: "Ayam Bakar", quantity: 2, price: 55000 },
        { name: "Es Jeruk", quantity: 2, price: 12000 },
      ],
      total: 134000,
      status: "Menunggu",
      time: "20:45",
      date: "17 Mei 2025",
    },
  ])

  const handleAddOrder = (data: any) => {
    // In a real app, you would send this to your API
    const newOrder = {
      id: 1000 + orders.length + 1,
      table: data.table,
      customer: data.customer,
      items: data.items,
      total: data.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
      status: "Menunggu",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    }
    setOrders([...orders, newOrder])
  }

  const handleEditOrder = (data: any) => {
    if (!editingOrder) return

    // In a real app, you would send this to your API
    const updatedOrders = orders.map((order) => {
      if (order.id === editingOrder.id) {
        return {
          ...order,
          table: data.table,
          customer: data.customer,
          items: data.items,
          total: data.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
          status: data.status,
        }
      }
      return order
    })

    setOrders(updatedOrders)
    setEditingOrder(undefined)
  }

  const openAddDialog = () => {
    setEditingOrder(undefined)
    setOpenDialog(true)
  }

  const openEditDialog = (order: any) => {
    setEditingOrder({
      id: order.id,
      table: order.table,
      customer: order.customer,
      items: order.items,
      status: order.status,
    })
    setOpenDialog(true)
  }

  // Calculate summary stats
  const totalOrders = orders.length
  const completedOrders = orders.filter((o) => o.status === "Selesai").length
  const processingOrders = orders.filter((o) => o.status === "Diproses").length
  const waitingOrders = orders.filter((o) => o.status === "Menunggu").length

  // Status for filtering
  const statuses = ["Semua", "Menunggu", "Diproses", "Selesai"]

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = selectedStatus === "Semua" || order.status === selectedStatus
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Pesanan</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Tambah Pesanan
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Total Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
              Menunggu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
              Diproses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              Selesai
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari pesanan..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filter Status
              {selectedStatus !== "Semua" && (
                <Badge variant="secondary" className="ml-2">
                  {selectedStatus}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                className={selectedStatus === status ? "bg-muted" : ""}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daftar Pesanan</CardTitle>
          <CardDescription>
            {filteredOrders.length} pesanan {selectedStatus !== "Semua" ? `dengan status ${selectedStatus}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Meja & Pelanggan</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Tidak ada pesanan yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{order.table}</span>
                          <span className="text-xs text-muted-foreground">{order.customer}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          {order.items.map((item: any, index: number) => (
                            <span key={index} className="text-sm">
                              {item.quantity}x {item.name}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">Rp {order.total.toLocaleString("id-ID")}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            order.status === "Selesai"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Diproses"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{order.time}</span>
                          <span className="text-xs text-muted-foreground">{order.date}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(order)}>
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

      <OrderDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingOrder}
        onSubmit={editingOrder ? handleEditOrder : handleAddOrder}
      />
    </div>
  )
}
