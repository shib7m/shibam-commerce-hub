
import React from 'react';
import { Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OrdersTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الطلبات الحديثة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد طلبات حالياً</h3>
            <p className="text-gray-500">ستظهر الطلبات الجديدة هنا عند وصولها</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersTab;
