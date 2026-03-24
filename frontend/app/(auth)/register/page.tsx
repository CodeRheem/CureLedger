'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'recipient' | 'hospital'>('recipient');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    hospitalName: '',
    hospitalLicense: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // For demo: store in localStorage and set cookie
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('userName', `${formData.firstName} ${formData.lastName}`);
    
    // Set cookie for middleware
    document.cookie = `userRole=${role}; path=/; max-age=${60 * 60 * 24 * 30}`;
    
    // Redirect to appropriate dashboard
    if (role === 'recipient') window.location.href = '/recipient';
    else window.location.href = '/hospital';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
          Join CureLedger
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Create your account and start making a difference
        </p>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {step === 1 ? (
            <>
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Register as...
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="recipient"
                      checked={role === 'recipient'}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="mr-3"
                    />
                    <span>Recipient (seeking funds)</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      value="hospital"
                      checked={role === 'hospital'}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="mr-3"
                    />
                    <span>Hospital (verifying campaigns)</span>
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.firstName || !formData.lastName}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                Next
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              {role === 'hospital' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hospital Name
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      placeholder="Hospital Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hospital License
                    </label>
                    <input
                      type="text"
                      name="hospitalLicense"
                      value={formData.hospitalLicense}
                      onChange={handleChange}
                      placeholder="HOSP/2024/..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline font-semibold">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
