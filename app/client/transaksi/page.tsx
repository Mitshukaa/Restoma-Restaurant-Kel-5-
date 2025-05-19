"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Minus, Plus, Trash2, CreditCard, Wallet, QrCode, Receipt } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { PaymentDialog } from "@/components/client/payment-dialog"

export default function TransaksiPage() {
  const { toast } = useToast()
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Nasi Goreng Spesial", price: 45000, quantity: 2 },
    { id: 101, name: "Es Teh Manis", price: 10000, quantity: 2 },
  ])
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
      return
    }

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Keranjang kosong",
        description: "Silakan tambahkan item ke keranjang Anda terlebih dahulu.",
        variant: "destructive",
      })
      return
    }

    setOpenPaymentDialog(true)
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Transaksi</h1>
        <p className="mt-2 text-muted-foreground">Tinjau dan selesaikan pesanan Anda</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pesanan Anda</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Keranjang Anda kosong</p>
                  <Button className="mt-4" asChild>
                    <a href="/client/menu">Lihat Menu</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Metode Pembayaran</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex flex-1 items-center gap-2 font-normal">
                    <Wallet className="h-5 w-5 text-green-600" />
                    <div>
                      <p>Tunai</p>
                      <p className="text-sm text-muted-foreground">Bayar langsung di kasir</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex flex-1 items-center gap-2 font-normal">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div>
                      <p>Kartu Kredit/Debit</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard, dll.</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-3">
                  <RadioGroupItem value="qris" id="qris" />
                  <Label htmlFor="qris" className="flex flex-1 items-center gap-2 font-normal">
                    <QrCode className="h-5 w-5 text-purple-600" />
                    <div>
                      <p>QRIS</p>
                      <p className="text-sm text-muted-foreground">Scan QR code untuk pembayaran</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Ringkasan Pesanan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pajak (10%)</span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg" disabled={cartItems.length === 0} onClick={handleCheckout}>
                <Receipt className="mr-2 h-4 w-4" />
                Bayar Sekarang
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <PaymentDialog
        open={openPaymentDialog}
        onOpenChange={setOpenPaymentDialog}
        paymentMethod={paymentMethod}
        total={total}
      />
    </div>
  )
}

// Types
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}
