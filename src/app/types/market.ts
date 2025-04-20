export interface MarketListing {
  id: string;
  price: number;
  mileage: number;
  year: number;
  make: string;
  model: string;
  version?: string;
  location: string;
  description: string;
  condition?: string;
  features: string[];
  images?: string[];
} 