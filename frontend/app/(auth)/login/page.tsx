'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'donor' | 'recipient' | 'hospital' | 'admin'>('donor');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo: store in localStorage and set cookie
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    
    // Set cookie for middleware
    document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24 * 30}`;
    
    // Redirect based on role
    if (role === 'recipient') window.location.href = '/recipient';
    else if (role === 'hospital') window.location.href = '/hospital';
    else if (role === 'admin') window.location.href = '/admin';
    else window.location.href = '/campaigns';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to your CureLedger account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              I am a...
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
              <option value="hospital">Hospital</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Demo Note */}
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              💡 <strong>Demo:</strong> Any credentials work. Select your role above.
            </p>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-semibold">
            Sign up
          </a>
        </p>

        {/* Back Link */}
        <a href="/" className="block text-center text-gray-600 hover:underline mt-4">
          Back to home
        </a>
      </div>
    </div>
  );
}
