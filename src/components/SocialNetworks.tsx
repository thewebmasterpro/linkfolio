import React from 'react';
import { useProfileStore } from '../store/profileStore';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Github, 
  Globe,
  Plus,
  Trash2
} from 'lucide-react';

const socialPlatforms = [
  { id: 'facebook', name: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/username' },
  { id: 'twitter', name: 'Twitter', icon: Twitter, placeholder: 'https://twitter.com/username' },
  { id: 'instagram', name: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/username' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/username' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@username' },
  { id: 'github', name: 'GitHub', icon: Github, placeholder: 'https://github.com/username' },
  { id: 'website', name: 'Website', icon: Globe, placeholder: 'https://yourwebsite.com' },
];

export default function SocialNetworks() {
  const { profile, addContent, removeContent } = useProfileStore();
  const [newSocial, setNewSocial] = React.useState({ platform: '', url: '' });

  const socialLinks = profile?.contents?.filter(
    content => content.type === 'link' && content.platform
  ) || [];

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSocial.platform && newSocial.url) {
      addContent({
        id: Date.now().toString(),
        type: 'link',
        title: socialPlatforms.find(p => p.id === newSocial.platform)?.name || newSocial.platform,
        content: newSocial.url,
        platform: newSocial.platform,
      });
      setNewSocial({ platform: '', url: '' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Social Networks</h3>
          
          {/* Add New Social Network Form */}
          <form onSubmit={handleAddSocial} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
                  Platform
                </label>
                <select
                  id="platform"
                  value={newSocial.platform}
                  onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="">Select Platform</option>
                  {socialPlatforms.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newSocial.url}
                  onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={socialPlatforms.find(p => p.id === newSocial.platform)?.placeholder || 'https://'}
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Social Network
            </button>
          </form>

          {/* Social Networks List */}
          <div className="mt-6 space-y-4">
            {socialLinks.map((link) => {
              const platform = socialPlatforms.find(p => p.id === link.platform);
              const Icon = platform?.icon || Globe;

              return (
                <div
                  key={link.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <Icon className="h-5 w-5 text-gray-600" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {link.title}
                      </p>
                      <button
                        onClick={() => removeContent(link.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{link.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}