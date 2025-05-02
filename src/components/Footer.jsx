import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <div>
        <Link to="/" className="text-xl font-bold">PropHunt</Link>
        <p className="mt-2">The premier platform for property auctions.</p>
      </div>
      <div className="mt-4">
        <Link to="/about" className="text-white">About Us</Link>
      </div>
      <p className="mt-4 text-sm">© {new Date().getFullYear()} PropHunt. All rights reserved.</p>
    </footer>
  );
}
