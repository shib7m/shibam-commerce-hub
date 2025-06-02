
import React, { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// تحميل كسول للصفحات الثقيلة
const LazyAdmin = lazy(() => import('../pages/Admin'));
const LazyCart = lazy(() => import('../pages/Cart'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-brand-blue" />
      <p className="text-gray-600">جار التحميل...</p>
    </div>
  </div>
);

export const OptimizedAdmin = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyAdmin />
  </Suspense>
);

export const OptimizedCart = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <LazyCart />
  </Suspense>
);
