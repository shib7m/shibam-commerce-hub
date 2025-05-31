
import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Sofa, UtensilsCrossed, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Furniture = () => {
  const navigate = useNavigate();

  const subcategories = [
    {
      id: 'bedrooms',
      name: 'غرف النوم',
      icon: Bed,
      count: 35,
      description: 'أطقم غرف نوم كاملة',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'living-rooms',
      name: 'غرف المعيشة',
      icon: Sofa,
      count: 42,
      description: 'أرائك ومجالس عصرية',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'dining-rooms',
      name: 'غرف الطعام',
      icon: UtensilsCrossed,
      count: 28,
      description: 'طاولات وكراسي طعام',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="flex items-center gap-1 text-brand-blue hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
          <span className="text-gray-400">←</span>
          <span className="text-gray-600">الأثاث المنزلي</span>
        </div>

        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للخلف
        </Button>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🛋️ الأثاث المنزلي</h1>
          <p className="text-gray-600 text-lg">أثاث عصري وكلاسيكي لجميع غرف المنزل</p>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subcategories.map((subcategory) => {
            const IconComponent = subcategory.icon;
            return (
              <Link
                key={subcategory.id}
                to={`/furniture/${subcategory.id}`}
                className="block"
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover-scale cursor-pointer h-full">
                  <CardContent className="p-6 text-center h-full flex flex-col">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${subcategory.color} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{subcategory.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 flex-1">{subcategory.description}</p>
                    <p className="text-sm font-medium text-brand-blue">{subcategory.count} منتج</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <Link to="/furniture/all">
            <Button size="lg" className="bg-brand-blue hover:bg-blue-600 text-white">
              عرض جميع منتجات الأثاث المنزلي
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Furniture;
