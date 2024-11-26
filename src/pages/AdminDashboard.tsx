import React from 'react';
import { useAdminStore, AdminUser } from '../store/adminStore';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  DollarSign,
  BarChart2,
  Settings,
  UserX,
  UserCheck,
  Trash2,
  Edit,
} from 'lucide-react';

export default function AdminDashboard() {
  const { users, suspendUser, activateUser, deleteUser } = useAdminStore();
  const [activeTab, setActiveTab] = React.useState<'users' | 'subscriptions' | 'analytics' | 'settings'>('users');
  const navigate = useNavigate();

  const renderUserList = () => (
    <div className="mt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.subscription?.plan || 'Free'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    {user.status === 'active' ? (
                      <button
                        onClick={() => suspendUser(user.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        <UserX className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => activateUser(user.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <UserCheck className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return renderUserList();
      case 'subscriptions':
        return (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">Subscription Management</h3>
            {/* Subscription management content */}
          </div>
        );
      case 'analytics':
        return (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">Analytics Dashboard</h3>
            {/* Analytics content */}
          </div>
        );
      case 'settings':
        return (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">Admin Settings</h3>
            {/* Settings content */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow">
            <nav className="space-y-1 p-4">
              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'users'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="h-5 w-5 mr-3" />
                Users
              </button>
              <button
                onClick={() => setActiveTab('subscriptions')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'subscriptions'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <DollarSign className="h-5 w-5 mr-3" />
                Subscriptions
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'analytics'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <BarChart2 className="h-5 w-5 mr-3" />
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'settings'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
              </h2>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}