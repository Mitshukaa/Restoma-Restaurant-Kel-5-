"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Edit, Plus, QrCode, Smartphone, Wallet } from "lucide-react"
import { PaymentMethodDialog } from "@/components/dashboard/payment-method-dialog"
import { Switch } from "@/components/ui/switch"

export default function PaymentMethodsPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<any>(undefined)

  // Sample payment method data
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: "Cash",
      description: "Pembayaran tunai langsung",
      active: true,
      icon: "Wallet",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "Kartu Kredit",
      description: "Visa, Mastercard, American Express",
      active: true,
      icon: "CreditCard",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      name: "Kartu Debit",
      description: "Visa Debit, Mastercard Debit",
      active: true,
      icon: "CreditCard",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      name: "QRIS",
      description: "QR Code untuk pembayaran digital",
      active: true,
      icon: "QrCode",
      color: "bg-amber-100 text-amber-800",
    },
    {
      id: 5,
      name: "Mobile Banking",
      description: "Transfer melalui aplikasi mobile banking",
      active: false,
      icon: "Smartphone",
      color: "bg-pink-100 text-pink-800",
    },
  ])

  const handleAddPaymentMethod = (data: any) => {
    // In a real app, you would send this to your API
    const newPaymentMethod = {
      id: paymentMethods.length + 1,
      name: data.name,
      description: data.description || "",
      active: data.active,
      icon: data.icon,
      color: data.color,
    }
    setPaymentMethods([...paymentMethods, newPaymentMethod])
  }

  const handleEditPaymentMethod = (data: any) => {
    if (!editingPaymentMethod) return

    // In a real app, you would send this to your API
    const updatedPaymentMethods = paymentMethods.map((method) => {
      if (method.id === editingPaymentMethod.id) {
        return {
          ...method,
          name: data.name,
          description: data.description || "",
          active: data.active,
          icon: data.icon,
          color: data.color,
        }
      }
      return method
    })

    setPaymentMethods(updatedPaymentMethods)
    setEditingPaymentMethod(undefined)
  }

  const togglePaymentMethodStatus = (id: number) => {
    // In a real app, you would send this to your API
    const updatedPaymentMethods = paymentMethods.map((method) => {
      if (method.id === id) {
        return {
          ...method,
          active: !method.active,
        }
      }
      return method
    })

    setPaymentMethods(updatedPaymentMethods)
  }

  const openAddDialog = () => {
    setEditingPaymentMethod(undefined)
    setOpenDialog(true)
  }

  const openEditDialog = (method: any) => {
    setEditingPaymentMethod({
      id: method.id,
      name: method.name,
      description: method.description,
      active: method.active,
      icon: method.icon,
      color: method.color,
    })
    setOpenDialog(true)
  }

  // Get icon component based on string name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Wallet":
        return <Wallet className="h-4 w-4" />
      case "CreditCard":
        return <CreditCard className="h-4 w-4" />
      case "Smartphone":
        return <Smartphone className="h-4 w-4" />
      case "QrCode":
        return <QrCode className="h-4 w-4" />
      default:
        return <CreditCard className="h-4 w-4" />
    }
  }

  // Calculate summary stats
  const totalMethods = paymentMethods.length
  const activeMethods = paymentMethods.filter((m) => m.active).length

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Metode Pembayaran</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Tambah Metode Pembayaran
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <CreditCard className="mr-2 h-4 w-4" />
              Total Metode Pembayaran
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMethods}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              Metode Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMethods}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeMethods / totalMethods) * 100)}% dari total metode
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daftar Metode Pembayaran</CardTitle>
          <CardDescription>Kelola metode pembayaran yang tersedia di restoran Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${method.color
                            .replace("text", "bg")
                            .replace("100", "200")}`}
                        >
                          {getIconComponent(method.icon)}
                        </div>
                        <div className="flex items-center gap-2">
                          {method.name}
                          <Badge className={method.color}>{method.name.split(" ")[0]}</Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{method.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={method.active}
                          onCheckedChange={() => togglePaymentMethodStatus(method.id)}
                          className="data-[state=checked]:bg-green-500"
                        />
                        <span className={method.active ? "text-green-600" : "text-muted-foreground"}>
                          {method.active ? "Aktif" : "Tidak Aktif"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(method)}>
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

      <PaymentMethodDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingPaymentMethod}
        onSubmit={editingPaymentMethod ? handleEditPaymentMethod : handleAddPaymentMethod}
      />
    </div>
  )
}
