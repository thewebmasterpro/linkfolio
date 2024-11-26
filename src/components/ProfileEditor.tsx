import React from 'react';
import { useProfileStore } from '../store/profileStore';
import ImageUploader from './ImageUploader';

export default function ProfileEditor() {
  const { profile, updateProfile } = useProfileStore();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Avatar Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Photo</h3>
          <ImageUploader
            onImageSelect={(imageData) => updateProfile({ avatar: imageData })}
            currentImage={profile.avatar}
            className="max-w-sm"
          />
        </div>

        {/* Basic Info Section */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={profile.username}
              onChange={(e) => updateProfile({ username: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="your-username"
            />
          </div>

          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-700"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={profile.displayName}
              onChange={(e) => updateProfile({ displayName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={3}
              value={profile.bio}
              onChange={(e) => updateProfile({ bio: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Tell your story..."
            />
          </div>
        </div>

        {/* Theme Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Theme
              </label>
              <div className="mt-2 space-x-2">
                {['light', 'dark', 'custom'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() =>
                      updateProfile({ theme: theme as 'light' | 'dark' | 'custom' })
                    }
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      profile.theme === theme
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="accentColor"
                className="block text-sm font-medium text-gray-700"
              >
                Accent Color
              </label>
              <div className="mt-2 flex items-center space-x-2">
                <input
                  type="color"
                  id="accentColor"
                  value={profile.accentColor}
                  onChange={(e) => updateProfile({ accentColor: e.target.value })}
                  className="h-8 w-8 rounded-md border border-gray-300"
                />
                <span className="text-sm text-gray-500">
                  {profile.accentColor.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}