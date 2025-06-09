
import React from 'react';
import { Monitor, Sofa, Laptop, Home, Coffee, BookOpen, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const CategoriesSection = () => {
  const categories = [
    {
      id: 1,
      name: 'التلفزيونات',
      icon: Monitor,
      color: 'bg-blue-100 text-blue-600',
      count: 150,
      path: '/televisions'
    },
    {
      id: 2,
      name: 'الأثاث المنزلي',
      icon: Sofa,
      color: 'bg-green-100 text-green-600',
      count: 200,
      path: '/home-furniture'
    },
    {
      id: 3,
      name: 'أجهزة المطبخ',
      icon: Coffee,
      color: 'bg-red-100 text-red-600',
      count: 90,
      path: '/kitchen-appliances'
    },
    {
      id: 4,
      name: 'ديكورات المنزل',
      icon: Home,
      color: 'bg-orange-100 text-orange-600',
      count: 120,
      path: '/home-decor'
    },
    {
      id: 5,
      name: 'الإلكترونيات',
      icon: Laptop,
      color: 'bg-purple-100 text-purple-600',
      count: 85,
      path: '/electronics'
    },
    {
      id: 6,
      name: 'القرطاسية',
      icon: BookOpen,
      color: 'bg-cyan-100 text-cyan-600',
      count: 65,
      path: '/stationery'
    },
    {
      id: 7,
      name: 'الملابس',
      icon: Shirt,
      color: 'bg-pink-100 text-pink-600',
      count: 110,
      path: '/clothing'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">تسوق حسب الفئة</h2>
          <p className="text-gray-600">اكتشف مجموعتنا الواسعة من المنتجات</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} to={category.path}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover-scale group">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.count} منتج</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
