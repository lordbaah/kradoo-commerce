import { useEffect, useState } from 'react';
import ProductCard from '../src/components/ProductCard';
import { fetchProducts, fetchProductsByCategory } from '../src/api/index';
import useDocumentTitle from '../src/hooks/useDocumentTitle';
import type { ProductProps } from '../src/types/index';
import { HiViewGrid, HiMenu } from 'react-icons/hi';

const Shop = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [sortOption, setSortOption] = useState({
    sortBy: '',
    order: '',
  });
  const [limit, setLimit] = useState<number>(30);
  const [skip, setSkip] = useState<number>(0);
  useDocumentTitle('Shop');

  const loadProducts = async () => {
    try {
      const data = await fetchProducts(
        limit,
        skip,
        sortOption.sortBy,
        sortOption.order
      );
      setProducts(data.products || []);
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
  }, [limit, skip, sortOption]);

  // console.log(products);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, order] = e.target.value.split('_');
    setSortOption({ sortBy, order });
  };

  // useEffect(() => {
  //   console.log('Updated sortOption:', sortOption);
  // }, [sortOption]);

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

        <div className="mt-8 flex items-center justify-between">
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
              SortBy
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

        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}

        {loading ? (
          <div className="mt-12 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Shop;
