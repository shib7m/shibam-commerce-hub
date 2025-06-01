
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Phone, MapPin, Home, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useSidebar } from '@/contexts/SidebarContext';
import Sidebar from './Sidebar';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { getCartCount } = useCart();
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const categories = [
    { name: 'الإلكترونيات', path: '/electronics' },
    { name: 'الأثاث المنزلي', path: '/furniture' },
    { name: 'الأثاث المكتبي', path: '/office-furniture' },
    { name: 'ديكورات المنزل', path: '/home-decor' },
    { name: 'الأجهزة الصغيرة', path: '/small-appliances' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img 
                  src="/lovable-uploads/d7fe75c5-79bb-463f-924a-7f0bcbbd728e.png" 
                  alt="شبام للتجارة" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <div className={`hidden md:flex flex-1 max-w-lg mx-8 transition-all duration-300 ${isSearchExpanded ? 'scale-105' : ''}`}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-gray-200 focus:border-brand-blue"
                  dir="rtl"
                  onFocus={() => setIsSearchExpanded(true)}
                  onBlur={() => setIsSearchExpanded(false)}
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              {/* Home Button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleHomeClick}
                className="hover:bg-blue-50 hover:text-brand-blue transition-colors"
                title="الرئيسية"
              >
                <Home className="w-5 h-5" />
              </Button>

              {/* User Account */}
              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-blue-50 hover:text-brand-blue transition-colors"
                title="حسابي"
              >
                <User className="w-5 h-5" />
              </Button>

              {/* Search Button (Mobile) */}
              <Button 
                variant="ghost" 
                size="icon"
                className="md:hidden hover:bg-blue-50 hover:text-brand-blue transition-colors"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                title="البحث"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Cart Button */}
              <Button 
                variant="outline" 
                className="relative hover:bg-blue-50 hover:border-brand-blue transition-colors"
                onClick={handleCartClick}
                title="سلة التسوق"
              >
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {getCartCount()}
                  </span>
                )}
              </Button>
              
              {/* Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="hover:bg-blue-50 hover:text-brand-blue transition-colors"
                title="القائمة"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchExpanded && (
            <div className="md:hidden mt-4 animate-fade-in">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input
                  type="text"
                  placeholder="ابحث عن المنتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-gray-200 focus:border-brand-blue"
                  dir="rtl"
                  autoFocus
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="bg-gray-50 border-t">
          <div className="container mx-auto px-4">
            <div className="hidden md:block">
              <ul className="flex justify-center items-center py-2 gap-8">
                <li>
                  <Link to="/" className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors font-medium">
                    الرئيسية
                  </Link>
                </li>
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link 
                      to={category.path} 
                      className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/contact" className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors">
                    العروض
                  </Link>
                </li>
                <li>
                  <Link to="/partners" className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors">
                    الشركاء
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar */}
      <Sidebar />
    </>
  );
};

export default Header;
