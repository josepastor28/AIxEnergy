'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarProps {
  active: 'radar' | 'value-chain' | 'use-cases';
  onNavigate: (tab: 'radar' | 'value-chain' | 'use-cases') => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

const tabs = [
  { key: 'radar' as const, icon: '📊', label: 'Radar' },
  { key: 'value-chain' as const, icon: '🔗', label: 'Value Chain' },
  { key: 'use-cases' as const, icon: '📋', label: 'Use Cases' },
];

export default function Sidebar({ active, onNavigate, isOpen = false, setIsOpen }: SidebarProps) {
  const SidebarContent = () => (
    <nav className="h-full bg-card border-r flex flex-col">
      <div className="p-4 border-b">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center text-white font-bold">
          AI
        </div>
      </div>
      
      <ul className="flex-1 p-2 space-y-1">
        {tabs.map(tab => (
          <li key={tab.key}>
            <Button
              variant={active === tab.key ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-3 h-12"
              onClick={() => onNavigate(tab.key)}
            >
              <span className="text-lg">{tab.icon}</span>
              {isOpen && <span>{tab.label}</span>}
            </Button>
          </li>
        ))}
      </ul>
      
      <div className="p-4 border-t space-y-2">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="flex-1">
            🔔
          </Button>
          <Button variant="ghost" size="sm" className="flex-1">
            👤
          </Button>
        </div>
        {setIsOpen && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '←' : '→'}
          </Button>
        )}
      </div>
    </nav>
  );

  // Mobile sidebar using Sheet
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="md:hidden">
            ☰
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <div className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <SidebarContent />
    </div>
  );
} 