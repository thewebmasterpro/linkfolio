import React from 'react';
import { useAuthStore } from '../store/authStore';
import ProfileEditor from '../components/ProfileEditor';
import LinkEditor from '../components/LinkEditor';
import SocialNetworks from '../components/SocialNetworks';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Profile Settings</h2>
              <ProfileEditor />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Social Networks</h2>
              <SocialNetworks />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Content</h2>
              <LinkEditor />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}