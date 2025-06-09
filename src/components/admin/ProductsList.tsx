
import React from 'react';
import { Edit, Trash2, Image as ImageIcon, Video, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product, Category } from '@/types/admin';

interface ProductsListProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
  categories: Category[];
}

const ProductsList = ({ products, onDeleteProduct, categories }: ProductsListProps) => {
  const getCategoryName = (categoryId: string) => {
    // Check main categories first
    const mainCategory = categories.find(cat => cat.id === categoryId);
    if (mainCategory) return mainCategory.name;
    
    // Check subcategories
    for (const category of categories) {
      if (category.subcategories) {
        const subcategory = category.subcategories.find(sub => sub.id === categoryId);
        if (subcategory) return subcategory.name;
      }
    }
    return categoryId;
  };

  const renderMediaCount = (product: Product) => {
    if (!product.media || product.media.length === 0) return null;
    
    const images = product.media.filter(m => m.type === 'image').length;
    const videos = product.media.filter(m => m.type === 'video').length;
    
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {images > 0 && (
          <span className="flex items-center gap-1 bg-blue-100 px-2 py-1 rounded">
            <ImageIcon className="w-3 h-3" />
            {images}
          </span>
        )}
        {videos > 0 && (
          <span className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded">
            <Video className="w-3 h-3" />
            {videos}
          </span>
        )}
      </div>
    );
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Package className="w-6 h-6" />
          قائمة المنتجات ({products.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">لا توجد منتجات مضافة بعد</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img 
                      src={product.media && product.media.length > 0 ? product.media[0].url : product.image || '/placeholder.svg'} 
                      alt={product.name} 
                      className="w-20 h-20 object-cover rounded-lg shadow-md" 
                    />
                    {product.media && product.media.length > 1 && (
                      <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                        {product.media.length}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        {getCategoryName(product.category)}
                      </Badge>
                      {product.subcategory && (
                        <Badge variant="outline" className="border-purple-300 text-purple-700">
                          {getCategoryName(product.subcategory)}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      {product.oldPrice && (
                        <span className="text-lg text-gray-500 line-through">${product.oldPrice}</span>
                      )}
                      <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
                        {product.inStock ? "متوفر" : "غير متوفر"}
                      </Badge>
                    </div>
                    {renderMediaCount(product)}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 transition-colors">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDeleteProduct(product.id)}
                    className="hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductsList;
