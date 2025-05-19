"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarRange, Users } from "lucide-react"
import Link from "next/link"

export default function MejaPage() {
  const [hoveredTable, setHoveredTable] = useState<number | null>(null)

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold">Pilih Meja Anda</h1>
        <Button asChild>
          <Link href="/client/reservasi">
            <CalendarRange className="mr-2 h-4 w-4" />
            Reservasi Sekarang
          </Link>
        </Button>
      </div>

      <p className="mt-4 text-muted-foreground">
        Pilih meja yang sesuai dengan kebutuhan Anda. Setiap meja memiliki keunggulan dan kapasitas yang berbeda.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tables.map((table) => (
          <Card
            key={table.id}
            className={`overflow-hidden transition-all duration-300 ${
              hoveredTable === table.id ? "ring-2 ring-primary" : ""
            }`}
            onMouseEnter={() => setHoveredTable(table.id)}
            onMouseLeave={() => setHoveredTable(null)}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={table.image || "/placeholder.svg"}
                alt={table.name}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <Badge
                className={`absolute left-2 top-2 ${
                  table.location === "Indoor"
                    ? "bg-blue-100 text-blue-800"
                    : table.location === "Outdoor"
                      ? "bg-green-100 text-green-800"
                      : "bg-purple-100 text-purple-800"
                }`}
              >
                {table.location}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{table.name}</span>
                <div className="flex items-center gap-1 text-sm font-normal">
                  <Users className="h-4 w-4" />
                  <span>{table.capacity} orang</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium">Keunggulan:</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {table.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/client/reservasi?table=${table.id}`}>Reservasi Meja Ini</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-muted p-6">
        <h2 className="text-xl font-bold">Informasi Meja</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="flex items-center gap-2 font-medium">
              <Badge className="bg-blue-100 text-blue-800">Indoor</Badge>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Meja indoor kami menawarkan kenyamanan dengan AC dan suasana yang tenang. Cocok untuk pertemuan bisnis
              atau makan malam romantis.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-medium">
              <Badge className="bg-green-100 text-green-800">Outdoor</Badge>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Meja outdoor kami menawarkan pengalaman makan di bawah langit dengan pemandangan taman. Sempurna untuk
              makan siang santai.
            </p>
          </div>
          <div>
            <h3 className="flex items-center gap-2 font-medium">
              <Badge className="bg-purple-100 text-purple-800">VIP</Badge>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Meja VIP kami menawarkan privasi dan layanan eksklusif. Ideal untuk perayaan khusus atau pertemuan
              penting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Sample data
const tables = [
  {
    id: 1,
    name: "Meja 1",
    capacity: 2,
    location: "Indoor",
    image: "/placeholder.svg?height=200&width=300",
    benefits: ["Dekat dengan jendela", "Pemandangan taman", "Cocok untuk pasangan"],
  },
  {
    id: 2,
    name: "Meja 2",
    capacity: 4,
    location: "Indoor",
    image: "/placeholder.svg?height=200&width=300",
    benefits: ["Posisi tengah ruangan", "Dekat dengan bar", "Cocok untuk keluarga kecil"],
  },
  {
    id: 3,
    name: "Meja 3",
    capacity: 6,
    location: "Outdoor",
    image: "/placeholder.svg?height=200&width=300",
    benefits: ["Di bawah pohon rindang", "Suasana alami", "Cocok untuk kumpul santai"],
  },
  {
    id: 4,
    name: "Meja 4",
    capacity: 4,
    location: "Outdoor",
    image: "/placeholder.svg?height=200&width=300",
    benefits: ["Dekat dengan kolam", "Pemandangan matahari terbenam", "Cocok untuk makan malam romantis"],
  },
  {
    id: 5,
    name: "VIP 1",
    capacity: 8,
    location: "VIP",
    image: "/placeholder.svg?height=200&width=300",
    benefits: ["Ruangan privat", "Pelayanan khusus", "Sistem audio tersedia", "Cocok untuk acara spesial"],
  },
  {
    id: 6,
    name: "VIP 2",
    capacity: 12,
    location: "VIP",
    image: "/placeholder.svg?height=200&width=300",
    benefits: ["Ruangan privat besar", "Layar proyektor", "Sistem audio premium", "Cocok untuk pertemuan bisnis"],
  },
]
