import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Calculator, FileText, AlertTriangle } from "lucide-react";

// Mock data
const financialSummary = {
  totalRevenue: 4250000,
  totalExpenses: 3180000,
  netProfit: 1070000,
  profitMargin: 25.2,
  monthlyGrowth: 8.5
};

const monthlyData = [
  { month: "Oca", gelir: 350000, gider: 280000, kar: 70000 },
  { month: "Şub", gelir: 420000, gider: 310000, kar: 110000 },
  { month: "Mar", gelir: 380000, gider: 295000, kar: 85000 },
  { month: "Nis", gelir: 480000, gider: 340000, kar: 140000 },
  { month: "May", gelir: 450000, gider: 325000, kar: 125000 },
  { month: "Haz", gelir: 520000, gider: 365000, kar: 155000 },
];

const expenseCategories = [
  { name: "Personel", value: 45, amount: 1431000, color: "#3b82f6" },
  { name: "Kira & Faturalar", value: 20, amount: 636000, color: "#10b981" },
  { name: "Stok Alımı", value: 25, amount: 795000, color: "#f59e0b" },
  { name: "Pazarlama", value: 7, amount: 222600, color: "#ef4444" },
  { name: "Diğer", value: 3, amount: 95400, color: "#8b5cf6" },
];

const transactions = [
  { id: 1, date: "2024-01-15", description: "Ürün Satışı - iPhone 14", type: "income", amount: 35000, category: "Satış" },
  { id: 2, date: "2024-01-15", description: "Personel Maaşı - Ocak", type: "expense", amount: -125000, category: "Personel" },
  { id: 3, date: "2024-01-14", description: "Elektrik Faturası", type: "expense", amount: -3500, category: "Faturalar" },
  { id: 4, date: "2024-01-14", description: "Stok Alımı - Samsung", type: "expense", amount: -85000, category: "Stok" },
  { id: 5, date: "2024-01-13", description: "Toplu Satış - Şirket A", type: "income", amount: 125000, category: "Satış" },
];

const budgetItems = [
  { category: "Personel", budget: 150000, spent: 125000, remaining: 25000 },
  { category: "Pazarlama", budget: 30000, spent: 18500, remaining: 11500 },
  { category: "Operasyon", budget: 50000, spent: 42000, remaining: 8000 },
  { category: "Teknoloji", budget: 25000, spent: 22000, remaining: 3000 },
];

const taxInfo = [
  { type: "KDV", rate: 18, amount: 76500, dueDate: "2024-02-15" },
  { type: "Gelir Vergisi", rate: 22, amount: 235400, dueDate: "2024-03-15" },
  { type: "Stopaj", rate: 15, amount: 18750, dueDate: "2024-02-10" },
];

export default function Muhasebe() {
  const getTransactionBadge = (type: string) => {
    return type === "income" 
      ? <Badge className="bg-green-100 text-green-800">Gelir</Badge>
      : <Badge className="bg-red-100 text-red-800">Gider</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return `₺${Math.abs(amount).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gelir</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{financialSummary.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{financialSummary.monthlyGrowth}%
              </span>
              geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gider</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₺{financialSummary.totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.2%
              </span>
              geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Kar</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₺{financialSummary.netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.3%
              </span>
              geçen aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kar Marjı</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%{financialSummary.profitMargin}</div>
            <p className="text-xs text-muted-foreground">
              Sektör ortalaması: %18.5
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="transactions">İşlemler</TabsTrigger>
          <TabsTrigger value="budget">Bütçe</TabsTrigger>
          <TabsTrigger value="taxes">Vergiler</TabsTrigger>
          <TabsTrigger value="reports">Raporlar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Financial Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Aylık Gelir-Gider Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₺${value.toLocaleString()}`, ""]} />
                    <Bar dataKey="gelir" fill="#10b981" name="Gelir" />
                    <Bar dataKey="gider" fill="#ef4444" name="Gider" />
                    <Bar dataKey="kar" fill="#3b82f6" name="Kar" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Expense Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Gider Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name} %${value}`}
                    >
                      {expenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`%${value}`, name]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Expense Categories Detail */}
          <Card>
            <CardHeader>
              <CardTitle>Gider Kategorileri Detayı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenseCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <div className="text-right">
                        <div className="font-bold">₺{category.amount.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">%{category.value}</div>
                      </div>
                    </div>
                    <Progress value={category.value} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Son İşlemler</CardTitle>
                <Button>Yeni İşlem Ekle</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead className="text-right">Tutar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.category}</Badge>
                      </TableCell>
                      <TableCell>{getTransactionBadge(transaction.type)}</TableCell>
                      <TableCell className={`text-right font-bold ${
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "income" ? "+" : "-"}₺{Math.abs(transaction.amount).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Aylık Bütçe Takibi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetItems.map((item) => {
                  const spentPercentage = (item.spent / item.budget) * 100;
                  const isOverBudget = spentPercentage > 90;
                  
                  return (
                    <div key={item.category} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{item.category}</h4>
                        <div className="text-right">
                          <div className="font-bold">
                            ₺{item.spent.toLocaleString()} / ₺{item.budget.toLocaleString()}
                          </div>
                          <div className={`text-sm ${isOverBudget ? "text-red-600" : "text-muted-foreground"}`}>
                            Kalan: ₺{item.remaining.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <Progress 
                        value={spentPercentage} 
                        className={`h-3 ${isOverBudget ? "bg-red-100" : ""}`}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>%{spentPercentage.toFixed(1)} kullanıldı</span>
                        {isOverBudget && (
                          <span className="text-red-600 flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Bütçe aşımı riski
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vergi Yükümlülükleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taxInfo.map((tax, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{tax.type}</div>
                      <div className="text-sm text-muted-foreground">
                        Oran: %{tax.rate} • Son ödeme: {tax.dueDate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">₺{tax.amount.toLocaleString()}</div>
                      <Button variant="outline" size="sm">
                        Öde
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
                <CardTitle>Vergi Takvimi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="font-medium text-orange-800">Stopaj Beyannamesi</div>
                  <div className="text-sm text-orange-600">10 Şubat 2024</div>
                </div>
                
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="font-medium text-red-800">KDV Beyannamesi</div>
                  <div className="text-sm text-red-600">15 Şubat 2024</div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="font-medium text-blue-800">Gelir Vergisi</div>
                  <div className="text-sm text-blue-600">15 Mart 2024</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vergi Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Bu Ay Ödenecek</span>
                  <span className="font-bold">₺95,250</span>
                </div>
                <div className="flex justify-between">
                  <span>Yıllık Toplam</span>
                  <span className="font-bold">₺1,142,850</span>
                </div>
                <div className="flex justify-between">
                  <span>Vergi Oranı</span>
                  <span className="font-bold">%26.9</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">Gelir-Gider Raporu</h3>
                      <p className="text-sm text-muted-foreground">Aylık finansal özet</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Raporu İndir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-8 h-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold">Kar-Zarar Tablosu</h3>
                      <p className="text-sm text-muted-foreground">Detaylı karlılık analizi</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Raporu İndir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-8 h-8 text-orange-500" />
                    <div>
                      <h3 className="font-semibold">Vergi Raporu</h3>
                      <p className="text-sm text-muted-foreground">Vergi yükümlülükleri</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Raporu İndir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                    <div>
                      <h3 className="font-semibold">Bütçe Analizi</h3>
                      <p className="text-sm text-muted-foreground">Bütçe performansı</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Raporu İndir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Nakit Akış</h3>
                      <p className="text-sm text-muted-foreground">Nakit giriş-çıkış</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Raporu İndir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calculator className="w-8 h-8 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold">Yıllık Özet</h3>
                      <p className="text-sm text-muted-foreground">Yıllık finansal rapor</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Raporu İndir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}