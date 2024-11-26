import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useAdminStore } from '../store/adminStore';
import { LogIn } from 'lucide-react';

// Default super admin credentials
const SUPER_ADMIN = {
  email: 'admin@linkfolio.com',
  password: 'admin123',
  id: 'super-admin-1',
  name: 'Super Admin',
  role: 'admin' as const,
  status: 'active' as const,
  createdAt: new Date().toISOString(),
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const { users, addUser } = useAdminStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Check for super admin login
      if (email === SUPER_ADMIN.email && password === SUPER_ADMIN.password) {
        // Add super admin to users list if not exists
        if (!users.some(user => user.id === SUPER_ADMIN.id)) {
          addUser(SUPER_ADMIN);
        }
        
        login({
          id: SUPER_ADMIN.id,
          email: SUPER_ADMIN.email,
          name: SUPER_ADMIN.name,
          role: SUPER_ADMIN.role,
        });
        
        navigate('/admin', { replace: true });
        return;
      }

      // Regular user login logic
      if (email && password) {
        login({
          id: '1',
          email,
          name: email.split('@')[0],
          role: 'user',
        });
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}