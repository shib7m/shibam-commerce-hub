
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
    handleDeleteCategory,
    getAllCategories,
    getSubcategoriesForCategory
  } = useAdminData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-md border-0 h-14">
          <TabsTrigger value="products" className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-200">
            <Package className="w-5 h-5" />
            إدارة المنتجات
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-all duration-200">
            <Grid3X3 className="w-5 h-5" />
            إدارة الأقسام
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white transition-all duration-200">
            <Eye className="w-5 h-5" />
            مراجعة الطلبات
          </TabsTrigger>
          <TabsTrigger value="registrations" className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all duration-200">
            <Users className="w-5 h-5" />
            المسجلين
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="products">
            <ProductsTab
              products={products}
              categories={categories}
              newProduct={newProduct}
              setNewProduct={setNewProduct}
              onAddProduct={handleAddProduct}
              onDeleteProduct={handleDeleteProduct}
              getSubcategoriesForCategory={getSubcategoriesForCategory}
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
        </div>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
