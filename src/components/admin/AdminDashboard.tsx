
import React from 'react';
import { Package, Grid3X3, Eye, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsTab from './ProductsTab';
import CategoriesTab from './CategoriesTab';
import OrdersTab from './OrdersTab';
import UserRegistrationsTab from './UserRegistrationsTab';
import { useAdminData } from '@/hooks/useAdminData';

const AdminDashboard = () => {
  const {
    products,
    categories,
    newProduct,
    newCategory,
    setNewProduct,
    setNewCategory,
    handleAddProduct,
    handleDeleteProduct,
    handleAddCategory,
    handleDeleteCategory
  } = useAdminData();

  return (
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

      <TabsContent value="products">
        <ProductsTab
          products={products}
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </TabsContent>

      <TabsContent value="categories">
        <CategoriesTab
          categories={categories}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      </TabsContent>

      <TabsContent value="orders">
        <OrdersTab />
      </TabsContent>

      <TabsContent value="registrations">
        <UserRegistrationsTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboard;
