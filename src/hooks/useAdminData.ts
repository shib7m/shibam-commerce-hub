
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
      oldPrice: 1500,
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
    oldPrice: undefined as number | undefined,
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
    media: [] as MediaFile[],
    isSubcategory: false,
    parentId: undefined as string | undefined
  });

  const handleAddProduct = () => {
    // Validation
    if (!newProduct.name.trim() || newProduct.price <= 0 || !newProduct.category.trim() || !newProduct.description.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      ...newProduct
    };
    
    setProducts([...products, product]);
    
    // Update category product count
    setCategories(prev => prev.map(cat => 
      cat.id === newProduct.category 
        ? { ...cat, productCount: cat.productCount + 1 }
        : cat
    ));
    
    setNewProduct({ 
      name: '', 
      price: 0, 
      oldPrice: undefined,
      category: '', 
      description: '', 
      image: '', 
      media: [], 
      inStock: true 
    });
    
    toast({
      title: "تم إضافة المنتج",
      description: "تم حفظ المنتج بنجاح وظهر للمستخدمين فوراً"
    });
  };

  const handleDeleteProduct = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== id));
      
      // Update category product count
      setCategories(prev => prev.map(cat => 
        cat.id === productToDelete.category 
          ? { ...cat, productCount: Math.max(0, cat.productCount - 1) }
          : cat
      ));
    }
  };

  const handleAddCategory = () => {
    // Validation
    if (!newCategory.name.trim() || !newCategory.description.trim() || !newCategory.icon.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    if (newCategory.isSubcategory && !newCategory.parentId) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى اختيار القسم الرئيسي للقسم الفرعي",
        variant: "destructive"
      });
      return;
    }

    const category: Category = {
      id: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      media: newCategory.media,
      productCount: 0,
      parentId: newCategory.parentId
    };
    
    setCategories([...categories, category]);
    setNewCategory({ 
      name: '', 
      description: '', 
      icon: 'Package', 
      media: [],
      isSubcategory: false,
      parentId: undefined
    });
    
    toast({
      title: "تم إضافة القسم",
      description: "تم حفظ القسم بنجاح وظهر للمستخدمين فوراً"
    });
  };

  const handleDeleteCategory = (id: string) => {
    // Check if category has products
    const categoryProducts = products.filter(p => p.category === id);
    if (categoryProducts.length > 0) {
      toast({
        title: "لا يمكن حذف القسم",
        description: "يجب حذف جميع المنتجات من القسم أولاً",
        variant: "destructive"
      });
      return;
    }

    setCategories(categories.filter(c => c.id !== id));
    toast({
      title: "تم حذف القسم",
      description: "تم حذف القسم بنجاح"
    });
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
