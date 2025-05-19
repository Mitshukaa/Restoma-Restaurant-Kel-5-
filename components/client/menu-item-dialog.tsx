"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  isBestSeller?: boolean
  ingredients?: string[]
}

interface MenuItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: MenuItem
}

export function MenuItemDialog({ open, onOpenChange, item }: MenuItemDialogProps) {
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const addToCart = () => {
    // In a real app, you would add this to your cart state
    toast({
      title: "Ditambahkan ke keranjang",
      description: `${quantity}x ${item.name} telah ditambahkan ke keranjang.`,
    })
    onOpenChange(false)
    setQuantity(1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <div className="relative -mt-6 -mx-6 overflow-hidden sm:rounded-t-lg">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-[200px] w-full object-cover" />
          {item.isBestSeller && <Badge className="absolute right-2 top-2 bg-amber-500 text-white">Best Seller</Badge>}
        </div>

        <DialogHeader className="mt-2">
          <DialogTitle className="text-xl">{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {item.ingredients && (
            <div>
              <h4 className="font-medium">Bahan-bahan:</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Harga:</h4>
              <p className="text-xl font-bold">Rp {item.price.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-lg font-medium">{quantity}</span>
              <Button variant="outline" size="icon" onClick={increaseQuantity}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={addToCart} className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Tambahkan ke Pesanan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
