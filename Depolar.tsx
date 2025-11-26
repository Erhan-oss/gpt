import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Package, TrendingUp, AlertTriangle, Calendar as CalendarIcon } from "lucide-react";

// Mock data
const warehouses = [
  {
    id: 1,
    name: "Merkez Depo",
    location: "İstanbul, Türkiye",
    capacity: 1000,
    used: 850,
    status: "active",
    dailyTransactions: 45,
    monthlyGrowth: 12.5,
    categories: ["Elektronik", "Giyim", "Ev & Yaşam"]
  },
  {
    id: 2,
    name: "Şube A Depo",
    location: "Ankara, Türkiye",
    capacity: 500,
    used: 360,
    status: "active",
    dailyTransactions: 28,
    monthlyGrowth: 8.2,
    categories: ["Elektronik", "Spor"]
  },
  {
    id: 3,
    name: "Şube B Depo",
    location: "İzmir, Türkiye",
    capacity: 800,
    used: 728,
    status: "warning",
    dailyTransactions: 52,
    monthlyGrowth: -2.1,
    categories: ["Giyim", "Ev & Yaşam", "Diğer"]
  },
  {
    id: 4,
    name: "Şube C Depo",
    location: "Bursa, Türkiye",
    capacity: 600,
    used: 270,
    status: "active",
    dailyTransactions: 31,
    monthlyGrowth: 15.7,
    categories: ["Elektronik", "Spor", "Diğer"]
  }
];

// Calendar activity data (mock)
const generateCalendarData = () => {
  const data: { [key: string]: number } = {};
  const today = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    data[dateStr] = Math.floor(Math.random() * 100) + 10;
  }
  
  return data;
};

const calendarData = generateCalendarData();

export default function Depolar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedWarehouse, setSelectedWarehouse] = useState(warehouses[0]);

  const getActivityLevel = (transactions: number) => {
    if (transactions > 80) return "high";
    if (transactions > 40) return "medium";
    if (transactions > 20) return "low";
    return "none";
  };

  const getActivityColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-500";
      case "medium": return "bg-orange-400";
      case "low": return "bg-yellow-300";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Warehouse Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {warehouses.map((warehouse) => {
          const utilizationRate = (warehouse.used / warehouse.capacity) * 100;
          
          return (
            <Card key={warehouse.id} className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedWarehouse(warehouse)}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                  <Badge variant={
                    warehouse.status === "warning" ? "destructive" : 
                    warehouse.status === "active" ? "default" : "secondary"
                  }>
                    {warehouse.status === "warning" ? "Dikkat" : "Aktif"}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {warehouse.location}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Doluluk Oranı</span>
                    <span className="text-sm font-bold">{utilizationRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={utilizationRate} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {warehouse.used} / {warehouse.capacity} ürün
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-1 text-blue-500" />
                    <span className="text-sm">Günlük İşlem</span>
                  </div>
                  <span className="font-bold">{warehouse.dailyTransactions}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                    <span className="text-sm">Aylık Büyüme</span>
                  </div>
                  <span className={`font-bold ${warehouse.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {warehouse.monthlyGrowth > 0 ? '+' : ''}{warehouse.monthlyGrowth}%
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList>
          <TabsTrigger value="calendar">Takvim Görünümü</TabsTrigger>
          <TabsTrigger value="details">Depo Detayları</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Aylık İşlem Takvimi - {selectedWarehouse.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                  
                  {/* Activity Legend */}
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-200 rounded mr-2"></div>
                      <span>Az (0-20)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-300 rounded mr-2"></div>
                      <span>Orta (21-40)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-orange-400 rounded mr-2"></div>
                      <span>Yoğun (41-80)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                      <span>Çok Yoğun (80+)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Details */}
            <Card>
              <CardHeader>
                <CardTitle>Günlük Detaylar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedDate && (
                  <>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {calendarData[selectedDate.toISOString().split('T')[0]] || 0}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        İşlem Sayısı
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Giriş İşlemleri</span>
                        <span className="font-medium">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Çıkış İşlemleri</span>
                        <span className="font-medium">18</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Transfer İşlemleri</span>
                        <span className="font-medium">3</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedWarehouse.name} - Detaylı Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold">Kapasite Bilgileri</h4>
                  <div className="text-2xl font-bold">{selectedWarehouse.capacity}</div>
                  <div className="text-sm text-muted-foreground">Toplam Kapasite</div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Kullanılan Alan</h4>
                  <div className="text-2xl font-bold text-blue-600">{selectedWarehouse.used}</div>
                  <div className="text-sm text-muted-foreground">Aktif Ürün</div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Boş Alan</h4>
                  <div className="text-2xl font-bold text-green-600">{selectedWarehouse.capacity - selectedWarehouse.used}</div>
                  <div className="text-sm text-muted-foreground">Kullanılabilir</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Kategoriler</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedWarehouse.categories.map((category) => (
                    <Badge key={category} variant="outline">{category}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button>Depo Düzenle</Button>
                <Button variant="outline">Rapor Al</Button>
                <Button variant="outline">Transfer Yap</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performans Metrikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ortalama Doluluk</span>
                    <span className="font-bold">73%</span>
                  </div>
                  <Progress value={73} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>İşlem Verimliliği</span>
                    <span className="font-bold">89%</span>
                  </div>
                  <Progress value={89} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Stok Devir Hızı</span>
                    <span className="font-bold">65%</span>
                  </div>
                  <Progress value={65} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                  Uyarılar ve Öneriler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-medium text-orange-800">Şube B Depo</div>
                  <div className="text-sm text-orange-600">Kapasite %91 - Yer açılması öneriliyor</div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800">Şube C Depo</div>
                  <div className="text-sm text-blue-600">Düşük kullanım - Transfer için uygun</div>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="font-medium text-green-800">Merkez Depo</div>
                  <div className="text-sm text-green-600">Optimal performans gösteriyor</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}