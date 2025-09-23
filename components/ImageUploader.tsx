
import React, { useRef, useState, useCallback } from 'react';
import { UserImage } from '../types';
import { UploadIcon } from './IconComponents';

interface ImageUploaderProps {
  onImageUpload: (image: UserImage) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, etc.).');
      return;
    }
    
    // Limit file size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size should be less than 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      if (base64String) {
        onImageUpload({ base64: base64String, mimeType: file.type });
        setError(null);
      } else {
        setError("Could not process the image. Please try another one.");
      }
    };
    reader.onerror = () => {
        setError("Failed to read the file. Please try again.");
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-lg mx-auto text-center p-8 bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
        Upload Your Selfie
      </h2>
      <p className="text-gray-400 mb-6">A clear, forward-facing headshot works best.</p>
      
      <div
        onClick={handleClick}
        className="cursor-pointer group flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-600 rounded-xl hover:border-purple-500 transition-colors duration-300 bg-gray-900/50 hover:bg-gray-800/50"
      >
        <UploadIcon className="w-12 h-12 text-gray-500 group-hover:text-purple-400 transition-colors" />
        <p className="mt-4 text-gray-400 group-hover:text-white">
          Click to browse or drag & drop
        </p>
        <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {error && (
        <p className="mt-4 text-red-400 bg-red-900/50 px-4 py-2 rounded-md">{error}</p>
      )}
    </div>
  );
};
