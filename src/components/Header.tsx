
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './header/SearchBar';
import ActionButtons from './header/ActionButtons';
import Navigation from './header/Navigation';
import Sidebar from './Sidebar';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
                <img 
                  src="/lovable-uploads/d7fe75c5-79bb-463f-924a-7f0bcbbd728e.png" 
                  alt="شبام للتجارة" 
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            {/* Search Bar */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSearchExpanded={isSearchExpanded}
              setIsSearchExpanded={setIsSearchExpanded}
              onSubmit={handleSearchSubmit}
            />

            {/* Action Buttons */}
            <ActionButtons
              onHomeClick={handleHomeClick}
              onCartClick={handleCartClick}
              isSearchExpanded={isSearchExpanded}
              setIsSearchExpanded={setIsSearchExpanded}
            />
          </div>
        </div>

        {/* Navigation */}
        <Navigation />
      </header>

      {/* Sidebar */}
      <Sidebar />
    </>
  );
};

export default Header;
