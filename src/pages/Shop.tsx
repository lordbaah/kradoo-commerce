import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import CategoryFilter from '../components/CategoryFilter';
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchCategoryList,
} from '../api';
import useDocumentTitle from '../hooks/useDocumentTitle';
import type { ProductProps } from '../types/index';
import { HiViewGrid, HiMenu } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';

interface PaginationInfo {
  total: number;
  skip: number;
  limit: number;
}

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [sortOption, setSortOption] = useState({
    sortBy: '',
    order: '',
  });
  const [pagination, setPagination] = useState<PaginationInfo>({
    total: 0,
    skip: 0,
    limit: 20,
  });

  const currentPage = parseInt(searchParams.get('page') || '1');
  const selectedCategory = searchParams.get('category') || 'all';

  useDocumentTitle('Shop');

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryList();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    loadCategories();
  }, []);

  // Load products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const skip = (currentPage - 1) * pagination.limit;

      let data;
      if (selectedCategory === 'all') {
        data = await fetchProducts(
          pagination.limit,
          skip,
          sortOption.sortBy,
          sortOption.order
        );
      } else {
        data = await fetchProductsByCategory(
          selectedCategory,
          pagination.limit,
          skip,
          sortOption.sortBy,
          sortOption.order
        );
      }

      setProducts(data.products || []);
      setPagination((prev) => ({
        total: data.total || 0,
        skip: data.skip || 0,
        limit: prev.limit,
      }));
    } catch (error) {
      const err = error as Error;
      setError(err.message);
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [pagination.limit, currentPage, sortOption, selectedCategory]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split('_');
    setSortOption({ sortBy, order });
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams({ category, page: '1' });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({
      category: selectedCategory,
      page: page.toString(),
    });
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <section className="mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl text-center font-bold text-gray-900 sm:text-3xl">
          Product Collection
        </h2>

        <p className="mt-4 max-w-md text-gray-500 text-center m-auto">
          Discover the latest in tech, fashion, and home essentials. At Kradoo
          Shop, we bring you hand-picked products with top-notch quality and
          unbeatable prices. Start browsing and find something you'll love
          today.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row gap-6">
        {/* Sidebar Filter */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleCategoryChange}
        />

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex rounded-sm border border-gray-100">
              <button className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                <HiViewGrid className="size-5" />
              </button>
              <button className="inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700">
                <HiMenu className="size-5" />
              </button>
            </div>

            <div>
              <label htmlFor="SortBy" className="sr-only">
                Sort By
              </label>
              <select
                id="SortBy"
                className="h-10 rounded-sm border-gray-300 text-sm"
                defaultValue=""
                onChange={handleSortChange}
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
            <div className="text-red-500 mt-4 text-center">{error}</div>
          )}

          {loading ? (
            <div className="mt-12 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {products.length === 0 && !loading && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-600">
                    No products found in this category
                  </h3>
                </div>
              )}

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={pagination.total}
                itemsPerPage={pagination.limit}
                currentSkip={pagination.skip}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Shop;
