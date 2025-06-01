
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Plus, Edit, Trash2, Tag, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Offer {
  id: string;
  name: string;
  description: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  discount: number;
  expiryDate: string;
  category: string;
}

const Offers = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: '1',
      name: 'تلفزيون سامسونج 65 بوصة',
      description: 'تلفزيون ذكي عالي الدقة مع تقنية 4K وواي فاي مدمج',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600',
      oldPrice: 1500,
      newPrice: 1200,
      discount: 20,
      expiryDate: '2024-12-31',
      category: 'إلكترونيات'
    },
    {
      id: '2',
      name: 'كرسي مكتبي فاخر',
      description: 'كرسي مكتبي مريح بتصميم عصري ومواد عالية الجودة',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
      oldPrice: 400,
      newPrice: 320,
      discount: 20,
      expiryDate: '2024-12-25',
      category: 'أثاث مكتبي'
    }
  ]);

  const [newOffer, setNewOffer] = useState({
    name: '',
    description: '',
    image: '',
    oldPrice: 0,
    newPrice: 0,
    expiryDate: '',
    category: ''
  });

  const handleAddOffer = () => {
    if (newOffer.name && newOffer.image && newOffer.oldPrice && newOffer.newPrice) {
      const discount = Math.round(((newOffer.oldPrice - newOffer.newPrice) / newOffer.oldPrice) * 100);
      const offer: Offer = {
        id: Date.now().toString(),
        ...newOffer,
        discount
      };
      setOffers([...offers, offer]);
      setNewOffer({ name: '', description: '', image: '', oldPrice: 0, newPrice: 0, expiryDate: '', category: '' });
    }
  };

  const handleDeleteOffer = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
  };

  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.newPrice,
      image: offer.image,
      category: offer.category
    });
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
          <span className="text-gray-600">العروض الخاصة</span>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 العروض الخاصة</h1>
          <p className="text-gray-600 text-lg">أفضل العروض والخصومات على منتجاتنا المميزة</p>
        </div>

        {/* Admin Controls */}
        <div className="mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-brand-blue hover:bg-blue-600">
                <Plus className="w-4 h-4 ml-2" />
                إضافة عرض جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>إضافة عرض جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="اسم المنتج"
                  value={newOffer.name}
                  onChange={(e) => setNewOffer({...newOffer, name: e.target.value})}
                />
                <Textarea
                  placeholder="وصف المنتج"
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                />
                <Input
                  placeholder="رابط صورة المنتج"
                  value={newOffer.image}
                  onChange={(e) => setNewOffer({...newOffer, image: e.target.value})}
                />
                <Input
                  placeholder="القسم"
                  value={newOffer.category}
                  onChange={(e) => setNewOffer({...newOffer, category: e.target.value})}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="السعر القديم"
                    value={newOffer.oldPrice}
                    onChange={(e) => setNewOffer({...newOffer, oldPrice: parseFloat(e.target.value)})}
                  />
                  <Input
                    type="number"
                    placeholder="السعر الجديد"
                    value={newOffer.newPrice}
                    onChange={(e) => setNewOffer({...newOffer, newPrice: parseFloat(e.target.value)})}
                  />
                </div>
                <Input
                  type="date"
                  placeholder="تاريخ انتهاء العرض"
                  value={newOffer.expiryDate}
                  onChange={(e) => setNewOffer({...newOffer, expiryDate: e.target.value})}
                />
                <Button onClick={handleAddOffer} className="w-full bg-brand-blue hover:bg-blue-600">
                  إضافة العرض
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <Card key={offer.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  خصم {offer.discount}%
                </div>
                <div className="absolute top-4 left-4 bg-brand-blue text-white px-2 py-1 rounded text-xs">
                  <Timer className="w-3 h-3 inline ml-1" />
                  حتى {new Date(offer.expiryDate).toLocaleDateString('ar')}
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="bg-blue-100 text-brand-blue px-2 py-1 rounded text-xs">
                    {offer.category}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800">{offer.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{offer.description}</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-red-500">${offer.newPrice}</span>
                  <span className="text-lg text-gray-500 line-through">${offer.oldPrice}</span>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-medium">
                    وفر ${offer.oldPrice - offer.newPrice}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleAddToCart(offer)}
                    className="flex-1 bg-brand-blue hover:bg-blue-600"
                  >
                    <Tag className="w-4 h-4 ml-2" />
                    اشتري الآن
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDeleteOffer(offer.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Empty State */}
          {offers.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لا توجد عروض حالياً</h3>
              <p className="text-gray-500">ابدأ بإضافة عروضك الخاصة من الزر أعلاه</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Offers;
