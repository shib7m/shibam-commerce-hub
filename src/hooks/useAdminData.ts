
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product, Category, MediaFile } from '@/types/admin';

export const useAdminData = () => {
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
      media: [],
      inStock: true
    },
    {
      id: '2',
      name: 'كرسي مكتبي مريح',
      price: 350,
      category: 'office-furniture',
      description: 'كرسي مكتبي بتصميم مريح ومواد عالية الجودة',
      image: '/placeholder.svg',
      media: [],
      inStock: true
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 'electronics', name: 'الإلكترونيات', description: 'أجهزة إلكترونية حديثة', icon: 'Monitor', media: [], productCount: 45 },
    { id: 'furniture', name: 'الأثاث المنزلي', description: 'أثاث عصري للمنزل', icon: 'Sofa', media: [], productCount: 32 },
    { id: 'office-furniture', name: 'الأثاث المكتبي', description: 'أثاث مكتبي احترافي', icon: 'Briefcase', media: [], productCount: 28 }
  ]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    media: [] as MediaFile[],
    inStock: true
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: 'Package',
    media: [] as MediaFile[]
  });

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: 0, category: '', description: '', image: '', media: [], inStock: true });
    toast({
      title: "تم إضافة المنتج",
      description: "تم حفظ المنتج بنجاح مع الوسائط المرفقة"
    });
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
    setNewCategory({ name: '', description: '', icon: 'Package', media: [] });
    toast({
      title: "تم إضافة القسم",
      description: "تم حفظ القسم بنجاح مع الوسائط المرفقة"
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return {
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
  };
};
