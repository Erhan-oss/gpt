import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users } from "lucide-react";

// Mock data
const salesData = [
  { month: "Oca", satis: 45000, kar: 12000, islem: 156 },
  { month: "Şub", satis: 52000, kar: 15000, islem: 189 },
  { month: "Mar", satis: 48000, kar: 13500, islem: 167 },
  { month: "Nis", satis: 61000, kar: 18000, islem: 203 },
  { month: "May", satis: 55000, kar: 16500, islem: 178 },
  { month: "Haz", satis: 67000, kar: 20000, islem: 234 },
];

const dailySalesData = [
  { day: "Pzt", satis: 8500, hedef: 10000 },
  { day: "Sal", satis: 12000, hedef: 10000 },
  { day: "Çar", satis: 9500, hedef: 10000 },
  { day: "Per", satis: 11500, hedef: 10000 },
  { day: "Cum", satis: 13000, hedef: 10000 },
  { day: "Cmt", satis: 7500, hedef: 8000 },
  { day: "Paz", satis: 6000, hedef: 6000 },
];

const topProducts = [
  { name: "iPhone 14 Pro", satis: 45, gelir: 1575000, kar: 315000 },
  { name: "Samsung Galaxy S23", satis: 32, gelir: 896000, kar: 179200 },
  { name: "MacBook Pro M3", satis: 12, gelir: 540000, kar: 108000 },
  { name: "Nike Air Max", satis: 28, gelir: 33600, kar: 6720 },
  { name: "Dyson V15", satis: 8, gelir: 36000, kar: 7200 },
];

const salesByCategory = [
  { category: "Elektronik", satis: 2850000, oran: 65 },
  { category: "Giyim", satis: 450000, oran: 15 },
  { category: "Spor", satis: 320000, oran: 12 },
  { category: "Ev & Yaşam", satis: 280000, oran: 8 },
];

const recentOrders = [
  { id: "#ORD-001", musteri: "Ahmet Yılmaz", tutar: 35000, durum: "Tamamlandı", tarih: "2024-01-15 14:30" },
  { id: "#ORD-002", musteri: "Ayşe Kaya", tutar: 1200, durum: "Hazırlanıyor", tarih: "2024-01-15 13:45" },
  { id: "#ORD-003", musteri: "Mehmet Demir", tutar: 28000, durum: "Kargoda", tarih: "2024-01-15 12:20" },
  { id: "#ORD-004", musteri: "Fatma Şahin", tutar: 4500, durum: "Tamamlandı", tarih: "2024-01-15 11:15" },
  { id: "#ORD-005", musteri: "Ali Özkan", tutar: 299, durum: "Beklemede", tarih: "2024-01-15 10:30" },
];

export default function Satis() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Tamamlandı":
        return <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>;
      case "Hazırlanıyor":
        return <Badge className="bg-blue-100 text-blue-800">Hazırlanıyor</Badge>;
      case "Kargoda":
        return <Badge className="bg-orange-100 text-orange-800">Kargoda</Badge>;
      case "Beklemede":
        return <Badge className="bg-gray-100 text-gray-800">Beklemede</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Günlük Satış</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺67,500</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2%
              </span>
              dün ile karşılaştırıldığında
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sipariş Sayısı</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </span>
              geçen haftaya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Sipariş</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺432</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="w-3 h-3 mr-1" />
                -3.1%
              </span>
              geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Müşteri</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18.7%
              </span>
              geçen aya göre
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="products">Ürün Performansı</TabsTrigger>
          <TabsTrigger value="orders">Siparişler</TabsTrigger>
          <TabsTrigger value="analytics">Detaylı Analiz</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Aylık Satış Trendi</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₺${value.toLocaleString()}`, ""]} />
                    <Area type="monotone" dataKey="satis" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="kar" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Sales vs Target */}
            <Card>
              <CardHeader>
                <CardTitle>Haftalık Satış vs Hedef</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₺${value.toLocaleString()}`, ""]} />
                    <Bar dataKey="hedef" fill="#e5e7eb" name="Hedef" />
                    <Bar dataKey="satis" fill="#3b82f6" name="Gerçekleşen" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Kategori Bazında Performans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesByCategory.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.category}</span>
                      <div className="text-right">
                        <div className="font-bold">₺{category.satis.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">%{category.oran}</div>
                      </div>
                    </div>
                    <Progress value={category.oran} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>En Çok Satan Ürünler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.satis} adet satıldı</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₺{product.gelir.toLocaleString()}</div>
                      <div className="text-sm text-green-600">Kar: ₺{product.kar.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Son Siparişler</CardTitle>
                <Button>Tüm Siparişleri Görüntüle</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="font-medium">{order.id}</div>
                          <div className="text-sm text-muted-foreground">{order.musteri}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-bold">₺{order.tutar.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{order.tarih}</div>
                      </div>
                      {getStatusBadge(order.durum)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Satış Metrikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Dönüşüm Oranı</span>
                    <span className="font-bold">3.2%</span>
                  </div>
                  <Progress value={32} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Müşteri Memnuniyeti</span>
                    <span className="font-bold">4.7/5</span>
                  </div>
                  <Progress value={94} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>İade Oranı</span>
                    <span className="font-bold">2.1%</span>
                  </div>
                  <Progress value={21} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Kar Marjı Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="kar" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}