import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">PropHunt</Link>
        <div className="space-x-4">
          <Link to="/search" className="text-white">Search</Link>
          <Link to="/auctions" className="text-white">Auctions</Link>
          <Link to="/dashboard" className="text-white">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}
