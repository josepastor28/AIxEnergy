'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ValueChainMap from '@/components/ValueChainMap';
import Sidebar from '@/components/Sidebar';

export default function ValueChainPage() {
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
    <div className="flex h-screen">
      <Sidebar 
        currentView="valueChain" 
        onViewChange={handleViewChange}
        onToggle={handleSidebarToggle}
      />
      <main className="flex-1 overflow-auto p-6">
        <ValueChainMap />
      </main>
    </div>
  );
} 