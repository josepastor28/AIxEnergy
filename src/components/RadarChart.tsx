'use client';

import { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { radarData, type RadarDataItem } from '@/data/radarData';

const technologyColors = {
  'Machine Learning': '#FF6B6B',
  'Predictive Analytics': '#4ECDC4',
  'Expert Systems': '#45B7D1',
  'Computer Vision': '#96CEB4',
  'Natural Language Processing': '#FFEAA7',
  'Robotic Process Automation': '#DDA0DD',
  'Chatbots': '#98D8C8',
  'Blockchain': '#F7DC6F'
};

export default function RadarChart() {
  const [hovered, setHovered] = useState<{ sector: number | null; band: number | null }>({ sector: null, band: null });
  const [selectedItem, setSelectedItem] = useState<RadarDataItem | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeTechnologies, setActiveTechnologies] = useState<string[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Radar geometry
  const width = 900;
  const height = 520;
  const radius = 350;
  const centerX = width / 2;
  const centerY = radius + 10;
  const rings = 5;
  const sectors = 8;
  const maturityLevels = ['Idea', 'Development', 'Pilot', 'Productive', 'Lighthouse'];
  const sectorLabels = [
    'Grid Management & Smart Grid',
    'Renewable Energy',
    'Energy Trading & Markets',
    'Energy Storage',
    'Energy Efficiency',
    'Oil & Gas Operations',
    'Nuclear Energy',
    'Energy Analytics & IoT'
  ];

  const categories = useMemo(() => 
    Array.from(new Set(radarData.map(item => item.category))), 
    []
  );

  const technologies = useMemo(() => 
    Array.from(new Set(radarData.map(item => item.technology))), 
    []
  );

  const filteredData = useMemo(() => {
    let filtered = radarData;
    if (activeCategories.length > 0) {
      filtered = filtered.filter(item => activeCategories.includes(item.category));
    }
    if (activeTechnologies.length > 0) {
      filtered = filtered.filter(item => activeTechnologies.includes(item.technology));
    }
    return filtered;
  }, [activeCategories, activeTechnologies]);

  const handleCategoryToggle = (category: string) => {
    setActiveCategories(
      activeCategories.includes(category)
        ? activeCategories.filter(c => c !== category)
        : [...activeCategories, category]
    );
  };

  const handleTechnologyToggle = (technology: string) => {
    setActiveTechnologies(
      activeTechnologies.includes(technology)
        ? activeTechnologies.filter(t => t !== technology)
        : [...activeTechnologies, technology]
    );
  };

  const getTechnologyColor = (technology: string) => {
    return technologyColors[technology as keyof typeof technologyColors] || '#666';
  };

  // Draw semicircle arc path
  const arcPath = (r: number) => {
    const startX = centerX - r;
    const startY = centerY;
    const endX = centerX + r;
    const endY = centerY;
    return `M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`;
  };

  // Generate rings (maturity bands)
  const generateRings = () => {
    return Array.from({ length: rings }, (_, i) => {
      const r = ((i + 1) * radius) / rings;
      return (
        <path
          key={`ring-${i}`}
          d={arcPath(r)}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth="1"
          opacity="0.5"
        />
      );
    });
  };

  // Generate sector lines
  const generateSectors = () => {
    return Array.from({ length: sectors + 1 }, (_, i) => {
      const angle = Math.PI - (i * Math.PI) / sectors;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY - radius * Math.sin(angle);
      return (
        <line
          key={`sector-${i}`}
          x1={centerX}
          y1={centerY}
          x2={x}
          y2={y}
          stroke="#E0E0E0"
          strokeWidth="1"
          opacity="0.5"
        />
      );
    });
  };

  // Generate sector labels
  const generateSectorLabels = () => {
    return sectorLabels.map((label, i) => {
      if (i === 0 || i === sectorLabels.length - 1) {
        const side = i === 0 ? -1 : 1;
        const x = centerX + side * (radius + 60);
        const y = centerY - radius / 2;
        return (
          <text
            key={`sector-label-${i}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="22"
            fill="#1996a3"
            fontWeight="bold"
            transform={`rotate(${side * 90} ${x} ${y})`}
            style={{ letterSpacing: '0.02em' }}
          >
            {label}
          </text>
        );
      }
      const angle = Math.PI - ((i + 0.5) * Math.PI) / sectors;
      const r = radius + 40;
      const x = centerX + r * Math.cos(angle);
      const y = centerY - r * Math.sin(angle);
      return (
        <text
          key={`sector-label-${i}`}
          x={Math.round(x * 100) / 100}
          y={Math.round(y * 100) / 100}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="13"
          fill="#b0b8c1"
          fontWeight="600"
          style={{ opacity: 0.7 }}
        >
          {label}
        </text>
      );
    });
  };

  // Generate maturity labels
  const generateMaturityLabels = () => {
    return maturityLevels.map((label, i) => {
      const rInner = (i * radius) / rings;
      const rOuter = ((i + 1) * radius) / rings;
      const rCenter = (rInner + rOuter) / 2;
      const x = centerX - radius + rCenter;
      const y = centerY + 38;
      const isActive = hovered.band === i;
      return (
        <text
          key={`maturity-label-${i}`}
          x={Math.round(x * 100) / 100}
          y={Math.round(y * 100) / 100}
          textAnchor="middle"
          dominantBaseline="hanging"
          fontSize="18"
          fill={isActive ? '#1976d2' : '#7a869a'}
          fontWeight="bold"
          style={{ letterSpacing: '0.01em', transition: 'fill 0.2s' }}
        >
          {label}
        </text>
      );
    });
  };

  // Calculate position for data points
  const calculatePosition = (item: RadarDataItem, index: number) => {
    const sectorIndex = sectorLabels.findIndex(label => label === item.category);
    if (sectorIndex === -1) return null;

    const angle = Math.PI - ((sectorIndex + 0.5) * Math.PI) / sectors;
    const r = (item.maturity * radius) / rings;
    const x = centerX + r * Math.cos(angle);
    const y = centerY - r * Math.sin(angle);

    // Add some randomness to avoid overlapping
    const randomOffset = Math.sin(index * 123.456) * 10;
    return {
      x: Math.round((x + randomOffset * Math.cos(angle + Math.PI / 2)) * 100) / 100,
      y: Math.round((y + randomOffset * Math.sin(angle + Math.PI / 2)) * 100) / 100
    };
  };

  // Generate data points
  const generateDataPoints = () => {
    return filteredData.map((item, index) => {
      const position = calculatePosition(item, index);
      if (!position) return null;

      return (
        <g key={item.id}>
          <circle
            cx={position.x}
            cy={position.y}
            r="6"
            fill={getTechnologyColor(item.technology)}
            stroke="white"
            strokeWidth="2"
            cursor="pointer"
            onMouseEnter={() => setHovered({ sector: sectorLabels.indexOf(item.category), band: Math.floor(item.maturity * rings) })}
            onMouseLeave={() => setHovered({ sector: null, band: null })}
            onClick={() => setSelectedItem(item)}
          />
          <text
            x={position.x}
            y={position.y + 20}
            textAnchor="middle"
            fontSize="10"
            fill="#666"
            style={{ pointerEvents: 'none' }}
          >
            {item.name}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Energy Radar</h1>
          <p className="text-muted-foreground">
            Explore AI applications across the energy sector
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{filteredData.length}</div>
          <div className="text-sm text-muted-foreground">Applications</div>
        </div>
      </div>

      {/* Main Layout: Quick Stats on Left, Radar on Right */}
      <div className="flex gap-6">
        {/* Quick Stats - Left Side */}
        <div className="w-80 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-muted-foreground">Total Applications</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">8</div>
                  <div className="text-sm text-muted-foreground">Energy Sectors</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">6</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={activeCategories.includes(category) ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="font-semibold mb-3">Technologies</h3>
                <div className="space-y-2">
                  {technologies.map(technology => (
                    <Button
                      key={technology}
                      variant={activeTechnologies.includes(technology) ? 'default' : 'outline'}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => handleTechnologyToggle(technology)}
                      style={{
                        backgroundColor: activeTechnologies.includes(technology) 
                          ? getTechnologyColor(technology) 
                          : undefined
                      }}
                    >
                      {technology}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Technology Legend */}
              <div>
                <h3 className="font-semibold mb-3">Technology Colors</h3>
                <div className="space-y-2">
                  {Object.entries(technologyColors).map(([tech, color]) => (
                    <div key={tech} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Radar Visualization - Right Side */}
        <div className="flex-1">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <svg
                  ref={svgRef}
                  width={width}
                  height={height}
                  className="mx-auto"
                  style={{ maxWidth: '100%', height: 'auto' }}
                >
                  {/* Background */}
                  <rect width={width} height={height} fill="white" />
                  
                  {/* Rings */}
                  {generateRings()}
                  
                  {/* Sectors */}
                  {generateSectors()}
                  
                  {/* Sector Labels */}
                  {generateSectorLabels()}
                  
                  {/* Maturity Labels */}
                  {generateMaturityLabels()}
                  
                  {/* Data Points */}
                  {generateDataPoints()}
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{selectedItem.name}</CardTitle>
                  <p className="text-muted-foreground">{selectedItem.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedItem(null)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{selectedItem.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Technology</h4>
                <Badge 
                  style={{ backgroundColor: getTechnologyColor(selectedItem.technology) }}
                >
                  {selectedItem.technology}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedItem.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Maturity</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${selectedItem.maturity * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.round(selectedItem.maturity * 100)}%
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Adoption</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${selectedItem.adoption * 100}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Math.round(selectedItem.adoption * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 