import { NavLink } from 'react-router-dom';
import { HiShoppingCart } from 'react-icons/hi';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">KradooShop</h1>
        <ul className="flex space-x-6 text-gray-700 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'hover:text-blue-600 transition'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'hover:text-blue-600 transition'
              }
            >
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink to="/cart" className="flex items-center justify-center">
              <HiShoppingCart className="text-3xl" />
              <span>({totalItems})</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
