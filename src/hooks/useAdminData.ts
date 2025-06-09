
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Product, Category, MediaFile } from '@/types/admin';

export const useAdminData = () => {
  const { toast } = useToast();

  // Updated sample data with proper category structure
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 'televisions', 
      name: 'أجهزة التلفزيون', 
      description: 'أجهزة تلفزيون حديثة وذكية', 
      icon: 'Monitor', 
      media: [], 
      productCount: 15,
      subcategories: [
        { id: 'smart-tv', name: 'تلفزيونات ذكية', description: 'تلفزيونات ذكية بأحدث التقنيات', icon: 'Monitor', media: [], productCount: 8, parentId: 'televisions' },
        { id: 'led-tv', name: 'تلفزيونات LED', description: 'تلفزيونات LED عالية الجودة', icon: 'Monitor', media: [], productCount: 7, parentId: 'televisions' }
      ]
    },
    { 
      id: 'home-furniture', 
      name: 'الأثاث المنزلي', 
      description: 'أثاث عصري للمنزل', 
      icon: 'Sofa', 
      media: [], 
      productCount: 32,
      subcategories: [
        { id: 'bedrooms', name: 'غرف النوم', description: 'أثاث غرف النوم الأنيقة', icon: 'Home', media: [], productCount: 15, parentId: 'home-furniture' },
        { id: 'living-rooms', name: 'غرف المعيشة', description: 'أثاث غرف المعيشة المريحة', icon: 'Sofa', media: [], productCount: 17, parentId: 'home-furniture' }
      ]
    },
    { 
      id: 'computers', 
      name: 'أجهزة الكمبيوتر', 
      description: 'أجهزة كمبيوتر وملحقاتها', 
      icon: 'Laptop', 
      media: [], 
      productCount: 28,
      subcategories: [
        { id: 'laptops', name: 'أجهزة اللابتوب', description: 'أجهزة لابتوب متنوعة', icon: 'Laptop', media: [], productCount: 12, parentId: 'computers' },
        { id: 'desktop', name: 'أجهزة مكتبية', description: 'أجهزة كمبيوتر مكتبية', icon: 'Monitor', media: [], productCount: 16, parentId: 'computers' }
      ]
    },
    { 
      id: 'home-decor', 
      name: 'ديكور المنزل', 
      description: 'قطع ديكور أنيقة للمنزل', 
      icon: 'Palette', 
      media: [], 
      productCount: 45,
      subcategories: [
        { id: 'wall-art', name: 'فن الحائط', description: 'لوحات وفن للحوائط', icon: 'Image', media: [], productCount: 20, parentId: 'home-decor' },
        { id: 'lighting', name: 'الإضاءة', description: 'حلول إضاءة متنوعة', icon: 'Lightbulb', media: [], productCount: 25, parentId: 'home-decor' }
      ]
    },
    { 
      id: 'kitchen-appliances', 
      name: 'أجهزة المطبخ', 
      description: 'أجهزة المطبخ الحديثة', 
      icon: 'ChefHat', 
      media: [], 
      productCount: 38,
      subcategories: [
        { id: 'small-appliances', name: 'أجهزة صغيرة', description: 'أجهزة المطبخ الصغيرة', icon: 'Coffee', media: [], productCount: 18, parentId: 'kitchen-appliances' },
        { id: 'large-appliances', name: 'أجهزة كبيرة', description: 'أجهزة المطبخ الكبيرة', icon: 'Refrigerator', media: [], productCount: 20, parentId: 'kitchen-appliances' }
      ]
    }
  ]);

  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'تلفزيون ذكي 55 بوصة',
      price: 1200,
      oldPrice: 1500,
      category: 'televisions',
      subcategory: 'smart-tv',
      description: 'تلفزيون ذكي عالي الدقة مع تقنية 4K',
      image: '/placeholder.svg',
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
      description: 'كنبة مريحة بتصميم عصري لغرفة المعيشة',
      image: '/placeholder.svg',
      media: [],
      inStock: true
    }
  ]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    oldPrice: undefined,
    category: '',
    subcategory: '',
    description: '',
    image: '',
    media: [],
    inStock: true
  });

  const [newCategory, setNewCategory] = useState<Omit<Category, 'id' | 'productCount'> & { isSubcategory?: boolean; parentId?: string }>({
    name: '',
    description: '',
    icon: 'Package',
    media: [],
    isSubcategory: false,
    parentId: undefined
  });

  // Helper function to get all categories (main + subcategories) as flat list
  const getAllCategories = () => {
    const allCategories: Category[] = [];
    categories.forEach(category => {
      allCategories.push(category);
      if (category.subcategories) {
        allCategories.push(...category.subcategories);
      }
    });
    return allCategories;
  };

  // Helper function to get subcategories for a main category
  const getSubcategoriesForCategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.subcategories || [];
  };

  const handleAddProduct = () => {
    // Validation
    if (!newProduct.name.trim() || newProduct.price <= 0 || !newProduct.category.trim() || !newProduct.description.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة (الاسم، السعر، القسم، الوصف)",
        variant: "destructive"
      });
      return;
    }

    // Validate old price if provided
    if (newProduct.oldPrice !== undefined && newProduct.oldPrice <= newProduct.price) {
      toast({
        title: "خطأ في السعر",
        description: "السعر القديم يجب أن يكون أكبر من السعر الجديد",
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
    setCategories(prev => prev.map(cat => {
      if (cat.id === newProduct.category) {
        return { ...cat, productCount: cat.productCount + 1 };
      }
      if (cat.subcategories) {
        const updatedSubcategories = cat.subcategories.map(subcat => 
          subcat.id === newProduct.subcategory 
            ? { ...subcat, productCount: subcat.productCount + 1 }
            : subcat
        );
        return { ...cat, subcategories: updatedSubcategories };
      }
      return cat;
    }));
    
    setNewProduct({ 
      name: '', 
      price: 0, 
      oldPrice: undefined,
      category: '', 
      subcategory: '',
      description: '', 
      image: '', 
      media: [], 
      inStock: true 
    });
    
    toast({
      title: "تم إضافة المنتج بنجاح",
      description: "تم حفظ المنتج وإضافته للقسم المحدد"
    });
  };

  const handleDeleteProduct = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== id));
      
      // Update category product count
      setCategories(prev => prev.map(cat => {
        if (cat.id === productToDelete.category) {
          return { ...cat, productCount: Math.max(0, cat.productCount - 1) };
        }
        if (cat.subcategories) {
          const updatedSubcategories = cat.subcategories.map(subcat => 
            subcat.id === productToDelete.subcategory 
              ? { ...subcat, productCount: Math.max(0, subcat.productCount - 1) }
              : subcat
          );
          return { ...cat, subcategories: updatedSubcategories };
        }
        return cat;
      }));

      toast({
        title: "تم حذف المنتج",
        description: "تم حذف المنتج بنجاح"
      });
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

    const categoryId = newCategory.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    
    const newCat: Category = {
      id: categoryId,
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      media: newCategory.media,
      productCount: 0,
      parentId: newCategory.parentId
    };

    if (newCategory.isSubcategory && newCategory.parentId) {
      // Add as subcategory
      setCategories(prev => prev.map(cat => 
        cat.id === newCategory.parentId 
          ? { 
              ...cat, 
              subcategories: [...(cat.subcategories || []), newCat]
            }
          : cat
      ));
    } else {
      // Add as main category
      setCategories([...categories, { ...newCat, subcategories: [] }]);
    }
    
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
      description: "تم حفظ القسم بنجاح"
    });
  };

  const handleDeleteCategory = (id: string) => {
    // Check if category has products
    const categoryProducts = products.filter(p => p.category === id || p.subcategory === id);
    if (categoryProducts.length > 0) {
      toast({
        title: "لا يمكن حذف القسم",
        description: "يجب حذف جميع المنتجات من القسم أولاً",
        variant: "destructive"
      });
      return;
    }

    // Check if it's a main category or subcategory
    const isMainCategory = categories.some(cat => cat.id === id);
    
    if (isMainCategory) {
      // Delete main category and its subcategories
      setCategories(categories.filter(c => c.id !== id));
    } else {
      // Delete subcategory
      setCategories(prev => prev.map(cat => ({
        ...cat,
        subcategories: cat.subcategories?.filter(subcat => subcat.id !== id) || []
      })));
    }
    
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
    handleDeleteCategory,
    getAllCategories,
    getSubcategoriesForCategory
  };
};
