
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <Link to="/" className="flex items-center gap-1 text-brand-blue hover:text-blue-600 transition-colors">
          <Home className="w-4 h-4" />
          الرئيسية
        </Link>
        <span className="text-gray-400">←</span>
        <span className="text-gray-600">لوحة الإدارة</span>
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
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">⚙️ لوحة الإدارة</h1>
        <p className="text-gray-600 text-lg">إدارة المنتجات والأقسام والطلبات</p>
      </div>
    </>
  );
};

export default AdminHeader;
