export interface RadarDataItem {
  id: number;
  name: string;
  category: string;
  technology: string;
  description: string;
  maturity: number;
  adoption: number;
  tags: string[];
  company?: string;
}

export const radarData: RadarDataItem[] = [
  // Grid Management & Smart Grid
  {
    id: 1,
    name: "Grid Load Forecasting",
    category: "Grid Management & Smart Grid",
    technology: "Machine Learning",
    description: "AI-powered electricity demand forecasting for grid optimization",
    maturity: 0.9,
    adoption: 0.8,
    tags: ["load forecasting", "grid optimization", "demand prediction"]
  },
  {
    id: 2,
    name: "Smart Grid Monitoring",
    category: "Grid Management & Smart Grid",
    technology: "Machine Learning",
    description: "Real-time monitoring and anomaly detection in power grids",
    maturity: 0.8,
    adoption: 0.7,
    tags: ["grid monitoring", "anomaly detection", "real-time"]
  },
  {
    id: 3,
    name: "Grid Stability Control",
    category: "Grid Management & Smart Grid",
    technology: "Machine Learning",
    description: "AI-driven grid stability and frequency control systems",
    maturity: 0.7,
    adoption: 0.6,
    tags: ["grid stability", "frequency control", "automation"]
  },

  // Renewable Energy
  {
    id: 4,
    name: "Solar Power Forecasting",
    category: "Renewable Energy",
    technology: "Machine Learning",
    description: "Weather-based solar power generation prediction",
    maturity: 0.9,
    adoption: 0.8,
    tags: ["solar forecasting", "weather prediction", "renewables"]
  },
  {
    id: 5,
    name: "Wind Power Optimization",
    category: "Renewable Energy",
    technology: "Machine Learning",
    description: "AI optimization of wind turbine performance and maintenance",
    maturity: 0.8,
    adoption: 0.7,
    tags: ["wind optimization", "turbine maintenance", "performance"]
  },
  {
    id: 6,
    name: "Renewable Integration",
    category: "Renewable Energy",
    technology: "Predictive Analytics",
    description: "AI systems for integrating variable renewable energy sources",
    maturity: 0.7,
    adoption: 0.6,
    tags: ["renewable integration", "variable sources", "grid balancing"]
  },

  // Energy Trading & Markets
  {
    id: 7,
    name: "Energy Price Prediction",
    category: "Energy Trading & Markets",
    technology: "Machine Learning",
    description: "AI-powered energy price forecasting for trading decisions",
    maturity: 0.8,
    adoption: 0.7,
    tags: ["price prediction", "energy trading", "market analysis"]
  },
  {
    id: 8,
    name: "Trading Algorithm Optimization",
    category: "Energy Trading & Markets",
    technology: "Machine Learning",
    description: "AI-driven optimization of energy trading algorithms",
    maturity: 0.7,
    adoption: 0.6,
    tags: ["trading algorithms", "optimization", "automated trading"]
  },
  {
    id: 9,
    name: "Market Risk Assessment",
    category: "Energy Trading & Markets",
    technology: "Predictive Analytics",
    description: "AI-based risk assessment for energy market operations",
    maturity: 0.6,
    adoption: 0.5,
    tags: ["risk assessment", "market risk", "trading risk"]
  },

  // Energy Storage
  {
    id: 10,
    name: "Battery Management Systems",
    category: "Energy Storage",
    technology: "Machine Learning",
    description: "AI-powered battery health monitoring and optimization",
    maturity: 0.8,
    adoption: 0.7,
    tags: ["battery management", "health monitoring", "optimization"]
  },
  {
    id: 11,
    name: "Storage Optimization",
    category: "Energy Storage",
    technology: "Machine Learning",
    description: "AI optimization of energy storage charging/discharging cycles",
    maturity: 0.7,
    adoption: 0.6,
    tags: ["storage optimization", "charging cycles", "energy management"]
  },
  {
    id: 12,
    name: "Grid-Scale Storage Control",
    category: "Energy Storage",
    technology: "Expert Systems",
    description: "AI control systems for grid-scale energy storage facilities",
    maturity: 0.6,
    adoption: 0.5,
    tags: ["grid storage", "control systems", "large-scale"]
  },

  // Energy Efficiency
  {
    id: 13,
    name: "Building Energy Management",
    category: "Energy Efficiency",
    technology: "Machine Learning",
    description: "AI-powered building energy optimization and management",
    maturity: 0.8,
    adoption: 0.7,
    tags: ["building management", "energy efficiency", "optimization"]
  },
  {
    id: 14,
    name: "Industrial Process Optimization",
    category: "Energy Efficiency",
    technology: "Machine Learning",
    description: "AI optimization of industrial energy consumption and processes",
    maturity: 0.7,
    adoption: 0.6,
    tags: ["industrial optimization", "process efficiency", "energy consumption"]
  },
  {
    id: 15,
    name: "Demand Response Systems",
    category: "Energy Efficiency",
    technology: "Machine Learning",
    description: "AI-driven demand response and load shifting programs",
    maturity: 0.6,
    adoption: 0.5,
    tags: ["demand response", "load shifting", "peak management"]
  },

  // Oil & Gas Operations
  {
    id: 16,
    name: "Reservoir Modeling",
    category: "Oil & Gas Operations",
    technology: "Machine Learning",
    description: "AI-powered reservoir characterization and production modeling",
    maturity: 0.8,
    adoption: 0.7,
    tags: ["reservoir modeling", "production optimization", "geology"]
  },
  {
    id: 17,
    name: "Predictive Maintenance",
    category: "Oil & Gas Operations",
    technology: "Predictive Analytics",
    description: "AI-based predictive maintenance for oil and gas equipment",
    maturity: 0.7,
    adoption: 0.6,
    tags: ["predictive maintenance", "equipment monitoring", "downtime reduction"]
  },
  {
    id: 18,
    name: "Drilling Optimization",
    category: "Oil & Gas Operations",
    technology: "Machine Learning",
    description: "AI optimization of drilling operations and well planning",
    maturity: 0.6,
    adoption: 0.5,
    tags: ["drilling optimization", "well planning", "operations"]
  },

  // Nuclear Energy
  {
    id: 19,
    name: "Nuclear Safety Monitoring",
    category: "Nuclear Energy",
    technology: "Machine Learning",
    description: "AI-powered nuclear plant safety monitoring and anomaly detection",
    maturity: 0.8,
    adoption: 0.7,
    tags: ["nuclear safety", "anomaly detection", "safety monitoring"]
  },
  {
    id: 20,
    name: "Nuclear Fuel Optimization",
    category: "Nuclear Energy",
    technology: "Expert Systems",
    description: "AI optimization of nuclear fuel cycles and reactor operations",
    maturity: 0.7,
    adoption: 0.6,
    tags: ["fuel optimization", "reactor operations", "nuclear fuel"]
  },
  {
    id: 21,
    name: "Nuclear Waste Management",
    category: "Nuclear Energy",
    technology: "Machine Learning",
    description: "AI systems for nuclear waste classification and management",
    maturity: 0.6,
    adoption: 0.5,
    tags: ["waste management", "nuclear waste", "classification"]
  },

  // Carbon Capture & Storage
  {
    id: 22,
    name: "Carbon Capture Optimization",
    category: "Carbon Capture & Storage",
    technology: "Machine Learning",
    description: "AI optimization of carbon capture processes and efficiency",
    maturity: 0.7,
    adoption: 0.6,
    tags: ["carbon capture", "process optimization", "efficiency"]
  },
  {
    id: 23,
    name: "Storage Site Monitoring",
    category: "Carbon Capture & Storage",
    technology: "Machine Learning",
    description: "AI monitoring of carbon storage sites and leakage detection",
    maturity: 0.6,
    adoption: 0.5,
    tags: ["storage monitoring", "leakage detection", "carbon storage"]
  },
  {
    id: 24,
    name: "Carbon Accounting",
    category: "Carbon Capture & Storage",
    technology: "Predictive Analytics",
    description: "AI-powered carbon footprint tracking and accounting systems",
    maturity: 0.8,
    adoption: 0.7,
    tags: ["carbon accounting", "footprint tracking", "emissions"]
  }
]; 