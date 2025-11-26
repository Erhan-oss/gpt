import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Clock, Search, Filter, Plus, MessageSquare, Tool, Bug } from "lucide-react";

// Mock data
const tickets = [
  {
    id: "TKT-001",
    title: "Depo A'da stok sayımı hatası",
    description: "Sistem gerçek stok ile uyumsuz sayılar gösteriyor",
    priority: "high",
    status: "open",
    category: "Stok Yönetimi",
    assignee: "Ahmet Yılmaz",
    reporter: "Ayşe Kaya",
    createdAt: "2024-01-15 09:30",
    updatedAt: "2024-01-15 14:20"
  },
  {
    id: "TKT-002",
    title: "Satış raporu PDF oluşturulmuyor",
    description: "Aylık satış raporunu PDF olarak indirmeye çalışırken hata alıyorum",
    priority: "medium",
    status: "in_progress",
    category: "Raporlama",
    assignee: "Mehmet Demir",
    reporter: "Fatma Şahin",
    createdAt: "2024-01-14 16:45",
    updatedAt: "2024-01-15 11:30"
  },
  {
    id: "TKT-003",
    title: "Yeni kullanıcı ekleme sorunu",
    description: "Yeni personel için kullanıcı hesabı oluştururken sistem donuyor",
    priority: "low",
    status: "resolved",
    category: "Kullanıcı Yönetimi",
    assignee: "Ali Özkan",
    reporter: "Zeynep Çelik",
    createdAt: "2024-01-13 11:20",
    updatedAt: "2024-01-14 09:15"
  },
  {
    id: "TKT-004",
    title: "Mobil uygulamada giriş yapamıyorum",
    description: "Doğru şifre giriyorum ama sürekli hata veriyor",
    priority: "high",
    status: "open",
    category: "Mobil Uygulama",
    assignee: "Selin Kara",
    reporter: "Burak Yıldız",
    createdAt: "2024-01-15 13:10",
    updatedAt: "2024-01-15 13:10"
  }
];

const knowledgeBase = [
  {
    id: 1,
    title: "Stok Sayımı Nasıl Yapılır?",
    category: "Stok Yönetimi",
    views: 245,
    helpful: 23,
    lastUpdated: "2024-01-10"
  },
  {
    id: 2,
    title: "Satış Raporu Oluşturma Rehberi",
    category: "Raporlama",
    views: 189,
    helpful: 31,
    lastUpdated: "2024-01-08"
  },
  {
    id: 3,
    title: "Kullanıcı Yetkileri Ayarlama",
    category: "Kullanıcı Yönetimi",
    views: 156,
    helpful: 18,
    lastUpdated: "2024-01-05"
  },
  {
    id: 4,
    title: "Mobil Uygulama Kurulum Rehberi",
    category: "Mobil Uygulama",
    views: 298,
    helpful: 42,
    lastUpdated: "2024-01-12"
  }
];

const systemStatus = [
  { service: "Ana Sistem", status: "operational", uptime: "99.9%" },
  { service: "Veritabanı", status: "operational", uptime: "99.8%" },
  { service: "API Servisleri", status: "degraded", uptime: "98.5%" },
  { service: "Mobil Uygulama", status: "operational", uptime: "99.7%" },
  { service: "Yedekleme Sistemi", status: "maintenance", uptime: "95.2%" }
];

export default function SorunGiderme() {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Yüksek</Badge>;
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Orta</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Düşük</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-blue-100 text-blue-800">Açık</Badge>;
      case "in_progress":
        return <Badge className="bg-orange-100 text-orange-800">İşlemde</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Çözüldü</Badge>;
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Kapatıldı</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "maintenance":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Çalışıyor";
      case "degraded":
        return "Yavaş";
      case "maintenance":
        return "Bakımda";
      default:
        return "Hata";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Sorun Giderme</h2>
          <p className="text-muted-foreground">Destek talepleri ve sistem durumu</p>
        </div>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Talep Oluştur
        </Button>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tickets">Destek Talepleri</TabsTrigger>
          <TabsTrigger value="knowledge">Bilgi Bankası</TabsTrigger>
          <TabsTrigger value="status">Sistem Durumu</TabsTrigger>
          <TabsTrigger value="create">Yeni Talep</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Talep ara..." className="pl-10" />
                </div>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Durum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="open">Açık</SelectItem>
                    <SelectItem value="in_progress">İşlemde</SelectItem>
                    <SelectItem value="resolved">Çözüldü</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Öncelik" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Öncelikler</SelectItem>
                    <SelectItem value="high">Yüksek</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="low">Düşük</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Kategoriler</SelectItem>
                    <SelectItem value="stock">Stok Yönetimi</SelectItem>
                    <SelectItem value="reports">Raporlama</SelectItem>
                    <SelectItem value="users">Kullanıcı Yönetimi</SelectItem>
                    <SelectItem value="mobile">Mobil Uygulama</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tickets List */}
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{ticket.title}</h3>
                        {getPriorityBadge(ticket.priority)}
                        {getStatusBadge(ticket.status)}
                      </div>
                      
                      <p className="text-muted-foreground mb-3">{ticket.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Talep No:</span>
                          <span className="font-medium ml-2">{ticket.id}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Kategori:</span>
                          <span className="font-medium ml-2">{ticket.category}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Atanan:</span>
                          <span className="font-medium ml-2">{ticket.assignee}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Oluşturan:</span>
                          <span className="font-medium ml-2">{ticket.reporter}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Oluşturulma: {ticket.createdAt} • Son güncelleme: {ticket.updatedAt}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Yorum Ekle
                          </Button>
                          <Button variant="outline" size="sm">
                            Detaylar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bilgi Bankası</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {knowledgeBase.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold">{article.title}</h3>
                          <Badge variant="outline">{article.category}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{article.views} görüntüleme</span>
                          <span>{article.helpful} faydalı</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Son güncelleme: {article.lastUpdated}
                        </div>
                        
                        <Button variant="outline" size="sm" className="w-full">
                          Makaleyi Oku
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistem Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(service.status)}
                      <div>
                        <div className="font-medium">{service.service}</div>
                        <div className="text-sm text-muted-foreground">
                          {getStatusText(service.status)} • Uptime: {service.uptime}
                        </div>
                      </div>
                    </div>
                    <Badge variant={service.status === "operational" ? "default" : "secondary"}>
                      {getStatusText(service.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Son 24 Saat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Toplam İstek</span>
                  <span className="font-bold">1,247,892</span>
                </div>
                <div className="flex justify-between">
                  <span>Başarılı İstek</span>
                  <span className="font-bold text-green-600">1,245,123</span>
                </div>
                <div className="flex justify-between">
                  <span>Hatalı İstek</span>
                  <span className="font-bold text-red-600">2,769</span>
                </div>
                <div className="flex justify-between">
                  <span>Ortalama Yanıt Süresi</span>
                  <span className="font-bold">245ms</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Planlı Bakımlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800">Veritabanı Optimizasyonu</div>
                  <div className="text-sm text-blue-600">20 Ocak 2024, 02:00 - 04:00</div>
                </div>
                
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-medium text-orange-800">Sunucu Güncellemesi</div>
                  <div className="text-sm text-orange-600">25 Ocak 2024, 01:00 - 03:00</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yeni Destek Talebi Oluştur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Konu</label>
                  <Input placeholder="Sorun başlığını yazın..." />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Kategori</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stock">Stok Yönetimi</SelectItem>
                      <SelectItem value="reports">Raporlama</SelectItem>
                      <SelectItem value="users">Kullanıcı Yönetimi</SelectItem>
                      <SelectItem value="mobile">Mobil Uygulama</SelectItem>
                      <SelectItem value="other">Diğer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Öncelik</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Öncelik seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Düşük</SelectItem>
                      <SelectItem value="medium">Orta</SelectItem>
                      <SelectItem value="high">Yüksek</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Etkilenen Sistem</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sistem seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Uygulaması</SelectItem>
                      <SelectItem value="mobile">Mobil Uygulama</SelectItem>
                      <SelectItem value="api">API Servisleri</SelectItem>
                      <SelectItem value="database">Veritabanı</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Açıklama</label>
                <Textarea 
                  placeholder="Sorunu detaylı olarak açıklayın..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Ek Bilgiler</label>
                <Textarea 
                  placeholder="Hata mesajları, ekran görüntüleri açıklaması vb..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="flex space-x-4">
                <Button className="flex-1">
                  <Bug className="w-4 h-4 mr-2" />
                  Talep Oluştur
                </Button>
                <Button variant="outline">
                  <Tool className="w-4 h-4 mr-2" />
                  Taslak Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}