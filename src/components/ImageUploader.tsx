import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
  currentImage?: string;
  className?: string;
}

export default function ImageUploader({ onImageSelect, currentImage, className = '' }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>('');

  const handleImageUpload = async (file: File) => {
    try {
      setError('');

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      // Validate file size (2MB = 2 * 1024 * 1024 bytes)
      if (file.size > 2 * 1024 * 1024) {
        // Compress the image
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        file = compressedFile;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageSelect(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Error processing image. Please try again.');
      console.error('Error processing image:', err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className={className}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 text-center ${
          isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        {currentImage ? (
          <div className="relative">
            <img
              src={currentImage}
              alt="Uploaded preview"
              className="max-h-48 mx-auto rounded-lg"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                onImageSelect('');
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="text-gray-600">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">Drag and drop an image here, or click to select</p>
            <p className="text-sm text-gray-500">Maximum file size: 2MB</p>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}