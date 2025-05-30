import type { ProductProps } from '../types/index';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }: { product: ProductProps }) => {
  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);

  const inCart = isInCart(product.id);

  return (
    <div className="shadow-md rounded">
      <div className="h-64">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4 border border-gray-100 bg-white flex flex-col gap-4">
        <p>${product.price}</p>

        <h2 className="mt-1.5 text-lg font-medium text-gray-900">
          {product.title}
        </h2>

        <div className="flex flex-col gap-4">
          <button
            className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
            onClick={() =>
              inCart ? removeFromCart(product.id) : addToCart(product)
            }
          >
            {inCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>

          <Link
            className="block w-full rounded-sm bg-gray-900 text-center px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
            to={`/products/${product.id}`}
          >
            view product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
