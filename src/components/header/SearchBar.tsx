
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchExpanded: boolean;
  setIsSearchExpanded: (expanded: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  isSearchExpanded,
  setIsSearchExpanded,
  onSubmit
}: SearchBarProps) => {
  return (
    <>
      {/* Desktop Search */}
      <div className={`hidden md:flex flex-1 max-w-lg mx-8 transition-all duration-300 ${isSearchExpanded ? 'scale-105' : ''}`}>
        <form onSubmit={onSubmit} className="relative w-full">
          <Input
            type="text"
            placeholder="ابحث عن المنتجات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-gray-200 focus:border-brand-blue"
            dir="rtl"
            onFocus={() => setIsSearchExpanded(true)}
            onBlur={() => setIsSearchExpanded(false)}
          />
          <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>

      {/* Mobile Search */}
      {isSearchExpanded && (
        <div className="md:hidden mt-4 animate-fade-in">
          <form onSubmit={onSubmit} className="relative">
            <Input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border-2 border-gray-200 focus:border-brand-blue"
              dir="rtl"
              autoFocus
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brand-blue transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SearchBar;
