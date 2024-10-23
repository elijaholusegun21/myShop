import { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import { useCart } from "../context/cartContext";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); // Use AuthContext to get user and logout function

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Closes the menu when navigating to another page
  };

  return (
    <nav className="bg-gradient-to-r from-white to-softBlue shadow-md p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold font-Kavoon text-blue-500">MyShop</div>

        {/* Links for Desktop */}
        <ul className={`absolute top-full left-0 w-full bg-white flex-col justify-center z-10 items-center md:bg-transparent md:relative md:flex md:flex-row md:space-x-6 md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <li>
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => 
              `block px-4 py-2 font-Kanit font-medium text-sm text-center ${isActive ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-500`
            }>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={closeMenu} className={({ isActive }) => 
              `block px-4 py-2 font-Kanit font-medium text-sm text-center ${isActive ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-500`
            }>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => 
              `block px-4 py-2 font-Kanit font-medium text-sm text-center ${isActive ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-500`
            }>
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => 
              `block px-4 py-2 font-Kanit font-medium text-sm text-center ${isActive ? 'text-blue-500' : 'text-gray-600'} hover:text-blue-500`
            }>
              About Us
            </NavLink>
          </li>
        </ul>

        {/* Cart/Account Icons */}
        <ul className="flex items-center space-x-4">
          <li>
            <NavLink to="/cart" onClick={closeMenu} className="flex items-center relative">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>

              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </li>

          {/* Show Account link or Name based on user state */}
          <li>
            {user ? (
              <div className="flex items-center">
                <NavLink to="/account" onClick={closeMenu} className={({ isActive }) => 
                  `text-gray-600 hover:text-blue-500 font-Kanit font-medium text-sm ${isActive ? 'text-blue-500' : ''}`
                }>
                  {user.name} {/* Display user's name */}
                </NavLink>
                <button onClick={logout} className="text-red-500 ml-4 font-Kanit font-medium text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/loginForm" onClick={closeMenu} className={({ isActive }) => 
                `text-gray-600 hover:text-blue-500 font-Kanit font-medium text-sm ${isActive ? 'text-blue-500' : ''}`
              }>
                Login
              </NavLink>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600">
            {isMenuOpen ? (
              // X Icon when menu is open
              <svg 
                className="w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon when menu is closed
              <svg 
                className="w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
