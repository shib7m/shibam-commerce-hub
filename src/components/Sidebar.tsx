
import React from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useSidebarEffects } from '@/hooks/useSidebarEffects';
import { menuItems } from '@/data/menuItems';
import SidebarHeader from '@/components/sidebar/SidebarHeader';
import SidebarMenu from '@/components/sidebar/SidebarMenu';
import SidebarFooter from '@/components/sidebar/SidebarFooter';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  useSidebarEffects(isSidebarOpen, closeSidebar);

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <SidebarHeader onClose={closeSidebar} />
        <SidebarMenu items={menuItems} onItemClick={closeSidebar} />
        <SidebarFooter />
      </div>
    </>
  );
};

export default Sidebar;
