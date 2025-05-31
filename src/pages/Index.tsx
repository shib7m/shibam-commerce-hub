
import React from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import SpecialOffers from '@/components/SpecialOffers';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8">
          <HeroSlider />
        </section>

        {/* Categories Section */}
        <CategoriesSection />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Special Offers */}
        <SpecialOffers />

        {/* About Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">لماذا تختار شبام للتجارة؟</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">توصيل سريع</h3>
                  <p className="text-gray-600">توصيل مجاني للطلبات أكثر من 500$</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">ضمان الجودة</h3>
                  <p className="text-gray-600">ضمان شامل على جميع المنتجات</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">دعم على مدار الساعة</h3>
                  <p className="text-gray-600">خدمة عملاء متاحة 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">تعرف على متجرنا</h2>
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600">انقر لمشاهدة الفيديو التعريفي</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
