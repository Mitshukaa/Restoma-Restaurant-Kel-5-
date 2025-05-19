"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Filter, Plus } from "lucide-react"
import { ReservationDialog, type ReservationFormValues } from "@/components/dashboard/reservation-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function ReservasiPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingReservation, setEditingReservation] = useState<(ReservationFormValues & { id: number }) | undefined>()

  // Sample reservation data
  const [reservations, setReservations] = useState([
    {
      id: 1,
      name: "Budi Santoso",
      table: "Meja 3",
      guests: 4,
      date: "17 Mei 2025",
      time: "19:00",
      status: "Dikonfirmasi",
      contact: "081234567890",
      duration: 2,
    },
    {
      id: 2,
      name: "Siti Rahayu",
      table: "Meja 5",
      guests: 6,
      date: "17 Mei 2025",
      time: "20:00",
      status: "Menunggu",
      contact: "081234567891",
      duration: 3,
    },
    {
      id: 3,
      name: "Ahmad Hidayat",
      table: "Meja 1",
      guests: 2,
      date: "18 Mei 2025",
      time: "18:30",
      status: "Dikonfirmasi",
      contact: "081234567892",
      duration: 2,
    },
    {
      id: 4,
      name: "Dewi Lestari",
      table: "Meja 7",
      guests: 4,
      date: "18 Mei 2025",
      time: "19:30",
      status: "Dikonfirmasi",
      contact: "081234567893",
      duration: 2,
    },
    {
      id: 5,
      name: "Rudi Hartono",
      table: "Meja 2",
      guests: 2,
      date: "19 Mei 2025",
      time: "20:00",
      status: "Menunggu",
      contact: "081234567894",
      duration: 1,
    },
    {
      id: 6,
      name: "Rina Wijaya",
      table: "VIP 1",
      guests: 8,
      date: "20 Mei 2025",
      time: "19:00",
      status: "Dikonfirmasi",
      contact: "081234567895",
      duration: 3,
    },
    {
      id: 7,
      name: "Joko Susilo",
      table: "Meja 4",
      guests: 3,
      date: "17 Mei 2025",
      time: "18:00",
      status: "Dibatalkan",
      contact: "081234567896",
      duration: 2,
    },
  ])

  const handleAddReservation = (data: ReservationFormValues) => {
    // In a real app, you would send this to your API
    const newReservation = {
      id: reservations.length + 1,
      name: data.name,
      table: data.table,
      guests: data.guests,
      date: data.date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      time: data.time,
      status: "Menunggu",
      contact: data.contact,
      duration: data.duration,
    }
    setReservations([...reservations, newReservation])
  }

  const handleEditReservation = (data: ReservationFormValues) => {
    if (!editingReservation) return

    // In a real app, you would send this to your API
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === editingReservation.id) {
        return {
          ...reservation,
          name: data.name,
          table: data.table,
          guests: data.guests,
          date: data.date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          time: data.time,
          contact: data.contact,
          duration: data.duration,
        }
      }
      return reservation
    })

    setReservations(updatedReservations)
    setEditingReservation(undefined)
  }

  const openAddDialog = () => {
    setEditingReservation(undefined)
    setOpenDialog(true)
  }

  const openEditDialog = (reservation: any) => {
    // Convert string date to Date object
    const dateParts = reservation.date.split(" ")
    const day = Number.parseInt(dateParts[0])
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ]
    const month = monthNames.indexOf(dateParts[1])
    const year = Number.parseInt(dateParts[2])

    setEditingReservation({
      id: reservation.id,
      name: reservation.name,
      contact: reservation.contact,
      table: reservation.table,
      guests: reservation.guests,
      date: new Date(year, month, day),
      time: reservation.time,
      duration: reservation.duration,
      notes: "",
    })
    setOpenDialog(true)
  }

  // Calculate summary stats
  const todayReservations = reservations.filter((r) => r.date === "17 Mei 2025").length
  const pendingReservations = reservations.filter((r) => r.status === "Menunggu").length
  const confirmedReservations = reservations.filter((r) => r.status === "Dikonfirmasi").length

  // Status for filtering
  const statuses = ["Semua", "Menunggu", "Dikonfirmasi", "Dibatalkan"]
  const [selectedStatus, setSelectedStatus] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter reservations
  const filteredReservations = reservations.filter((reservation) => {
    const matchesStatus = selectedStatus === "Semua" || reservation.status === selectedStatus
    const matchesSearch =
      reservation.name.toLowerCase().includes(searchQuery.toLowerCase()) || reservation.contact.includes(searchQuery)
    return matchesStatus && matchesSearch
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Reservasi</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Tambah Reservasi
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <Calendar className="mr-2 h-4 w-4" />
              Reservasi Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayReservations}</div>
            <p className="text-xs text-muted-foreground">17 Mei 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
              Menunggu Konfirmasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReservations}</div>
            <p className="text-xs text-muted-foreground">Perlu ditindaklanjuti</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              Reservasi Terkonfirmasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confirmedReservations}</div>
            <p className="text-xs text-muted-foreground">Siap untuk dilayani</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 md:max-w-sm">
          <Input
            type="search"
            placeholder="Cari nama atau nomor telepon..."
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
          <CardTitle>Daftar Reservasi</CardTitle>
          <CardDescription>
            {filteredReservations.length} reservasi{" "}
            {selectedStatus !== "Semua" ? `dengan status ${selectedStatus}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Meja</TableHead>
                  <TableHead>Jumlah Tamu</TableHead>
                  <TableHead>Tanggal & Waktu</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Tidak ada reservasi yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{reservation.name}</span>
                          <span className="text-xs text-muted-foreground">{reservation.contact}</span>
                        </div>
                      </TableCell>
                      <TableCell>{reservation.table}</TableCell>
                      <TableCell>{reservation.guests} orang</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{reservation.date}</span>
                          <span className="text-xs text-muted-foreground">
                            {reservation.time} ({reservation.duration} jam)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            reservation.status === "Dikonfirmasi"
                              ? "bg-green-100 text-green-800"
                              : reservation.status === "Menunggu"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {reservation.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(reservation)}>
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

      <ReservationDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingReservation}
        onSubmit={editingReservation ? handleEditReservation : handleAddReservation}
      />
    </div>
  )
}
