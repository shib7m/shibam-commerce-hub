
import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    'الرئيسية',
    'الإلكترونيات',
    'الأثاث المنزلي',
    'ديكورات المنزل',
    'اتصل بنا'
  ];

  const customerService = [
    'سياسة الإرجاع',
    'سياسة الخصوصية',
    'شروط الاستخدام',
    'الأسئلة الشائعة',
    'دليل المقاسات'
  ];

  const categories = [
    'التلفزيونات',
    'المكيفات',
    'الثلاجات',
    'الغسالات',
    'أجهزة المطبخ'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4 text-brand-blue">
              🏪 شبام للتجارة
            </div>
            <p className="text-gray-300 mb-4">
              متجرك الموثوق للإلكترونيات والأثاث المنزلي. نقدم أفضل المنتجات بأسعار منافسة وجودة عالية.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-blue" />
                <span className="text-sm">صنعاء - شارع القيادة</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-blue" />
                <span className="text-sm">+96777749263</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-blue" />
                <span className="text-sm">8 صباحاً - 10 مساءً</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الفئات</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">خدمة العملاء</h3>
            <ul className="space-y-2 mb-6">
              {customerService.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <h4 className="text-md font-semibold mb-3">تابعنا على</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">اشترك في النشرة الإخبارية</h3>
              <p className="text-gray-300 text-sm">احصل على أحدث العروض والأخبار</p>
            </div>
            <div className="flex gap-2 w-full max-w-md">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-blue"
                dir="rtl"
              />
              <button className="px-6 py-2 bg-brand-blue hover:bg-blue-700 rounded-lg transition-colors">
                اشترك
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div>
              © 2024 شبام للتجارة. جميع الحقوق محفوظة.
            </div>
            <div className="flex gap-4">
              <span>تم التطوير بواسطة Lovable</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
