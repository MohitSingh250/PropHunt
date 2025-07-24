import { Link } from 'react-router-dom';
import { Home, Search as SearchIcon, Gavel, User, LogIn, Building2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <Home className="h-6 w-6 text-primary-500 group-hover:text-primary-600 transition-all duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-full bg-primary-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-500 via-blue-500 to-purple-500 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:via-blue-600 group-hover:to-purple-600 transition-all duration-500">
              PropHunt
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            <Link
              to="/properties"
              className="nav-link relative group"
            >
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-500 group-hover:text-primary-500 transition-all" />
                <span className="text-gray-600 group-hover:text-gray-900 font-medium">Properties</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-primary-500 w-0 group-hover:w-full transition-all duration-300 origin-left" />
            </Link>
            
            <Link
              to="/search"
              className="nav-link relative group"
            >
              <div className="flex items-center gap-2">
                <SearchIcon className="h-5 w-5 text-gray-500 group-hover:text-primary-500 transition-all" />
                <span className="text-gray-600 group-hover:text-gray-900 font-medium">Search</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-primary-500 w-0 group-hover:w-full transition-all duration-300 origin-left" />
            </Link>
            
            <Link
              to="/auctions"
              className="nav-link relative group"
            >
              <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-gray-500 group-hover:text-primary-500 transition-all" />
                <span className="text-gray-600 group-hover:text-gray-900 font-medium">Auctions</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-primary-500 w-0 group-hover:w-full transition-all duration-300 origin-left" />
            </Link>
            
            <Link
              to="/dashboard"
              className="nav-link relative group"
            >
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-500 group-hover:text-primary-500 transition-all" />
                <span className="text-gray-600 group-hover:text-gray-900 font-medium">Dashboard</span>
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 bg-primary-500 w-0 group-hover:w-full transition-all duration-300 origin-left" />
            </Link>
          </div>

          <Link
            to="/login"
            className="relative inline-flex items-center px-5 py-2.5 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-primary-500 to-blue-500 hover:from-primary-600 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center">
              <LogIn className="h-4 w-4 mr-2 transition-transform group-hover:translate-x-1" />
              Login
            </span>
            <span className="absolute right-0 -bottom-0 w-8 h-32 -mb-8 -mr-2 transition-all duration-500 transform rotate-45 translate-x-12 group-hover:-translate-x-40 bg-white/20"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;