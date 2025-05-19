"use client"

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
import { CreditCard, Loader2, QrCode, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paymentMethod: string
  total: number
}

export function PaymentDialog({ open, onOpenChange, paymentMethod, total }: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onOpenChange(false)

      toast({
        title: "Pembayaran Berhasil",
        description: "Terima kasih atas pesanan Anda. Pesanan Anda sedang diproses.",
      })

      // Redirect to home page after successful payment
      router.push("/")
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Konfirmasi Pembayaran</DialogTitle>
          <DialogDescription>Silakan konfirmasi pembayaran Anda</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              {paymentMethod === "cash" && <Wallet className="h-6 w-6 text-green-600" />}
              {paymentMethod === "card" && <CreditCard className="h-6 w-6 text-blue-600" />}
              {paymentMethod === "qris" && <QrCode className="h-6 w-6 text-purple-600" />}

              <div>
                <p className="font-medium">
                  {paymentMethod === "cash" && "Pembayaran Tunai"}
                  {paymentMethod === "card" && "Kartu Kredit/Debit"}
                  {paymentMethod === "qris" && "QRIS"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {paymentMethod === "cash" && "Bayar langsung di kasir"}
                  {paymentMethod === "card" && "Pembayaran aman dengan kartu"}
                  {paymentMethod === "qris" && "Scan QR code untuk membayar"}
                </p>
              </div>
            </div>
          </div>

          {paymentMethod === "qris" && (
            <div className="flex flex-col items-center justify-center">
              <div className="h-48 w-48 overflow-hidden rounded-lg border p-2">
                <img src="/placeholder.svg?height=200&width=200&text=QR+Code" alt="QR Code" className="h-full w-full" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Scan QR code ini dengan aplikasi e-wallet Anda</p>
            </div>
          )}

          <div className="rounded-lg border p-4">
            <div className="flex justify-between">
              <span className="font-medium">Total Pembayaran</span>
              <span className="font-bold">Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isProcessing}>
            Batal
          </Button>
          <Button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Konfirmasi Pembayaran"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
