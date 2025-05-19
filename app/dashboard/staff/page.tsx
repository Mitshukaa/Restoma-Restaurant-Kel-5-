"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search, UserCog } from "lucide-react"
import { StaffDialog, type StaffFormValues } from "@/components/dashboard/staff-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StaffPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingStaff, setEditingStaff] = useState<(StaffFormValues & { id: number }) | undefined>()

  // Sample staff data
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "Ahmad Rizki",
      email: "ahmad@restoran.com",
      phone: "081234567890",
      role: "Admin",
      joinDate: "2023-01-15",
      status: "Aktif",
      address: "Jl. Merdeka No. 123, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Budi Santoso",
      email: "budi@restoran.com",
      phone: "081234567891",
      role: "Manajer",
      joinDate: "2023-02-20",
      status: "Aktif",
      address: "Jl. Sudirman No. 45, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Citra Dewi",
      email: "citra@restoran.com",
      phone: "081234567892",
      role: "Kasir",
      joinDate: "2023-03-10",
      status: "Aktif",
      address: "Jl. Gatot Subroto No. 67, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Deni Hermawan",
      email: "deni@restoran.com",
      phone: "081234567893",
      role: "Koki",
      joinDate: "2023-04-05",
      status: "Aktif",
      address: "Jl. Pahlawan No. 89, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 5,
      name: "Eka Putri",
      email: "eka@restoran.com",
      phone: "081234567894",
      role: "Pelayan",
      joinDate: "2023-05-12",
      status: "Aktif",
      address: "Jl. Diponegoro No. 34, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 6,
      name: "Faisal Rahman",
      email: "faisal@restoran.com",
      phone: "081234567895",
      role: "Developer",
      joinDate: "2023-06-18",
      status: "Aktif",
      address: "Jl. Asia Afrika No. 56, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 7,
      name: "Gita Nirmala",
      email: "gita@restoran.com",
      phone: "081234567896",
      role: "Pelayan",
      joinDate: "2023-07-22",
      status: "Tidak Aktif",
      address: "Jl. Cendrawasih No. 78, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 8,
      name: "Hadi Santoso",
      email: "hadi@restoran.com",
      phone: "081234567897",
      role: "Koki",
      joinDate: "2023-08-30",
      status: "Aktif",
      address: "Jl. Kebon Sirih No. 90, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 9,
      name: "Indah Permata",
      email: "indah@restoran.com",
      phone: "081234567898",
      role: "Developer",
      joinDate: "2023-09-14",
      status: "Aktif",
      address: "Jl. Thamrin No. 12, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 10,
      name: "Joko Widodo",
      email: "joko@restoran.com",
      phone: "081234567899",
      role: "Admin",
      joinDate: "2023-10-25",
      status: "Tidak Aktif",
      address: "Jl. Veteran No. 23, Jakarta",
      photo: "/placeholder.svg?height=80&width=80",
    },
  ])

  const handleAddStaff = (data: StaffFormValues) => {
    // In a real app, you would send this to your API
    const newStaff = {
      id: staffMembers.length + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      joinDate: data.joinDate,
      status: data.status ? "Aktif" : "Tidak Aktif",
      address: data.address || "",
      photo: data.photo ? URL.createObjectURL(data.photo) : "/placeholder.svg?height=80&width=80",
    }
    setStaffMembers([...staffMembers, newStaff])
  }

  const handleEditStaff = (data: StaffFormValues) => {
    if (!editingStaff) return

    // In a real app, you would send this to your API
    const updatedStaffMembers = staffMembers.map((staff) => {
      if (staff.id === editingStaff.id) {
        return {
          ...staff,
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          joinDate: data.joinDate,
          status: data.status ? "Aktif" : "Tidak Aktif",
          address: data.address || "",
          photo: data.photo ? URL.createObjectURL(data.photo) : staff.photo,
        }
      }
      return staff
    })

    setStaffMembers(updatedStaffMembers)
    setEditingStaff(undefined)
  }

  const openAddDialog = () => {
    setEditingStaff(undefined)
    setOpenDialog(true)
  }

  const openEditDialog = (staff: any) => {
    setEditingStaff({
      id: staff.id,
      name: staff.name,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      joinDate: staff.joinDate,
      status: staff.status === "Aktif",
      address: staff.address,
    })
    setOpenDialog(true)
  }

  // Calculate summary stats
  const totalStaff = staffMembers.length
  const activeStaff = staffMembers.filter((s) => s.status === "Aktif").length
  const inactiveStaff = staffMembers.filter((s) => s.status === "Tidak Aktif").length

  // Roles for filtering
  const roles = ["Semua", "Admin", "Developer", "Manajer", "Kasir", "Pelayan", "Koki"]
  const [selectedRole, setSelectedRole] = useState("Semua")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter staff members
  const filteredStaffMembers = staffMembers.filter((staff) => {
    const matchesRole = selectedRole === "Semua" || staff.role === selectedRole
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone.includes(searchQuery)
    return matchesRole && matchesSearch
  })

  // Group staff by role for summary
  const staffByRole = roles
    .filter((role) => role !== "Semua")
    .map((role) => ({
      role,
      count: staffMembers.filter((staff) => staff.role === role).length,
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-3xl font-bold tracking-tight">Staff</h2>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 size-4" />
          Tambah Staff
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <UserCog className="mr-2 h-4 w-4" />
              Total Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStaff}</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {staffByRole.map((item) => (
                <Badge key={item.role} variant="outline" className="font-normal">
                  {item.role}: {item.count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              Staff Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStaff}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((activeStaff / totalStaff) * 100)}% dari total staff
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
              Staff Tidak Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveStaff}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((inactiveStaff / totalStaff) * 100)}% dari total staff
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
              Filter Peran
              {selectedRole !== "Semua" && (
                <Badge variant="secondary" className="ml-2">
                  {selectedRole}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter Peran</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {roles.map((role) => (
              <DropdownMenuItem
                key={role}
                className={selectedRole === role ? "bg-muted" : ""}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Daftar Staff</CardTitle>
          <CardDescription>
            {filteredStaffMembers.length} staff {selectedRole !== "Semua" ? `dengan peran ${selectedRole}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Peran</TableHead>
                  <TableHead>Tanggal Bergabung</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaffMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Tidak ada staff yang ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaffMembers.map((staff) => (
                    <TableRow key={staff.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={staff.photo || "/placeholder.svg"} alt={staff.name} />
                            <AvatarFallback>
                              {staff.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{staff.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">{staff.email}</span>
                          <span className="text-xs text-muted-foreground">{staff.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`font-normal ${
                            staff.role === "Admin"
                              ? "bg-purple-50"
                              : staff.role === "Developer"
                                ? "bg-blue-50"
                                : staff.role === "Manajer"
                                  ? "bg-amber-50"
                                  : staff.role === "Kasir"
                                    ? "bg-green-50"
                                    : staff.role === "Pelayan"
                                      ? "bg-cyan-50"
                                      : "bg-red-50"
                          }`}
                        >
                          {staff.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(staff.joinDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            staff.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {staff.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(staff)}>
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

      <StaffDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingStaff}
        onSubmit={editingStaff ? handleEditStaff : handleAddStaff}
      />
    </div>
  )
}
