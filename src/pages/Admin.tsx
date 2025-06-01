import React, { useState } from 'react';
import { Package, Grid3X3, Eye, Users, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductsTab from '@/components/admin/ProductsTab';
import CategoriesTab from '@/components/admin/CategoriesTab';
import OrdersTab from '@/components/admin/OrdersTab';
import UserRegistrationsTab from '@/components/admin/UserRegistrationsTab';
import AdminLoginDialog from '@/components/admin/AdminLoginDialog';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
  const { isAdmin, logout } = useAdmin();
  const [showLoginDialog, setShowLoginDialog] = useState(!isAdmin);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleLoginSuccess = () => {
    setShowLoginDialog(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "تم تسجيل الخروج",
      description: "شكراً لك، نراك قريباً",
    });
    navigate('/');
  };

  // Show login dialog if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">🔒 منطقة محظورة</h1>
            <p className="text-gray-600 mb-6">هذه الصفحة متاحة للمديرين فقط</p>
            <Button onClick={() => setShowLoginDialog(true)}>
              تسجيل دخول الإدارة
            </Button>
          </div>
        </main>
        <Footer />
        
        <AdminLoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <AdminHeader />
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </Button>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
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
            <TabsTrigger value="registrations" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              المسجلين
            </TabsTrigger>
          </TabsList>

          {/* Products Management */}
          <TabsContent value="products">
            <ProductsTab
              products={products}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </TabsContent>

          {/* Categories Management */}
          <TabsContent value="categories">
            <CategoriesTab
              categories={categories}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              onAddCategory={handleAddCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          </TabsContent>

          {/* Orders Management */}
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          {/* User Registrations */}
          <TabsContent value="registrations">
            <UserRegistrationsTab />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
