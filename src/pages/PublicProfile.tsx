import React from 'react';
import { useParams } from 'react-router-dom';
import { useProfileStore, ContentItem } from '../store/profileStore';

export default function PublicProfile() {
  const { username } = useParams();
  const { profile } = useProfileStore();

  const renderContent = (item: ContentItem) => {
    switch (item.type) {
      case 'link':
        return (
          <a
            href={item.content}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-4 text-center bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {item.title}
          </a>
        );
      
      case 'image':
        return (
          <div className="w-full">
            <img
              src={item.content}
              alt={item.settings?.imageAlt || item.title}
              className="w-full rounded-lg shadow"
            />
            {item.title && (
              <p className="mt-2 text-center text-sm text-gray-600">{item.title}</p>
            )}
          </div>
        );
      
      case 'html':
        return (
          <div className="w-full">
            {item.title && (
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
            )}
            <div
              className="w-full rounded-lg overflow-hidden"
              style={{ height: item.settings?.htmlHeight || 'auto' }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        );
      
      case 'map':
        return (
          <div className="w-full">
            {item.title && (
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
            )}
            <iframe
              src={item.content}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow"
            />
          </div>
        );
      
      case 'contact':
        return (
          <div className="w-full p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">{item.title}</h3>
            {item.settings?.contactType === 'phone' ? (
              <a href={`tel:${item.content}`} className="text-indigo-600 hover:text-indigo-800">
                {item.content}
              </a>
            ) : item.settings?.contactType === 'email' ? (
              <a href={`mailto:${item.content}`} className="text-indigo-600 hover:text-indigo-800">
                {item.content}
              </a>
            ) : (
              <p className="text-gray-600">{item.content}</p>
            )}
          </div>
        );
      
      case 'divider':
        return <hr className="my-6 border-gray-200" />;
      
      default:
        return null;
    }
  };

  if (!profile || profile.username !== username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Profile not found</h2>
          <p className="mt-2 text-gray-600">The requested profile does not exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="text-center">
          {profile.avatar && (
            <img
              src={profile.avatar}
              alt={profile.displayName}
              className="w-24 h-24 mx-auto rounded-full object-cover"
            />
          )}
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {profile.displayName || profile.username}
          </h1>
          {profile.bio && (
            <p className="mt-2 text-gray-600">{profile.bio}</p>
          )}
        </div>

        {/* Content Items */}
        <div className="space-y-6">
          {profile.contents.map((item) => (
            <div key={item.id}>
              {renderContent(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}