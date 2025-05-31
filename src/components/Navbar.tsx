import { NavLink } from 'react-router-dom';
import { HiShoppingCart, HiMenu } from 'react-icons/hi';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleMenuToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">KradooShop</h1>

        {/* Mobile menu toggle button */}
        <button onClick={handleMenuToggle} className="md:hidden text-3xl">
          <HiMenu />
        </button>

        {/* Navigation links */}
        <ul
          className={`${
            mobileMenuOpen ? 'flex' : 'hidden'
          } flex-col gap-4 w-full absolute bg-white right-0 top-20 shadow-md px-6 py-4 rounded-md md:w-auto
          md:static md:flex md:flex-row md:space-x-6 md:items-center md:bg-transparent md:shadow-none md:px-0 md:py-0`}
        >
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
            <NavLink to="/cart" className="flex items-center">
              <HiShoppingCart className="text-2xl mr-1" />
              <span>({totalItems})</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
