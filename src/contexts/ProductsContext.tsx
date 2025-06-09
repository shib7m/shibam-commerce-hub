
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/admin';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  getProductsByCategory: (category: string, subcategory?: string) => Product[];
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};

interface ProductsProviderProps {
  children: ReactNode;
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'تلفزيون ذكي 55 بوصة',
      price: 1200,
      oldPrice: 1500,
      category: 'televisions',
      subcategory: 'tv-screens',
      description: 'تلفزيون ذكي عالي الدقة مع تقنية 4K وإمكانيات الاتصال بالإنترنت',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      media: [],
      inStock: true
    },
    {
      id: '2',
      name: 'كنبة مودرن للمعيشة',
      price: 850,
      oldPrice: 1200,
      category: 'home-furniture',
      subcategory: 'living-rooms',
      description: 'كنبة مريحة بتصميم عصري لغرفة المعيشة مصنوعة من أجود الخامات',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
      media: [],
      inStock: true
    },
    {
      id: '3',
      name: 'ثلاجة LG نو فروست',
      price: 900,
      category: 'kitchen-appliances',
      subcategory: 'refrigerators',
      description: 'ثلاجة حديثة بتقنية نو فروست وسعة كبيرة للأسرة',
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500',
      media: [],
      inStock: true
    },
    {
      id: '4',
      name: 'خلاط كهربائي قوي',
      price: 120,
      oldPrice: 150,
      category: 'kitchen-appliances',
      subcategory: 'blenders',
      description: 'خلاط كهربائي عالي القوة مع عدة سرعات وملحقات متنوعة',
      image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500',
      media: [],
      inStock: true
    },
    {
      id: '5',
      name: 'جهاز استقبال رقمي',
      price: 80,
      category: 'televisions',
      subcategory: 'receivers',
      description: 'جهاز استقبال رقمي عالي الجودة مع دعم HD',
      image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=500',
      media: [],
      inStock: true
    }
  ]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, ...updatedProduct } : p
    ));
  };

  const getProductsByCategory = (category: string, subcategory?: string) => {
    return products.filter(product => {
      if (subcategory) {
        return product.category === category && product.subcategory === subcategory;
      }
      return product.category === category;
    });
  };

  return (
    <ProductsContext.Provider value={{
      products,
      addProduct,
      deleteProduct,
      updateProduct,
      getProductsByCategory
    }}>
      {children}
    </ProductsContext.Provider>
  );
};
