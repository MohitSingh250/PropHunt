import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">PropHunt</span>
          </Link>
          <p className="text-slate-400 text-sm">The premier platform for property auctions and real estate investments.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:-translate-y-1">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:-translate-y-1">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:-translate-y-1">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300 hover:-translate-y-1">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Company</h3>
          <Link to="/about" className="block text-slate-400 hover:text-white transition-colors duration-200">About Us</Link>
          <Link to="/careers" className="block text-slate-400 hover:text-white transition-colors duration-200">Careers</Link>
          <Link to="/blog" className="block text-slate-400 hover:text-white transition-colors duration-200">Blog</Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Legal</h3>
          <Link to="/privacy" className="block text-slate-400 hover:text-white transition-colors duration-200">Privacy Policy</Link>
          <Link to="/terms" className="block text-slate-400 hover:text-white transition-colors duration-200">Terms of Service</Link>
          <Link to="/cookies" className="block text-slate-400 hover:text-white transition-colors duration-200">Cookie Policy</Link>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Contact</h3>
          <p className="text-slate-400">hello@prophunt.com</p>
          <p className="text-slate-400">+1 (555) 123-4567</p>
          <p className="text-slate-400">123 Estate Ave, New York</p>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-12 pt-6 border-t border-slate-700 text-center text-sm text-slate-500">
        ©️ {new Date().getFullYear()} PropHunt. All rights reserved.
      </div>
    </footer>
  );
}