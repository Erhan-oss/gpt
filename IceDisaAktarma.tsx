import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Upload, Download, FileText, Database, CheckCircle, AlertTriangle, Clock } from "lucide-react";

// Mock data
const importHistory = [
  {
    id: 1,
    fileName: "urunler_2024_01.xlsx",
    type: "Ürün Listesi",
    status: "completed",
    recordCount: 1247,
    date: "2024-01-15 14:30",
    errors: 0
  },
  {
    id: 2,
    fileName: "satis_verileri_q4.csv",
    type: "Satış Verileri",
    status: "completed",
    recordCount: 3456,
    date: "2024-01-14 09:15",
    errors: 12
  },
  {
    id: 3,
    fileName: "musteri_listesi.xlsx",
    type: "Müşteri Bilgileri",
    status: "processing",
    recordCount: 0,
    date: "2024-01-15 16:45",
    errors: 0
  },
  {
    id: 4,
    fileName: "depo_envanteri.csv",
    type: "Envanter",
    status: "failed",
    recordCount: 0,
    date: "2024-01-13 11:20",
    errors: 45
  }
];

const exportTemplates = [
  {
    name: "Ürün Listesi",
    description: "Tüm ürünler ve stok bilgileri",
    format: "Excel",
    fields: ["Ürün Adı", "SKU", "Kategori", "Stok", "Fiyat", "Depo"],
    lastExport: "2024-01-14"
  },
  {
    name: "Satış Raporu",
    description: "Detaylı satış verileri",
    format: "CSV",
    fields: ["Tarih", "Ürün", "Miktar", "Tutar", "Müşteri"],
    lastExport: "2024-01-15"
  },
  {
    name: "Müşteri Verileri",
    description: "Müşteri bilgileri ve iletişim",
    format: "Excel",
    fields: ["Ad Soyad", "Email", "Telefon", "Adres", "Kayıt Tarihi"],
    lastExport: "2024-01-12"
  },
  {
    name: "Finansal Özet",
    description: "Gelir-gider ve kar-zarar",
    format: "PDF",
    fields: ["Tarih", "Gelir", "Gider", "Kar", "Kategori"],
    lastExport: "2024-01-10"
  }
];

const dataMapping = [
  { source: "Ürün Adı", target: "product_name", required: true, mapped: true },
  { source: "SKU Kodu", target: "sku", required: true, mapped: true },
  { source: "Kategori", target: "category", required: false, mapped: true },
  { source: "Stok Miktarı", target: "stock_quantity", required: true, mapped: false },
  { source: "Birim Fiyat", target: "unit_price", required: true, mapped: true },
  { source: "Depo Lokasyonu", target: "warehouse_location", required: false, mapped: false }
];

export default function IceDisaAktarma() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Tamamlandı</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800">İşleniyor</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Başarısız</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "processing":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">İçe/Dışa Aktarma</h2>
          <p className="text-muted-foreground">Veri içe aktarımı ve dışa aktarım işlemleri</p>
        </div>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList>
          <TabsTrigger value="import">İçe Aktarma</TabsTrigger>
          <TabsTrigger value="export">Dışa Aktarma</TabsTrigger>
          <TabsTrigger value="history">İşlem Geçmişi</TabsTrigger>
          <TabsTrigger value="mapping">Veri Eşleştirme</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Dosya Yükleme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Dosya Sürükle veya Seç</h3>
                  <p className="text-muted-foreground mb-4">
                    Excel (.xlsx), CSV (.csv) veya JSON (.json) formatları desteklenir
                  </p>
                  <Button>Dosya Seç</Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Veri Tipi</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Veri tipini seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="products">Ürünler</SelectItem>
                        <SelectItem value="sales">Satış Verileri</SelectItem>
                        <SelectItem value="customers">Müşteriler</SelectItem>
                        <SelectItem value="inventory">Envanter</SelectItem>
                        <SelectItem value="financial">Finansal Veriler</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Hedef Depo</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Depo seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Depolar</SelectItem>
                        <SelectItem value="1">Merkez Depo</SelectItem>
                        <SelectItem value="2">Şube A</SelectItem>
                        <SelectItem value="3">Şube B</SelectItem>
                        <SelectItem value="4">Şube C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Import Options */}
            <Card>
              <CardHeader>
                <CardTitle>İçe Aktarma Seçenekleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="validate" className="rounded" defaultChecked />
                    <label htmlFor="validate" className="text-sm">Veri doğrulama yap</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="backup" className="rounded" defaultChecked />
                    <label htmlFor="backup" className="text-sm">İşlem öncesi yedek al</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="duplicate" className="rounded" />
                    <label htmlFor="duplicate" className="text-sm">Mevcut kayıtları güncelle</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="notify" className="rounded" defaultChecked />
                    <label htmlFor="notify" className="text-sm">İşlem tamamlandığında bildir</label>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Hata Yönetimi</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Hata durumunda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skip">Hatalı kayıtları atla</SelectItem>
                      <SelectItem value="stop">İşlemi durdur</SelectItem>
                      <SelectItem value="log">Logla ve devam et</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full mt-6">
                  İçe Aktarmayı Başlat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Import Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Aktif İşlemler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">musteri_listesi.xlsx</span>
                    <span className="text-sm text-blue-600">İşleniyor...</span>
                  </div>
                  <Progress value={65} className="mb-2" />
                  <div className="text-sm text-muted-foreground">
                    1,247 / 1,920 kayıt işlendi • Tahmini kalan süre: 2 dakika
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exportTemplates.map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="outline">{template.format}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">İçerik Alanları</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.map((field, fieldIndex) => (
                        <Badge key={fieldIndex} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    Son dışa aktarma: {template.lastExport}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Dışa Aktar
                    </Button>
                    <Button variant="outline">
                      Özelleştir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Export */}
          <Card>
            <CardHeader>
              <CardTitle>Özel Dışa Aktarma</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Veri Tipi</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Veri tipini seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="products">Ürünler</SelectItem>
                      <SelectItem value="sales">Satış Verileri</SelectItem>
                      <SelectItem value="customers">Müşteriler</SelectItem>
                      <SelectItem value="inventory">Envanter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Format</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Format seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="json">JSON (.json)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Tarih Aralığı</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tarih seçin" />
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
              </div>
              
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Özel Dışa Aktarma Başlat
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>İşlem Geçmişi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {importHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(item.status)}
                      <div>
                        <div className="font-medium">{item.fileName}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.type} • {item.date}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">
                          {item.recordCount > 0 && `${item.recordCount.toLocaleString()} kayıt`}
                        </div>
                        {item.errors > 0 && (
                          <div className="text-sm text-red-600">{item.errors} hata</div>
                        )}
                      </div>
                      
                      {getStatusBadge(item.status)}
                      
                      <Button variant="ghost" size="sm">
                        Detaylar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Veri Eşleştirme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Dosyanızdaki sütunları sistem alanlarıyla eşleştirin
                </p>
                
                <div className="space-y-3">
                  {dataMapping.map((mapping, index) => (
                    <div key={index} className="grid grid-cols-3 gap-4 items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{mapping.source}</div>
                        {mapping.required && (
                          <Badge variant="destructive" className="text-xs mt-1">Zorunlu</Badge>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <Select value={mapping.mapped ? mapping.target : ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Alan seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="product_name">Ürün Adı</SelectItem>
                            <SelectItem value="sku">SKU Kodu</SelectItem>
                            <SelectItem value="category">Kategori</SelectItem>
                            <SelectItem value="stock_quantity">Stok Miktarı</SelectItem>
                            <SelectItem value="unit_price">Birim Fiyat</SelectItem>
                            <SelectItem value="warehouse_location">Depo Lokasyonu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="text-right">
                        {mapping.mapped ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <Button>Eşleştirmeyi Kaydet</Button>
                  <Button variant="outline">Şablon Olarak Kaydet</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}