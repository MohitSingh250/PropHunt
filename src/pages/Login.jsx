import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard');
      }
    };
    getSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await supabase.auth.signInWithPassword(form);
      } else {
        result = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
      }

      if (result.error) {
        throw result.error;
      }

      // Handle email confirmation flow
      if (!isLogin && result.data.user && !result.data.session) {
        setMessage('Check your email to confirm your account.');
        setLoading(false);
        return;
      }

      // Navigate if session is available
      if (result.data.session) {
        navigate('/dashboard');
      } else {
        setMessage('Signed up successfully. Check your email to confirm.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-md rounded-xl space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          {isLogin ? 'Login' : 'Create an Account'}
        </h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center">{message}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}
