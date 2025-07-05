'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EntryScreenProps {
  onViewChange: (view: 'entry' | 'radar' | 'valueChain' | 'useCases') => void;
}

export default function EntryScreen({ onViewChange }: EntryScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitUseCase = () => {
    setIsVisible(false);
    setTimeout(() => {
      onViewChange('useCases');
    }, 200);
  };

  const handleExploreApp = () => {
    setIsVisible(false);
    setTimeout(() => {
      onViewChange('radar');
    }, 200);
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => {
      onViewChange('entry');
    }, 200);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        onClick={handleSkip}
      >
        Skip to main content
      </a>

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            AI Energy Radar
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore and visualize AI applications across the energy sector. Discover innovative use cases, 
            track technology maturity, and map the energy value chain.
          </p>
        </header>

        {/* Main Question */}
        <main className="flex-1 flex flex-col justify-center" id="main-content">
          <Card className="max-w-2xl mx-auto p-8">
            <CardContent className="text-center space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  Do you have a use case you'd like to submit?
                </h2>
                <p className="text-muted-foreground">
                  Share your AI energy applications or explore existing ones in our interactive radar
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="flex items-center gap-2 px-8 py-6 text-lg"
                  onClick={handleSubmitUseCase}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                  Yes, submit a use case
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 px-8 py-6 text-lg"
                  onClick={handleExploreApp}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                  No, explore the app
                </Button>
              </div>

              {/* Skip Link */}
              <div className="pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Skip to main content
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-muted-foreground">
            Interactive visualization of AI applications across the energy sector
          </p>
        </footer>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-blue-300 rounded-full opacity-20 animate-pulse delay-2000"></div>
      </div>
    </div>
  );
} 