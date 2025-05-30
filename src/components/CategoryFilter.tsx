import { useState } from 'react';
import { HiAdjustments } from 'react-icons/hi';

interface Props {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onSelect }: Props) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleSelect = (category: string) => {
    onSelect(category);
    setIsMobileOpen(false); // Close mobile menu on select
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden flex items-center justify-between px-4 mt-4">
        <h3 className="text-lg font-semibold">Filter by Category</h3>
        <button
          className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          <HiAdjustments className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-60 p-4 bg-white border-r border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleSelect('all')}
            className={`text-left px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              className={`text-left px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category.replace(/-/g, ' ')}
            </button>
          ))}
        </div>
      </aside>

      {/* Mobile Dropdown Drawer */}
      {isMobileOpen && (
        <div className="md:hidden px-4 mt-2">
          <div className="bg-white shadow rounded-md p-4">
            <h3 className="text-lg font-semibold mb-3">Categories</h3>
            <button
              onClick={() => handleSelect('all')}
              className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleSelect(category)}
                className={`block w-full text-left px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {category.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryFilter;
