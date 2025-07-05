'use client';

import { useState, useEffect } from 'react';
import { radarData, type RadarDataItem } from '@/data/radarData';
import EntryScreen from '@/components/EntryScreen';
import RadarChart from '@/components/RadarChart';
import ValueChainMap from '@/components/ValueChainMap';
import UseCaseForm from '@/components/UseCaseForm';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UseCase {
  id: number;
  name: string;
  email: string;
  useCaseTitle: string;
  description: string;
  category: string;
  technology: string;
  maturity: number;
  adoption: number;
  tags: string[];
  company: string;
  website: string;
  submittedAt: string;
}

export default function Home() {
  const [currentView, setCurrentView] = useState<'entry' | 'radar' | 'form' | 'value-chain'>('radar');
  const [filteredData, setFilteredData] = useState<RadarDataItem[]>(radarData);
  const [activeTab, setActiveTab] = useState<'radar' | 'value-chain' | 'use-cases'>('radar');
  const [submittedUseCases, setSubmittedUseCases] = useState<UseCase[]>([]);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeTechnologies, setActiveTechnologies] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize submitted use cases with existing radar data
  useEffect(() => {
    const existingUseCases: UseCase[] = radarData.map(item => ({
      id: item.id,
      name: 'Community Contributor',
      email: 'contributor@example.com',
      useCaseTitle: item.name,
      description: item.description,
      category: item.category,
      technology: item.technology,
      maturity: item.maturity,
      adoption: item.adoption,
      tags: item.tags || [],
      company: item.company || '',
      website: '',
      submittedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    }));
    setSubmittedUseCases(existingUseCases);
  }, []);

  // Filter data based on selections
  useEffect(() => {
    let filtered = radarData;
    if (activeCategories.length > 0) {
      filtered = filtered.filter(item => activeCategories.includes(item.category));
    }
    if (activeTechnologies.length > 0) {
      filtered = filtered.filter(item => activeTechnologies.includes(item.technology));
    }
    setFilteredData(filtered);
  }, [activeCategories, activeTechnologies]);

  const categories = Array.from(new Set(radarData.map(item => item.category)));
  const technologies = Array.from(new Set(radarData.map(item => item.technology)));

  // Navigation handlers
  const handleNavigateToForm = () => {
    setCurrentView('form');
  };

  const handleNavigateToApp = () => {
    setCurrentView('radar');
  };

  const handleSkip = () => {
    setCurrentView('radar');
  };

  const handleBackToEntry = () => {
    setCurrentView('entry');
  };

  // Form handlers
  const handleFormSubmit = (useCaseData: UseCase) => {
    setSubmittedUseCases(prev => [...prev, useCaseData]);
    console.log('New use case submitted:', useCaseData);
  };

  const handleFormCancel = () => {
    setCurrentView('radar');
  };

  // Sidebar navigation handler
  const handleSidebarNav = (tab: 'radar' | 'value-chain' | 'use-cases') => {
    setActiveTab(tab);
    setCurrentView('radar');
  };

  // Render entry screen
  if (currentView === 'entry') {
    return (
      <EntryScreen
        onNavigateToForm={handleNavigateToForm}
        onNavigateToApp={handleNavigateToApp}
        onSkip={handleSkip}
      />
    );
  }

  // Render form
  if (currentView === 'form') {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          active={activeTab}
          onNavigate={handleSidebarNav}
        />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline"
                    onClick={handleBackToEntry}
                  >
                    ← Back
                  </Button>
                  <div>
                    <CardTitle>Submit Use Case</CardTitle>
                    <p className="text-muted-foreground">Share your AI energy application</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <UseCaseForm 
                  onSubmit={handleFormSubmit}
                  onCancel={handleFormCancel}
                />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  // Render main SaaS layout
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        active={activeTab}
        onNavigate={handleSidebarNav}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <main className="flex-1 overflow-auto p-6">
        {/* Main content by tab */}
        {activeTab === 'radar' && (
          <RadarChart
            data={filteredData}
            activeCategories={activeCategories}
            setActiveCategories={setActiveCategories}
            activeTechnologies={activeTechnologies}
            setActiveTechnologies={setActiveTechnologies}
          />
        )}
        {activeTab === 'value-chain' && (
          <Card>
            <CardContent className="p-6">
              <ValueChainMap data={filteredData} />
            </CardContent>
          </Card>
        )}
        {activeTab === 'use-cases' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Submitted Use Cases</h2>
              <Button 
                onClick={() => setCurrentView('form')}
              >
                Submit New Use Case
              </Button>
            </div>
            {submittedUseCases.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold mb-2">No Use Cases Submitted Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to share an AI energy use case with our community!
                  </p>
                  <Button onClick={() => setCurrentView('form')}>
                    Submit First Use Case
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {submittedUseCases.map((useCase) => (
                  <Card key={useCase.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{useCase.useCaseTitle}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Submitted by {useCase.name}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{useCase.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {useCase.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(useCase.submittedAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
