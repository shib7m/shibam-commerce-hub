
import React, { useEffect } from 'react';
import { X, Home, Monitor, Sofa, Briefcase, Palette, Coffee, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSidebar } from '@/contexts/SidebarContext';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  const menuItems = [
    {
      title: 'الرئيسية',
      icon: Home,
      path: '/'
    },
    {
      title: 'الإلكترونيات',
      icon: Monitor,
      path: '/electronics',
      subItems: [
        { title: 'التلفزيونات', path: '/electronics/tvs' },
        { title: 'المكيفات', path: '/electronics/air-conditioners' },
        { title: 'الثلاجات', path: '/electronics/refrigerators' },
        { title: 'الغسالات', path: '/electronics/washing-machines' }
      ]
    },
    {
      title: 'الأثاث المنزلي',
      icon: Sofa,
      path: '/furniture',
      subItems: [
        { title: 'غرف النوم', path: '/furniture/bedrooms' },
        { title: 'غرف المعيشة', path: '/furniture/living-rooms' },
        { title: 'غرف الطعام', path: '/furniture/dining-rooms' }
      ]
    },
    {
      title: 'الأثاث المكتبي',
      icon: Briefcase,
      path: '/office-furniture',
      subItems: [
        { title: 'مكاتب', path: '/office-furniture/desks' },
        { title: 'كراسي مكتبية', path: '/office-furniture/chairs' },
        { title: 'خزائن', path: '/office-furniture/cabinets' }
      ]
    },
    {
      title: 'ديكورات المنزل',
      icon: Palette,
      path: '/home-decor',
      subItems: [
        { title: 'إضاءة', path: '/home-decor/lighting' },
        { title: 'ستائر', path: '/home-decor/curtains' },
        { title: 'سجاد', path: '/home-decor/carpets' }
      ]
    },
    {
      title: 'الأجهزة الصغيرة',
      icon: Coffee,
      path: '/small-appliances',
      subItems: [
        { title: 'خلاطات', path: '/small-appliances/blenders' },
        { title: 'مكاوي', path: '/small-appliances/irons' },
        { title: 'أدوات المطبخ', path: '/small-appliances/kitchen-tools' }
      ]
    },
    {
      title: 'لوحة الإدارة',
      icon: Phone,
      path: '/admin'
    }
  ];

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.querySelector('[title="القائمة"]');
      
      if (
        isSidebarOpen && 
        sidebar && 
        !sidebar.contains(event.target as Node) &&
        !menuButton?.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isSidebarOpen) {
        closeSidebar();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isSidebarOpen, closeSidebar]);

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header - Ultra Compact */}
        <div className="flex items-center justify-between p-2 border-b bg-brand-blue text-white flex-shrink-0">
          <h2 className="text-base font-bold">القائمة</h2>
          <button
            onClick={closeSidebar}
            className="p-1 hover:bg-blue-600 rounded transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Menu Content - Maximum space utilization */}
        <div className="flex-1 overflow-hidden">
          <nav className="p-1 h-full">
            <ul className="space-y-0 h-full flex flex-col text-xs">
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <li key={index} className="flex-shrink-0">
                    <Link
                      to={item.path}
                      className="flex items-center gap-1.5 p-1.5 text-gray-700 hover:bg-blue-50 hover:text-brand-blue rounded transition-colors group"
                      onClick={closeSidebar}
                    >
                      <IconComponent className="w-3 h-3 group-hover:scale-110 transition-transform flex-shrink-0" />
                      <span className="font-medium text-xs">{item.title}</span>
                    </Link>
                    
                    {/* Sub Items - Ultra Compact */}
                    {item.subItems && (
                      <ul className="mr-4 space-y-0">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subItem.path}
                              className="block p-1 text-xs text-gray-600 hover:text-brand-blue hover:bg-blue-50 rounded transition-colors leading-tight"
                              onClick={closeSidebar}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Footer - Minimal */}
        <div className="p-2 border-t bg-gray-50 flex-shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Phone className="w-2 h-2" />
              <span className="text-xs">+96777749263</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Mail className="w-2 h-2" />
              <span className="text-xs">info@shabam.com</span>
            </div>
            <p className="text-xs text-gray-500 text-center leading-tight">
              © 2024 شبام
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
