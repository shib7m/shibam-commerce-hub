
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'الإلكترونيات',
    'الأثاث المنزلي',
    'الأثاث المكتبي',
    'ديكورات المنزل',
    'الأجهزة الصغيرة'
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-brand-blue text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>+96777749263</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>صنعاء - شارع القيادة</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>ساعات العمل: 8 صباحاً - 10 مساءً</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-brand-blue font-ubuntu">
              🏪 شبام للتجارة
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-gray-200 focus:border-brand-blue"
                dir="rtl"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Button>
            
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-gray-200 focus:border-brand-blue"
              dir="rtl"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t">
        <div className="container mx-auto px-4">
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
            <ul className="flex flex-col md:flex-row md:justify-center items-center py-2 gap-2 md:gap-8">
              <li>
                <a href="/" className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors font-medium">
                  الرئيسية
                </a>
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <a href={`/category/${index}`} className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors">
                    {category}
                  </a>
                </li>
              ))}
              <li>
                <a href="/contact" className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors">
                  اتصل بنا
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
