import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      localStorage.removeItem('cart');
      cart.length = 0; // clear local cart array reference
      setOrderPlaced(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-green-600">Order Placed!</h2>
        <p className="mt-4 text-gray-700">Thank you for your purchase.</p>
        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">
              ${item.price.toFixed(2)} x {item.quantity}
            </p>
          </div>
          <span className="font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      ))}

      <div className="mt-6 flex justify-between items-center text-xl font-bold">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handlePlaceOrder}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
