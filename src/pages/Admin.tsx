
import React from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import AdminAccessGuard from '@/components/admin/AdminAccessGuard';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = () => {
  const { isAdmin } = useAdmin();

  return (
    <AdminAccessGuard isAdmin={isAdmin}>
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    </AdminAccessGuard>
  );
};

export default Admin;
