"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { UserSidebar } from "@/components/user/user-sidebar"
import { UserHeader } from "@/components/user/user-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon, Clock, Send, Users, Minus, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

export default function ReservasiPage() {
  const searchParams = useSearchParams()
  const tableId = searchParams.get("table")
  const { toast } = useToast()

  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState<string>("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [guests, setGuests] = useState("2")
  const [selectedTable, setSelectedTable] = useState<string>(tableId || "")
  const [notes, setNotes] = useState("")
  const [selectedItems, setSelectedItems] = useState<{ id: number; name: string; quantity: number }[]>([])

  // Set the selected table when the page loads with a table parameter
  useEffect(() => {
    if (tableId) {
      setSelectedTable(tableId)
    }
  }, [tableId])

  const handleAddItem = (item: { id: number; name: string }) => {
    const existingItem = selectedItems.find((i) => i.id === item.id)

    if (existingItem) {
      setSelectedItems(selectedItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  const handleRemoveItem = (id: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id))
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(id)
      return
    }

    setSelectedItems(selectedItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!date || !time || !name || !email || !phone || !selectedTable) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang diperlukan.",
        variant: "destructive",
      })
      return
    }

    // In a real app, you would send this to your API
    const reservationData = {
      date,
      time,
      name,
      email,
      phone,
      guests: Number(guests),
      tableId: selectedTable,
      notes,
      items: selectedItems,
    }

    console.log("Reservation data:", reservationData)

    // Show success message
    toast({
      title: "Reservasi Berhasil",
      description: `Reservasi Anda untuk tanggal ${format(date, "dd MMMM yyyy", { locale: id })} pukul ${time} telah dikirim. Konfirmasi akan dikirim ke email Anda.`,
    })

    // Reset form
    setDate(new Date())
    setTime("")
    setName("")
    setEmail("")
    setPhone("")
    setGuests("2")
    setSelectedTable("")
    setNotes("")
    setSelectedItems([])
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <UserSidebar />
        <main className="flex-1">
          <UserHeader />

          <div className="mx-auto max-w-4xl p-4 md:p-8">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">Reservasi Meja</h1>
              <p className="mt-2 text-muted-foreground">
                Reservasi meja untuk menikmati pengalaman bersantap yang tak terlupakan
              </p>
            </div>

            <Card className="bg-[url('/placeholder.svg?height=50&width=500')] bg-cover bg-center bg-no-repeat">
              <CardContent className="p-6 md:p-8">
                <div className="rounded-lg bg-white/95 p-6 shadow-lg backdrop-blur-sm">
                  <h2 className="mb-6 text-center text-2xl font-bold">Formulir Reservasi</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Masukkan nama lengkap Anda"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Masukkan nomor telepon Anda"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email Anda"
                        required
                      />
                      <p className="text-xs text-muted-foreground">Konfirmasi reservasi akan dikirim ke email ini</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Tanggal</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(date) => date && setDate(date)}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              locale={id}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label>Waktu</Label>
                        <Select value={time} onValueChange={setTime}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih waktu" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((slot) => (
                              <SelectItem key={slot} value={slot}>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {slot}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="guests">Jumlah Tamu</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Select value={guests} onValueChange={setGuests}>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Jumlah tamu" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num} orang
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Meja</Label>
                        <Select value={selectedTable} onValueChange={setSelectedTable}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih meja" />
                          </SelectTrigger>
                          <SelectContent>
                            {tables.map((table) => (
                              <SelectItem key={table.id} value={table.id.toString()}>
                                {table.name} ({table.capacity} orang) - {table.location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Catatan Khusus (Opsional)</Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Preferensi tempat duduk, perayaan khusus, alergi makanan, dll."
                        className="min-h-[100px] resize-none"
                      />
                    </div>

                    <div>
                      <Label>Pilih Menu (Opsional)</Label>
                      <Tabs defaultValue="food" className="mt-2">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="food">Makanan</TabsTrigger>
                          <TabsTrigger value="drinks">Minuman</TabsTrigger>
                        </TabsList>

                        <TabsContent value="food" className="mt-4">
                          <div className="grid gap-2 sm:grid-cols-2">
                            {foodItems.slice(0, 4).map((item) => (
                              <Button
                                key={item.id}
                                variant="outline"
                                className="justify-between"
                                onClick={() => handleAddItem({ id: item.id, name: item.name })}
                              >
                                <span>{item.name}</span>
                                <span>+</span>
                              </Button>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="drinks" className="mt-4">
                          <div className="grid gap-2 sm:grid-cols-2">
                            {drinkItems.slice(0, 4).map((item) => (
                              <Button
                                key={item.id}
                                variant="outline"
                                className="justify-between"
                                onClick={() => handleAddItem({ id: item.id, name: item.name })}
                              >
                                <span>{item.name}</span>
                                <span>+</span>
                              </Button>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>

                      {selectedItems.length > 0 && (
                        <div className="mt-4 rounded-lg border p-4">
                          <h4 className="font-medium">Menu yang Dipilih:</h4>
                          <ul className="mt-2 space-y-2">
                            {selectedItems.map((item) => (
                              <li key={item.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span>{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                  <span>{item.name}</span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-red-500 hover:text-red-700"
                                  onClick={() => handleRemoveItem(item.id)}
                                >
                                  ×
                                </Button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="mr-2 h-4 w-4" />
                      Kirim Reservasi
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 rounded-lg bg-muted p-6">
              <h2 className="text-xl font-bold">Informasi Reservasi</h2>
              <div className="mt-4 space-y-4">
                <p>
                  <strong>Kebijakan Reservasi:</strong> Reservasi hanya valid selama 15 menit dari waktu yang
                  ditentukan. Setelah itu, meja akan diberikan kepada pelanggan lain.
                </p>
                <p>
                  <strong>Pembatalan:</strong> Pembatalan dapat dilakukan minimal 2 jam sebelum waktu reservasi tanpa
                  biaya.
                </p>
                <p>
                  <strong>Konfirmasi:</strong> Anda akan menerima email konfirmasi setelah reservasi berhasil dibuat.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

// Sample data
const timeSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
]

const tables = [
  {
    id: 1,
    name: "Meja 1",
    capacity: 2,
    location: "Indoor",
  },
  {
    id: 2,
    name: "Meja 2",
    capacity: 4,
    location: "Indoor",
  },
  {
    id: 3,
    name: "Meja 3",
    capacity: 6,
    location: "Outdoor",
  },
  {
    id: 4,
    name: "Meja 4",
    capacity: 4,
    location: "Outdoor",
  },
  {
    id: 5,
    name: "VIP 1",
    capacity: 8,
    location: "VIP",
  },
  {
    id: 6,
    name: "VIP 2",
    capacity: 12,
    location: "VIP",
  },
]

// Sample menu data (simplified from menu page)
const foodItems = [
  { id: 1, name: "Nasi Goreng Spesial", price: 45000 },
  { id: 2, name: "Mie Goreng Seafood", price: 50000 },
  { id: 3, name: "Sate Ayam", price: 35000 },
  { id: 4, name: "Ayam Bakar", price: 55000 },
]

const drinkItems = [
  { id: 101, name: "Es Teh Manis", price: 10000 },
  { id: 102, name: "Jus Alpukat", price: 15000 },
  { id: 103, name: "Es Jeruk", price: 12000 },
  { id: 104, name: "Kopi Hitam", price: 15000 },
]
