import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? 'text-blue-500 font-semibold' : 'text-gray-700';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            B
          </span>
          <span className="text-xl font-semibold text-gray-900">Mini Blog</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/dashboard" className={`text-sm ${isActive('/dashboard')}`}>
            Dashboard
          </Link>

          {isAuthenticated && (
            <Link to="/create" className={`text-sm ${isActive('/create')}`}>
              Create Post
            </Link>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className={`text-sm ${isActive('/login')}`}>
                Login
              </Link>
              <Link to="/register" className={`text-sm ${isActive('/register')}`}>
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-600">
                Hi, <span className="font-medium">{user?.name}</span>
              </span>
              <button
                onClick={logout}
                className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

