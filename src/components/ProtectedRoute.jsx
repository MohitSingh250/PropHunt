import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
      setChecking(false);
    };

    checkUser();
  }, []);

  if (checking) return null; // you can return a loader here if desired

  return user ? children : <Navigate to="/login" replace />;
}
