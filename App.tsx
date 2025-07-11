
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import EventDetails from './components/EventDetails';
import ShowFlow from './components/ShowFlow';
import Media from './components/Media';
import { Screen } from './types';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.Details);

  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.ShowFlow:
        return <ShowFlow />;
      case Screen.Media:
        return <Media />;
      case Screen.Details:
      default:
        return <EventDetails />;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* The following style block adds a simple fade-in animation */}
        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
