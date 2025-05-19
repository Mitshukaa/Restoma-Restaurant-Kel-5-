"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, TableIcon } from "lucide-react"
import { TableDialog, type TableFormValues } from "@/components/dashboard/table-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MejaPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingTable, setEditingTable] = useState<(TableFormValues & { id: number }) | undefined>()

  // Sample table data
  const [tables, setTables] = useState([
    { id: 1, number: "Meja 1", capacity: 4, status: "Tersedia", location: "Indoor" },
    { id: 2, number: "Meja 2", capacity: 2, status: "Terisi", location: "Indoor" },
    { id: 3, number: "Meja 3", capacity: 6, status: "Tersedia", location: "Outdoor" },
    { id: 4, number: "Meja 4", capacity: 4, status: "Tersedia", location: "Indoor" },
    { id: 5, number: "Meja 5", capacity: 8, status: "Terisi", location: "Outdoor" },
    { id: 6, number: "Meja 6", capacity: 2, status: "Tersedia", location: "Indoor" },
    { id: 7, number: "Meja 7", capacity: 4, status: "Terisi", location: "Indoor" },
    { id: 8, number: "Meja 8", capacity: 6, status: "Tersedia", location: "Outdoor" },
    { id: 9, number: "VIP 1", capacity: 10, status: "Tersedia", location: "VIP" },
    { id: 10, number: "Rooftop 1", capacity: 6, status: "Terisi", location: "Rooftop" },
  ])

  const handleAddTable = (data: TableFormValues) => {
    // In a real app, you would send this to your API
    const newTable = {
      id: tables.length + 1,
      number: data.number,
      capacity: data.capacity,
      location: data.location,
      status: data.status ? "Tersedia" : "Terisi",
    }
    setTables([...tables, newTable])
  }

  const handleEditTable = (data: TableFormValues) => {
    if (!editingTable) return

    // In a real app, you would send this to your API
    const updatedTables = tables.map((table) => {
      if (table.id === editingTable.id) {
        return {
          ...table,
          number: data.number,
          capacity: data.capacity,
          location: data.location,
          status: data.status ? "Tersedia" : "Terisi",
        }
      }
      return table
    })

    setTables(updatedTables)
    setEditingTable(undefined)
  }

  const openAddDialog = () => {
    setEditingTable(undefined)
    setOpenDialog(true)
  }

  const openEditDialog = (table: any) => {
    setEditingTable({
      id: table.id,
      number: table.number,
      capacity: table.capacity,
      location: table.location,
      status: table.status === "Tersedia",
    })
    setOpenDialog(true)
  }

  // Calculate summary stats
  const totalTables = tables.length
  const availableTables = tables.filter((t) => t.status === "Tersedia").length
  const occupiedTables = tables.filter((t) => t.status === "Terisi").length

  // Locations for filtering
  const locations = ["Semua", "Indoor", "Outdoor", "VIP", "Rooftop"]
  const [selectedLocation, setSelectedLocation] = useState("Semua")

  // Filter tables
  const filteredTables = tables.filter((table) => {
    return selectedLocation === "Semua" || table.location === selectedLocation
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Meja</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Tambah Meja
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Meja</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTables}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              Meja Tersedia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTables}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((availableTables / totalTables) * 100)}% dari total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
              Meja Terisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupiedTables}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((occupiedTables / totalTables) * 100)}% dari total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter Lokasi
              {selectedLocation !== "Semua" && (
                <Badge variant="secondary" className="ml-2">
                  {selectedLocation}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Lokasi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {locations.map((location) => (
              <DropdownMenuItem
                key={location}
                className={selectedLocation === location ? "bg-muted" : ""}
                onClick={() => setSelectedLocation(location)}
              >
                {location}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daftar Meja</CardTitle>
          <CardDescription>
            {filteredTables.length} meja {selectedLocation !== "Semua" ? `di lokasi ${selectedLocation}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nomor</TableHead>
                  <TableHead>Kapasitas</TableHead>
                  <TableHead>Lokasi</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTables.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Tidak ada meja yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTables.map((table) => (
                    <TableRow key={table.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-md ${
                              table.status === "Tersedia"
                                ? "bg-green-100 text-green-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            <TableIcon className="h-5 w-5" />
                          </div>
                          {table.number}
                        </div>
                      </TableCell>
                      <TableCell>{table.capacity} orang</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${
                            table.location === "Indoor"
                              ? "bg-blue-50"
                              : table.location === "Outdoor"
                                ? "bg-green-50"
                                : table.location === "VIP"
                                  ? "bg-purple-50"
                                  : "bg-amber-50"
                          }`}
                        >
                          {table.location}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            table.status === "Tersedia" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {table.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(table)}>
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

      <TableDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingTable}
        onSubmit={editingTable ? handleEditTable : handleAddTable}
      />
    </div>
  )
}
