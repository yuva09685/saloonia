
import React, { useState, useCallback, useEffect } from 'react';
import { UserImage, AppState, Hairstyle } from './types';
import { HAIRSTYLES } from './constants';
import { applyHairstyle } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import { Loader } from './components/Loader';
import { ResultView } from './components/ResultView';
import { MagicWandIcon } from './components/IconComponents';

interface HairstyleSelectorProps {
  hairstyles: Hairstyle[];
  onSelect: (prompt: string) => void;
}

const HairstyleSelector: React.FC<HairstyleSelectorProps> = ({ hairstyles, onSelect }) => (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6">
        2. Pick a Hairstyle
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {hairstyles.map((style) => (
          <button
            key={style.name}
            onClick={() => onSelect(style.prompt)}
            className="group relative aspect-square overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500"
          >
            <img src={style.imageUrl} alt={style.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 flex items-center justify-center p-2 transition-colors duration-300">
              <span className="text-white text-center font-semibold">{style.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
);


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [userImage, setUserImage] = useState<UserImage | null>(null);
  const [selectedHairstylePrompt, setSelectedHairstylePrompt] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((image: UserImage) => {
    setUserImage(image);
    setAppState(AppState.IMAGE_UPLOADED);
  }, []);

  const handleHairstyleSelect = useCallback((prompt: string) => {
    setSelectedHairstylePrompt(prompt);
    setAppState(AppState.GENERATING);
  }, []);
  
  const handleReset = useCallback(() => {
    setAppState(AppState.IDLE);
    setUserImage(null);
    setSelectedHairstylePrompt(null);
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handleTryAnotherStyle = useCallback(() => {
    setAppState(AppState.IMAGE_UPLOADED);
    setSelectedHairstylePrompt(null);
    setGeneratedImage(null);
    setError(null);
  }, []);


  useEffect(() => {
    const generateImage = async () => {
      if (appState === AppState.GENERATING && userImage && selectedHairstylePrompt) {
        try {
          setError(null);
          const result = await applyHairstyle(userImage, selectedHairstylePrompt);
          setGeneratedImage(result);
          setAppState(AppState.RESULT_READY);
        } catch (err) {
          setError(err instanceof Error ? err.message : "An unexpected error occurred.");
          setAppState(AppState.ERROR);
        }
      }
    };
    generateImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState, userImage, selectedHairstylePrompt]);

  const renderContent = () => {
    switch (appState) {
      case AppState.IDLE:
        return <ImageUploader onImageUpload={handleImageUpload} />;
      case AppState.IMAGE_UPLOADED:
        return (
          <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 text-center sticky top-8">
                 <h3 className="text-xl font-semibold mb-4 text-gray-300">1. Your Photo</h3>
                 <img
                    src={`data:${userImage?.mimeType};base64,${userImage?.base64}`}
                    alt="User selfie"
                    className="rounded-xl shadow-lg w-full aspect-square object-cover"
                />
            </div>
            <div className="w-full md:w-2/3">
              <HairstyleSelector hairstyles={HAIRSTYLES} onSelect={handleHairstyleSelect} />
            </div>
          </div>
        );
      case AppState.GENERATING:
        return <Loader />;
      case AppState.RESULT_READY:
        if (userImage && generatedImage) {
          return <ResultView originalImage={userImage} generatedImage={generatedImage} onReset={handleReset} onTryAnotherStyle={handleTryAnotherStyle}/>;
        }
        return null;
      case AppState.ERROR:
        return (
          <div className="text-center p-8 bg-red-900/50 rounded-2xl max-w-md mx-auto border border-red-700">
            <h3 className="text-2xl font-bold text-red-300 mb-4">Oops! Something went wrong.</h3>
            <p className="text-red-200 mb-6">{error}</p>
            <button
              onClick={handleTryAnotherStyle}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Another Style
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-8">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-4">
             <MagicWandIcon className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Saloonia
            </h1>
        </div>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
          Try on a new hairstyle with AI before you visit the salon. No guesswork. No regrets.
        </p>
      </header>
      <main className="flex items-center justify-center">
        {renderContent()}
      </main>
      <footer className="text-center mt-16 text-gray-600 text-sm">
        <p>Powered by Google Gemini. Designed for creative exploration.</p>
      </footer>
    </div>
  );
};

export default App;
