
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const categories = [
    { 
      name: 'الأثاث المنزلي', 
      path: '/home-furniture',
      subcategories: [
        { name: 'غرف النوم', path: '/home-furniture/bedrooms' },
        { name: 'غرف المعيشة', path: '/home-furniture/living-rooms' },
        { name: 'غرف الطعام', path: '/home-furniture/dining-rooms' }
      ]
    },
    { 
      name: 'أجهزة المطبخ', 
      path: '/kitchen-appliances',
      subcategories: [
        { name: 'الخلاطات', path: '/kitchen-appliances/blenders' },
        { name: 'الأفران', path: '/kitchen-appliances/ovens' },
        { name: 'غسالات', path: '/kitchen-appliances/washing-machines' },
        { name: 'أدوات المطبخ', path: '/kitchen-appliances/kitchen-tools' },
        { name: 'أواني الطبخ المنزلية', path: '/kitchen-appliances/home-cookware' },
        { name: 'الثلاجات', path: '/kitchen-appliances/refrigerators' },
        { name: 'المبردات', path: '/kitchen-appliances/coolers' },
        { name: 'خزائن المطبخ', path: '/kitchen-appliances/cabinets-kitchen' }
      ]
    },
    { 
      name: 'أجهزة التلفزيون', 
      path: '/televisions',
      subcategories: [
        { name: 'شاشات التلفزيون', path: '/televisions/tv-screens' },
        { name: 'أجهزة الاستقبال', path: '/televisions/receivers' },
        { name: 'ملحقات الشاشات', path: '/televisions/screen-accessories' },
        { name: 'أجهزة التحكم عن بعد', path: '/televisions/remote-controls' }
      ]
    },
    { 
      name: 'ديكور المنزل', 
      path: '/home-decor',
      subcategories: [
        { name: 'الإضاءة', path: '/home-decor/lighting' },
        { name: 'الستائر', path: '/home-decor/curtains' },
        { name: 'السجاد والموكيت', path: '/home-decor/rugs-carpets' },
        { name: 'الخزائن', path: '/home-decor/cabinets-decor' }
      ]
    },
    { 
      name: 'الإلكترونيات', 
      path: '/electronics',
      subcategories: [
        { name: 'إلكترونيات الجوال', path: '/electronics/mobile-electronics' },
        { name: 'الإلكترونيات العامة', path: '/electronics/general-electronics' },
        { name: 'بلايستيشن وإكس بوكس', path: '/electronics/gaming-consoles' },
        { name: 'ملحقات الكمبيوتر', path: '/electronics/computer-accessories' }
      ]
    },
    { 
      name: 'القرطاسية', 
      path: '/stationery',
      subcategories: [
        { name: 'الدفاتر والمستلزمات', path: '/stationery/notebooks-supplies' },
        { name: 'الزي المدرسي', path: '/stationery/school-uniforms' }
      ]
    },
    { 
      name: 'الملابس', 
      path: '/clothing',
      subcategories: [
        { name: 'عبايات البنات', path: '/clothing/girls-abayas' },
        { name: 'فساتين الأطفال', path: '/clothing/kids-dresses' },
        { name: 'الملابس الداخلية', path: '/clothing/underwear' },
        { name: 'فساتين السهرة', path: '/clothing/evening-dresses' },
        { name: 'الأحذية', path: '/clothing/shoes' },
        { name: 'الإكسسوارات', path: '/clothing/accessories' },
        { name: 'أدوات التجميل', path: '/clothing/beauty-tools' }
      ]
    }
  ];

  return (
    <nav className="bg-gray-50 border-t">
      <div className="container mx-auto px-4">
        <div className="hidden md:block">
          <ul className="flex justify-center items-center py-2 gap-4">
            <li>
              <Link to="/" className="block py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors font-medium">
                الرئيسية
              </Link>
            </li>
            {categories.map((category, index) => (
              <li key={index}>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 py-2 px-4 text-gray-700 hover:text-brand-blue transition-colors">
                    {category.name}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="center">
                    <DropdownMenuItem asChild>
                      <Link to={category.path} className="w-full">
                        جميع {category.name}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {category.subcategories.map((subcategory, subIndex) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link to={subcategory.path} className="w-full">
                          {subcategory.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
