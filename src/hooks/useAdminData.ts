import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useProducts } from '@/contexts/ProductsContext';
import { Product, Category, MediaFile } from '@/types/admin';

export const useAdminData = () => {
  const { toast } = useToast();
  const { products, addProduct: addProductToContext, deleteProduct: deleteProductFromContext } = useProducts();

  // Updated category structure with all requested categories and subcategories
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 'home-furniture', 
      name: 'الأثاث المنزلي', 
      description: 'أثاث عصري للمنزل', 
      icon: 'Sofa', 
      media: [], 
      productCount: 0,
      subcategories: [
        { id: 'bedrooms', name: 'غرف النوم', description: 'أثاث غرف النوم الأنيقة', icon: 'Home', media: [], productCount: 0, parentId: 'home-furniture' },
        { id: 'living-rooms', name: 'غرف المعيشة', description: 'أثاث غرف المعيشة المريحة', icon: 'Sofa', media: [], productCount: 0, parentId: 'home-furniture' },
        { id: 'dining-rooms', name: 'غرف الطعام', description: 'أثاث غرف الطعام الأنيقة', icon: 'UtensilsCrossed', media: [], productCount: 0, parentId: 'home-furniture' }
      ]
    },
    { 
      id: 'kitchen-appliances', 
      name: 'أجهزة المطبخ', 
      description: 'أجهزة المطبخ الحديثة', 
      icon: 'ChefHat', 
      media: [], 
      productCount: 0,
      subcategories: [
        { id: 'blenders', name: 'الخلاطات', description: 'خلاطات متنوعة للمطبخ', icon: 'Coffee', media: [], productCount: 0, parentId: 'kitchen-appliances' },
        { id: 'ovens', name: 'الأفران', description: 'أفران حديثة للطبخ', icon: 'Oven', media: [], productCount: 0, parentId: 'kitchen-appliances' },
        { id: 'washing-machines', name: 'غسالات', description: 'غسالات عالية الجودة', icon: 'Washing', media: [], productCount: 0, parentId: 'kitchen-appliances' },
        { id: 'kitchen-tools', name: 'أدوات المطبخ', description: 'أدوات مطبخ متنوعة', icon: 'Utensils', media: [], productCount: 0, parentId: 'kitchen-appliances' },
        { id: 'home-cookware', name: 'أواني الطبخ المنزلية', description: 'أواني طبخ عالية الجودة', icon: 'Chef', media: [], productCount: 0, parentId: 'kitchen-appliances' },
        { id: 'refrigerators', name: 'الثلاجات', description: 'ثلاجات حديثة وموفرة', icon: 'Refrigerator', media: [], productCount: 0, parentId: 'kitchen-appliances' },
        { id: 'coolers', name: 'المبردات', description: 'مبردات متنوعة الأحجام', icon: 'Snowflake', media: [], productCount: 0, parentId: 'kitchen-appliances' },
        { id: 'cabinets-kitchen', name: 'خزائن المطبخ', description: 'خزائن مطبخ عملية وأنيقة', icon: 'Cabinet', media: [], productCount: 0, parentId: 'kitchen-appliances' }
      ]
    },
    { 
      id: 'televisions', 
      name: 'أجهزة التلفزيون', 
      description: 'أجهزة تلفزيون حديثة وذكية', 
      icon: 'Monitor', 
      media: [], 
      productCount: 0,
      subcategories: [
        { id: 'tv-screens', name: 'شاشات التلفزيون', description: 'شاشات تلفزيون عالية الجودة', icon: 'Monitor', media: [], productCount: 0, parentId: 'televisions' },
        { id: 'receivers', name: 'أجهزة الاستقبال', description: 'أجهزة استقبال متطورة', icon: 'Radio', media: [], productCount: 0, parentId: 'televisions' },
        { id: 'screen-accessories', name: 'ملحقات الشاشات', description: 'ملحقات وإكسسوارات الشاشات', icon: 'Cable', media: [], productCount: 0, parentId: 'televisions' },
        { id: 'remote-controls', name: 'أجهزة التحكم عن بعد', description: 'أجهزة تحكم عن بعد متنوعة', icon: 'Gamepad2', media: [], productCount: 0, parentId: 'televisions' }
      ]
    },
    { 
      id: 'home-decor', 
      name: 'ديكور المنزل', 
      description: 'قطع ديكور أنيقة للمنزل', 
      icon: 'Palette', 
      media: [], 
      productCount: 0,
      subcategories: [
        { id: 'lighting', name: 'الإضاءة', description: 'حلول إضاءة متنوعة', icon: 'Lightbulb', media: [], productCount: 0, parentId: 'home-decor' },
        { id: 'curtains', name: 'الستائر', description: 'ستائر أنيقة ومتنوعة', icon: 'Blinds', media: [], productCount: 0, parentId: 'home-decor' },
        { id: 'rugs-carpets', name: 'السجاد والموكيت', description: 'سجاد وموكيت عالي الجودة', icon: 'Square', media: [], productCount: 0, parentId: 'home-decor' },
        { id: 'cabinets-decor', name: 'الخزائن', description: 'خزائن ديكور أنيقة', icon: 'Cabinet', media: [], productCount: 0, parentId: 'home-decor' }
      ]
    },
    { 
      id: 'electronics', 
      name: 'الإلكترونيات', 
      description: 'أجهزة إلكترونية متنوعة', 
      icon: 'Laptop', 
      media: [], 
      productCount: 0,
      subcategories: [
        { id: 'mobile-electronics', name: 'إلكترونيات الجوال', description: 'ملحقات وإكسسوارات الجوال', icon: 'Smartphone', media: [], productCount: 0, parentId: 'electronics' },
        { id: 'general-electronics', name: 'الإلكترونيات العامة', description: 'أجهزة إلكترونية متنوعة', icon: 'Zap', media: [], productCount: 0, parentId: 'electronics' },
        { id: 'gaming-consoles', name: 'بلايستيشن وإكس بوكس', description: 'أجهزة الألعاب وملحقاتها', icon: 'Gamepad2', media: [], productCount: 0, parentId: 'electronics' },
        { id: 'computer-accessories', name: 'ملحقات الكمبيوتر', description: 'ملحقات وإكسسوارات الكمبيوتر', icon: 'Mouse', media: [], productCount: 0, parentId: 'electronics' }
      ]
    },
    { 
      id: 'stationery', 
      name: 'القرطاسية', 
      description: 'مستلزمات دراسية ومكتبية', 
      icon: 'BookOpen', 
      media: [], 
      productCount: 0,
      subcategories: [
        { id: 'notebooks-supplies', name: 'الدفاتر والمستلزمات', description: 'دفاتر ومستلزمات دراسية', icon: 'Notebook', media: [], productCount: 0, parentId: 'stationery' },
        { id: 'school-uniforms', name: 'الزي المدرسي', description: 'ملابس وأزياء مدرسية', icon: 'GraduationCap', media: [], productCount: 0, parentId: 'stationery' }
      ]
    },
    { 
      id: 'clothing', 
      name: 'الملابس', 
      description: 'ملابس وأزياء متنوعة', 
      icon: 'Shirt', 
      media: [], 
      productCount: 0,
      subcategories: [
        { id: 'girls-abayas', name: 'عبايات البنات', description: 'عبايات أنيقة للبنات', icon: 'User', media: [], productCount: 0, parentId: 'clothing' },
        { id: 'kids-dresses', name: 'فساتين الأطفال', description: 'فساتين جميلة للأطفال', icon: 'Baby', media: [], productCount: 0, parentId: 'clothing' },
        { id: 'underwear', name: 'الملابس الداخلية', description: 'ملابس داخلية مريحة', icon: 'Shirt', media: [], productCount: 0, parentId: 'clothing' },
        { id: 'evening-dresses', name: 'فساتين السهرة', description: 'فساتين سهرة أنيقة', icon: 'Sparkles', media: [], productCount: 0, parentId: 'clothing' },
        { id: 'shoes', name: 'الأحذية', description: 'أحذية متنوعة وأنيقة', icon: 'FootPrints', media: [], productCount: 0, parentId: 'clothing' },
        { id: 'accessories', name: 'الإكسسوارات', description: 'إكسسوارات متنوعة', icon: 'Watch', media: [], productCount: 0, parentId: 'clothing' },
        { id: 'beauty-tools', name: 'أدوات التجميل', description: 'أدوات تجميل وعناية', icon: 'Sparkles', media: [], productCount: 0, parentId: 'clothing' }
      ]
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

  // Get recently added products (last 10 products)
  const getRecentProducts = () => {
    return [...products]
      .sort((a, b) => parseInt(b.id) - parseInt(a.id))
      .slice(0, 10);
  };

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || newProduct.price <= 0 || !newProduct.category.trim() || !newProduct.description.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة (الاسم، السعر، القسم، الوصف)",
        variant: "destructive"
      });
      return;
    }

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
    
    addProductToContext(product);
    
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
      description: "تم حفظ المنتج وإضافته للقسم المحدد وسيظهر الآن في الموقع"
    });
  };

  const handleDeleteProduct = (id: string) => {
    const productToDelete = products.find(p => p.id === id);
    if (productToDelete) {
      deleteProductFromContext(id);
      
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
        description: "تم حذف المنتج بنجاح من الموقع"
      });
    }
  };

  const handleAddCategory = () => {
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
      setCategories(prev => prev.map(cat => 
        cat.id === newCategory.parentId 
          ? { 
              ...cat, 
              subcategories: [...(cat.subcategories || []), newCat]
            }
          : cat
      ));
    } else {
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
    const categoryProducts = products.filter(p => p.category === id || p.subcategory === id);
    if (categoryProducts.length > 0) {
      toast({
        title: "لا يمكن حذف القسم",
        description: "يجب حذف جميع المنتجات من القسم أولاً",
        variant: "destructive"
      });
      return;
    }

    const isMainCategory = categories.some(cat => cat.id === id);
    
    if (isMainCategory) {
      setCategories(categories.filter(c => c.id !== id));
    } else {
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
    getSubcategoriesForCategory,
    getRecentProducts
  };
};
