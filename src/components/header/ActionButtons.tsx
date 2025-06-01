
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useSidebar } from '@/contexts/SidebarContext';
import LoginDialog from '../auth/LoginDialog';

interface ActionButtonsProps {
  onHomeClick: () => void;
  onCartClick: () => void;
  isSearchExpanded: boolean;
  setIsSearchExpanded: (expanded: boolean) => void;
}

const ActionButtons = ({
  onHomeClick,
  onCartClick,
  isSearchExpanded,
  setIsSearchExpanded
}: ActionButtonsProps) => {
  const { getCartCount } = useCart();
  const { toggleSidebar } = useSidebar();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleUserClick = () => {
    setIsLoginDialogOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Home Button */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onHomeClick}
          className="hover:bg-blue-50 hover:text-brand-blue transition-colors"
          title="الرئيسية"
        >
          <Home className="w-5 h-5" />
        </Button>

        {/* User Account / Login */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleUserClick}
          className="hover:bg-blue-50 hover:text-brand-blue transition-colors"
          title="تسجيل الدخول"
        >
          <User className="w-5 h-5" />
        </Button>

        {/* Search Button (Mobile) */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden hover:bg-blue-50 hover:text-brand-blue transition-colors"
          onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          title="البحث"
        >
          <Search className="w-5 h-5" />
        </Button>

        {/* Cart Button */}
        <Button 
          variant="outline" 
          className="relative hover:bg-blue-50 hover:border-brand-blue transition-colors"
          onClick={onCartClick}
          title="سلة التسوق"
        >
          <ShoppingCart className="w-5 h-5" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {getCartCount()}
            </span>
          )}
        </Button>
        
        {/* Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="hover:bg-blue-50 hover:text-brand-blue transition-colors"
          title="القائمة"
        >
          <Menu className="w-6 h-6" />
        </Button>
      </div>

      {/* Login Dialog */}
      <LoginDialog 
        open={isLoginDialogOpen} 
        onOpenChange={setIsLoginDialogOpen} 
      />
    </>
  );
};

export default ActionButtons;
