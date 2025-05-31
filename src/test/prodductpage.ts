import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { fetchProductById } from '../api';
import type { ProductProps } from '../types/index';
import { useParams } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

  const inCart = isInCart(product?.id);

  useDocumentTitle(product?.title || 'Product');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        console.log(data);

        setProduct(data || null);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return (
    <div className="p-4">
      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <div>Loading...</div>
      ) : product ? (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
            <p className="text-lg mt-2">${product.price}</p>
            <p className="mt-4">{product.description}</p>

            <button
              className="block w-full rounded-sm bg-gray-100 p-4 text-sm font-medium transition hover:scale-100"
              onClick={() =>
                inCart ? removeFromCart(product.id) : addToCart(product)
              }
            >
              {inCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
};

export default Product;
