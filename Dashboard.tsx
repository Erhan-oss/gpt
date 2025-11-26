import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Package, Warehouse, ShoppingCart, DollarSign } from "lucide-react";

// Mock data
const salesData = [
  { month: "Oca", satis: 45000, kar: 12000 },
  { month: "Şub", satis: 52000, kar: 15000 },
  { month: "Mar", satis: 48000, kar: 13500 },
  { month: "Nis", satis: 61000, kar: 18000 },
  { month: "May", satis: 55000, kar: 16500 },
  { month: "Haz", satis: 67000, kar: 20000 },
];

const warehouseData = [
  { name: "Merkez Depo", doluluk: 85, kapasite: 1000, kullanilan: 850 },
  { name: "Şube A", doluluk: 72, kapasite: 500, kullanilan: 360 },
  { name: "Şube B", doluluk: 91, kapasite: 800, kullanilan: 728 },
  { name: "Şube C", doluluk: 45, kapasite: 600, kullanilan: 270 },
];

const categoryData = [
  { name: "Elektronik", value: 35, color: "#3b82f6" },
  { name: "Giyim", value: 25, color: "#10b981" },
  { name: "Ev & Yaşam", value: 20, color: "#f59e0b" },
  { name: "Spor", value: 12, color: "#ef4444" },
  { name: "Diğer", value: 8, color: "#8b5cf6" },
];

const recentTransactions = [
  { id: 1, urun: "iPhone 14", miktar: 5, tip: "Satış", tutar: 45000, zaman: "2 saat önce" },
  { id: 2, urun: "Samsung TV", miktar: 2, tip: "Satış", tutar: 18000, zaman: "4 saat önce" },
  { id: 3, urun: "Nike Ayakkabı", miktar: 10, tip: "Stok Girişi", tutar: 0, zaman: "6 saat önce" },
  { id: 4, urun: "MacBook Pro", miktar: 1, tip: "Satış", tutar: 25000, zaman: "8 saat önce" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Satış</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺328,000</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </span>
              geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,208</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.2%
              </span>
              geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Depolar</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              Ortalama %73 doluluk
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Günlük İşlem</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                -2.1%
              </span>
              dün ile karşılaştırıldığında
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Aylık Satış ve Kar Analizi</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₺${value.toLocaleString()}`, ""]} />
                <Bar dataKey="satis" fill="#3b82f6" name="Satış" />
                <Bar dataKey="kar" fill="#10b981" name="Kar" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name} %${value}`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warehouse Status */}
        <Card>
          <CardHeader>
            <CardTitle>Depo Doluluk Oranları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {warehouseData.map((warehouse) => (
              <div key={warehouse.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{warehouse.name}</span>
                  <Badge variant={warehouse.doluluk > 80 ? "destructive" : warehouse.doluluk > 60 ? "default" : "secondary"}>
                    %{warehouse.doluluk}
                  </Badge>
                </div>
                <Progress value={warehouse.doluluk} className="h-2" />
                <div className="text-sm text-muted-foreground">
                  {warehouse.kullanilan} / {warehouse.kapasite} ürün
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Son İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{transaction.urun}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.tip} • {transaction.miktar} adet • {transaction.zaman}
                    </div>
                  </div>
                  {transaction.tutar > 0 && (
                    <div className="font-bold text-green-600">
                      ₺{transaction.tutar.toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}