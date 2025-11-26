import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Plus, Edit, Trash2, Package, AlertTriangle } from "lucide-react";

// Mock data
const warehouses = [
  { id: 1, name: "Merkez Depo", location: "İstanbul" },
  { id: 2, name: "Şube A", location: "Ankara" },
  { id: 3, name: "Şube B", location: "İzmir" },
  { id: 4, name: "Şube C", location: "Bursa" },
];

const products = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    sku: "IPH14P-128",
    category: "Elektronik",
    warehouseId: 1,
    stock: 45,
    minStock: 10,
    price: 35000,
    supplier: "Apple Türkiye",
    lastUpdated: "2024-01-15",
    status: "active"
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    sku: "SGS23-256",
    category: "Elektronik",
    warehouseId: 1,
    stock: 32,
    minStock: 15,
    price: 28000,
    supplier: "Samsung Türkiye",
    lastUpdated: "2024-01-14",
    status: "active"
  },
  {
    id: 3,
    name: "Nike Air Max",
    sku: "NAM-270-42",
    category: "Spor",
    warehouseId: 2,
    stock: 8,
    minStock: 20,
    price: 1200,
    supplier: "Nike Store",
    lastUpdated: "2024-01-13",
    status: "low_stock"
  },
  {
    id: 4,
    name: "MacBook Pro M3",
    sku: "MBP-M3-512",
    category: "Elektronik",
    warehouseId: 1,
    stock: 12,
    minStock: 5,
    price: 45000,
    supplier: "Apple Türkiye",
    lastUpdated: "2024-01-12",
    status: "active"
  },
  {
    id: 5,
    name: "Zara Gömlek",
    sku: "ZRA-GML-M",
    category: "Giyim",
    warehouseId: 3,
    stock: 25,
    minStock: 10,
    price: 299,
    supplier: "Zara Türkiye",
    lastUpdated: "2024-01-11",
    status: "active"
  },
  {
    id: 6,
    name: "Dyson V15",
    sku: "DYS-V15-001",
    category: "Ev & Yaşam",
    warehouseId: 4,
    stock: 3,
    minStock: 8,
    price: 4500,
    supplier: "Dyson Türkiye",
    lastUpdated: "2024-01-10",
    status: "low_stock"
  }
];

const categories = ["Tümü", "Elektronik", "Giyim", "Spor", "Ev & Yaşam"];

export default function Urunler() {
  const [selectedWarehouse, setSelectedWarehouse] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProducts = products.filter(product => {
    const matchesWarehouse = selectedWarehouse === "all" || product.warehouseId.toString() === selectedWarehouse;
    const matchesCategory = selectedCategory === "Tümü" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    return matchesWarehouse && matchesCategory && matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock <= minStock) {
      return <Badge variant="destructive">Düşük Stok</Badge>;
    }
    if (status === "active") {
      return <Badge variant="default">Aktif</Badge>;
    }
    return <Badge variant="secondary">Pasif</Badge>;
  };

  const getStockWarning = (stock: number, minStock: number) => {
    if (stock <= minStock) {
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Ürün Yönetimi</h2>
          <p className="text-muted-foreground">Tüm depolarınızdaki ürünleri yönetin</p>
        </div>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Ürün Ekle
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
              <SelectTrigger>
                <SelectValue placeholder="Depo seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Depolar</SelectItem>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse.id} value={warehouse.id.toString()}>
                    {warehouse.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Durum filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="low_stock">Düşük Stok</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Liste Görünümü</TabsTrigger>
          <TabsTrigger value="cards">Kart Görünümü</TabsTrigger>
          <TabsTrigger value="analytics">Stok Analizi</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Ürün Listesi ({filteredProducts.length})</span>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtrele
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ürün</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Depo</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Fiyat</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    const warehouse = warehouses.find(w => w.id === product.warehouseId);
                    
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              <div className="text-sm text-muted-foreground">{product.supplier}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>{warehouse?.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className={product.stock <= product.minStock ? "text-red-600 font-bold" : ""}>
                              {product.stock}
                            </span>
                            {getStockWarning(product.stock, product.minStock)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Min: {product.minStock}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          ₺{product.price.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(product.status, product.stock, product.minStock)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const warehouse = warehouses.find(w => w.id === product.warehouseId);
              
              return (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{product.sku}</p>
                        </div>
                      </div>
                      {getStockWarning(product.stock, product.minStock)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{product.category}</Badge>
                      {getStatusBadge(product.status, product.stock, product.minStock)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Depo:</span>
                        <span className="text-sm font-medium">{warehouse?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Stok:</span>
                        <span className={`text-sm font-medium ${product.stock <= product.minStock ? "text-red-600" : ""}`}>
                          {product.stock} / {product.minStock}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Fiyat:</span>
                        <span className="text-sm font-bold">₺{product.price.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Düzenle
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Stok Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Toplam Ürün</span>
                    <span className="font-bold">{products.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Aktif Ürün</span>
                    <span className="font-bold text-green-600">
                      {products.filter(p => p.status === "active").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Düşük Stok</span>
                    <span className="font-bold text-red-600">
                      {products.filter(p => p.stock <= p.minStock).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kategori Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categories.slice(1).map((category) => {
                    const count = products.filter(p => p.category === category).length;
                    const percentage = (count / products.length) * 100;
                    
                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{category}</span>
                          <span>{count} ürün</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Depo Bazında Dağılım</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {warehouses.map((warehouse) => {
                    const count = products.filter(p => p.warehouseId === warehouse.id).length;
                    
                    return (
                      <div key={warehouse.id} className="flex justify-between items-center">
                        <span className="text-sm">{warehouse.name}</span>
                        <Badge variant="outline">{count} ürün</Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}