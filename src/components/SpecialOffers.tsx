
import React, { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const offers = [
    {
      id: 1,
      title: 'عرض البرق ⚡',
      description: 'خصم 40% على جميع أجهزة التلفزيون',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=200&fit=crop',
      discount: 40,
      originalPrice: 2500,
      salePrice: 1500
    },
    {
      id: 2,
      title: 'عرض الأثاث المميز',
      description: 'اشتري قطعتين واحصل على خصم 30%',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=200&fit=crop',
      discount: 30,
      originalPrice: 1800,
      salePrice: 1260
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="bg-red-500 text-white mb-4 px-4 py-1 text-lg">
            <Zap className="w-5 h-5 ml-2" />
            عروض محدودة الوقت
          </Badge>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">عروض لا تُفوَّت!</h2>
          <p className="text-gray-600">استغل الفرصة قبل انتهاء الوقت</p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-md mx-auto">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-red-500 ml-2" />
            <span className="text-lg font-semibold">ينتهي العرض خلال:</span>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-red-500 text-white rounded-lg p-3">
              <div className="text-2xl font-bold">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="text-xs">يوم</div>
            </div>
            <div className="bg-red-500 text-white rounded-lg p-3">
              <div className="text-2xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="text-xs">ساعة</div>
            </div>
            <div className="bg-red-500 text-white rounded-lg p-3">
              <div className="text-2xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="text-xs">دقيقة</div>
            </div>
            <div className="bg-red-500 text-white rounded-lg p-3">
              <div className="text-2xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="text-xs">ثانية</div>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500 text-white text-lg px-3 py-1">
                    -{offer.discount}%
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-500">${offer.salePrice}</span>
                    <span className="text-lg text-gray-500 line-through">${offer.originalPrice}</span>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">
                    وفر ${offer.originalPrice - offer.salePrice}
                  </span>
                </div>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  احصل على العرض الآن
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
