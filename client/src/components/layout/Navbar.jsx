import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600 font-serif">
                Vibe Engine
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-primary-300"
              >
                Home
              </Link>
              <Link
                to="/vibes"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-primary-300"
              >
                Explore Vibes
              </Link>
              {user && (
                <Link
                  to="/create-vibe"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium hover:border-primary-300"
                >
                  Create Vibe
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Profile
                </Link>
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-primary-300"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/vibes"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-primary-300"
              onClick={toggleMobileMenu}
            >
              Explore Vibes
            </Link>
            {user && (
              <Link
                to="/create-vibe"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-primary-300"
                onClick={toggleMobileMenu}
              >
                Create Vibe
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="space-y-1">
                <Link
                  to="/profile"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-primary-300"
                  onClick={toggleMobileMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    toggleMobileMenu();
                  }}
                  className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-primary-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link
                  to="/login"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-primary-300"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:bg-gray-50 hover:border-primary-300"
                  onClick={toggleMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;