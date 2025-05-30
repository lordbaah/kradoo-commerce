import { useEffect, useState, useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from './api-test';
import type { Product } from '../types/index';
import { HiViewGrid, HiMenu } from 'react-icons/hi';

type ViewMode = 'grid' | 'list';
type SortOption = 'title_desc' | 'title_asc' | 'price_desc' | 'price_asc' | '';

const ShopTest = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('');
  const [limit] = useState(30);
  const [skip] = useState(0);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      // Parse sortBy to get field and order
      let sortField = '';
      let sortOrder = '';

      if (sortBy) {
        const [field, order] = sortBy.split('_');
        sortField = field;
        sortOrder = order;
      }

      const data = await fetchProducts(limit, skip, sortField, sortOrder);
      setProducts(data.products || []);
    } catch (error) {
      const err = error as Error;
      setError(err.message || 'Failed to load products. Please try again.');
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [limit, skip, sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  const handleRetry = () => {
    loadProducts();
  };

  const gridClasses =
    viewMode === 'grid'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
      : 'flex flex-col gap-4';

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Product Collection
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Discover the latest in tech, fashion, and home essentials. At Kradoo
            Shop, we bring you hand-picked products with top-notch quality and
            unbeatable prices. Start browsing and find something you'll love
            today.
          </p>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div className="flex rounded-sm border border-gray-100">
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700 ${
                viewMode === 'grid' ? 'bg-gray-50 text-gray-700' : ''
              }`}
              aria-label="Grid view"
            >
              <HiViewGrid className="size-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700 ${
                viewMode === 'list' ? 'bg-gray-50 text-gray-700' : ''
              }`}
              aria-label="List view"
            >
              <HiMenu className="size-5" />
            </button>
          </div>

          <div>
            <label htmlFor="SortBy" className="sr-only">
              Sort By
            </label>
            <select
              id="SortBy"
              value={sortBy}
              onChange={handleSortChange}
              className="h-10 rounded-sm border-gray-300 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Sort By</option>
              <option value="title_asc">Title A-Z</option>
              <option value="title_desc">Title Z-A</option>
              <option value="price_asc">Price Low to High</option>
              <option value="price_desc">Price High to Low</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
              <button
                onClick={handleRetry}
                className="ml-4 text-sm text-red-600 hover:text-red-500 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 text-sm">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 01-2-2v-1a2 2 0 00-2-2h-4a2 2 0 00-2 2v1a2 2 0 01-2 2H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No products found
            </h3>
            <p className="text-gray-500 mb-4">
              We couldn't find any products to display.
            </p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-500">
              Showing {products.length} products
            </div>
            <div className={gridClasses}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ShopTest;
