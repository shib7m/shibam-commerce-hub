
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem } from '@/types/sidebar';

interface SidebarMenuProps {
  items: MenuItem[];
  onItemClick: () => void;
}

const SidebarMenu = ({ items, onItemClick }: SidebarMenuProps) => {
  return (
    <div className="flex-1 overflow-hidden">
      <nav className="p-1 h-full">
        <ul className="space-y-0 h-full flex flex-col text-xs">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index} className="flex-shrink-0">
                <Link
                  to={item.path}
                  className="flex items-center gap-1.5 p-1.5 text-gray-700 hover:bg-blue-50 hover:text-brand-blue rounded transition-colors group"
                  onClick={onItemClick}
                >
                  <IconComponent className="w-3 h-3 group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="font-medium text-xs">{item.title}</span>
                </Link>
                
                {/* Sub Items */}
                {item.subItems && (
                  <ul className="mr-4 space-y-0">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          className="block p-1 text-xs text-gray-600 hover:text-brand-blue hover:bg-blue-50 rounded transition-colors leading-tight"
                          onClick={onItemClick}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarMenu;
