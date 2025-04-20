export interface ValuationData {
  value: number;
  confidence: 'low' | 'medium' | 'high';
  range: {
    min: number;
    max: number;
  };
  explanation: string;
  source: string;
  factors: {
    mileageImpact: number;
    conditionImpact: number;
    marketDemand: number;
    featuresPremium: number;
  };
  marketTrends: string;
  comparableListings: {
    price: number;
    mileage: number;
    year: number;
    version?: string;
    location: string;
    description: string;
    condition?: string;
  }[];
  lowEstimate: number;
  highEstimate: number;
  confidenceLevel: number;
  marketDemandImpact: number;
  mileageImpact: number;
  conditionImpact: number;
  featuresImpact: number;
  dataSource: string;
} 