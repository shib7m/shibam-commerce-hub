
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Gift } from 'lucide-react';

interface SuccessAnimationProps {
  onComplete: () => void;
}

const SuccessAnimation = ({ onComplete }: SuccessAnimationProps) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center space-y-6 py-8">
      {/* Fireworks Animation */}
      <div className="relative">
        <div className="fireworks">
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </div>
        
        {/* Success Message */}
        <div className="animate-bounce">
          <h2 className="text-3xl font-bold text-brand-blue mb-4">
            🎉 مبروك! 🎉
          </h2>
        </div>
      </div>

      {/* Discount Sticker */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg transform rotate-1 animate-pulse">
        <Gift className="w-12 h-12 mx-auto mb-3" />
        <h3 className="text-xl font-bold mb-2">تهانينا!</h3>
        <p className="text-lg font-semibold">حصلت على خصم 10% على أي منتج!</p>
        <div className="text-sm mt-2 opacity-90">استخدم الكود عند الطلب</div>
      </div>

      {/* Success Message */}
      <div className="text-gray-600">
        <p>تم تسجيل رقمك بنجاح</p>
        <p className="text-sm">ستحصل على أفضل العروض والخصومات</p>
      </div>

      {/* Go to Homepage Button */}
      {showButton && (
        <Button 
          onClick={onComplete}
          className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 animate-fade-in"
        >
          <Home className="w-5 h-5 ml-2" />
          العودة للصفحة الرئيسية
        </Button>
      )}

      <style jsx>{`
        .fireworks {
          position: relative;
          height: 100px;
          width: 100%;
        }
        
        .firework {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: firework 2s infinite;
        }
        
        .firework:nth-child(1) {
          left: 20%;
          background: #ff6b6b;
          animation-delay: 0s;
        }
        
        .firework:nth-child(2) {
          left: 50%;
          background: #4ecdc4;
          animation-delay: 0.5s;
        }
        
        .firework:nth-child(3) {
          left: 80%;
          background: #ffe66d;
          animation-delay: 1s;
        }
        
        @keyframes firework {
          0% {
            transform: scale(0) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) translateY(-30px);
            opacity: 1;
          }
          100% {
            transform: scale(0) translateY(-60px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessAnimation;
