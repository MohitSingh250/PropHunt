import { useState } from 'react';
import { supabase } from '../supabase';

const AuthForm = ({ mode = 'login' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage('');

    const fn = mode === 'signup'
      ? supabase.auth.signUp
      : supabase.auth.signInWithPassword;

    const { error } = await fn({ email, password });

    setMessage(error ? error.message : `${mode} successful!`);
  };

  return (
    <form onSubmit={handleAuth}>
      <h2>{mode === 'signup' ? 'Sign Up' : 'Login'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} required />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">{mode === 'signup' ? 'Sign Up' : 'Login'}</button>
      <p>{message}</p>
    </form>
  );
};

export default AuthForm;
