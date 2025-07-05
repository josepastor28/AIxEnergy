'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import EntryScreen from '@/components/EntryScreen';
import RadarChart from '@/components/RadarChart';
import ValueChainMap from '@/components/ValueChainMap';
import UseCaseForm from '@/components/UseCaseForm';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Determine current view from pathname
  const getCurrentView = () => {
    switch (pathname) {
      case '/radar':
        return 'radar';
      case '/value-chain':
        return 'valueChain';
      case '/use-cases':
        return 'useCases';
      default:
        return 'entry';
    }
  };

  const currentView = getCurrentView();

  const handleViewChange = (view: 'entry' | 'radar' | 'valueChain' | 'useCases') => {
    switch (view) {
      case 'radar':
        router.push('/radar');
        break;
      case 'valueChain':
        router.push('/value-chain');
        break;
      case 'useCases':
        router.push('/use-cases');
        break;
      default:
        router.push('/');
    }
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'entry' ? (
        <EntryScreen onViewChange={handleViewChange} />
      ) : (
        <div className="flex h-screen">
          <Sidebar 
            currentView={currentView} 
            onViewChange={handleViewChange}
            onToggle={handleSidebarToggle}
          />
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
