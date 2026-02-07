import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data, rememberMe); // rememberMe true ise localStorage'a kaydeder
        navigate('/');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Sunucu bağlantı hatası. Backend açık mı?');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-bg-primary">
      <div className="w-full max-w-md glass p-10 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-3xl font-black text-accent mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center opacity-60 mb-8 text-sm italic">
          {isLogin ? 'Login to continue your evolution' : 'Join TUIEVOLUTION today'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-2xl text-sm mb-6 font-bold animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase mb-2 ml-1 opacity-70">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border-2 border-accent/10 focus:border-accent outline-none transition-all"
              placeholder="tuana@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase mb-2 ml-1 opacity-70">Password</label>
            <input 
              type="password" 
              required
              autoComplete="current-password"
              className="w-full p-4 rounded-2xl bg-white/50 dark:bg-black/20 border-2 border-accent/10 focus:border-accent outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-accent"
              />
              <span className="text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity">Remember Me</span>
            </label>
            {isLogin && <button type="button" className="text-xs font-bold text-accent hover:underline">Forgot Password?</button>}
          </div>

          <button className="w-full bg-accent text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-accent/20 active:scale-95 transition-all">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-semibold opacity-70">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-accent font-black hover:underline"
          >
            {isLogin ? 'Register Now' : 'Login Here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;