/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 18 May, 2025
 * @copyright 2025 monayem_hossain_limon
 */

// External Imports
import debounce from 'lodash/debounce';
import { Minus, Plus, Search } from 'lucide-react';
import { useCallback } from 'react';

// SearchToolbar Component
const SearchToolbar = ({ addMode, onAddMode, searchTerm, setSearchTerm }) => {
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
    }, 300),
    [setSearchTerm],
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    e.persist();
    debouncedSearch(value);
  };
  return (
    <div className="flex items-center p-5 gap-5">
      <div className="flex-1 flex items-center gap-5 bg-black/50 rounded-xl p-2">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-white"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <button onClick={() => onAddMode((prev) => !prev)}>
        {addMode ? (
          <Minus className="h-8 w-8 text-gray-400 cursor-pointer bg-black/50 p-1 rounded-xl" />
        ) : (
          <Plus className="h-8 w-8 text-gray-400 cursor-pointer bg-black/50 p-1 rounded-xl" />
        )}
      </button>
    </div>
  );
};

// Export
export default SearchToolbar;
