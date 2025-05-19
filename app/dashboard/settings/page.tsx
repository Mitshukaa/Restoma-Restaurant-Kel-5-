"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Bell, Globe, Lock, Moon, Sun, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  phone: z.string().min(10, {
    message: "Nomor telepon tidak valid.",
  }),
  bio: z.string().optional(),
  photo: z.instanceof(File).optional(),
})

const accountFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password harus minimal 8 karakter.",
    }),
    newPassword: z.string().min(8, {
      message: "Password baru harus minimal 8 karakter.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Konfirmasi password harus minimal 8 karakter.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password baru dan konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  })

type ProfileFormValues = z.infer<typeof profileFormSchema>
type AccountFormValues = z.infer<typeof accountFormSchema>

export default function SettingsPage() {
  const [photoPreview, setPhotoPreview] = useState<string | null>("/placeholder.svg?height=100&width=100")

  // Profile form
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Admin Restoran",
      email: "admin@restoran.com",
      phone: "081234567890",
      bio: "Manajer restoran dengan pengalaman 5 tahun dalam industri kuliner.",
    },
  })

  // Account form
  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onProfileSubmit(data: ProfileFormValues) {
    // In a real app, you would send this to your API
    console.log("Profile data:", data)
    // Show success message
    alert("Profil berhasil diperbarui!")
  }

  function onAccountSubmit(data: AccountFormValues) {
    // In a real app, you would send this to your API
    console.log("Account data:", data)
    // Show success message
    alert("Password berhasil diperbarui!")
    accountForm.reset()
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      profileForm.setValue("photo", file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  function removePhoto() {
    profileForm.setValue("photo", undefined)
    setPhotoPreview("/placeholder.svg?height=100&width=100")
    const inputElement = document.getElementById("photo") as HTMLInputElement
    if (inputElement) {
      inputElement.value = ""
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
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
              <CardDescription>
                Kelola informasi profil Anda. Informasi ini akan ditampilkan secara publik.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="flex flex-col gap-6 md:flex-row">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={photoPreview || ""} alt="Profile" />
                          <AvatarFallback>AR</AvatarFallback>
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
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        <p className="text-xs text-muted-foreground">JPG, GIF atau PNG. Maks 2MB.</p>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                              <Input placeholder="Nama Anda" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="email@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nomor Telepon</FormLabel>
                              <FormControl>
                                <Input placeholder="081234567890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Ceritakan sedikit tentang diri Anda"
                                className="min-h-[120px] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Bio Anda akan ditampilkan di profil Anda dan dapat dilihat oleh anggota tim lainnya.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Simpan Perubahan</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Pekerjaan</CardTitle>
              <CardDescription>Informasi tentang posisi dan departemen Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Posisi</Label>
                  <Input value="Manajer Restoran" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Departemen</Label>
                  <Input value="Manajemen" readOnly />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tanggal Bergabung</Label>
                  <Input value="15 Januari 2023" readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Atasan Langsung</Label>
                  <Input value="Direktur Operasional" readOnly />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Untuk mengubah informasi pekerjaan, silakan hubungi departemen HR.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>Perbarui password akun Anda untuk keamanan yang lebih baik.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-4">
                  <FormField
                    control={accountForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Saat Ini</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Baru</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>
                          Password harus minimal 8 karakter dan mengandung huruf, angka, dan simbol.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Konfirmasi Password Baru</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">Perbarui Password</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sesi Aktif</CardTitle>
              <CardDescription>Kelola perangkat yang saat ini masuk ke akun Anda.</CardDescription>
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
              <CardDescription>Kelola preferensi notifikasi Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email</h3>
                <Separator />
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Reservasi Baru</Label>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan notifikasi saat ada reservasi baru yang dibuat.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Transaksi Baru</Label>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan notifikasi saat ada transaksi baru yang dibuat.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Laporan Mingguan</Label>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan laporan mingguan tentang kinerja restoran Anda.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Pembaruan Sistem</Label>
                      <p className="text-sm text-muted-foreground">
                        Dapatkan notifikasi tentang pembaruan dan fitur baru.
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
                        Aktifkan notifikasi push untuk perangkat seluler Anda.
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Suara Notifikasi</Label>
                      <p className="text-sm text-muted-foreground">Aktifkan suara untuk notifikasi.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Simpan Preferensi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tampilan</CardTitle>
              <CardDescription>Sesuaikan tampilan aplikasi sesuai preferensi Anda.</CardDescription>
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
                    <p className="text-sm text-muted-foreground">Aktifkan animasi di seluruh aplikasi.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Simpan Preferensi</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
