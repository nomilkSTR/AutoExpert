interface Equipment {
  name: string;
  standard: boolean;
  availableFrom?: number;  // Year when this equipment became available
  standardFrom?: number;   // Year when this equipment became standard
}

interface VehicleEquipment {
  [key: string]: {
    standard: string[];
    optional: string[];
    specificModels?: {
      [key: string]: {
        standard: string[];
        optional: string[];
      }
    }
  }
}

export const vehicleEquipment: VehicleEquipment = {
  'luxury': {
    standard: [
      'airConditioning',
      'powerWindows',
      'powerLocks',
      'abs',
      'airbags',
      'powerSteering',
      'centralLocking'
    ],
    optional: [
      'leatherSeats',
      'panoramicSunroof',
      'navigationSystem',
      'bluetoothConnectivity',
      'parkingSensors',
      'backupCamera',
      'heatedSeats',
      'ventilatedSeats',
      'adaptiveCruiseControl',
      'blindSpotMonitor',
      'laneDepartureWarning',
      'headUpDisplay',
      'ambientLighting',
      'premiumSoundSystem',
      'wirelessCharging',
      'electricTrunk',
      'powerFoldingMirrors',
      'automaticParkingSystem'
    ],
    specificModels: {
      'Audi A8': {
        standard: [
          'leatherSeats',
          'navigationSystem',
          'bluetoothConnectivity',
          'parkingSensors',
          'backupCamera',
          'heatedSeats',
          'adaptiveCruiseControl'
        ],
        optional: [
          'nightVision',
          'massageSeats',
          'rearEntertainment',
          'allWheelSteering',
          'airSuspension',
          'panoramicSunroof',
          'headUpDisplay',
          'ambientLighting',
          'premiumSoundSystem',
          'wirelessCharging',
          'electricTrunk',
          'powerFoldingMirrors',
          'automaticParkingSystem',
          'ventilatedSeats',
          'blindSpotMonitor'
        ]
      },
      'Mercedes-Benz S-Class': {
        standard: [
          'leatherSeats',
          'navigationSystem',
          'bluetoothConnectivity',
          'parkingSensors',
          'backupCamera',
          'heatedSeats',
          'ventilatedSeats'
        ],
        optional: [
          'nightVision',
          'massageSeats',
          'rearEntertainment',
          'magicBodyControl',
          'airSuspension',
          'panoramicSunroof',
          'headUpDisplay',
          'ambientLighting',
          'premiumSoundSystem',
          'wirelessCharging',
          'electricTrunk',
          'powerFoldingMirrors',
          'automaticParkingSystem',
          'adaptiveCruiseControl',
          'blindSpotMonitor'
        ]
      }
    }
  },
  'economy': {
    standard: [
      'abs',
      'airbags',
      'powerSteering'
    ],
    optional: [
      'airConditioning',
      'powerWindows',
      'powerLocks',
      'centralLocking',
      'bluetoothConnectivity',
      'usbPort',
      'cruiseControl',
      'backupCamera',
      'parkingSensors',
      'androidAutoCarPlay',
      'alloyWheels',
      'fogLights',
      'roofRails',
      'electricMirrors',
      'heightAdjustableDriverSeat'
    ],
    specificModels: {
      'Peugeot 206': {
        standard: [
          'powerSteering',
          'abs',
          'airbags'
        ],
        optional: [
          'airConditioning',
          'powerWindows',
          'powerLocks',
          'centralLocking',
          'cdPlayer',
          'alloyWheels'
        ]
      }
    }
  },
  'sports': {
    standard: [
      'airConditioning',
      'powerWindows',
      'powerLocks',
      'abs',
      'airbags',
      'powerSteering',
      'alloyWheels',
      'sportSuspension'
    ],
    optional: [
      'leatherSeats',
      'navigationSystem',
      'bluetoothConnectivity',
      'parkingSensors',
      'backupCamera',
      'carbonFiberTrim',
      'sportExhaust',
      'adaptiveSuspension',
      'sportSeats',
      'paddleShifters',
      'performanceBrakes',
      'limitedSlipDifferential',
      'launchControl',
      'raceTrackTelemetry',
      'carbonFiberRoof'
    ]
  },
  'suv': {
    standard: [
      'airConditioning',
      'powerWindows',
      'powerLocks',
      'abs',
      'airbags',
      'powerSteering'
    ],
    optional: [
      'leatherSeats',
      'navigationSystem',
      'bluetoothConnectivity',
      'parkingSensors',
      'backupCamera',
      'heatedSeats',
      'thirdRowSeats',
      'roofRails',
      'towHitch',
      'allWheelDrive',
      'hillDescentControl',
      'offRoadMode',
      'adaptiveAirSuspension',
      'panoramicSunroof',
      'powerTailgate'
    ]
  }
};

// Helper function to determine vehicle category
export function getVehicleCategory(make: string, model: string): string {
  // Luxury brands and models
  const luxuryBrands = ['Audi', 'BMW', 'Mercedes-Benz', 'Lexus', 'Porsche', 'Jaguar', 'Land Rover'];
  const luxuryModels = ['A6', 'A7', 'A8', '5-Series', '7-Series', 'E-Class', 'S-Class', 'LS', 'XJ'];
  
  // Sports cars
  const sportsCars = ['911', 'Cayman', 'Boxster', 'M3', 'M4', 'RS', 'AMG', 'F-Type'];
  
  // Economy brands
  const economyBrands = ['Toyota', 'Honda', 'Hyundai', 'Kia', 'Chevrolet', 'Ford', 'Peugeot', 'Renault'];
  const economyModels = ['Corolla', 'Civic', 'Elantra', 'Forte', 'Cruze', 'Focus', '206', '208', 'Clio'];
  
  // SUV models
  const suvModels = ['Q7', 'X5', 'GLE', 'RX', 'Cayenne', 'F-PACE', 'RAV4', 'CR-V', 'Tucson', 'Sportage'];

  // Check for specific matches
  if (luxuryBrands.includes(make) || luxuryModels.some(m => model.includes(m))) {
    return 'luxury';
  }
  if (sportsCars.some(s => model.includes(s)) || model.includes('Sport')) {
    return 'sports';
  }
  if (suvModels.some(s => model.includes(s)) || model.includes('SUV')) {
    return 'suv';
  }
  if (economyBrands.includes(make) || economyModels.some(m => model.includes(m))) {
    return 'economy';
  }

  // Default to economy if no match found
  return 'economy';
}

// Helper function to get available equipment for a specific vehicle
export function getAvailableEquipment(make: string, model: string, year: number): {
  standard: string[];
  optional: string[];
} {
  const category = getVehicleCategory(make, model);
  const baseEquipment = vehicleEquipment[category];
  const specificModel = `${make} ${model}`;
  
  // Check if there's specific equipment for this model
  if (baseEquipment.specificModels?.[specificModel]) {
    return baseEquipment.specificModels[specificModel];
  }
  
  // Return category-based equipment
  return {
    standard: baseEquipment.standard,
    optional: baseEquipment.optional
  };
} 