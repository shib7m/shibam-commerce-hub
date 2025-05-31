
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'عروض خاصة على الإلكترونيات',
      subtitle: 'خصم يصل إلى 50% على جميع أجهزة التلفزيون',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=500&fit=crop',
      buttonText: 'تسوق الآن'
    },
    {
      id: 2,
      title: 'أثاث منزلي عصري',
      subtitle: 'اكتشف مجموعتنا الجديدة من الأثاث المنزلي',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=500&fit=crop',
      buttonText: 'استكشف المجموعة'
    },
    {
      id: 3,
      title: 'تكنولوجيا متقدمة',
      subtitle: 'أحدث أجهزة الكمبيوتر واللابتوب',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=500&fit=crop',
      buttonText: 'اعرف المزيد'
    },
    {
      id: 4,
      title: 'مطبخ ذكي',
      subtitle: 'أجهزة مطبخ حديثة لحياة أسهل',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=500&fit=crop',
      buttonText: 'تسوق المطبخ'
    },
    {
      id: 5,
      title: 'عروض نهاية الأسبوع',
      subtitle: 'لا تفوت عروضنا المميزة لفترة محدودة',
      image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1200&h=500&fit=crop',
      buttonText: 'احصل على العرض'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-2xl px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
                  {slide.subtitle}
                </p>
                <Button
                  size="lg"
                  className="bg-brand-blue hover:bg-blue-700 text-white px-8 py-3 text-lg animate-fade-in-up"
                >
                  {slide.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
