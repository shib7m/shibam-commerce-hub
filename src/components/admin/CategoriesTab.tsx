
import React from 'react';
import AddCategoryForm from './AddCategoryForm';
import CategoriesList from './CategoriesList';
import type { Category } from '@/types/admin';

interface CategoriesTabProps {
  categories: Category[];
  newCategory: Omit<Category, 'id' | 'productCount'> & { isSubcategory?: boolean; parentId?: string };
  setNewCategory: (category: Omit<Category, 'id' | 'productCount'> & { isSubcategory?: boolean; parentId?: string }) => void;
  onAddCategory: () => void;
  onDeleteCategory: (id: string) => void;
}

const CategoriesTab = ({ 
  categories, 
  newCategory, 
  setNewCategory, 
  onAddCategory, 
  onDeleteCategory 
}: CategoriesTabProps) => {
  return (
    <div className="space-y-6">
      <AddCategoryForm
        newCategory={newCategory}
        setNewCategory={setNewCategory}
        onAddCategory={onAddCategory}
        categories={categories}
      />
      <CategoriesList
        categories={categories}
        onDeleteCategory={onDeleteCategory}
      />
    </div>
  );
};

export default CategoriesTab;
