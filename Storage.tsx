import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HardDrive, Server, Database, Cloud, AlertTriangle, CheckCircle, Upload, Download } from "lucide-react";

// Mock data
const storageStats = {
  total: 2048, // GB
  used: 1456, // GB
  available: 592, // GB
  utilizationRate: 71.1
};

const storageDevices = [
  {
    id: 1,
    name: "Ana Sunucu SSD",
    type: "SSD",
    capacity: 1024,
    used: 756,
    status: "healthy",
    location: "Merkez Veri Merkezi",
    temperature: 42,
    health: 98
  },
  {
    id: 2,
    name: "Yedek HDD Array",
    type: "HDD",
    capacity: 512,
    used: 387,
    status: "healthy",
    location: "Merkez Veri Merkezi",
    temperature: 38,
    health: 95
  },
  {
    id: 3,
    name: "Bulut Depolama",
    type: "Cloud",
    capacity: 256,
    used: 189,
    status: "healthy",
    location: "AWS EU-West-1",
    temperature: null,
    health: 100
  },
  {
    id: 4,
    name: "Arşiv Depolama",
    type: "HDD",
    capacity: 256,
    used: 124,
    status: "warning",
    location: "Şube A",
    temperature: 55,
    health: 87
  }
];

const recentFiles = [
  { name: "urun_veritabani_backup_2024_01_15.sql", size: "2.3 GB", type: "Veritabanı Yedeği", date: "15 Oca 2024 14:30" },
  { name: "satis_raporlari_2024_q1.xlsx", size: "45 MB", type: "Rapor", date: "15 Oca 2024 12:15" },
  { name: "depo_fotograflari.zip", size: "156 MB", type: "Medya", date: "14 Oca 2024 16:45" },
  { name: "sistem_loglari_2024_01.log", size: "89 MB", type: "Log Dosyası", date: "14 Oca 2024 09:30" },
  { name: "musteri_verileri_export.csv", size: "12 MB", type: "Veri Dışa Aktarımı", date: "13 Oca 2024 11:20" }
];

const backupSchedule = [
  { name: "Günlük Veritabanı Yedeği", frequency: "Günlük", nextRun: "16 Oca 2024 02:00", status: "active" },
  { name: "Haftalık Sistem Yedeği", frequency: "Haftalık", nextRun: "21 Oca 2024 01:00", status: "active" },
  { name: "Aylık Arşiv Yedeği", frequency: "Aylık", nextRun: "01 Şub 2024 03:00", status: "active" },
  { name: "Medya Dosyaları Yedeği", frequency: "Haftalık", nextRun: "19 Oca 2024 04:00", status: "paused" }
];

export default function Storage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <HardDrive className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800">Sağlıklı</Badge>;
      case "warning":
        return <Badge className="bg-orange-100 text-orange-800">Dikkat</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Hata</Badge>;
      default:
        return <Badge variant="secondary">Bilinmiyor</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "SSD":
        return <HardDrive className="w-5 h-5 text-blue-500" />;
      case "HDD":
        return <Database className="w-5 h-5 text-gray-600" />;
      case "Cloud":
        return <Cloud className="w-5 h-5 text-sky-500" />;
      default:
        return <Server className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kapasite</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats.total} GB</div>
            <p className="text-xs text-muted-foreground">
              Tüm depolama alanları
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kullanılan Alan</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats.used} GB</div>
            <p className="text-xs text-muted-foreground">
              %{storageStats.utilizationRate} kullanım oranı
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Boş Alan</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats.available} GB</div>
            <p className="text-xs text-muted-foreground">
              Kullanılabilir alan
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Cihazlar</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageDevices.filter(d => d.status === "healthy").length}</div>
            <p className="text-xs text-muted-foreground">
              {storageDevices.length} toplam cihaz
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="devices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="devices">Depolama Cihazları</TabsTrigger>
          <TabsTrigger value="files">Dosya Yönetimi</TabsTrigger>
          <TabsTrigger value="backup">Yedekleme</TabsTrigger>
          <TabsTrigger value="monitoring">İzleme</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-6">
          {/* Overall Storage Usage */}
          <Card>
            <CardHeader>
              <CardTitle>Genel Depolama Kullanımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Toplam Kullanım</span>
                  <span className="text-lg font-bold">{storageStats.used} GB / {storageStats.total} GB</span>
                </div>
                <Progress value={storageStats.utilizationRate} className="h-4" />
                <div className="text-sm text-muted-foreground">
                  %{storageStats.utilizationRate} kullanım oranı - {storageStats.available} GB boş alan kaldı
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Storage Devices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {storageDevices.map((device) => {
              const utilizationRate = (device.used / device.capacity) * 100;
              
              return (
                <Card key={device.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(device.type)}
                        <div>
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{device.location}</p>
                        </div>
                      </div>
                      {getStatusIcon(device.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Durum</span>
                      {getStatusBadge(device.status)}
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Kullanım</span>
                        <span className="text-sm font-bold">{utilizationRate.toFixed(1)}%</span>
                      </div>
                      <Progress value={utilizationRate} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {device.used} GB / {device.capacity} GB
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Sağlık:</span>
                        <span className="font-medium ml-2">{device.health}%</span>
                      </div>
                      {device.temperature && (
                        <div>
                          <span className="text-muted-foreground">Sıcaklık:</span>
                          <span className="font-medium ml-2">{device.temperature}°C</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="files" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload/Download */}
            <Card>
              <CardHeader>
                <CardTitle>Dosya İşlemleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  Dosya Yükle
                </Button>
                <Button variant="outline" className="w-full flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Toplu İndirme
                </Button>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Hızlı İşlemler</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Veritabanı Yedeği Al
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Sistem Loglarını İndir
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      Medya Dosyalarını Arşivle
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Files */}
            <Card>
              <CardHeader>
                <CardTitle>Son Dosyalar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {file.type} • {file.size} • {file.date}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Yedekleme Programı</CardTitle>
                <Button>Yeni Yedekleme Ekle</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {backupSchedule.map((backup, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{backup.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {backup.frequency} • Sonraki çalışma: {backup.nextRun}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={backup.status === "active" ? "default" : "secondary"}>
                        {backup.status === "active" ? "Aktif" : "Duraklatıldı"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Düzenle
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Yedekleme İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Son 30 Gün</span>
                  <span className="font-bold text-green-600">28 Başarılı</span>
                </div>
                <div className="flex justify-between">
                  <span>Başarısız Yedekleme</span>
                  <span className="font-bold text-red-600">2</span>
                </div>
                <div className="flex justify-between">
                  <span>Toplam Yedek Boyutu</span>
                  <span className="font-bold">156 GB</span>
                </div>
                <div className="flex justify-between">
                  <span>Ortalama Süre</span>
                  <span className="font-bold">12 dakika</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yedekleme Uyarıları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-medium text-orange-800">Arşiv Depolama</div>
                  <div className="text-sm text-orange-600">Yedekleme alanı %87 dolu</div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800">Medya Yedeği</div>
                  <div className="text-sm text-blue-600">2 gündür duraklatıldı</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sistem Performansı</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>CPU Kullanımı</span>
                    <span className="font-bold">23%</span>
                  </div>
                  <Progress value={23} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>RAM Kullanımı</span>
                    <span className="font-bold">67%</span>
                  </div>
                  <Progress value={67} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Disk I/O</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <Progress value={45} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ağ Trafiği</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Gelen Trafik</span>
                  <span className="font-bold">2.3 MB/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Giden Trafik</span>
                  <span className="font-bold">1.8 MB/s</span>
                </div>
                <div className="flex justify-between">
                  <span>Günlük Transfer</span>
                  <span className="font-bold">45.6 GB</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sistem Durumu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Ana Sunucu</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Veritabanı</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Yedekleme Sistemi</span>
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Bulut Bağlantısı</span>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}