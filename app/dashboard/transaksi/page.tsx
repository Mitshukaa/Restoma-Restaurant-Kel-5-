import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Receipt } from "lucide-react"

export default function TransaksiPage() {
  // Sample transaction data
  const transactions = [
    {
      id: 1001,
      table: "Meja 2",
      items: 4,
      total: 235000,
      date: "17 Mei 2025",
      time: "19:45",
      status: "Lunas",
      payment: "Cash",
    },
    {
      id: 1002,
      table: "Meja 5",
      items: 6,
      total: 450000,
      date: "17 Mei 2025",
      time: "20:30",
      status: "Lunas",
      payment: "QRIS",
    },
    {
      id: 1003,
      table: "Meja 1",
      items: 3,
      total: 175000,
      date: "17 Mei 2025",
      time: "18:15",
      status: "Lunas",
      payment: "Kartu Kredit",
    },
    {
      id: 1004,
      table: "Meja 7",
      items: 5,
      total: 320000,
      date: "17 Mei 2025",
      time: "19:00",
      status: "Lunas",
      payment: "QRIS",
    },
    {
      id: 1005,
      table: "Meja 3",
      items: 2,
      total: 95000,
      date: "16 Mei 2025",
      time: "20:45",
      status: "Lunas",
      payment: "Cash",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Transaksi</h2>
        <Button>
          <Plus className="mr-2 size-4" />
          Transaksi Baru
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Hari Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 1.275.000</div>
            <p className="text-xs text-muted-foreground">4 transaksi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Minggu Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 8.450.000</div>
            <p className="text-xs text-muted-foreground">24 transaksi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 32.750.000</div>
            <p className="text-xs text-muted-foreground">95 transaksi</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Riwayat Transaksi</CardTitle>
          <CardDescription>Daftar transaksi terbaru</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Meja</TableHead>
                <TableHead>Jumlah Item</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Pembayaran</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <Receipt className="h-4 w-4" />
                      </div>
                      #{transaction.id}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.table}</TableCell>
                  <TableCell>{transaction.items} item</TableCell>
                  <TableCell>Rp {transaction.total.toLocaleString("id-ID")}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{transaction.date}</span>
                      <span className="text-xs text-muted-foreground">{transaction.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.payment}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
