'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type RadarDataItem } from '@/data/radarData';

interface ValueChainMapProps {
  data: RadarDataItem[];
}

const valueChainStages = [
  'Generation',
  'Transmission',
  'Distribution',
  'Storage',
  'Consumption',
  'Trading'
];

const stageColors = {
  'Generation': '#FF6B6B',
  'Transmission': '#4ECDC4',
  'Distribution': '#45B7D1',
  'Storage': '#96CEB4',
  'Consumption': '#FFEAA7',
  'Trading': '#DDA0DD'
};

export default function ValueChainMap({ data }: ValueChainMapProps) {
  const getStageColor = (stage: string) => {
    return stageColors[stage as keyof typeof stageColors] || '#666';
  };

  const getTechnologyColor = (technology: string) => {
    const colors = {
      'Machine Learning': '#FF6B6B',
      'Predictive Analytics': '#4ECDC4',
      'Expert Systems': '#45B7D1',
      'Computer Vision': '#96CEB4',
      'Natural Language Processing': '#FFEAA7',
      'Robotic Process Automation': '#DDA0DD',
      'Chatbots': '#98D8C8',
      'Blockchain': '#F7DC6F'
    };
    return colors[technology as keyof typeof colors] || '#666';
  };

  // Group data by category for better visualization
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, RadarDataItem[]>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Energy Value Chain</h1>
        <p className="text-muted-foreground">
          AI applications across the energy value chain
        </p>
      </div>

      {/* Value Chain Stages */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {valueChainStages.map((stage) => (
          <Card key={stage} className="text-center">
            <CardHeader className="pb-2">
              <div 
                className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: getStageColor(stage) }}
              >
                {stage.charAt(0)}
              </div>
              <CardTitle className="text-sm">{stage}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Category Groups */}
      <div className="space-y-6">
        {Object.entries(groupedData).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {items.length} application{items.length !== 1 ? 's' : ''}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{item.name}</h4>
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getTechnologyColor(item.technology) }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>M: {Math.round(item.maturity * 100)}%</span>
                      <span>A: {Math.round(item.adoption * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Technology Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from(new Set(data.map(item => item.technology))).map((technology) => (
              <div key={technology} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getTechnologyColor(technology) }}
                />
                <span className="text-sm">{technology}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 