
import React from 'react';
import { Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MediaUploader from './MediaUploader';
import type { Product, Category } from '@/types/admin';

interface AddProductFormProps {
  newProduct: Omit<Product, 'id'>;
  setNewProduct: (product: Omit<Product, 'id'>) => void;
  onAddProduct: () => void;
  categories: Category[];
}

const AddProductForm = ({ newProduct, setNewProduct, onAddProduct, categories }: AddProductFormProps) => {
  const handleMediaChange = (media: any[]) => {
    setNewProduct({
      ...newProduct,
      media: media,
      image: media.length > 0 ? media[0].url : newProduct.image
    });
  };

  const isFormValid = () => {
    return newProduct.name.trim() !== '' && 
           newProduct.price > 0 && 
           newProduct.category.trim() !== '' &&
           newProduct.description.trim() !== '';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          إضافة منتج جديد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="اسم المنتج *"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            className={newProduct.name.trim() === '' ? 'border-red-300' : ''}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">اختر القسم *</label>
            <Select 
              value={newProduct.category} 
              onValueChange={(value) => setNewProduct({...newProduct, category: value})}
            >
              <SelectTrigger className={newProduct.category.trim() === '' ? 'border-red-300' : ''}>
                <SelectValue placeholder="اختر القسم" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            type="number"
            placeholder="السعر الجديد *"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
            className={newProduct.price <= 0 ? 'border-red-300' : ''}
          />
          <Input
            type="number"
            placeholder="السعر القديم (اختياري)"
            value={newProduct.oldPrice || ''}
            onChange={(e) => setNewProduct({...newProduct, oldPrice: parseFloat(e.target.value) || undefined})}
          />
          <Input
            placeholder="رابط الصورة الرئيسية (اختياري)"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />
        </div>
        <Textarea
          placeholder="وصف المنتج *"
          value={newProduct.description}
          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          className={newProduct.description.trim() === '' ? 'border-red-300' : ''}
        />
        
        <MediaUploader
          onMediaChange={handleMediaChange}
          initialMedia={newProduct.media || []}
          maxFiles={10}
        />
        
        <div className="flex flex-col gap-2">
          {!isFormValid() && (
            <p className="text-red-500 text-sm">
              يرجى ملء جميع الحقول المطلوبة (*) قبل حفظ المنتج
            </p>
          )}
          <Button 
            onClick={onAddProduct} 
            className="bg-brand-blue hover:bg-blue-600"
            disabled={!isFormValid()}
          >
            <Save className="w-4 h-4 ml-2" />
            حفظ المنتج
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
