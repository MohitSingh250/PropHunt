import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import {
  Home,
  Search as SearchIcon,
  Gavel,
  User,
  LogIn,
  LogOut,
  Building2,
  ChevronDown,
} from 'lucide-react';

export function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      listener?.subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
      <div className="max-w-7l mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg transform group-hover:rotate-6 transition-all duration-300">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              <span className="text-blue-400">Prop</span>Hunt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavItem to="/properties" icon={<Building2 />} label="Properties" />
            <NavItem to="/search" icon={<SearchIcon />} label="Search" />
            <NavItem to="/auctions" icon={<Gavel />} label="Auctions" />
          </div>

          {/* User Menu / Login */}
          <div className="relative" ref={dropdownRef}>
            {user ? (
              <>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-700 text-white rounded-full hover:shadow transition-all"
                >
                  <User className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 z-50">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>

                    {/* Mobile-only nav links */}
                    <div className="md:hidden border-t border-gray-200">
                      <Link
                        to="/properties"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Building2 className="h-4 w-4 mr-2" />
                        Properties
                      </Link>
                      <Link
                        to="/search"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <SearchIcon className="h-4 w-4 mr-2" />
                        Search
                      </Link>
                      <Link
                        to="/auctions"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Gavel className="h-4 w-4 mr-2" />
                        Auctions
                      </Link>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="relative inline-flex items-center px-6 py-2.5 overflow-hidden text-sm font-medium text-white rounded-lg group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg"></span>
                <span className="absolute right-0 -bottom-0 w-8 h-20 -mb-8 -mr-2 transition-all duration-500 transform rotate-45 translate-x-12 group-hover:-translate-x-40 bg-white/20"></span>
                <span className="relative z-10 flex items-center space-x-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="relative px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 group"
    >
      <div className="flex items-center space-x-2">
        {React.cloneElement(icon, { className: 'h-5 w-5' })}
        <span>{label}</span>
      </div>
      <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-blue-500 group-hover:w-full transition-all duration-300 origin-center -translate-x-1/2" />
    </Link>
  );
}

export default Navbar;
