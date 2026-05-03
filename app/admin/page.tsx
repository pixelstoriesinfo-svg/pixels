'use client';

import { useState, useRef } from 'react';

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const setCookie = response.headers.get('set-cookie');
        console.log('Login success, set-cookie:', setCookie);
        console.log('Document cookies after response:', document.cookie);

        setTimeout(() => {
          console.log('Document cookies before redirect:', document.cookie);
          window.location.href = '/admin/dashboard';
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid email or password');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-secondary-bg rounded-xl p-8 border border-border-color">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Team PIXEL</h1>
          <p className="text-text-color/80">Admin Panel Login</p>
        </div>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-text-color mb-2">Email Address</label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-text-color mb-2">Password</label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              className="w-full bg-dark-bg border border-border-color rounded-lg p-3 text-white focus:border-primary focus:outline-none"
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
              required
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-primary text-dark-bg py-3 rounded-lg font-semibold hover:bg-primary-light transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-text-color/60">
          
        </div>
      </div>
    </div>
  );
}
