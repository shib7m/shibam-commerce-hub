
import React from 'react';
import AddCategoryForm from './AddCategoryForm';
import CategoriesList from './CategoriesList';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  productCount: number;
}

interface CategoriesTabProps {
  categories: Category[];
  newCategory: Omit<Category, 'id' | 'productCount'>;
  setNewCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
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
      />
      <CategoriesList
        categories={categories}
        onDeleteCategory={onDeleteCategory}
      />
    </div>
  );
};

export default CategoriesTab;
