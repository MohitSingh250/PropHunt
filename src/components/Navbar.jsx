import { Link, useNavigate } from 'react-router-dom';
import { Home, Search as SearchIcon, Gavel, User, LogIn, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch auth user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    // Subscribe to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Redirect to home after logout
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold hover:text-primary transition-colors"
          >
            <Home className="h-6 w-6 text-primary" />
            <span>PropHunt</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/search"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <SearchIcon className="h-4 w-4" />
            <span>Search</span>
          </Link>
          <Link
            to="/auctions"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Gavel className="h-4 w-4" />
            <span>Auctions</span>
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          )}
        </div>

        {/* Login/Logout Button */}
        {user ? (
          <button className="btn-secondary" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn-primary flex items-center">
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
