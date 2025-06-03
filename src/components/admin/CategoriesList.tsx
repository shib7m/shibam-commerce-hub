
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Category } from '@/types/admin';

interface CategoriesListProps {
  categories: Category[];
  onDeleteCategory: (id: string) => void;
}

const CategoriesList = ({ categories, onDeleteCategory }: CategoriesListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>قائمة الأقسام</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="p-4 bg-white border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{category.name}</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => onDeleteCategory(category.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{category.description}</p>
              <p className="text-sm text-brand-blue">{category.productCount} منتج</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesList;
