import React, { useState } from 'react';
import { useProfileStore, ContentType, ContentItem } from '../store/profileStore';
import { Plus, Trash2, GripVertical, Image, Code, Map, Phone, Mail, SeparatorHorizontal, Eye } from 'lucide-react';
import ImageUploader from './ImageUploader';

const contentTypes: { type: ContentType; label: string; icon: React.ElementType }[] = [
  { type: 'link', label: 'Link', icon: Plus },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'html', label: 'HTML Embed', icon: Code },
  { type: 'map', label: 'Map', icon: Map },
  { type: 'contact', label: 'Contact', icon: Phone },
  { type: 'divider', label: 'Divider', icon: SeparatorHorizontal },
];

export default function LinkEditor() {
  const { profile, addContent, removeContent } = useProfileStore();
  const [selectedType, setSelectedType] = useState<ContentType>('link');
  const [newContent, setNewContent] = useState<Partial<ContentItem>>({
    title: '',
    content: '',
    settings: {},
  });
  const [previewHtml, setPreviewHtml] = useState('');
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContent.title || selectedType === 'divider') {
      addContent({
        id: Date.now().toString(),
        type: selectedType,
        title: newContent.title || 'Divider',
        content: newContent.content || '',
        settings: newContent.settings,
      });
      setNewContent({ title: '', content: '', settings: {} });
      setPreviewHtml('');
      setShowHtmlPreview(false);
    }
  };

  const handleImageSelect = (imageData: string) => {
    setNewContent({ ...newContent, content: imageData });
  };

  const handlePreviewHtml = () => {
    setPreviewHtml(newContent.content || '');
    setShowHtmlPreview(true);
  };

  const renderContentForm = () => {
    switch (selectedType) {
      case 'link':
        return (
          <>
            <input
              type="url"
              value={newContent.content || ''}
              onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="https://"
            />
            <input
              type="text"
              value={newContent.platform || ''}
              onChange={(e) => setNewContent({ ...newContent, platform: e.target.value })}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Platform (optional)"
            />
          </>
        );

      case 'image':
        return (
          <div className="mt-2">
            <ImageUploader
              onImageSelect={handleImageSelect}
              currentImage={newContent.content}
              className="mt-1"
            />
          </div>
        );

      case 'html':
        return (
          <div>
            <textarea
              value={newContent.content || ''}
              onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="<iframe> or other HTML content"
              rows={4}
            />
            <div className="mt-2 flex justify-between items-center">
              <input
                type="text"
                value={newContent.settings?.htmlHeight || ''}
                onChange={(e) => setNewContent({
                  ...newContent,
                  settings: { ...newContent.settings, htmlHeight: e.target.value }
                })}
                className="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Height (e.g., 400px)"
              />
              <button
                type="button"
                onClick={handlePreviewHtml}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
            </div>
            {showHtmlPreview && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Preview:</h4>
                <div
                  className="border rounded-md p-4"
                  style={{ height: newContent.settings?.htmlHeight || 'auto' }}
                  dangerouslySetInnerHTML={{ __html: previewHtml }}
                />
              </div>
            )}
          </div>
        );

      case 'map':
        return (
          <>
            <input
              type="text"
              value={newContent.content || ''}
              onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Google Maps Embed URL"
            />
            <input
              type="number"
              value={newContent.settings?.mapZoom || ''}
              onChange={(e) => setNewContent({
                ...newContent,
                settings: { ...newContent.settings, mapZoom: parseInt(e.target.value) }
              })}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Zoom level (1-20)"
            />
          </>
        );

      case 'contact':
        return (
          <>
            <select
              value={newContent.settings?.contactType || 'phone'}
              onChange={(e) => setNewContent({
                ...newContent,
                settings: { ...newContent.settings, contactType: e.target.value as 'phone' | 'email' | 'address' }
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="phone">Phone</option>
              <option value="email">Email</option>
              <option value="address">Address</option>
            </select>
            <input
              type="text"
              value={newContent.content || ''}
              onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Contact information"
            />
          </>
        );

      case 'divider':
        return null;
    }
  };

  const renderContent = (item: ContentItem) => {
    switch (item.type) {
      case 'link':
        return <p className="text-sm text-gray-500 truncate">{item.content}</p>;
      
      case 'image':
        return (
          <div className="mt-2">
            <img
              src={item.content}
              alt={item.settings?.imageAlt || item.title}
              className="max-h-20 rounded"
            />
          </div>
        );
      
      case 'html':
        return (
          <div className="mt-2">
            <div
              className="border rounded-md p-2 max-h-20 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>
        );
      
      case 'map':
        return <p className="text-sm text-gray-500">Map Embed</p>;
      
      case 'contact':
        return (
          <p className="text-sm text-gray-500">
            {item.settings?.contactType}: {item.content}
          </p>
        );
      
      case 'divider':
        return <div className="border-t border-gray-200 my-2"></div>;
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Content</h3>
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Page
            </a>
          </div>
          
          {/* Content Type Selector */}
          <div className="mt-4 flex flex-wrap gap-2">
            {contentTypes.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setShowHtmlPreview(false);
                  setPreviewHtml('');
                }}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                  selectedType === type
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4 mr-1.5" />
                {label}
              </button>
            ))}
          </div>

          {/* Add New Content Form */}
          <form onSubmit={handleAddContent} className="mt-5 space-y-4">
            {selectedType !== 'divider' && (
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newContent.title}
                  onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Content Title"
                />
              </div>
            )}

            {renderContentForm()}

            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </button>
          </form>

          {/* Content List */}
          <div className="mt-6 space-y-4">
            {(profile?.contents || []).map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title}
                    </p>
                    <button
                      onClick={() => removeContent(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {renderContent(item)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}