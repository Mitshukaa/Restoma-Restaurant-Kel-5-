"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama kategori harus minimal 2 karakter.",
  }),
  description: z.string().optional(),
  color: z.string({
    required_error: "Silakan pilih warna untuk kategori.",
  }),
})

export type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: CategoryFormValues & { id?: number }
  onSubmit: (data: CategoryFormValues) => void
}

export function CategoryDialog({ open, onOpenChange, initialData, onSubmit }: CategoryDialogProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      color: "bg-red-100 text-red-800",
    },
  })

  function handleSubmit(values: CategoryFormValues) {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  const colorOptions = [
    { value: "bg-red-100 text-red-800", label: "Merah" },
    { value: "bg-amber-100 text-amber-800", label: "Oranye" },
    { value: "bg-yellow-100 text-yellow-800", label: "Kuning" },
    { value: "bg-green-100 text-green-800", label: "Hijau" },
    { value: "bg-blue-100 text-blue-800", label: "Biru" },
    { value: "bg-purple-100 text-purple-800", label: "Ungu" },
    { value: "bg-pink-100 text-pink-800", label: "Pink" },
    { value: "bg-gray-100 text-gray-800", label: "Abu-abu" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{initialData?.id ? "Edit Kategori" : "Tambah Kategori Baru"}</DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Edit informasi kategori yang sudah ada."
              : "Tambahkan kategori baru untuk menu restoran Anda."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kategori</FormLabel>
                  <FormControl>
                    <Input placeholder="Makanan Utama" {...field} className="h-10" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Deskripsi singkat tentang kategori ini..."
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Deskripsi singkat untuk membantu mengidentifikasi kategori ini.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warna Label</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-4 gap-2"
                    >
                      {colorOptions.map((color) => (
                        <FormItem key={color.value} className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={color.value} className="sr-only" />
                          </FormControl>
                          <Badge
                            className={`${
                              field.value === color.value ? "ring-2 ring-primary" : ""
                            } flex h-10 w-full cursor-pointer items-center justify-center ${color.value}`}
                            onClick={() => form.setValue("color", color.value)}
                          >
                            {color.label}
                          </Badge>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              <Button type="submit">{initialData?.id ? "Simpan Perubahan" : "Tambah Kategori"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
