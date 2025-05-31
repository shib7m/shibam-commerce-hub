
import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Blinds, Waves, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HomeDecor = () => {
  const navigate = useNavigate();

  const subcategories = [
    {
      id: 'lighting',
      name: 'إضاءة',
      icon: Lightbulb,
      count: 45,
      description: 'ثريات ولمبات ديكورية',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'curtains',
      name: 'ستائر',
      icon: Blinds,
      count: 32,
      description: 'ستائر وبراقع منزلية',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'carpets',
      name: 'سجاد',
      icon: Waves,
      count: 28,
      description: 'سجاد وموكيت بتصاميم متنوعة',
      color: 'bg-red-100 text-red-600'
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
          <span className="text-gray-600">ديكورات المنزل</span>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎨 ديكورات المنزل</h1>
          <p className="text-gray-600 text-lg">لمسات جمالية لتزيين منزلك</p>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {subcategories.map((subcategory) => {
            const IconComponent = subcategory.icon;
            return (
              <Link
                key={subcategory.id}
                to={`/home-decor/${subcategory.id}`}
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
          <Link to="/home-decor/all">
            <Button size="lg" className="bg-brand-blue hover:bg-blue-600 text-white">
              عرض جميع منتجات ديكورات المنزل
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomeDecor;
