import { Link } from 'react-router-dom';
import { Home, Search, Gavel, User } from 'lucide-react';

export function Navbar() {

  return (
    <nav className="border-b border-gray-800 bg-[#0F0F0F] text-white">
      <div className="container min-w-full flex items-center justify-between py-4 px-4">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
            <Home className="h-6 w-6" />
            <span className="font-bold text-xl">PropHunt</span>
          </Link>
        </div>
        <div className="flex-1 hidden md:flex justify-center gap-6">
          <Link to="/search" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link to="/auctions" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <Gavel className="h-4 w-4" />
            Auctions
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <User className="h-4 w-4" />
            Dashboard
          </Link>
         
        </div>
        <button>
            Login
        </button>
      </div>
    </nav>
  );
}
