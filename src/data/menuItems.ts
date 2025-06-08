
import { Home, Monitor, Sofa, Briefcase, Palette, Coffee, Phone } from 'lucide-react';
import { MenuItem } from '@/types/sidebar';

export const menuItems: MenuItem[] = [
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
