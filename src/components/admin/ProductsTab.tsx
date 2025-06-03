
import React from 'react';
import AddProductForm from './AddProductForm';
import ProductsList from './ProductsList';
import type { Product } from '@/types/admin';

interface ProductsTabProps {
  products: Product[];
  newProduct: Omit<Product, 'id'>;
  setNewProduct: (product: Omit<Product, 'id'>) => void;
  onAddProduct: () => void;
  onDeleteProduct: (id: string) => void;
}

const ProductsTab = ({ 
  products, 
  newProduct, 
  setNewProduct, 
  onAddProduct, 
  onDeleteProduct 
}: ProductsTabProps) => {
  return (
    <div className="space-y-6">
      <AddProductForm
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        onAddProduct={onAddProduct}
      />
      <ProductsList
        products={products}
        onDeleteProduct={onDeleteProduct}
      />
    </div>
  );
};

export default ProductsTab;
