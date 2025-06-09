
import React from 'react';
import { Clock, Package, Tag, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product, Category } from '@/types/admin';

interface RecentProductsTabProps {
  products: Product[];
  categories: Category[];
}

const RecentProductsTab = ({ products, categories }: RecentProductsTabProps) => {
  const getCategoryName = (categoryId: string) => {
    const mainCategory = categories.find(cat => cat.id === categoryId);
    if (mainCategory) return mainCategory.name;
    
    for (const category of categories) {
      if (category.subcategories) {
        const subcategory = category.subcategories.find(sub => sub.id === categoryId);
        if (subcategory) return subcategory.name;
      }
    }
    return categoryId;
  };

  const getMainCategoryForSubcategory = (subcategoryId: string) => {
    for (const category of categories) {
      if (category.subcategories) {
        const subcategory = category.subcategories.find(sub => sub.id === subcategoryId);
        if (subcategory) return category.name;
      }
    }
    return null;
  };

  const formatDate = (id: string) => {
    const timestamp = parseInt(id);
    const date = new Date(timestamp);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get recently added products (sorted by ID which is timestamp)
  const recentProducts = [...products]
    .sort((a, b) => parseInt(b.id) - parseInt(a.id))
    .slice(0, 15);

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Clock className="w-6 h-6" />
          المنتجات المضافة حديثاً ({recentProducts.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {recentProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">لا توجد منتجات مضافة حديثاً</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentProducts.map((product, index) => {
              const mainCategoryName = getCategoryName(product.category);
              const subcategoryName = product.subcategory ? getCategoryName(product.subcategory) : null;
              
              return (
                <div key={product.id} className="relative">
                  {/* Recent indicator for first 3 products */}
                  {index < 3 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center font-bold z-10">
                      جديد
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-emerald-50 border border-emerald-200 rounded-xl hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img 
                          src={product.media && product.media.length > 0 ? product.media[0].url : product.image || '/placeholder.svg'} 
                          alt={product.name} 
                          className="w-20 h-20 object-cover rounded-lg shadow-md" 
                        />
                        {product.media && product.media.length > 1 && (
                          <div className="absolute -top-2 -left-2 bg-emerald-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                            {product.media.length}
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                        
                        {/* Category and Subcategory */}
                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1">
                            <Tag className="w-4 h-4 text-emerald-600" />
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                              {mainCategoryName}
                            </Badge>
                          </div>
                          {subcategoryName && (
                            <Badge variant="outline" className="border-teal-300 text-teal-700">
                              {subcategoryName}
                            </Badge>
                          )}
                        </div>
                        
                        {/* Price and Date */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-green-600">${product.price}</span>
                            {product.oldPrice && (
                              <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(product.id)}</span>
                          </div>
                          
                          <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                            {product.inStock ? "متوفر" : "غير متوفر"}
                          </Badge>
                        </div>
                        
                        {/* Product Description */}
                        <p className="text-sm text-gray-600 line-clamp-2 max-w-md">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Order indicator */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-xs text-gray-500">الترتيب</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentProductsTab;
