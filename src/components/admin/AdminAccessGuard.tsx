
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdminLoginDialog from './AdminLoginDialog';

interface AdminAccessGuardProps {
  children: React.ReactNode;
  isAdmin: boolean;
}

const AdminAccessGuard = ({ children, isAdmin }: AdminAccessGuardProps) => {
  const [showLoginDialog, setShowLoginDialog] = useState(!isAdmin);

  const handleLoginSuccess = () => {
    setShowLoginDialog(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">🔒 منطقة محظورة</h1>
            <p className="text-gray-600 mb-6">هذه الصفحة متاحة للمديرين فقط</p>
            <Button onClick={() => setShowLoginDialog(true)}>
              تسجيل دخول الإدارة
            </Button>
          </div>
        </main>
        <Footer />
        
        <AdminLoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminAccessGuard;
