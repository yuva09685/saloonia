
import React from 'react';
import { UserImage } from '../types';
import { DownloadIcon, RetryIcon } from './IconComponents';

interface ResultViewProps {
  originalImage: UserImage;
  generatedImage: string;
  onReset: () => void;
  onTryAnotherStyle: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ originalImage, generatedImage, onReset, onTryAnotherStyle }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = 'saloonia-style.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8">
            Your New Look!
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Original</h3>
            <img src={`data:${originalImage.mimeType};base64,${originalImage.base64}`} alt="Original" className="rounded-xl shadow-lg w-full aspect-square object-cover" />
        </div>
        <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">New Style</h3>
            <img src={`data:image/png;base64,${generatedImage}`} alt="Generated Hairstyle" className="rounded-xl shadow-lg w-full aspect-square object-cover border-2 border-purple-500" />
        </div>
      </div>
      
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={downloadImage}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 duration-300"
        >
          <DownloadIcon className="w-5 h-5" />
          Save & Share
        </button>
        <button
          onClick={onTryAnotherStyle}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-transform transform hover:scale-105 duration-300"
        >
          <RetryIcon className="w-5 h-5" />
          Try Another Style
        </button>
         <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300"
        >
          Upload New Photo
        </button>
      </div>
    </div>
  );
};
