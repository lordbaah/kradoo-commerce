import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

function Cart() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  useDocumentTitle('Cart');

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0)
    return (
      <div className="p-6 text-center text-gray-500">
        <p>Your cart is empty.</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 block">
          Go shopping
        </Link>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div>
            <p className="font-medium text-gray-800">{item.title}</p>
            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
          </div>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(item.id, parseInt(e.target.value) || 1)
            }
            className="w-16 p-1 border rounded mr-4"
          />
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500 hover:underline text-sm"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
      </div>

      <div className="mt-6 text-right">
        <Link
          to="/checkout"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
