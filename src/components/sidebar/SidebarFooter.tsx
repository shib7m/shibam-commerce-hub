
import React from 'react';
import { Phone, Mail } from 'lucide-react';

const SidebarFooter = () => {
  return (
    <div className="p-2 border-t bg-gray-50 flex-shrink-0">
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Phone className="w-2 h-2" />
          <span className="text-xs">+96777749263</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Mail className="w-2 h-2" />
          <span className="text-xs">info@shabam.com</span>
        </div>
        <p className="text-xs text-gray-500 text-center leading-tight">
          © 2024 شبام
        </p>
      </div>
    </div>
  );
};

export default SidebarFooter;
