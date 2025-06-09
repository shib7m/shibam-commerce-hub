
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
  getSubcategoriesForCategory: (categoryId: string) => Category[];
}

const AddProductForm = ({ newProduct, setNewProduct, onAddProduct, categories, getSubcategoriesForCategory }: AddProductFormProps) => {
  const handleMediaChange = (media: any[]) => {
    setNewProduct({
      ...newProduct,
      media: media,
      image: media.length > 0 ? media[0].url : newProduct.image
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    setNewProduct({
      ...newProduct,
      category: categoryId,
      subcategory: '' // Reset subcategory when main category changes
    });
  };

  const isFormValid = () => {
    return newProduct.name.trim() !== '' && 
           newProduct.price > 0 && 
           newProduct.category.trim() !== '' &&
           newProduct.description.trim() !== '' &&
           (newProduct.oldPrice === undefined || newProduct.oldPrice > newProduct.price);
  };

  const selectedCategorySubcategories = newProduct.category ? getSubcategoriesForCategory(newProduct.category) : [];

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Plus className="w-6 h-6" />
          إضافة منتج جديد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">اسم المنتج *</label>
            <Input
              placeholder="أدخل اسم المنتج"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              className={`transition-all duration-200 ${newProduct.name.trim() === '' ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'}`}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">القسم الرئيسي *</label>
            <Select 
              value={newProduct.category} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className={`transition-all duration-200 ${newProduct.category.trim() === '' ? 'border-red-300' : 'border-green-300'}`}>
                <SelectValue placeholder="اختر القسم الرئيسي" />
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

          {selectedCategorySubcategories.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">القسم الفرعي</label>
              <Select 
                value={newProduct.subcategory || ''} 
                onValueChange={(value) => setNewProduct({...newProduct, subcategory: value})}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="اختر القسم الفرعي (اختياري)" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategorySubcategories.map((subcategory) => (
                    <SelectItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">السعر الجديد *</label>
            <Input
              type="number"
              placeholder="أدخل السعر"
              value={newProduct.price || ''}
              onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
              className={`transition-all duration-200 ${newProduct.price <= 0 ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'}`}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">السعر القديم</label>
            <Input
              type="number"
              placeholder="السعر قبل التخفيض (اختياري)"
              value={newProduct.oldPrice || ''}
              onChange={(e) => setNewProduct({...newProduct, oldPrice: parseFloat(e.target.value) || undefined})}
              className={`transition-all duration-200 ${newProduct.oldPrice !== undefined && newProduct.oldPrice <= newProduct.price ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
            />
            {newProduct.oldPrice !== undefined && newProduct.oldPrice <= newProduct.price && (
              <p className="text-red-500 text-xs">السعر القديم يجب أن يكون أكبر من السعر الجديد</p>
            )}
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700">رابط الصورة الرئيسية</label>
            <Input
              placeholder="رابط الصورة (اختياري)"
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
              className="border-gray-300"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">وصف المنتج *</label>
          <Textarea
            placeholder="أدخل وصف تفصيلي للمنتج"
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
            className={`transition-all duration-200 min-h-[100px] ${newProduct.description.trim() === '' ? 'border-red-300 focus:border-red-500' : 'border-green-300 focus:border-green-500'}`}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">صور إضافية</label>
          <MediaUploader
            onMediaChange={handleMediaChange}
            initialMedia={newProduct.media || []}
            maxFiles={10}
          />
        </div>
        
        <div className="flex flex-col gap-3 pt-4">
          {!isFormValid() && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">
                يرجى ملء جميع الحقول المطلوبة (*) والتأكد من صحة البيانات
              </p>
            </div>
          )}
          <Button 
            onClick={onAddProduct} 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 text-lg transition-all duration-200 transform hover:scale-105"
            disabled={!isFormValid()}
          >
            <Save className="w-5 h-5 ml-2" />
            حفظ المنتج ونشره
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddProductForm;
