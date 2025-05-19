import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ClientHomePage() {
  return (
    <>
      <div className="relative h-[70vh] w-full overflow-hidden">
        {/* Hero Image */}
        <div className="absolute inset-0 bg-black/50">
          <img src="/placeholder.svg?height=800&width=1200" alt="Restoran" className="h-full w-full object-cover" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold md:text-6xl">Restoran Saya</h1>
            <p className="mt-4 text-xl">Pengalaman kuliner terbaik di kota</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/client/menu">Lihat Menu</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white hover:bg-white/10" asChild>
                <Link href="/client/reservasi">Reservasi Sekarang</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Menu Favorit Kami</h2>
          <p className="mt-2 text-muted-foreground">Hidangan spesial yang paling disukai pelanggan kami</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <p className="mt-1 text-sm text-white/80">{item.description}</p>
                <p className="mt-2 font-bold">Rp {item.price.toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/client/menu" className="flex items-center gap-2">
              Lihat Menu Lengkap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-muted py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Tentang Restoran Kami</h2>
              <p className="mt-4 text-muted-foreground">
                Restoran Saya didirikan pada tahun 2010 dengan visi menyajikan hidangan berkualitas tinggi dengan
                bahan-bahan lokal terbaik. Kami berkomitmen untuk memberikan pengalaman bersantap yang tak terlupakan
                dalam suasana yang nyaman dan ramah.
              </p>
              <p className="mt-4 text-muted-foreground">
                Chef kami yang berpengalaman menciptakan menu yang menggabungkan cita rasa tradisional dengan sentuhan
                modern, menghasilkan hidangan yang unik dan lezat.
              </p>
              <Button className="mt-6" variant="outline" asChild>
                <Link href="/client/tentang">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-lg md:h-auto">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Interior Restoran"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Apa Kata Pelanggan Kami</h2>
          <p className="mt-2 text-muted-foreground">Pengalaman pelanggan yang puas dengan layanan kami</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="rounded-lg border p-6">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">{testimonial.comment}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-xl font-bold">Restoran Saya</h3>
              <p className="mt-4 text-gray-400">
                Jl. Merdeka No. 123
                <br />
                Jakarta, Indonesia
                <br />
                Telp: (021) 1234-5678
                <br />
                Email: info@restoransaya.com
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Jam Operasional</h3>
              <ul className="mt-4 space-y-2 text-gray-400">
                <li>Senin - Jumat: 11:00 - 22:00</li>
                <li>Sabtu - Minggu: 10:00 - 23:00</li>
                <li>Hari Libur: 10:00 - 22:00</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Ikuti Kami</h3>
              <div className="mt-4 flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Restoran Saya. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </>
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
