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
  const [selectedImage, setSelectedImage] = useState<string>('');

  const { addToCart, removeFromCart, isInCart } = useContext(CartContext);
  // const inCart = isInCart(product?.id);
  const inCart = product?.id !== undefined ? isInCart(product.id) : false;

  useDocumentTitle(product?.title || 'Product');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!id) {
          setError('Product ID is missing');
          setLoading(false);
          return;
        }
        const data = await fetchProductById(id);

        setProduct(data || null);
        setSelectedImage(data?.thumbnail || '');
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="h-16 w-16 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="mt-8">
      <section className="max-w-7xl mx-auto px-4">
        {error && <div className="text-red-500">{error}</div>}

        {product ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden border">
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {product.images?.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`aspect-square overflow-hidden rounded border-2 transition ${
                          selectedImage === image
                            ? 'border-blue-500'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-5">
                {product.brand && (
                  <p className="text-sm text-gray-600 uppercase tracking-wide">
                    {product.brand}
                  </p>
                )}

                <h1 className="text-3xl font-bold text-gray-900">
                  {product.title}
                </h1>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>⭐ {product.rating}/5</span>
                  {product.reviews && (
                    <span>
                      • {product.reviews.length} review
                      {product.reviews.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.discountPercentage &&
                    product.discountPercentage > 0 && (
                      <>
                        <span className="text-lg text-gray-500 line-through">
                          $
                          {(
                            product.price /
                            (1 - product.discountPercentage / 100)
                          ).toFixed(2)}
                        </span>
                        <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                          {product.discountPercentage}% OFF
                        </span>
                      </>
                    )}
                </div>

                <p className="text-gray-700">{product.description}</p>

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
                    product.stock === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : inCart
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                  onClick={() =>
                    inCart ? removeFromCart(product.id) : addToCart(product)
                  }
                  disabled={product.stock === 0}
                >
                  {product.stock === 0
                    ? 'Out of Stock'
                    : inCart
                    ? 'Remove from Cart'
                    : 'Add to Cart'}
                </button>
              </div>
            </div>

            {/* Product Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <section className="mt-12 max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                  Customer Reviews
                </h2>

                <div className="space-y-6">
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-800">
                          {review.reviewerName}
                        </p>
                        <p className="text-yellow-500 font-medium">
                          ⭐ {review.rating}/5
                        </p>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="text-center text-gray-600">Product not found.</div>
        )}
      </section>
    </main>
  );
};

export default Product;
