
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Package, 
  Grid3X3, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Save,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  inStock: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

const Admin = () => {
  const navigate = useNavigate();
  
  // Sample data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'تلفزيون ذكي 55 بوصة',
      price: 1200,
      category: 'electronics',
      description: 'تلفزيون ذكي عالي الدقة مع تقنية 4K',
      image: '/placeholder.svg',
      inStock: true
    },
    {
      id: '2',
      name: 'كرسي مكتبي مريح',
      price: 350,
      category: 'office-furniture',
      description: 'كرسي مكتبي بتصميم مريح ومواد عالية الجودة',
      image: '/placeholder.svg',
      inStock: true
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 'electronics', name: 'الإلكترونيات', description: 'أجهزة إلكترونية حديثة', icon: 'Monitor', productCount: 45 },
    { id: 'furniture', name: 'الأثاث المنزلي', description: 'أثاث عصري للمنزل', icon: 'Sofa', productCount: 32 },
    { id: 'office-furniture', name: 'الأثاث المكتبي', description: 'أثاث مكتبي احترافي', icon: 'Briefcase', productCount: 28 }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    inStock: true
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: 'Package'
  });

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: 0, category: '', description: '', image: '', inStock: true });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleAddCategory = () => {
    const category: Category = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      ...newCategory,
      productCount: 0
    };
    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '', icon: 'Package' });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="flex items-center gap-1 text-brand-blue hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
          <span className="text-gray-400">←</span>
          <span className="text-gray-600">لوحة الإدارة</span>
        </div>

        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للخلف
        </Button>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">⚙️ لوحة الإدارة</h1>
          <p className="text-gray-600 text-lg">إدارة المنتجات والأقسام والطلبات</p>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              إدارة المنتجات
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Grid3X3 className="w-4 h-4" />
              إدارة الأقسام
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              مراجعة الطلبات
            </TabsTrigger>
          </TabsList>

          {/* Products Management */}
          <TabsContent value="products" className="space-y-6">
            {/* Add New Product Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  إضافة منتج جديد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="اسم المنتج"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="السعر"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                  />
                  <Input
                    placeholder="القسم"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  />
                  <Input
                    placeholder="رابط الصورة"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  />
                </div>
                <Textarea
                  placeholder="وصف المنتج"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                />
                <Button onClick={handleAddProduct} className="bg-brand-blue hover:bg-blue-600">
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المنتج
                </Button>
              </CardContent>
            </Card>

            {/* Products List */}
            <Card>
              <CardHeader>
                <CardTitle>قائمة المنتجات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-lg font-bold text-brand-blue">${product.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Management */}
          <TabsContent value="categories" className="space-y-6">
            {/* Add New Category Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  إضافة قسم جديد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="اسم القسم"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  />
                  <Input
                    placeholder="اسم الأيقونة"
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                  />
                </div>
                <Textarea
                  placeholder="وصف القسم"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                />
                <Button onClick={handleAddCategory} className="bg-brand-blue hover:bg-blue-600">
                  <Save className="w-4 h-4 ml-2" />
                  حفظ القسم
                </Button>
              </CardContent>
            </Card>

            {/* Categories List */}
            <Card>
              <CardHeader>
                <CardTitle>قائمة الأقسام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <div key={category.id} className="p-4 bg-white border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{category.name}</h3>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <p className="text-sm text-brand-blue">{category.productCount} منتج</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Management */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الطلبات الحديثة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد طلبات حالياً</h3>
                  <p className="text-gray-500">ستظهر الطلبات الجديدة هنا عند وصولها</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
