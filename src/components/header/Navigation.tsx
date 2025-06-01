
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const categories = [
    { name: 'الإلكترونيات', path: '/electronics' },
    { name: 'الأثاث المنزلي', path: '/furniture' },
    { name: 'الأثاث المكتبي', path: '/office-furniture' },
    { name: 'ديكورات المنزل', path: '/home-decor' },
    { name: 'الأجهزة الصغيرة', path: '/small-appliances' }
  ];

  return (
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
  );
};

export default Navigation;
