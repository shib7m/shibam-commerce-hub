
import React from 'react';
import { Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Category {
  name: string;
  description: string;
  icon: string;
}

interface AddCategoryFormProps {
  newCategory: Category;
  setNewCategory: (category: Category) => void;
  onAddCategory: () => void;
}

const AddCategoryForm = ({ newCategory, setNewCategory, onAddCategory }: AddCategoryFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          إضافة قسم جديد
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="اسم القسم"
            value={newCategory.name}
            onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
          />
          <Input
            placeholder="اسم الأيقونة"
            value={newCategory.icon}
            onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
          />
        </div>
        <Textarea
          placeholder="وصف القسم"
          value={newCategory.description}
          onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
        />
        <Button onClick={onAddCategory} className="bg-brand-blue hover:bg-blue-600">
          <Save className="w-4 h-4 ml-2" />
          حفظ القسم
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddCategoryForm;
