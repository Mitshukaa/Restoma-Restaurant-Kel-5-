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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama metode pembayaran harus minimal 2 karakter.",
  }),
  description: z.string().optional(),
  active: z.boolean().default(true),
  icon: z.string({
    required_error: "Silakan pilih ikon untuk metode pembayaran.",
  }),
  color: z.string({
    required_error: "Silakan pilih warna untuk metode pembayaran.",
  }),
})

export type PaymentMethodFormValues = z.infer<typeof formSchema>

interface PaymentMethodDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: PaymentMethodFormValues & { id?: number }
  onSubmit: (data: PaymentMethodFormValues) => void
}

export function PaymentMethodDialog({ open, onOpenChange, initialData, onSubmit }: PaymentMethodDialogProps) {
  const form = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      active: true,
      icon: "CreditCard",
      color: "bg-blue-100 text-blue-800",
    },
  })

  function handleSubmit(values: PaymentMethodFormValues) {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  const iconOptions = [
    { value: "CreditCard", label: "Kartu Kredit" },
    { value: "Wallet", label: "Dompet" },
    { value: "Smartphone", label: "Smartphone" },
    { value: "QrCode", label: "QR Code" },
    { value: "Receipt", label: "Struk" },
  ]

  const colorOptions = [
    { value: "bg-red-100 text-red-800", label: "Merah" },
    { value: "bg-amber-100 text-amber-800", label: "Oranye" },
    { value: "bg-green-100 text-green-800", label: "Hijau" },
    { value: "bg-blue-100 text-blue-800", label: "Biru" },
    { value: "bg-purple-100 text-purple-800", label: "Ungu" },
    { value: "bg-pink-100 text-pink-800", label: "Pink" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData?.id ? "Edit Metode Pembayaran" : "Tambah Metode Pembayaran Baru"}
          </DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Edit informasi metode pembayaran yang sudah ada."
              : "Tambahkan metode pembayaran baru untuk restoran Anda."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Metode Pembayaran</FormLabel>
                  <FormControl>
                    <Input placeholder="Cash" {...field} className="h-10" />
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
                      placeholder="Deskripsi singkat tentang metode pembayaran ini..."
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Informasi tambahan tentang metode pembayaran ini.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ikon</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Pilih ikon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {iconOptions.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      className="grid grid-cols-3 gap-2"
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

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Status Aktif</FormLabel>
                    <FormDescription>
                      {field.value
                        ? "Metode pembayaran ini tersedia untuk digunakan"
                        : "Metode pembayaran ini tidak tersedia untuk digunakan"}
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
              <Button type="submit">{initialData?.id ? "Simpan Perubahan" : "Tambah Metode Pembayaran"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
