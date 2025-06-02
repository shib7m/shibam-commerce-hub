
import React, { useEffect } from 'react';

const MobileOptimization = () => {
  useEffect(() => {
    // تحسين العرض للأجهزة المحمولة
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // منع التكبير عند النقر على الحقول
    const inputs = document.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        if (window.innerWidth < 768) {
          const viewport = document.querySelector('meta[name="viewport"]');
          if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
          }
        }
      });
    });

    // تحسين الأداء للأجهزة البطيئة
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // تحسين اللمس للأجهزة المحمولة
    document.addEventListener('touchstart', function() {}, {passive: true});

  }, []);

  return null;
};

export default MobileOptimization;
