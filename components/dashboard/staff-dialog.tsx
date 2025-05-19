"use client"

import type React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ImagePlus, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  phone: z.string().min(10, {
    message: "Nomor telepon tidak valid.",
  }),
  role: z.string({
    required_error: "Silakan pilih peran.",
  }),
  joinDate: z.string().min(1, {
    message: "Tanggal bergabung harus diisi.",
  }),
  status: z.boolean().default(true),
  address: z.string().optional(),
  photo: z.instanceof(File).optional(),
})

export type StaffFormValues = z.infer<typeof formSchema>

interface StaffDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: StaffFormValues & { id?: number }
  onSubmit: (data: StaffFormValues) => void
}

export function StaffDialog({ open, onOpenChange, initialData, onSubmit }: StaffDialogProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initialData?.photo ? URL.createObjectURL(initialData.photo) : null,
  )

  const form = useForm<StaffFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      role: "",
      joinDate: new Date().toISOString().split("T")[0],
      status: true,
      address: "",
    },
  })

  function handleSubmit(values: StaffFormValues) {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
    setPhotoPreview(null)
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("photo", file)
      setPhotoPreview(URL.createObjectURL(file))
    }
  }

  function removePhoto() {
    form.setValue("photo", undefined)
    setPhotoPreview(null)
    const inputElement = document.getElementById("photo") as HTMLInputElement
    if (inputElement) {
      inputElement.value = ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{initialData?.id ? "Edit Staff" : "Tambah Staff Baru"}</DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Edit informasi staff yang sudah ada."
              : "Tambahkan anggota staff baru ke restoran Anda."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-1 md:col-span-2">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  {photoPreview ? (
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border">
                      <img
                        src={photoPreview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute right-0 top-0 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-muted">
                      <ImagePlus className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <FormLabel htmlFor="photo">Foto Staff</FormLabel>
                    <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="h-10" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Unggah foto dalam format JPG atau PNG. Ukuran maksimal 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Budi Santoso" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="budi@example.com" type="email" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="081234567890" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peran</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Pilih peran" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                        <SelectItem value="Manajer">Manajer</SelectItem>
                        <SelectItem value="Kasir">Kasir</SelectItem>
                        <SelectItem value="Pelayan">Pelayan</SelectItem>
                        <SelectItem value="Koki">Koki</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="joinDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Bergabung</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Alamat lengkap..." className="min-h-[80px] resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Status Aktif</FormLabel>
                        <FormDescription>
                          {field.value ? "Staff ini aktif bekerja" : "Staff ini tidak aktif bekerja"}
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-green-500"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  form.reset()
                  setPhotoPreview(null)
                }}
              >
                Batal
              </Button>
              <Button type="submit">{initialData?.id ? "Simpan Perubahan" : "Tambah Staff"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
