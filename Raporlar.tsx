import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { FileText, Download, Calendar as CalendarIcon, Filter, TrendingUp, Package, DollarSign } from "lucide-react";
import { useState } from "react";

// Mock data
const reportTemplates = [
  {
    id: 1,
    name: "Aylık Satış Raporu",
    description: "Detaylı aylık satış analizi ve performans metrikleri",
    category: "Satış",
    lastGenerated: "2024-01-15",
    frequency: "Aylık"
  },
  {
    id: 2,
    name: "Stok Durumu Raporu",
    description: "Tüm depolardaki mevcut stok seviyeleri ve uyarılar",
    category: "Envanter",
    lastGenerated: "2024-01-14",
    frequency: "Haftalık"
  },
  {
    id: 3,
    name: "Finansal Özet",
    description: "Gelir, gider ve kar-zarar analizi",
    category: "Finans",
    lastGenerated: "2024-01-13",
    frequency: "Aylık"
  },
  {
    id: 4,
    name: "Müşteri Analizi",
    description: "Müşteri davranışları ve satın alma trendleri",
    category: "Müşteri",
    lastGenerated: "2024-01-12",
    frequency: "Üç Aylık"
  }
];

const kpiData = [
  { name: "Toplam Satış", value: "₺4.2M", change: "+12.5%", trend: "up" },
  { name: "Aktif Ürün", value: "2,847", change: "+5.2%", trend: "up" },
  { name: "Ortalama Sipariş", value: "₺432", change: "-2.1%", trend: "down" },
  { name: "Müşteri Sayısı", value: "1,247", change: "+18.7%", trend: "up" }
];

const salesTrendData = [
  { month: "Tem", satis: 380000 },
  { month: "Ağu", satis: 420000 },
  { month: "Eyl", satis: 390000 },
  { month: "Eki", satis: 480000 },
  { month: "Kas", satis: 450000 },
  { month: "Ara", satis: 520000 }
];

const categoryPerformance = [
  { name: "Elektronik", value: 45, color: "#3b82f6" },
  { name: "Giyim", value: 25, color: "#10b981" },
  { name: "Ev & Yaşam", value: 20, color: "#f59e0b" },
  { name: "Spor", value: 10, color: "#ef4444" }
];

export default function Raporlar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: string } = {
      "Satış": "bg-blue-100 text-blue-800",
      "Envanter": "bg-green-100 text-green-800",
      "Finans": "bg-orange-100 text-orange-800",
      "Müşteri": "bg-purple-100 text-purple-800"
    };
    
    return <Badge className={colors[category] || "bg-gray-100 text-gray-800"}>{category}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Raporlar</h2>
          <p className="text-muted-foreground">Detaylı analiz ve raporlama araçları</p>
        </div>
        <Button className="flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Özel Rapor Oluştur
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList>
          <TabsTrigger value="dashboard">Rapor Panosu</TabsTrigger>
          <TabsTrigger value="templates">Hazır Raporlar</TabsTrigger>
          <TabsTrigger value="custom">Özel Raporlar</TabsTrigger>
          <TabsTrigger value="scheduled">Zamanlanmış</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                    </div>
                    <div className={`flex items-center text-sm ${
                      kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}>
                      <TrendingUp className={`w-4 h-4 mr-1 ${
                        kpi.trend === "down" ? "rotate-180" : ""
                      }`} />
                      {kpi.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Satış Trendi (Son 6 Ay)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₺${value.toLocaleString()}`, "Satış"]} />
                    <Line 
                      type="monotone" 
                      dataKey="satis" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Kategori Performansı</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryPerformance}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name} %${value}`}
                    >
                      {categoryPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı Rapor Oluştur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <Package className="w-6 h-6 mb-2" />
                  <span>Stok Raporu</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <DollarSign className="w-6 h-6 mb-2" />
                  <span>Satış Raporu</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span>Performans</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <FileText className="w-6 h-6 mb-2" />
                  <span>Finansal</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                    </div>
                    {getCategoryBadge(template.category)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Sıklık:</span>
                      <span className="font-medium ml-2">{template.frequency}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Son Oluşturma:</span>
                      <span className="font-medium ml-2">{template.lastGenerated}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Rapor Oluştur
                    </Button>
                    <Button variant="outline">
                      Özelleştir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Özel Rapor Oluşturucu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rapor Tipi</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Rapor tipi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Satış Analizi</SelectItem>
                      <SelectItem value="inventory">Envanter Raporu</SelectItem>
                      <SelectItem value="financial">Finansal Rapor</SelectItem>
                      <SelectItem value="customer">Müşteri Analizi</SelectItem>
                      <SelectItem value="performance">Performans Raporu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tarih Aralığı</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tarih aralığı" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Bugün</SelectItem>
                      <SelectItem value="week">Son 7 gün</SelectItem>
                      <SelectItem value="month">Son 30 gün</SelectItem>
                      <SelectItem value="quarter">Son 3 ay</SelectItem>
                      <SelectItem value="year">Son 1 yıl</SelectItem>
                      <SelectItem value="custom">Özel aralık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Format</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Çıktı formatı" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Dahil Edilecek Veriler</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="sales-data" className="rounded" defaultChecked />
                      <label htmlFor="sales-data" className="text-sm">Satış Verileri</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="inventory-data" className="rounded" />
                      <label htmlFor="inventory-data" className="text-sm">Envanter Bilgileri</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="customer-data" className="rounded" />
                      <label htmlFor="customer-data" className="text-sm">Müşteri Bilgileri</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="financial-data" className="rounded" defaultChecked />
                      <label htmlFor="financial-data" className="text-sm">Finansal Veriler</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Filtreler</h4>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-sm">Depo</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tüm depolar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tüm Depolar</SelectItem>
                          <SelectItem value="1">Merkez Depo</SelectItem>
                          <SelectItem value="2">Şube A</SelectItem>
                          <SelectItem value="3">Şube B</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm">Kategori</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tüm kategoriler" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tüm Kategoriler</SelectItem>
                          <SelectItem value="electronics">Elektronik</SelectItem>
                          <SelectItem value="clothing">Giyim</SelectItem>
                          <SelectItem value="home">Ev & Yaşam</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Rapor Oluştur
                </Button>
                <Button variant="outline">
                  Şablon Olarak Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Zamanlanmış Raporlar</CardTitle>
                <Button>Yeni Zamanlama Ekle</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">Haftalık Satış Özeti</div>
                    <div className="text-sm text-muted-foreground">
                      Her Pazartesi 09:00 • PDF formatında • admin@deposass.com
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                    <Button variant="ghost" size="sm">Düzenle</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">Aylık Finansal Rapor</div>
                    <div className="text-sm text-muted-foreground">
                      Her ayın 1'i 08:00 • Excel formatında • finans@deposass.com
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-green-100 text-green-800">Aktif</Badge>
                    <Button variant="ghost" size="sm">Düzenle</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">Stok Uyarı Raporu</div>
                    <div className="text-sm text-muted-foreground">
                      Günlük 18:00 • Email bildirimi • depo@deposass.com
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary">Duraklatıldı</Badge>
                    <Button variant="ghost" size="sm">Düzenle</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rapor Takvimi</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Son Oluşturulan Raporlar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Haftalık Satış Özeti</div>
                      <div className="text-xs text-muted-foreground">15 Oca 2024, 09:00</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Stok Durumu</div>
                      <div className="text-xs text-muted-foreground">14 Oca 2024, 18:00</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Müşteri Analizi</div>
                      <div className="text-xs text-muted-foreground">13 Oca 2024, 10:30</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}