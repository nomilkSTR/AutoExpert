export interface Vehicle {
  country: string;
  make: string;
  model: string;
  version?: string;
  year: number;
  mileage: number;
  engineSize?: string;
  enginePower?: string;
  transmission?: string;
  fuel?: string;
  features: string[];
  condition: string;
}

export interface FormData {
  country: string;
  make: string;
  model: string;
  version?: string;
  year: number;
  mileage: number;
  engineSize?: string;
  enginePower?: string;
  transmission?: string;
  fuel?: string;
  features: string[];
  condition: string;
} 