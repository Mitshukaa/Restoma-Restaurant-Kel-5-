"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Globe, Lock, Moon, Sun, User, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [photoPreview, setPhotoPreview] = useState<string | null>("/placeholder.svg?height=100&width=100")

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  const removePhoto = () => {
    setPhotoPreview("/placeholder.svg?height=100&width=100")
    const inputElement = document.getElementById("photo") as HTMLInputElement
    if (inputElement) {
      inputElement.value = ""
    }
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profil Diperbarui",
      description: "Perubahan profil Anda telah disimpan.",
    })
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Password Diperbarui",
      description: "Password Anda telah berhasil diperbarui.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Preferensi Notifikasi Disimpan",
      description: "Pengaturan notifikasi Anda telah diperbarui.",
    })
  }

  const handleSaveAppearance = () => {
    toast({
      title: "Preferensi Tampilan Disimpan",
      description: "Pengaturan tampilan Anda telah diperbarui.",
    })
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Pengaturan</h1>
        <p className="mt-2 text-muted-foreground">Kelola preferensi dan informasi akun Anda</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profil</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Akun</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifikasi</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span>Tampilan</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>Kelola informasi profil Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={photoPreview || ""} alt="Profile" />
                        <AvatarFallback>BS</AvatarFallback>
                      </Avatar>
                      {photoPreview !== "/placeholder.svg?height=100&width=100" && (
                        <button
                          type="button"
                          onClick={removePhoto}
                          className="absolute right-0 top-0 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col items-center">
                      <Label htmlFor="photo" className="cursor-pointer text-sm font-medium text-primary">
                        Ubah Foto
                      </Label>
                      <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      <p className="text-xs text-muted-foreground">JPG, GIF atau PNG. Maks 2MB.</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama</Label>
                        <Input id="name" defaultValue="Budi Santoso" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <Input id="phone" defaultValue="081234567890" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="budi@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Alamat</Label>
                      <Textarea
                        id="address"
                        className="min-h-[80px] resize-none"
                        defaultValue="Jl. Merdeka No. 123, Jakarta"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Simpan Perubahan</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferensi Makanan</CardTitle>
              <CardDescription>Beri tahu kami preferensi makanan Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dietary">Preferensi Diet</Label>
                <Select defaultValue="none">
                  <SelectTrigger id="dietary">
                    <SelectValue placeholder="Pilih preferensi diet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Tidak Ada</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="gluten-free">Bebas Gluten</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alergi Makanan</Label>
                <Textarea
                  id="allergies"
                  placeholder="Masukkan alergi makanan yang Anda miliki (jika ada)"
                  className="min-h-[80px] resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="favorites">Makanan Favorit</Label>
                <Textarea
                  id="favorites"
                  placeholder="Apa makanan favorit Anda di restoran kami?"
                  className="min-h-[80px] resize-none"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Simpan Preferensi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>Perbarui password akun Anda untuk keamanan yang lebih baik</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Password Saat Ini</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input id="new-password" type="password" />
                  <p className="text-xs text-muted-foreground">
                    Password harus minimal 8 karakter dan mengandung huruf, angka, dan simbol.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                  <Input id="confirm-password" type="password" />
                </div>

                <Button type="submit">Perbarui Password</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sesi Aktif</CardTitle>
              <CardDescription>Kelola perangkat yang saat ini masuk ke akun Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="font-medium">Perangkat Ini</p>
                    <p className="text-sm text-muted-foreground">
                      Chrome di Windows • Jakarta, Indonesia • Terakhir aktif sekarang
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Perangkat Saat Ini
                  </Button>
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="font-medium">iPhone 13</p>
                    <p className="text-sm text-muted-foreground">
                      Safari di iOS • Jakarta, Indonesia • Terakhir aktif 2 jam yang lalu
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Keluar
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Keluar dari Semua Perangkat
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Kelola preferensi notifikasi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email</h3>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Konfirmasi Reservasi</Label>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan email konfirmasi saat reservasi berhasil dibuat
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Pengingat Reservasi</Label>
                      <p className="text-sm text-muted-foreground">Dapatkan pengingat sebelum waktu reservasi Anda</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Promosi dan Penawaran</Label>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan informasi tentang promosi dan penawaran khusus
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Aplikasi</h3>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Notifikasi Push</Label>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan notifikasi push untuk perangkat seluler Anda
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Suara Notifikasi</Label>
                      <p className="text-sm text-muted-foreground">Aktifkan suara untuk notifikasi</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSaveNotifications}>
                Simpan Preferensi
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tampilan</CardTitle>
              <CardDescription>Sesuaikan tampilan aplikasi sesuai preferensi Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <Sun className="mr-2 h-4 w-4" />
                    Terang
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Moon className="mr-2 h-4 w-4" />
                    Gelap
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="mr-2 flex h-4 w-4 items-center justify-center overflow-hidden rounded-full">
                      <Sun className="h-4 w-4" />
                      <Moon className="ml-1 h-4 w-4" />
                    </div>
                    Sistem
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bahasa</Label>
                <Select defaultValue="id">
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        Bahasa Indonesia
                      </div>
                    </SelectItem>
                    <SelectItem value="en">
                      <div className="flex items-center">
                        <Globe className="mr-2 h-4 w-4" />
                        English
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ukuran Font</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2 text-xs">A</span>
                    Kecil
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2 text-sm">A</span>
                    Sedang
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <span className="mr-2 text-base">A</span>
                    Besar
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Animasi</Label>
                    <p className="text-sm text-muted-foreground">Aktifkan animasi di seluruh aplikasi</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSaveAppearance}>
                Simpan Preferensi
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
