import React, { useState } from 'react';
import { Package, Grid3X3, Eye, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductsTab from '@/components/admin/ProductsTab';
import CategoriesTab from '@/components/admin/CategoriesTab';
import OrdersTab from '@/components/admin/OrdersTab';
import UserRegistrationsTab from '@/components/admin/UserRegistrationsTab';

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
        <AdminHeader />

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
