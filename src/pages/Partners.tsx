
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

const Partners = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'شركة سامسونج',
      logo: 'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=200',
      website: 'https://samsung.com'
    },
    {
      id: '2',
      name: 'شركة ال جي',
      logo: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200',
      website: 'https://lg.com'
    },
    {
      id: '3',
      name: 'شركة فيليبس',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      website: 'https://philips.com'
    }
  ]);

  const [newPartner, setNewPartner] = useState({
    name: '',
    logo: '',
    website: ''
  });

  const handleAddPartner = () => {
    if (newPartner.name && newPartner.logo) {
      const partner: Partner = {
        id: Date.now().toString(),
        ...newPartner
      };
      setPartners([...partners, partner]);
      setNewPartner({ name: '', logo: '', website: '' });
    }
  };

  const handleDeletePartner = (id: string) => {
    setPartners(partners.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="flex items-center gap-1 text-brand-blue hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
          <span className="text-gray-400">←</span>
          <span className="text-gray-600">شركاؤنا</span>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🤝 شركاؤنا</h1>
          <p className="text-gray-600 text-lg">نفتخر بشراكتنا مع أفضل العلامات التجارية العالمية</p>
        </div>

        {/* Admin Controls */}
        <div className="mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-brand-blue hover:bg-blue-600">
                <Plus className="w-4 h-4 ml-2" />
                إضافة شريك جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>إضافة شريك جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="اسم الشريك"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                />
                <Input
                  placeholder="رابط شعار الشريك"
                  value={newPartner.logo}
                  onChange={(e) => setNewPartner({...newPartner, logo: e.target.value})}
                />
                <Input
                  placeholder="موقع الشريك (اختياري)"
                  value={newPartner.website}
                  onChange={(e) => setNewPartner({...newPartner, website: e.target.value})}
                />
                <Button onClick={handleAddPartner} className="w-full bg-brand-blue hover:bg-blue-600">
                  إضافة الشريك
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-20 object-contain mx-auto rounded-lg"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{partner.name}</h3>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-blue hover:underline"
                  >
                    زيارة الموقع
                  </a>
                )}
                
                {/* Admin Controls */}
                <div className="mt-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeletePartner(partner.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Empty State */}
          {partners.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد شراكات حالياً</h3>
              <p className="text-gray-500">ابدأ بإضافة شركائك من الزر أعلاه</p>
            </div>
          )}
        </div>

        {/* Partnership Benefits */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">لماذا الشراكة معنا؟</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">نمو المبيعات</h3>
                  <p className="text-gray-600">زيادة كبيرة في المبيعات من خلال منصتنا</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">استهداف دقيق</h3>
                  <p className="text-gray-600">وصول لعملاء مهتمين بمنتجاتكم</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">دعم مستمر</h3>
                  <p className="text-gray-600">فريق متخصص لدعم شراكتنا</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
