
import React from 'react';
import { Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import MediaUploader from './MediaUploader';
import type { Category } from '@/types/admin';

interface AddCategoryFormProps {
  newCategory: Omit<Category, 'id' | 'productCount'> & { isSubcategory?: boolean; parentId?: string };
  setNewCategory: (category: Omit<Category, 'id' | 'productCount'> & { isSubcategory?: boolean; parentId?: string }) => void;
  onAddCategory: () => void;
  categories: Category[];
}

const AddCategoryForm = ({ newCategory, setNewCategory, onAddCategory, categories }: AddCategoryFormProps) => {
  const handleMediaChange = (media: any[]) => {
    setNewCategory({
      ...newCategory,
      media: media
    });
  };

  const isFormValid = () => {
    const basicFieldsValid = newCategory.name.trim() !== '' && 
                            newCategory.description.trim() !== '' &&
                            newCategory.icon.trim() !== '';
    
    if (newCategory.isSubcategory) {
      return basicFieldsValid && newCategory.parentId && newCategory.parentId.trim() !== '';
    }
    
    return basicFieldsValid;
  };

  const mainCategories = categories.filter(cat => !cat.parentId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          إضافة قسم جديد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isSubcategory"
            checked={newCategory.isSubcategory || false}
            onCheckedChange={(checked) => setNewCategory({
              ...newCategory, 
              isSubcategory: checked as boolean,
              parentId: checked ? newCategory.parentId : undefined
            })}
          />
          <label htmlFor="isSubcategory" className="text-sm font-medium">
            هذا قسم فرعي
          </label>
        </div>

        {newCategory.isSubcategory && (
          <div className="space-y-2">
            <label className="text-sm font-medium">اختر القسم الرئيسي *</label>
            <Select 
              value={newCategory.parentId || ''} 
              onValueChange={(value) => setNewCategory({...newCategory, parentId: value})}
            >
              <SelectTrigger className={newCategory.isSubcategory && !newCategory.parentId ? 'border-red-300' : ''}>
                <SelectValue placeholder="اختر القسم الرئيسي" />
              </SelectTrigger>
              <SelectContent>
                {mainCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="اسم القسم *"
            value={newCategory.name}
            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            className={newCategory.name.trim() === '' ? 'border-red-300' : ''}
          />
          <Input
            placeholder="أيقونة القسم *"
            value={newCategory.icon}
            onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
            className={newCategory.icon.trim() === '' ? 'border-red-300' : ''}
          />
        </div>
        <Textarea
          placeholder="وصف القسم *"
          value={newCategory.description}
          onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
          className={newCategory.description.trim() === '' ? 'border-red-300' : ''}
        />
        
        <MediaUploader
          onMediaChange={handleMediaChange}
          initialMedia={newCategory.media || []}
          maxFiles={5}
        />
        
        <div className="flex flex-col gap-2">
          {!isFormValid() && (
            <p className="text-red-500 text-sm">
              يرجى ملء جميع الحقول المطلوبة (*) قبل حفظ القسم
            </p>
          )}
          <Button 
            onClick={onAddCategory} 
            className="bg-brand-blue hover:bg-blue-600"
            disabled={!isFormValid()}
          >
            <Save className="w-4 h-4 ml-2" />
            حفظ القسم
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddCategoryForm;
