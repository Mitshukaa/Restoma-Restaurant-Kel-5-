import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Store } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-sage bg-white p-8 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-forest text-cream">
            <Store className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-evergreen">Restoran Saya</h1>
          <p className="mt-2 text-sm text-pine">Pengalaman Kuliner Terbaik</p>
        </div>

        <div className="space-y-4">
          <Button asChild className="w-full bg-forest hover:bg-pine text-cream">
            <Link href="/client">Masuk sebagai Pelanggan</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-forest text-forest hover:bg-sage/20">
            <Link href="/dashboard">Masuk sebagai Admin</Link>
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">© 2025 Restoran Saya. Semua hak dilindungi.</p>
      </div>
    </div>
  )
}

// Sample data
const featuredItems = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    description: "Nasi goreng dengan telur, ayam, dan sayuran segar",
    price: 45000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Sate Ayam",
    description: "Sate ayam dengan bumbu kacang khas",
    price: 35000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Es Teh Manis",
    description: "Teh manis segar dengan es batu",
    price: 10000,
    image: "/placeholder.svg?height=300&width=300",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    comment: "Makanan lezat dengan pelayanan yang ramah. Saya sangat merekomendasikan Nasi Goreng Spesial mereka!",
    rating: 5,
    date: "15 Mei 2025",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    comment: "Suasana yang nyaman dan makanan yang lezat. Tempat yang sempurna untuk makan malam bersama keluarga.",
    rating: 4,
    date: "10 Mei 2025",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Ahmad Hidayat",
    comment: "Saya sangat menyukai menu Sate Ayam mereka. Bumbu kacangnya sangat otentik dan lezat!",
    rating: 5,
    date: "5 Mei 2025",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]
