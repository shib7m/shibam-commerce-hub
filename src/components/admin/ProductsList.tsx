
import React from 'react';
import { Edit, Trash2, Image as ImageIcon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Product } from '@/types/admin';

interface ProductsListProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
}

const ProductsList = ({ products, onDeleteProduct }: ProductsListProps) => {
  const renderMediaCount = (product: Product) => {
    if (!product.media || product.media.length === 0) return null;
    
    const images = product.media.filter(m => m.type === 'image').length;
    const videos = product.media.filter(m => m.type === 'video').length;
    
    return (
      <div className="flex items-center gap-2 text-xs text-gray-500">
        {images > 0 && (
          <span className="flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            {images}
          </span>
        )}
        {videos > 0 && (
          <span className="flex items-center gap-1">
            <Video className="w-3 h-3" />
            {videos}
          </span>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>قائمة المنتجات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 bg-white border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={product.media && product.media.length > 0 ? product.media[0].url : product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded" 
                  />
                  {product.media && product.media.length > 1 && (
                    <div className="absolute -top-1 -right-1 bg-brand-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {product.media.length}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-lg font-bold text-brand-blue">${product.price}</p>
                  {renderMediaCount(product)}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onDeleteProduct(product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsList;
