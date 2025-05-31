
import React from 'react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'تلفزيون سامسونج 55 بوصة 4K',
      price: 2500,
      originalPrice: 3000,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 128,
      discount: 17,
      isNew: false,
      inStock: true
    },
    {
      id: 2,
      name: 'كنب استقبال 7 مقاعد',
      price: 1800,
      originalPrice: 2200,
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 95,
      discount: 18,
      isNew: true,
      inStock: true
    },
    {
      id: 3,
      name: 'لابتوب ديل إنسبايرون',
      price: 1200,
      originalPrice: 1400,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      rating: 4.3,
      reviews: 67,
      discount: 14,
      isNew: false,
      inStock: true
    },
    {
      id: 4,
      name: 'ثلاجة إل جي 18 قدم',
      price: 1600,
      originalPrice: 1900,
      image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 112,
      discount: 16,
      isNew: false,
      inStock: false
    },
    {
      id: 5,
      name: 'مكيف غري انفرتر 1.5 حصان',
      price: 800,
      originalPrice: 950,
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
      rating: 4.4,
      reviews: 89,
      discount: 16,
      isNew: true,
      inStock: true
    },
    {
      id: 6,
      name: 'غسالة هاير أوتوماتيك 8 كيلو',
      price: 900,
      originalPrice: 1100,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      rating: 4.2,
      reviews: 156,
      discount: 18,
      isNew: false,
      inStock: true
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">المنتجات المميزة</h2>
            <p className="text-gray-600">أفضل المنتجات مع أحدث العروض</p>
          </div>
          <Button variant="outline" className="hidden md:block">
            عرض جميع المنتجات
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {product.discount > 0 && (
                    <Badge className="bg-red-500 text-white">
                      -{product.discount}%
                    </Badge>
                  )}
                  {product.isNew && (
                    <Badge className="bg-green-500 text-white">
                      جديد
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge variant="secondary">
                      نفذ المخزون
                    </Badge>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="rounded-full w-10 h-10 p-0" disabled={!product.inStock}>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-brand-blue">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="bg-brand-blue hover:bg-blue-700"
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'أضف للسلة' : 'نفذ المخزون'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline" className="w-full max-w-xs">
            عرض جميع المنتجات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
