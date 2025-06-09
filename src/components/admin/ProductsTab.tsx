
import React from 'react';
import AddProductForm from './AddProductForm';
import ProductsList from './ProductsList';
import type { Product, Category } from '@/types/admin';

interface ProductsTabProps {
  products: Product[];
  categories: Category[];
  newProduct: Omit<Product, 'id'>;
  setNewProduct: (product: Omit<Product, 'id'>) => void;
  onAddProduct: () => void;
  onDeleteProduct: (id: string) => void;
  getSubcategoriesForCategory: (categoryId: string) => Category[];
}

const ProductsTab = ({ 
  products, 
  categories,
  newProduct, 
  setNewProduct, 
  onAddProduct, 
  onDeleteProduct,
  getSubcategoriesForCategory
}: ProductsTabProps) => {
  return (
    <div className="space-y-8">
      <AddProductForm
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onAddProduct={onAddProduct}
        categories={categories}
        getSubcategoriesForCategory={getSubcategoriesForCategory}
      />
      <ProductsList
        products={products}
        onDeleteProduct={onDeleteProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductsTab;
