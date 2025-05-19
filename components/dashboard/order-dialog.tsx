"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const formSchema = z.object({
  table: z.string({
    required_error: "Silakan pilih meja.",
  }),
  customer: z.string().min(2, {
    message: "Nama pelanggan harus minimal 2 karakter.",
  }),
  items: z.array(
    z.object({
      name: z.string().min(1, { message: "Nama item harus diisi" }),
      quantity: z.number().min(1, { message: "Jumlah minimal 1" }),
      price: z.number().min(1000, { message: "Harga minimal Rp 1.000" }),
    }),
  ),
  status: z.string().optional(),
})

export type OrderFormValues = z.infer<typeof formSchema>

interface OrderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: OrderFormValues & { id?: number }
  onSubmit: (data: OrderFormValues) => void
}

export function OrderDialog({ open, onOpenChange, initialData, onSubmit }: OrderDialogProps) {
  // Sample menu items for selection
  const menuItems = [
    { name: "Nasi Goreng Spesial", price: 45000 },
    { name: "Mie Goreng Seafood", price: 50000 },
    { name: "Sate Ayam", price: 35000 },
    { name: "Ayam Bakar", price: 55000 },
    { name: "Soto Ayam", price: 30000 },
    { name: "Es Teh Manis", price: 10000 },
    { name: "Jus Alpukat", price: 15000 },
    { name: "Es Jeruk", price: 12000 },
  ]

  // Sample tables
  const tables = ["Meja 1", "Meja 2", "Meja 3", "Meja 4", "Meja 5", "Meja 6", "Meja 7", "Meja 8", "VIP 1", "Rooftop 1"]

  // Sample customers
  const customers = ["Budi Santoso", "Siti Rahayu", "Ahmad Hidayat", "Dewi Lestari", "Rudi Hartono", "Rina Wijaya"]

  // Sample statuses
  const statuses = ["Menunggu", "Diproses", "Selesai"]

  const [selectedMenuItem, setSelectedMenuItem] = useState("")

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      table: "",
      customer: "",
      items: [],
      status: "Menunggu",
    },
  })

  function handleSubmit(values: OrderFormValues) {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  function addItem() {
    if (!selectedMenuItem) return

    const menuItem = menuItems.find((item) => item.name === selectedMenuItem)
    if (!menuItem) return

    const currentItems = form.getValues("items") || []
    const existingItemIndex = currentItems.findIndex((item) => item.name === menuItem.name)

    if (existingItemIndex >= 0) {
      // Update quantity if item already exists
      const updatedItems = [...currentItems]
      updatedItems[existingItemIndex].quantity += 1
      form.setValue("items", updatedItems)
    } else {
      // Add new item
      form.setValue("items", [...currentItems, { name: menuItem.name, quantity: 1, price: menuItem.price }])
    }

    setSelectedMenuItem("")
  }

  function removeItem(index: number) {
    const currentItems = form.getValues("items")
    form.setValue(
      "items",
      currentItems.filter((_, i) => i !== index),
    )
  }

  function updateQuantity(index: number, newQuantity: number) {
    if (newQuantity < 1) return

    const currentItems = form.getValues("items")
    const updatedItems = [...currentItems]
    updatedItems[index].quantity = newQuantity
    form.setValue("items", updatedItems)
  }

  // Calculate total
  const items = form.watch("items") || []
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{initialData?.id ? "Edit Pesanan" : "Tambah Pesanan Baru"}</DialogTitle>
          <DialogDescription>
            {initialData?.id ? "Edit informasi pesanan yang sudah ada." : "Tambahkan pesanan baru ke sistem."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="table"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meja</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Pilih meja" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tables.map((table) => (
                          <SelectItem key={table} value={table}>
                            {table}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pelanggan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Pilih pelanggan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer} value={customer}>
                            {customer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {initialData?.id && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <FormLabel>Tambah Item</FormLabel>
                  <Select onValueChange={setSelectedMenuItem} value={selectedMenuItem}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Pilih menu" />
                    </SelectTrigger>
                    <SelectContent>
                      {menuItems.map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          {item.name} - Rp {item.price.toLocaleString("id-ID")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" onClick={addItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Subtotal</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Belum ada item yang ditambahkan.
                        </TableCell>
                      </TableRow>
                    ) : (
                      items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>Rp {item.price.toLocaleString("id-ID")}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => removeItem(index)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-medium">
                        Total:
                      </TableCell>
                      <TableCell className="font-bold">Rp {total.toLocaleString("id-ID")}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  form.reset()
                }}
              >
                Batal
              </Button>
              <Button type="submit" disabled={items.length === 0}>
                {initialData?.id ? "Simpan Perubahan" : "Tambah Pesanan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
