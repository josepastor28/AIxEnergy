'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Radar, 
  Network, 
  FileText, 
  Home,
  Filter,
  BarChart3,
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  currentView: 'entry' | 'radar' | 'valueChain' | 'useCases';
  onViewChange: (view: 'entry' | 'radar' | 'valueChain' | 'useCases') => void;
  onToggle?: (collapsed: boolean) => void;
}

export default function Sidebar({ currentView, onViewChange, onToggle }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      id: 'radar',
      label: 'Energy Radar',
      icon: Radar,
      description: 'Interactive radar visualization',
      color: 'bg-blue-500'
    },
    {
      id: 'valueChain',
      label: 'Value Chain',
      icon: Network,
      description: 'Energy value chain mapping',
      color: 'bg-green-500'
    },
    {
      id: 'useCases',
      label: 'Use Cases',
      icon: FileText,
      description: 'Community use cases',
      color: 'bg-purple-500'
    }
  ];

  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggle?.(newCollapsedState);
  };

  const SidebarContent = () => (
    <div className={`bg-card border-r border-border flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">AI Energy Radar</h2>
              <p className="text-sm text-muted-foreground">Energy AI Applications</p>
            </div>
          </div>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onViewChange('entry')}
          className="w-full"
        >
          {!isCollapsed && <Home className="w-4 h-4 mr-2" />}
          {isCollapsed ? <Home className="w-4 h-4" /> : 'Back to Home'}
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start h-auto ${
                isCollapsed ? 'p-3' : 'p-4'
              } ${
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
              onClick={() => onViewChange(item.id as 'radar' | 'valueChain' | 'useCases')}
            >
              <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-white/20' : item.color
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {!isCollapsed && (
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs opacity-80">{item.description}</div>
                  </div>
                )}
              </div>
            </Button>
          );
        })}
      </div>

      {/* User Section - Bottom */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium">User</p>
              <p className="text-xs text-muted-foreground">Guest</p>
            </div>
          )}
        </div>
      </div>
    </div>
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
    <div className="flex h-full">
      <div className={`bg-card border-r border-border flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">AI Energy Radar</h2>
                <p className="text-sm text-muted-foreground">Energy AI Applications</p>
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewChange('entry')}
            className="w-full"
          >
            {!isCollapsed && <Home className="w-4 h-4 mr-2" />}
            {isCollapsed ? <Home className="w-4 h-4" /> : 'Back to Home'}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto ${
                  isCollapsed ? 'p-3' : 'p-4'
                } ${
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => onViewChange(item.id as 'radar' | 'valueChain' | 'useCases')}
              >
                <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? 'bg-white/20' : item.color
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isCollapsed && (
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-80">{item.description}</div>
                    </div>
                  )}
                </div>
              </Button>
            );
          })}
        </div>

        {/* User Section - Bottom */}
        <div className="p-4 border-t border-border">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">User</p>
                <p className="text-xs text-muted-foreground">Guest</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        className="h-8 w-8 p-0 border-l-0 rounded-l-none"
        onClick={handleToggle}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>
    </div>
  );
} 