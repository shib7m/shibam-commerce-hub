
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Users, Eye, Calendar } from 'lucide-react';

interface Registration {
  phoneNumber: string;
  timestamp: string;
  date: string;
  time: string;
}

const UserRegistrationsTab = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [popupVisits, setPopupVisits] = useState(0);

  useEffect(() => {
    // Load data from localStorage
    const savedRegistrations = JSON.parse(localStorage.getItem('phoneRegistrations') || '[]');
    const savedVisits = parseInt(localStorage.getItem('popupVisits') || '0');
    
    setRegistrations(savedRegistrations);
    setPopupVisits(savedVisits);
  }, []);

  const getTodayStats = () => {
    const today = new Date().toLocaleDateString('ar-YE');
    const todayRegistrations = registrations.filter(reg => reg.date === today);
    return {
      todayRegistrations: todayRegistrations.length,
      totalRegistrations: registrations.length
    };
  };

  const exportToExcel = () => {
    const csvContent = [
      ['رقم الهاتف', 'التاريخ', 'الوقت'],
      ...registrations.map(reg => [reg.phoneNumber, reg.date, reg.time])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `phone_registrations_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  const stats = getTodayStats();

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">زيارات النافذة المنبثقة</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{popupVisits}</div>
            <p className="text-xs text-muted-foreground">إجمالي الزيارات</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">التسجيلات اليوم</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayRegistrations}</div>
            <p className="text-xs text-muted-foreground">تسجيل جديد اليوم</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي التسجيلات</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">جميع المسجلين</p>
          </CardContent>
        </Card>
      </div>

      {/* Export Button */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            أرقام الهواتف المسجلة
            <Button onClick={exportToExcel} variant="outline" size="sm">
              <Download className="w-4 h-4 ml-2" />
              تصدير Excel
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {registrations.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">لا توجد تسجيلات حالياً</h3>
              <p className="text-gray-500">ستظهر أرقام الهواتف المسجلة هنا</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="max-h-96 overflow-y-auto">
                <div className="grid gap-2">
                  {registrations.map((registration, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{registration.phoneNumber}</div>
                      <div className="text-sm text-gray-600">
                        {registration.date} - {registration.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRegistrationsTab;
