
import React from 'react';
import { Edit, Trash2, Folder, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/types/admin';

interface CategoriesListProps {
  categories: Category[];
  onDeleteCategory: (id: string) => void;
}

const CategoriesList = ({ categories, onDeleteCategory }: CategoriesListProps) => {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Folder className="w-6 h-6" />
          قائمة الأقسام ({categories.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">لا توجد أقسام مضافة بعد</p>
          </div>
        ) : (
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.id} className="space-y-4">
                {/* Main Category */}
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-indigo-100 rounded-lg">
                        <FolderOpen className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">{category.name}</h3>
                        <p className="text-gray-600 mt-1">{category.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1">
                        {category.productCount} منتج
                      </Badge>
                      <Button variant="outline" size="sm" className="hover:bg-indigo-50 hover:border-indigo-300">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => onDeleteCategory(category.id)}
                        className="hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-indigo-200">
                      <h4 className="font-semibold text-gray-700 mb-3">الأقسام الفرعية:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.id} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-100 rounded">
                                  <Folder className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-800">{subcategory.name}</h5>
                                  <p className="text-sm text-gray-600">{subcategory.description}</p>
                                  <Badge variant="outline" className="mt-1 text-xs">
                                    {subcategory.productCount} منتج
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="hover:bg-purple-50">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => onDeleteCategory(subcategory.id)}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoriesList;
