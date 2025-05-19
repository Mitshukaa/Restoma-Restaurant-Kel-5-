"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ImagePlus, X } from "lucide-react"

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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama menu harus minimal 2 karakter.",
  }),
  category: z.string({
    required_error: "Silakan pilih kategori menu.",
  }),
  price: z.coerce.number().min(1000, {
    message: "Harga harus minimal Rp 1.000.",
  }),
  description: z.string().optional(),
  status: z.boolean().default(true),
  image: z.instanceof(File).optional(),
})

export type MenuFormValues = z.infer<typeof formSchema>

interface MenuDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: MenuFormValues & { id?: number }
  onSubmit: (data: MenuFormValues) => void
}

export function MenuDialog({ open, onOpenChange, initialData, onSubmit }: MenuDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image ? URL.createObjectURL(initialData.image) : null,
  )

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      category: "",
      price: 0,
      description: "",
      status: true,
    },
  })

  function handleSubmit(values: MenuFormValues) {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
    setImagePreview(null)
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("image", file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  function removeImage() {
    form.setValue("image", undefined)
    setImagePreview(null)
    const inputElement = document.getElementById("image") as HTMLInputElement
    if (inputElement) {
      inputElement.value = ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{initialData?.id ? "Edit Menu" : "Tambah Menu Baru"}</DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Edit informasi menu yang sudah ada."
              : "Tambahkan menu baru ke daftar menu restoran Anda."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Menu</FormLabel>
                      <FormControl>
                        <Input placeholder="Nasi Goreng Spesial" {...field} className="h-10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Makanan Utama">Makanan Utama</SelectItem>
                        <SelectItem value="Makanan Pembuka">Makanan Pembuka</SelectItem>
                        <SelectItem value="Makanan Penutup">Makanan Penutup</SelectItem>
                        <SelectItem value="Minuman">Minuman</SelectItem>
                        <SelectItem value="Camilan">Camilan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga (Rp)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="45000" {...field} className="h-10" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Deskripsi menu..." className="min-h-[80px] resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <FormLabel>Gambar Menu</FormLabel>
                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                  {imagePreview ? (
                    <div className="relative h-32 w-32 overflow-hidden rounded-md border">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex h-32 w-32 items-center justify-center rounded-md border bg-muted">
                      <ImagePlus className="h-10 w-10 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="h-10" />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Unggah gambar menu dalam format JPG, PNG, atau WebP. Ukuran maksimal 2MB.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Status Ketersediaan</FormLabel>
                        <FormDescription>
                          {field.value ? "Menu ini tersedia untuk dipesan" : "Menu ini tidak tersedia untuk dipesan"}
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
                  setImagePreview(null)
                }}
              >
                Batal
              </Button>
              <Button type="submit">{initialData?.id ? "Simpan Perubahan" : "Tambah Menu"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
