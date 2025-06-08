
import React from 'react';
import { X } from 'lucide-react';

interface SidebarHeaderProps {
  onClose: () => void;
}

const SidebarHeader = ({ onClose }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-2 border-b bg-brand-blue text-white flex-shrink-0">
      <h2 className="text-base font-bold">القائمة</h2>
      <button
        onClick={onClose}
        className="p-1 hover:bg-blue-600 rounded transition-colors"
        aria-label="إغلاق القائمة"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};

export default SidebarHeader;
