'use client';

import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
  searchQuery: string;
}

export default function SearchBar({ onSearch, placeholder, searchQuery }: SearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSearch = (value: string) => {
    setLocalQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <div className="relative max-w-2xl mx-auto mb-8 sm:mb-12">
      <div className="relative">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
        <input
          type="text"
          value={localQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 text-base sm:text-lg border-2 border-neutral-200 rounded-xl sm:rounded-2xl focus:border-[#2EC4B6] focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]/20 transition-all"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
          </button>
        )}
      </div>
    </div>
  );
}
