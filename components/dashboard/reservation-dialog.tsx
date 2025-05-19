"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon, Clock, Users } from "lucide-react"

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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  contact: z.string().min(10, {
    message: "Nomor kontak tidak valid.",
  }),
  table: z.string({
    required_error: "Silakan pilih meja.",
  }),
  guests: z.coerce.number().min(1, {
    message: "Jumlah tamu minimal 1 orang.",
  }),
  date: z.date({
    required_error: "Silakan pilih tanggal reservasi.",
  }),
  time: z.string({
    required_error: "Silakan pilih waktu reservasi.",
  }),
  duration: z.coerce.number().min(1, {
    message: "Durasi minimal 1 jam.",
  }),
  notes: z.string().optional(),
})

export type ReservationFormValues = z.infer<typeof formSchema>

interface ReservationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialData?: ReservationFormValues & { id?: number }
  onSubmit: (data: ReservationFormValues) => void
}

export function ReservationDialog({ open, onOpenChange, initialData, onSubmit }: ReservationDialogProps) {
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      contact: "",
      table: "",
      guests: 2,
      date: new Date(),
      time: "",
      duration: 2,
      notes: "",
    },
  })

  function handleSubmit(values: ReservationFormValues) {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  // Sample available tables
  const availableTables = [
    { id: 1, number: "Meja 1", capacity: 2, location: "Indoor" },
    { id: 3, number: "Meja 3", capacity: 4, location: "Indoor" },
    { id: 6, number: "Meja 6", capacity: 2, location: "Outdoor" },
    { id: 8, number: "Meja 8", capacity: 6, location: "VIP" },
  ]

  // Sample available time slots
  const timeSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{initialData?.id ? "Edit Reservasi" : "Tambah Reservasi Baru"}</DialogTitle>
          <DialogDescription>
            {initialData?.id
              ? "Edit informasi reservasi yang sudah ada."
              : "Tambahkan reservasi baru ke restoran Anda."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <Tabs defaultValue="customer" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="customer">Informasi Pelanggan</TabsTrigger>
                <TabsTrigger value="reservation">Detail Reservasi</TabsTrigger>
              </TabsList>
              <TabsContent value="customer" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Pelanggan</FormLabel>
                        <FormControl>
                          <Input placeholder="Budi Santoso" {...field} className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nomor Kontak</FormLabel>
                        <FormControl>
                          <Input placeholder="081234567890" {...field} className="h-10" />
                        </FormControl>
                        <FormDescription>Nomor telepon atau WhatsApp yang dapat dihubungi</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah Tamu</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Users className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input type="number" {...field} className="h-10 pl-10" />
                          </div>
                        </FormControl>
                        <FormDescription>Jumlah orang yang akan datang</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catatan Khusus</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Catatan tambahan..." className="min-h-[80px] resize-none" {...field} />
                        </FormControl>
                        <FormDescription>
                          Contoh: Perayaan ulang tahun, preferensi tempat duduk, alergi makanan, dll.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="reservation" className="space-y-6 pt-4">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Tanggal</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className="h-10 w-full pl-3 text-left font-normal"
                                type="button"
                              >
                                {field.value ? (
                                  format(field.value, "EEEE, dd MMMM yyyy", { locale: id })
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              locale={id}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Waktu</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Pilih waktu">
                                {field.value ? (
                                  <div className="flex items-center">
                                    <Clock className="mr-2 h-4 w-4" />
                                    {field.value}
                                  </div>
                                ) : (
                                  "Pilih waktu"
                                )}
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {time}
                                </div>
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
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durasi</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(Number.parseInt(value))}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Pilih durasi" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 jam</SelectItem>
                            <SelectItem value="2">2 jam</SelectItem>
                            <SelectItem value="3">3 jam</SelectItem>
                            <SelectItem value="4">4 jam</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>Lama waktu reservasi</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="table"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meja</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Pilih meja" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTables.map((table) => (
                              <SelectItem key={table.id} value={table.number}>
                                <div className="flex items-center justify-between gap-2">
                                  <span>
                                    {table.number} ({table.capacity} orang)
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className={`ml-1 ${
                                      table.location === "Indoor"
                                        ? "bg-blue-50"
                                        : table.location === "Outdoor"
                                          ? "bg-green-50"
                                          : "bg-purple-50"
                                    }`}
                                  >
                                    {table.location}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Pilih meja yang tersedia</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>
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
              <Button type="submit">{initialData?.id ? "Simpan Perubahan" : "Tambah Reservasi"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
