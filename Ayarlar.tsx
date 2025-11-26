import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { User, Bell, Shield, Database, Palette, Globe, Mail, Smartphone } from "lucide-react";

export default function Ayarlar() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Ayarlar</h2>
        <p className="text-muted-foreground">Sistem ve hesap ayarlarınızı yönetin</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="notifications">Bildirimler</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
          <TabsTrigger value="system">Sistem</TabsTrigger>
          <TabsTrigger value="appearance">Görünüm</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profil Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline">Fotoğraf Değiştir</Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG formatları desteklenir. Maksimum 2MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ad Soyad</label>
                  <Input defaultValue="Admin User" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-posta</label>
                  <Input defaultValue="admin@deposass.com" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Telefon</label>
                  <Input defaultValue="+90 555 123 4567" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pozisyon</label>
                  <Input defaultValue="Sistem Yöneticisi" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Şirket</label>
                  <Input defaultValue="DepoSaaS Ltd." />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Dil</label>
                  <Select defaultValue="tr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tr">Türkçe</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Biyografi</label>
                <Textarea 
                  placeholder="Kendiniz hakkında kısa bilgi..."
                  defaultValue="10 yıllık deneyime sahip sistem yöneticisi. Depo yönetimi ve lojistik alanında uzman."
                />
              </div>
              
              <Button>Değişiklikleri Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Bildirim Tercihleri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">E-posta Bildirimleri</h4>
                    <p className="text-sm text-muted-foreground">Önemli güncellemeler için e-posta al</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Stok Uyarıları</h4>
                    <p className="text-sm text-muted-foreground">Düşük stok seviyelerinde bildirim</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Satış Bildirimleri</h4>
                    <p className="text-sm text-muted-foreground">Yeni satışlar için anlık bildirim</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Sistem Bakımı</h4>
                    <p className="text-sm text-muted-foreground">Planlı bakım ve güncellemeler</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Haftalık Raporlar</h4>
                    <p className="text-sm text-muted-foreground">Haftalık özet raporları</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Bildirim Zamanlaması</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Çalışma Saatleri Başlangıç</label>
                    <Input type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Çalışma Saatleri Bitiş</label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
              </div>
              
              <Button>Bildirim Ayarlarını Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Güvenlik Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Şifre Değiştir</h4>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Mevcut şifre" />
                    <Input type="password" placeholder="Yeni şifre" />
                    <Input type="password" placeholder="Yeni şifre (tekrar)" />
                    <Button>Şifreyi Güncelle</Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium">İki Faktörlü Doğrulama</h4>
                      <p className="text-sm text-muted-foreground">Hesabınız için ek güvenlik katmanı</p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline">Doğrulama Uygulaması Kur</Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Aktif Oturumlar</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Chrome - Windows</div>
                        <div className="text-sm text-muted-foreground">İstanbul, Türkiye • Şu an aktif</div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Mevcut</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Safari - iPhone</div>
                        <div className="text-sm text-muted-foreground">İstanbul, Türkiye • 2 saat önce</div>
                      </div>
                      <Button variant="outline" size="sm">Sonlandır</Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">Tüm Oturumları Sonlandır</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Sistem Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-4">Genel Ayarlar</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Otomatik Yedekleme</h5>
                        <p className="text-sm text-muted-foreground">Günlük otomatik veri yedeklemesi</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Sistem Logları</h5>
                        <p className="text-sm text-muted-foreground">Detaylı sistem aktivite kayıtları</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">Performans İzleme</h5>
                        <p className="text-sm text-muted-foreground">Sistem performansı takibi</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Veri Saklama</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Log Saklama Süresi</label>
                      <Select defaultValue="90">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 gün</SelectItem>
                          <SelectItem value="90">90 gün</SelectItem>
                          <SelectItem value="180">180 gün</SelectItem>
                          <SelectItem value="365">1 yıl</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Yedek Saklama</label>
                      <Select defaultValue="30">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 gün</SelectItem>
                          <SelectItem value="30">30 gün</SelectItem>
                          <SelectItem value="90">90 gün</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">API Ayarları</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>API Erişimi</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">API Anahtarı</label>
                      <div className="flex space-x-2">
                        <Input value="sk_live_***************************" readOnly />
                        <Button variant="outline">Yenile</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button>Sistem Ayarlarını Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Görünüm Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-4">Tema</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="w-full h-20 bg-white border rounded mb-2"></div>
                      <div className="text-center text-sm font-medium">Açık</div>
                    </div>
                    <div className="p-4 border-2 border-blue-500 rounded-lg cursor-pointer bg-blue-50">
                      <div className="w-full h-20 bg-gray-900 rounded mb-2"></div>
                      <div className="text-center text-sm font-medium">Koyu</div>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="w-full h-20 bg-gradient-to-br from-white to-gray-900 rounded mb-2"></div>
                      <div className="text-center text-sm font-medium">Otomatik</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Renk Şeması</h4>
                  <div className="grid grid-cols-6 gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg cursor-pointer border-2 border-blue-600"></div>
                    <div className="w-12 h-12 bg-green-500 rounded-lg cursor-pointer"></div>
                    <div className="w-12 h-12 bg-purple-500 rounded-lg cursor-pointer"></div>
                    <div className="w-12 h-12 bg-orange-500 rounded-lg cursor-pointer"></div>
                    <div className="w-12 h-12 bg-red-500 rounded-lg cursor-pointer"></div>
                    <div className="w-12 h-12 bg-pink-500 rounded-lg cursor-pointer"></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Yazı Tipi Boyutu</h4>
                  <Select defaultValue="medium">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Küçük</SelectItem>
                      <SelectItem value="medium">Orta</SelectItem>
                      <SelectItem value="large">Büyük</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Sidebar Ayarları</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Otomatik Gizle</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Kompakt Görünüm</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button>Görünüm Ayarlarını Kaydet</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}