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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  number: z.string().min(1, {
    message: "Nomor meja harus diisi.",
  }),
  capacity: z.coerce.number().min(1, {
    message: "Kapasitas minimal 1 orang.",
  }),
  location: z.string({
    required_error: "Silakan pilih lokasi meja.",
  }),
  status: z.boolean().default(true),
})

export type TableFormValues = z.infer<typeof formSchema>

interface TableDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: TableFormValues & { id?: number }
  onSubmit: (data: TableFormValues) => void
}

export function TableDialog({ open, onOpenChange, initialData, onSubmit }: TableDialogProps) {
  const form = useForm<TableFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      number: "",
      capacity: 2,
      location: "",
      status: true,
    },
  })

  function handleSubmit(values: TableFormValues) {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{initialData?.id ? "Edit Meja" : "Tambah Meja Baru"}</DialogTitle>
          <DialogDescription>
            {initialData?.id ? "Edit informasi meja yang sudah ada." : "Tambahkan meja baru ke restoran Anda."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Meja</FormLabel>
                  <FormControl>
                    <Input placeholder="Meja 1" {...field} className="h-10" />
                  </FormControl>
                  <FormDescription>Masukkan nomor atau nama meja (contoh: Meja 1, VIP 2, dll)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kapasitas</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} className="h-10" />
                    </FormControl>
                    <FormDescription>Jumlah orang yang dapat ditampung</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokasi</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Pilih lokasi" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Indoor">
                          <div className="flex items-center gap-2">
                            <span>Indoor</span>
                            <Badge variant="outline" className="ml-1 bg-blue-50">
                              Dalam Ruangan
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="Outdoor">
                          <div className="flex items-center gap-2">
                            <span>Outdoor</span>
                            <Badge variant="outline" className="ml-1 bg-green-50">
                              Luar Ruangan
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="VIP">
                          <div className="flex items-center gap-2">
                            <span>VIP</span>
                            <Badge variant="outline" className="ml-1 bg-purple-50">
                              Ruangan Khusus
                            </Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="Rooftop">
                          <div className="flex items-center gap-2">
                            <span>Rooftop</span>
                            <Badge variant="outline" className="ml-1 bg-amber-50">
                              Atap
                            </Badge>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status Ketersediaan</FormLabel>
                    <FormDescription>
                      {field.value ? "Meja ini tersedia untuk digunakan" : "Meja ini sedang digunakan/tidak tersedia"}
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
              <Button type="submit">{initialData?.id ? "Simpan Perubahan" : "Tambah Meja"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
