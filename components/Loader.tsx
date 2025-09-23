
import React from 'react';

const messages = [
  "Warming up the AI stylist...",
  "Blending pixels and passion...",
  "Choosing the perfect scissors...",
  "Crafting your new look...",
  "Almost ready for the big reveal!",
];

export const Loader: React.FC<{}> = () => {
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = messages.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % messages.length;
                return messages[nextIndex];
            });
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);


  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 rounded-2xl shadow-lg border border-gray-700 max-w-md mx-auto">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
      <h3 className="text-xl font-semibold mt-6 text-white">AI Magic in Progress</h3>
      <p className="text-gray-400 mt-2 transition-opacity duration-500">{message}</p>
    </div>
  );
};
