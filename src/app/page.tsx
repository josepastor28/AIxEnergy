'use client';

import { useState } from 'react';
import EntryScreen from '@/components/EntryScreen';
import RadarChart from '@/components/RadarChart';
import ValueChainMap from '@/components/ValueChainMap';
import UseCaseForm from '@/components/UseCaseForm';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [currentView, setCurrentView] = useState<'entry' | 'radar' | 'valueChain' | 'useCases'>('entry');

  const handleViewChange = (view: 'entry' | 'radar' | 'valueChain' | 'useCases') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'entry' ? (
        <EntryScreen onViewChange={handleViewChange} />
      ) : (
        <div className="flex h-screen">
          <Sidebar currentView={currentView} onViewChange={handleViewChange} />
          <main className="flex-1 overflow-auto p-6">
            {currentView === 'radar' && <RadarChart />}
            {currentView === 'valueChain' && <ValueChainMap />}
            {currentView === 'useCases' && <UseCaseForm />}
          </main>
        </div>
      )}
    </div>
  );
}
