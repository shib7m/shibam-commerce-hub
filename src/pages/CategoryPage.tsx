
import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CategoryPageProps {
  category: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
  subcategory: string;
  createdAt: string;
}

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'تلفزيون سامسونج 55 بوصة 4K',
    price: 1200,
    originalPrice: 1400,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300',
    rating: 4.5,
    category: 'electronics',
    subcategory: 'tvs',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'مكيف هواء 24000 وحدة',
    price: 800,
    originalPrice: 950,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300',
    rating: 4.2,
    category: 'electronics',
    subcategory: 'air-conditioners',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'ثلاجة LG نو فروست',
    price: 900,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=300',
    rating: 4.7,
    category: 'electronics',
    subcategory: 'refrigerators',
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'أريكة زاوية مودرن',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300',
    rating: 4.3,
    category: 'furniture',
    subcategory: 'living-rooms',
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'مكتب مكتبي خشبي',
    price: 400,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300',
    rating: 4.1,
    category: 'office-furniture',
    subcategory: 'desks',
    createdAt: '2024-01-18'
  }
];

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { subcategory } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState('newest');
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  // Get category info
  const categoryInfo = {
    'electronics': { name: 'الإلكترونيات', icon: '📱' },
    'furniture': { name: 'الأثاث المنزلي', icon: '🛋️' },
    'office-furniture': { name: 'الأثاث المكتبي', icon: '🏢' },
    'home-decor': { name: 'ديكورات المنزل', icon: '🎨' },
    'small-appliances': { name: 'الأجهزة الصغيرة', icon: '☕' }
  };

  const subcategoryInfo = {
    'tvs': 'التلفزيونات',
    'air-conditioners': 'المكيفات',
    'refrigerators': 'الثلاجات',
    'washing-machines': 'الغسالات',
    'bedrooms': 'غرف النوم',
    'living-rooms': 'غرف المعيشة',
    'dining-rooms': 'غرف الطعام',
    'desks': 'مكاتب',
    'chairs': 'كراسي مكتبية',
    'cabinets': 'خزائن',
    'lighting': 'إضاءة',
    'curtains': 'ستائر',
    'carpets': 'سجاد',
    'blenders': 'خلاطات',
    'irons': 'مكاوي',
    'kitchen-tools': 'أدوات المطبخ'
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      if (subcategory) {
        return product.category === category && product.subcategory === subcategory;
      }
      return product.category === category;
    });

    // Sort products
    switch (sortBy) {
      case 'price_asc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered = filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [category, subcategory, sortBy]);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: categoryInfo[category as keyof typeof categoryInfo]?.name || category
    });
  };

  const currentCategoryInfo = categoryInfo[category as keyof typeof categoryInfo];
  const currentSubcategory = subcategory ? subcategoryInfo[subcategory as keyof typeof subcategoryInfo] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="flex items-center gap-1 text-brand-blue hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
          <span className="text-gray-400">←</span>
          <Link to={`/${category}`} className="text-brand-blue hover:text-blue-600 transition-colors">
            {currentCategoryInfo?.name}
          </Link>
          {currentSubcategory && (
            <>
              <span className="text-gray-400">←</span>
              <span className="text-gray-600">{currentSubcategory}</span>
            </>
          )}
        </div>

        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للخلف
        </Button>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {currentCategoryInfo?.icon} {currentSubcategory || currentCategoryInfo?.name}
            </h1>
            <p className="text-gray-600">عُثر على {filteredAndSortedProducts.length} منتج</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* View Type Toggle */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewType === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('grid')}
                className="w-8 h-8 p-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewType === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('list')}
                className="w-8 h-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Sort Select */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="price_asc">السعر: الأقل إلى الأعلى</SelectItem>
                <SelectItem value="price_desc">السعر: الأعلى إلى الأقل</SelectItem>
                <SelectItem value="rating">التقييم الأعلى</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-xl font-semibold mb-2">لا توجد منتجات</h2>
            <p className="text-gray-600">لم يتم العثور على منتجات في هذا القسم</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewType === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredAndSortedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-all duration-300 hover-scale">
                <CardContent className={`p-4 ${viewType === 'list' ? 'flex items-center gap-4' : ''}`}>
                  <div className={viewType === 'list' ? 'w-32 h-32 flex-shrink-0' : 'aspect-square mb-4'}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className={viewType === 'list' ? 'flex-1' : ''}>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-yellow-400">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                      </div>
                      <span className="text-sm text-gray-500">({product.rating})</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl font-bold text-brand-blue">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                      {product.originalPrice && (
                        <span className="text-sm text-green-600 font-medium">
                          وفر ${product.originalPrice - product.price}
                        </span>
                      )}
                    </div>
                    
                    <div className={`flex gap-2 ${viewType === 'list' ? 'flex-row' : 'flex-col'}`}>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-brand-blue hover:bg-blue-600 text-white"
                      >
                        إضافة للسلة
                      </Button>
                      <Link to={`/product/${product.id}`}>
                        <Button variant="outline" className="w-full">
                          عرض التفاصيل
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPage;
