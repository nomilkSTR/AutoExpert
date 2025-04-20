export type Language = 'en' | 'fr' | 'de' | 'es';

// Define the structure of our translations
export type TranslationKeys = keyof typeof translations.en;

export const languages = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español'
};

export const translations = {
  en: {
    // Common translations
    professionalVehicleValuation: 'Professional Vehicle Valuation',
    registrationCountryStep: 'Registration Country',
    basicInformationStep: 'Basic Information',
    featuresConditionStep: 'Features & Condition',
    valuationResultStep: 'Valuation Result',
    selectCountryHelper: 'Select the country where the vehicle is registered',
    appTitle: 'Vehicle Valuation',
    
    // Basic vehicle info
    make: 'Make',
    model: 'Model',
    version: 'Version/Trim Level',
    year: 'Year',
    mileage: 'Mileage',
    engineSize: 'Engine Size',
    engineSizeHelper: 'Select the engine size in liters',
    enginePower: 'Engine Power',
    transmission: 'Transmission',
    fuel: 'Fuel Type',
    condition: 'Condition',
    features: 'Features',

    // Equipment categories
    equipmentCategories: {
      basic: 'Basic Equipment',
      comfort: 'Comfort Features',
      safety: 'Safety Features',
      technology: 'Technology Features',
      exterior: 'Exterior Features',
      performance: 'Performance Features'
    },

    // Equipment items
    equipment: {
      // Basic
      airConditioning: 'Air Conditioning',
      powerWindows: 'Power Windows',
      powerLocks: 'Power Locks',
      centralLocking: 'Central Locking',
      bluetoothConnectivity: 'Bluetooth Connectivity',
      usbPort: 'USB Port',
      cruiseControl: 'Cruise Control',
      backupCamera: 'Backup Camera',
      parkingSensors: 'Parking Sensors',
      androidAutoCarPlay: 'Android Auto & CarPlay',
      alloyWheels: 'Alloy Wheels',
      fogLights: 'Fog Lights',
      roofRails: 'Roof Rails',
      electricMirrors: 'Electric Mirrors',
      heightAdjustableDriverSeat: 'Height Adjustable Driver Seat',

      // Additional equipment
      adaptiveCruiseControl: 'Adaptive Cruise Control',
      automaticClimate: 'Automatic Climate Control',
      heatedSeats: 'Heated Seats',
      ventilatedSeats: 'Ventilated Seats',
      leatherSeats: 'Leather Seats',
      massageSeats: 'Massage Seats',
      memorySeats: 'Memory Seats',
      powerSeats: 'Power Seats',
      rearAC: 'Rear Air Conditioning',
      navigationSystem: 'Navigation System',
      premiumSound: 'Premium Sound System',
      wirelessCharging: 'Wireless Charging',
      voiceControl: 'Voice Control',
      panoramicRoof: 'Panoramic Roof',
      powerFoldingMirrors: 'Power Folding Mirrors',
      privacyGlass: 'Privacy Glass',
      sunroof: 'Sunroof',
      towBar: 'Tow Bar',
      xenonLights: 'Xenon Lights',

      // Comfort
      bluetooth: 'Bluetooth',
      heatedSeats: 'Heated Seats',
      ventilatedSeats: 'Ventilated Seats',
      leatherSeats: 'Leather Seats',
      massageSeats: 'Massage Seats',
      memorySeats: 'Memory Seats',
      powerSeats: 'Power Seats',
      rearAC: 'Rear Air Conditioning',

      // Safety
      abs: 'ABS',
      airbags: 'Airbags',
      blindSpotMonitor: 'Blind Spot Monitor',
      emergencyBrake: 'Emergency Brake Assist',
      isofix: 'ISOFIX',
      laneDepartureWarning: 'Lane Departure Warning',
      parkingCamera: 'Parking Camera',
      tirePressureMonitor: 'Tire Pressure Monitor',

      // Technology
      headUpDisplay: 'Head-Up Display',
      keylessEntry: 'Keyless Entry',
      navigationSystem: 'Navigation System',
      premiumSound: 'Premium Sound System',
      wirelessCharging: 'Wireless Charging',
      voiceControl: 'Voice Control',

      // Exterior
      panoramicRoof: 'Panoramic Roof',
      powerFoldingMirrors: 'Power Folding Mirrors',
      privacyGlass: 'Privacy Glass',
      roofRails: 'Roof Rails',
      sunroof: 'Sunroof',
      towBar: 'Tow Bar',
      xenonLights: 'Xenon Lights',

      // Performance
      adaptiveSuspension: 'Adaptive Suspension',
      sportMode: 'Sport Mode',
      sportSuspension: 'Sport Suspension',
      sportExhaust: 'Sport Exhaust',
      paddleShifters: 'Paddle Shifters',
      limitedSlip: 'Limited Slip Differential',
      launchControl: 'Launch Control'
    },

    // Packages
    packages: {
      amgLine: 'AMG Line',
      mSport: 'M Sport',
      sLine: 'S-Line',
      rLine: 'R-Line',
      sportLine: 'Sport Line',
      luxuryLine: 'Luxury Line'
    }
  },

  fr: {
    // App Title and Steps
    professionalVehicleValuation: 'Estimation Professionnelle de Véhicule',
    registrationCountryStep: 'Pays d\'Immatriculation',
    basicInformationStep: 'Informations de Base',
    featuresConditionStep: 'Équipements & État',
    valuationResultStep: 'Résultat de l\'Estimation',
    selectCountryHelper: 'Sélectionnez le pays où le véhicule est immatriculé',
    
    // App Title
    appTitle: 'Estimation Véhicule',
    
    // Vehicle Basic Info
    make: 'Marque',
    model: 'Modèle',
    version: 'Version/Finition',
    year: 'Année',
    mileage: 'Kilométrage',
    engineSize: 'Cylindrée',
    engineSizeHelper: 'Sélectionnez la cylindrée en litres',
    enginePower: 'Puissance',
    transmission: 'Transmission',
    fuel: 'Carburant',
    condition: 'État',
    features: 'Équipements',

    // Form Labels and Placeholders
    selectMake: 'Sélectionner la marque',
    selectModel: 'Sélectionner le modèle',
    enterYear: 'Entrer l\'année',
    enterMileage: 'Entrer le kilométrage',
    selectEngine: 'Sélectionner le moteur',
    selectTransmission: 'Sélectionner la transmission',
    selectFuel: 'Sélectionner le carburant',
    selectCondition: 'Sélectionner l\'état',
    selectFeatures: 'Sélectionner les équipements',

    // Transmission Types
    automatic: 'Automatique',
    manual: 'Manuelle',

    // Fuel Types
    petrol: 'Essence',
    diesel: 'Diesel',
    hybrid: 'Hybride',
    electric: 'Électrique',
    pluginHybrid: 'Hybride rechargeable',
    lpg: 'GPL',
    cng: 'GNV',
    hydrogen: 'Hydrogène',

    // Vehicle Conditions
    excellent: 'Excellent',
    good: 'Bon',
    fair: 'Moyen',
    poor: 'Mauvais',

    // Common Features
    airConditioning: 'Climatisation',
    leatherSeats: 'Sièges en cuir',
    sunroof: 'Toit ouvrant',
    navigation: 'Système de navigation',
    bluetooth: 'Bluetooth',
    parkingSensors: 'Capteurs de stationnement',
    backupCamera: 'Caméra de recul',
    heatedSeats: 'Sièges chauffants',

    // Valuation Results
    estimatedValue: 'Valeur estimée',
    valuationRange: 'Fourchette d\'estimation',
    marketAnalysis: 'Analyse du marché',
    similarVehicles: 'Véhicules similaires',
    priceFactors: 'Facteurs de prix',
    mileageImpact: 'Impact du kilométrage',
    conditionImpact: 'Impact de l\'état',
    marketDemand: 'Demande du marché',
    featureValue: 'Valeur des équipements',

    // Buttons and Actions
    calculate: 'Calculer',
    reset: 'Réinitialiser',
    back: 'Retour',
    next: 'Suivant',
    submit: 'Soumettre',

    // Messages
    loading: 'Chargement...',
    calculating: 'Calcul de l\'estimation...',
    noResults: 'Aucun résultat trouvé',
    error: 'Une erreur est survenue',
    required: 'Champ obligatoire',
    invalidYear: 'Année invalide',
    invalidMileage: 'Kilométrage invalide',
    pleaseSelect: 'Veuillez sélectionner',
    success: 'Succès',

    // Analysis Messages
    analyzingMarketData: 'Analyse des données du marché pour votre {make} {model} {year}',
    calculatingValuation: 'Calcul de l\'estimation en cours...',

    // Countries
    belgium: 'Belgique',
    france: 'France',
    germany: 'Allemagne',
    italy: 'Italie',
    netherlands: 'Pays-Bas',
    spain: 'Espagne',
    switzerland: 'Suisse',
    unitedKingdom: 'Royaume-Uni',

    // Valuation Result
    vehicleConditionLabel: 'État',
    distanceUnit: 'km',
    engineDetails: 'Moteur',
    valuationTitle: 'Valeur estimée du marché',
    valueRange: 'Fourchette',
    confidenceLevel: 'Niveau de confiance',
    confidenceLevelTooltip: 'Notre niveau de confiance est basé sur la quantité et la qualité des données de marché disponibles pour des véhicules similaires',
    marketTrendsTitle: 'Tendances du marché',
    comparableVehiclesTitle: 'Véhicules comparables sur le marché',
    valueFactorsTitle: 'Facteurs influençant la valeur',
    marketDemandFactor: 'Demande du marché',
    mileageComparisonFactor: 'Comparaison du kilométrage',
    vehicleConditionFactor: 'État du véhicule',
    equipmentFeaturesFactor: 'Équipements et fonctionnalités',
    impactOnValue: 'Impact sur la valeur',
    dataSource: 'Source des données',
    newValuation: 'Nouvelle estimation',
    tryAgain: 'Réessayer',
    errorNoData: 'Aucune donnée d\'estimation disponible.',
    errorMissingData: 'Cela peut être dû à des données manquantes ou invalides.',
    errorTryAgainMessage: 'Nous allons essayer de trouver des véhicules similaires pour fournir une estimation. Veuillez vérifier que tous les détails du véhicule sont corrects ou réessayer plus tard.',

    // Confidence Levels
    confidenceLow: 'FAIBLE',
    confidenceMedium: 'MOYEN',
    confidenceHigh: 'ÉLEVÉ',

    // Market Analysis Templates
    marketTrendTemplate: 'Le {model} bénéficie d\'un marché stable avec une légère tendance à la hausse, particulièrement pour les exemplaires bien entretenus avec un kilométrage raisonnable. La demande de voitures {category} reste forte en Europe, avec un intérêt particulier pour les modèles des marques prestigieuses comme {make}. Le {model} est considéré comme un classique moderne, ce qui conduit à une appréciation constante de sa valeur.',
    
    listingDescriptionTemplate: 'Modèle {year} avec {mileage} km. État {condition} avec {features}.',
    similarMileageDesc: 'Kilométrage similaire au vôtre',
    lowerMileageDesc: 'Kilométrage inférieur au vôtre',
    higherMileageDesc: 'Kilométrage supérieur au vôtre',
    similarFeaturesDesc: 'Équipements similaires aux vôtres',
    additionalFeaturesDesc: 'Comprend des équipements supplémentaires',
    
    valuationExplanationTemplate: 'La {make} {model} de {year}, avec ses caractéristiques spécifiques et son état, conserve une valeur importante sur le marché de l\'occasion, particulièrement pour les collectionneurs et les passionnés de la marque. Compte tenu de son kilométrage de {mileage} km, son état {condition}, et sa version {version}, l\'estimation est dérivée d\'une analyse approfondie du marché. Les équipements tels que {features} augmentent son attrait et sa valeur. Le marché des {make} {model}, en particulier la version {version}, reste robuste en raison de leur désirabilité et leur disponibilité relativement limitée.',

    standardFeatures: 'Équipements de Série',
    optionalFeatures: 'Équipements Optionnels',
    additionalNotes: 'Notes Supplémentaires',
    additionalNotesPlaceholder: 'Entrez des détails supplémentaires sur l\'état ou les équipements du véhicule',

    equipmentCategories: {
      basic: 'Équipement de Base',
      comfort: 'Équipement de Confort',
      safety: 'Équipement de Sécurité',
      technology: 'Équipement Technologique',
      exterior: 'Équipement Extérieur',
      performance: 'Équipement Performance'
    },

    equipment: {
      // Basic
      airConditioning: 'Climatisation',
      powerWindows: 'Vitres Électriques',
      powerLocks: 'Verrouillage Électrique',
      centralLocking: 'Verrouillage Central',
      bluetoothConnectivity: 'Connectivité Bluetooth',
      usbPort: 'Port USB',
      cruiseControl: 'Régulateur de Vitesse',
      backupCamera: 'Caméra de Recul',
      parkingSensors: 'Capteurs de Stationnement',
      androidAutoCarPlay: 'Android Auto & CarPlay',
      alloyWheels: 'Jantes en Alliage',
      fogLights: 'Feux Antibrouillard',
      roofRails: 'Barres de Toit',
      electricMirrors: 'Rétroviseurs Électriques',
      heightAdjustableDriverSeat: 'Siège Conducteur Réglable en Hauteur',

      // Additional equipment
      adaptiveCruiseControl: 'Régulateur de Vitesse Adaptatif',
      automaticClimate: 'Climatisation Automatique',
      heatedSeats: 'Sièges Chauffants',
      ventilatedSeats: 'Sièges Ventilés',
      leatherSeats: 'Sièges en Cuir',
      massageSeats: 'Sièges Massants',
      memorySeats: 'Sièges à Mémoire',
      powerSeats: 'Sièges Électriques',
      rearAC: 'Climatisation Arrière',
      navigationSystem: 'Système de Navigation',
      premiumSound: 'Système Audio Premium',
      wirelessCharging: 'Chargement Sans Fil',
      voiceControl: 'Commande Vocale',
      panoramicRoof: 'Toit Panoramique',
      powerFoldingMirrors: 'Rétroviseurs Rabattables Électriquement',
      privacyGlass: 'Vitres Teintées',
      sunroof: 'Toit Ouvrant',
      towBar: 'Attelage',
      xenonLights: 'Phares Xénon'
    },

    packages: {
      amgLine: 'Ligne AMG',
      mSport: 'M Sport',
      sLine: 'Ligne S',
      rLine: 'Ligne R',
      sportLine: 'Ligne Sport',
      luxuryLine: 'Ligne Luxe'
    }
  },

  de: {
    // App Title and Steps
    professionalVehicleValuation: 'Professionelle Fahrzeugbewertung',
    registrationCountryStep: 'Zulassungsland',
    basicInformationStep: 'Grundinformationen',
    featuresConditionStep: 'Ausstattung & Zustand',
    valuationResultStep: 'Bewertungsergebnis',
    selectCountryHelper: 'Wählen Sie das Land aus, in dem das Fahrzeug zugelassen ist',
    
    // App Title
    appTitle: 'Fahrzeugbewertung',
    
    // Vehicle Basic Info
    make: 'Marke',
    model: 'Modell',
    version: 'Version/Ausstattung',
    year: 'Baujahr',
    mileage: 'Kilometerstand',
    engineSize: 'Hubraum',
    engineSizeHelper: 'Wählen Sie den Hubraum in Litern',
    enginePower: 'Leistung',
    transmission: 'Getriebe',
    fuel: 'Kraftstoff',
    condition: 'Zustand',
    features: 'Ausstattung',

    // Form Labels and Placeholders
    selectMake: 'Marke auswählen',
    selectModel: 'Modell auswählen',
    enterYear: 'Baujahr eingeben',
    enterMileage: 'Kilometerstand eingeben',
    selectEngine: 'Motor auswählen',
    selectTransmission: 'Getriebe auswählen',
    selectFuel: 'Kraftstoff auswählen',
    selectCondition: 'Zustand auswählen',
    selectFeatures: 'Ausstattung auswählen',

    // Transmission Types
    automatic: 'Automatik',
    manual: 'Schaltgetriebe',

    // Fuel Types
    petrol: 'Benzin',
    diesel: 'Diesel',
    hybrid: 'Hybrid',
    electric: 'Elektrisch',
    pluginHybrid: 'Plug-in-Hybrid',
    lpg: 'Autogas',
    cng: 'Erdgas',
    hydrogen: 'Wasserstoff',

    // Vehicle Conditions
    excellent: 'Ausgezeichnet',
    good: 'Gut',
    fair: 'Mittel',
    poor: 'Schlecht',

    // Common Features
    airConditioning: 'Klimaanlage',
    leatherSeats: 'Ledersitze',
    sunroof: 'Schiebedach',
    navigation: 'Navigationssystem',
    bluetooth: 'Bluetooth',
    parkingSensors: 'Parksensoren',
    backupCamera: 'Rückfahrkamera',
    heatedSeats: 'Sitzheizung',

    // Valuation Results
    estimatedValue: 'Geschätzter Wert',
    valuationRange: 'Bewertungsbereich',
    marketAnalysis: 'Marktanalyse',
    similarVehicles: 'Ähnliche Fahrzeuge',
    priceFactors: 'Preisfaktoren',
    mileageImpact: 'Einfluss des Kilometerstands',
    conditionImpact: 'Einfluss des Zustands',
    marketDemand: 'Marktnachfrage',
    featureValue: 'Ausstattungswert',

    // Buttons and Actions
    calculate: 'Berechnen',
    reset: 'Zurücksetzen',
    back: 'Zurück',
    next: 'Weiter',
    submit: 'Absenden',

    // Messages
    loading: 'Laden...',
    calculating: 'Berechne Bewertung...',
    noResults: 'Keine Ergebnisse gefunden',
    error: 'Ein Fehler ist aufgetreten',
    required: 'Pflichtfeld',
    invalidYear: 'Ungültiges Jahr',
    invalidMileage: 'Ungültiger Kilometerstand',
    pleaseSelect: 'Bitte auswählen',
    success: 'Erfolgreich',

    // Analysis Messages
    analyzingMarketData: 'Analysiere Marktdaten für Ihren {make} {model} {year}',
    calculatingValuation: 'Berechne Bewertung...',

    // Countries
    belgium: 'Belgien',
    france: 'Frankreich',
    germany: 'Deutschland',
    italy: 'Italien',
    netherlands: 'Niederlande',
    spain: 'Spanien',
    switzerland: 'Schweiz',
    unitedKingdom: 'Vereinigtes Königreich',

    // Valuation Result
    vehicleConditionLabel: 'Zustand',
    distanceUnit: 'km',
    engineDetails: 'Motor',
    valuationTitle: 'Geschätzter Marktwert',
    valueRange: 'Bereich',
    confidenceLevel: 'Vertrauensniveau',
    confidenceLevelTooltip: 'Unser Vertrauensniveau basiert auf der Menge und Qualität der verfügbaren Marktdaten für ähnliche Fahrzeuge',
    marketTrendsTitle: 'Markttrends',
    comparableVehiclesTitle: 'Vergleichbare Fahrzeuge auf dem Markt',
    valueFactorsTitle: 'Wertbeeinflussende Faktoren',
    marketDemandFactor: 'Marktnachfrage',
    mileageComparisonFactor: 'Kilometerstandvergleich',
    vehicleConditionFactor: 'Fahrzeugzustand',
    equipmentFeaturesFactor: 'Ausstattung und Funktionen',
    impactOnValue: 'Auswirkung auf den Wert',
    dataSource: 'Datenquelle',
    newValuation: 'Neue Bewertung',
    tryAgain: 'Erneut versuchen',
    errorNoData: 'Keine Bewertungsdaten verfügbar.',
    errorMissingData: 'Dies könnte an fehlenden oder ungültigen Daten liegen.',
    errorTryAgainMessage: 'Wir werden versuchen, ähnliche Fahrzeuge zu finden, um eine Schätzung abzugeben. Bitte überprüfen Sie, ob alle Fahrzeugdetails korrekt sind, oder versuchen Sie es später erneut.',

    // Confidence Levels
    confidenceLow: 'NIEDRIG',
    confidenceMedium: 'MITTEL',
    confidenceHigh: 'HOCH',

    // Market Analysis Templates
    marketTrendTemplate: 'Der {model} erfreut sich eines stabilen Marktes mit leicht steigender Werttendenz, besonders für gut gepflegte Exemplare mit vernünftiger Laufleistung. Die Nachfrage nach {category}-Fahrzeugen ist in Europa weiterhin stark, mit besonderem Interesse an Modellen prestigeträchtiger Marken wie {make}. Der {model} gilt als moderner Klassiker, was zu einer stetigen Wertsteigerung führt.',
    
    listingDescriptionTemplate: 'Modell {year} mit {mileage} km. {condition} Zustand mit {features}.',
    similarMileageDesc: 'Ähnliche Laufleistung wie Ihre',
    lowerMileageDesc: 'Niedrigere Laufleistung als Ihre',
    higherMileageDesc: 'Höhere Laufleistung als Ihre',
    similarFeaturesDesc: 'Ähnliche Ausstattung wie Ihre',
    additionalFeaturesDesc: 'Enthält zusätzliche Ausstattung',
    
    valuationExplanationTemplate: 'Der {make} {model} von {year} mit seinen spezifischen Merkmalen und seinem Zustand hat einen bedeutenden Wert auf dem Gebrauchtwagenmarkt, besonders für Sammler und Liebhaber der Marke. Angesichts der Laufleistung von {mileage} km, dem {condition} Zustand und der {version}, basiert die Bewertung auf einer sorgfältigen Marktanalyse. Die Ausstattung wie {features} erhöht seine Attraktivität und seinen Wert. Der Markt für {make} {model} Modelle, insbesondere die {version}, bleibt aufgrund ihrer Beliebtheit und relativen Seltenheit robust.',

    standardFeatures: 'Standardausstattung',
    optionalFeatures: 'Sonderausstattung',
    additionalNotes: 'Zusätzliche Anmerkungen',
    additionalNotesPlaceholder: 'Geben Sie zusätzliche Details zum Zustand oder zur Ausstattung des Fahrzeugs ein',

    equipmentCategories: {
      basic: 'Basisausstattung',
      comfort: 'Befehlsausstattung',
      safety: 'Sicherheitsausstattung',
      technology: 'Technologieausstattung',
      exterior: 'Exteriorausstattung',
      performance: 'Leistungsausstattung'
    },

    equipment: {
      // Basic
      airConditioning: 'Klimaanlage',
      powerWindows: 'Vitres Électriques',
      powerLocks: 'Verrouillage Électrique',
      centralLocking: 'Verrouillage Central',
      bluetoothConnectivity: 'Connectivité Bluetooth',
      usbPort: 'Port USB',
      cruiseControl: 'Régulateur de Vitesse',
      backupCamera: 'Caméra de Recul',
      parkingSensors: 'Capteurs de Stationnement',
      androidAutoCarPlay: 'Android Auto & CarPlay',
      alloyWheels: 'Jantes en Alliage',
      fogLights: 'Feux Antibrouillard',
      roofRails: 'Barres de Toit',
      electricMirrors: 'Rétroviseurs Électriques',
      heightAdjustableDriverSeat: 'Siège Conducteur Réglable en Hauteur',

      // Additional equipment
      adaptiveCruiseControl: 'Régulateur de Vitesse Adaptatif',
      automaticClimate: 'Climatisation Automatique',
      heatedSeats: 'Sitzheizung',
      ventilatedSeats: 'Belüftete Sitze',
      leatherSeats: 'Ledersitze',
      massageSeats: 'Massagesitze',
      memorySeats: 'Memory Seats',
      powerSeats: 'Elektrische Sitze',
      rearAC: 'Climatisation Arrière',
      navigationSystem: 'Système de Navigation',
      premiumSound: 'Système Audio Premium',
      wirelessCharging: 'Chargement Sans Fil',
      voiceControl: 'Commande Vocale',
      panoramicRoof: 'Toit Panoramique',
      powerFoldingMirrors: 'Rétroviseurs Rabattables Électriquement',
      privacyGlass: 'Vitres Teintées',
      sunroof: 'Toit Ouvrant',
      towBar: 'Attelage',
      xenonLights: 'Phares Xénon'
    },

    packages: {
      amgLine: 'AMG Line',
      mSport: 'M Sport',
      sLine: 'S-Line',
      rLine: 'R-Line',
      sportLine: 'Sport Line',
      luxuryLine: 'Luxury Line'
    }
  },

  es: {
    // App Title and Steps
    professionalVehicleValuation: 'Tasación Profesional de Vehículos',
    registrationCountryStep: 'País de Matriculación',
    basicInformationStep: 'Información Básica',
    featuresConditionStep: 'Características y Estado',
    valuationResultStep: 'Resultado de la Tasación',
    selectCountryHelper: 'Seleccione el país donde está matriculado el vehículo',
    
    // App Title
    appTitle: 'Valoración de Vehículos',
    
    // Vehicle Basic Info
    make: 'Marca',
    model: 'Modelo',
    version: 'Versión/Acabado',
    year: 'Año',
    mileage: 'Kilometraje',
    engineSize: 'Cilindrada',
    engineSizeHelper: 'Seleccione la cilindrada en litros',
    enginePower: 'Potencia',
    transmission: 'Transmisión',
    fuel: 'Combustible',
    condition: 'Estado',
    features: 'Características',

    // Form Labels and Placeholders
    selectMake: 'Seleccionar marca',
    selectModel: 'Seleccionar modelo',
    enterYear: 'Introducir año',
    enterMileage: 'Introducir kilometraje',
    selectEngine: 'Seleccionar motor',
    selectTransmission: 'Seleccionar transmisión',
    selectFuel: 'Seleccionar combustible',
    selectCondition: 'Seleccionar estado',
    selectFeatures: 'Seleccionar características',

    // Transmission Types
    automatic: 'Automático',
    manual: 'Manual',

    // Fuel Types
    petrol: 'Gasolina',
    diesel: 'Diésel',
    hybrid: 'Híbrido',
    electric: 'Eléctrico',
    pluginHybrid: 'Híbrido enchufable',
    lpg: 'GLP',
    cng: 'GNC',
    hydrogen: 'Hidrógeno',

    // Vehicle Conditions
    excellent: 'Excelente',
    good: 'Bueno',
    fair: 'Regular',
    poor: 'Malo',

    // Common Features
    airConditioning: 'Aire acondicionado',
    leatherSeats: 'Asientos de cuero',
    sunroof: 'Techo solar',
    navigation: 'Sistema de navegación',
    bluetooth: 'Bluetooth',
    parkingSensors: 'Sensores de aparcamiento',
    backupCamera: 'Cámara trasera',
    heatedSeats: 'Asientos calefactables',

    // Valuation Results
    estimatedValue: 'Valor estimado',
    valuationRange: 'Rango de valoración',
    marketAnalysis: 'Análisis de mercado',
    similarVehicles: 'Vehículos similares',
    priceFactors: 'Factores de precio',
    mileageImpact: 'Impacto del kilometraje',
    conditionImpact: 'Impacto del estado',
    marketDemand: 'Demanda del mercado',
    featureValue: 'Valor del equipamiento',

    // Buttons and Actions
    calculate: 'Calcular',
    reset: 'Restablecer',
    back: 'Atrás',
    next: 'Siguiente',
    submit: 'Enviar',

    // Messages
    loading: 'Cargando...',
    calculating: 'Calculando valoración...',
    noResults: 'No se encontraron resultados',
    error: 'Se ha producido un error',
    required: 'Campo obligatorio',
    invalidYear: 'Año no válido',
    invalidMileage: 'Kilometraje no válido',
    pleaseSelect: 'Por favor seleccione',
    success: 'Éxito',

    // Analysis Messages
    analyzingMarketData: 'Analizando datos del mercado para su {make} {model} {year}',
    calculatingValuation: 'Calculando tasación...',

    // Countries
    belgium: 'Bélgica',
    france: 'Francia',
    germany: 'Alemania',
    italy: 'Italia',
    netherlands: 'Países Bajos',
    spain: 'España',
    switzerland: 'Suiza',
    unitedKingdom: 'Reino Unido',

    // Valuation Result
    vehicleConditionLabel: 'Estado',
    distanceUnit: 'km',
    engineDetails: 'Motor',
    valuationTitle: 'Valor estimado de mercado',
    valueRange: 'Rango',
    confidenceLevel: 'Nivel de confianza',
    confidenceLevelTooltip: 'Nuestro nivel de confianza se basa en la cantidad y calidad de datos de mercado disponibles para vehículos similares',
    marketTrendsTitle: 'Tendencias del mercado',
    comparableVehiclesTitle: 'Vehículos comparables en el mercado',
    valueFactorsTitle: 'Factores que influyen en el valor',
    marketDemandFactor: 'Demanda del mercado',
    mileageComparisonFactor: 'Comparación de kilometraje',
    vehicleConditionFactor: 'Estado del vehículo',
    equipmentFeaturesFactor: 'Equipamiento y características',
    impactOnValue: 'Impacto en el valor',
    dataSource: 'Fuente de datos',
    newValuation: 'Nueva tasación',
    tryAgain: 'Intentar de nuevo',
    errorNoData: 'No hay datos de tasación disponibles.',
    errorMissingData: 'Esto puede deberse a datos faltantes o inválidos.',
    errorTryAgainMessage: 'Intentaremos encontrar vehículos similares para proporcionar una estimación. Por favor, verifique que todos los detalles del vehículo sean correctos o inténtelo más tarde.',

    // Confidence Levels
    confidenceLow: 'BAJO',
    confidenceMedium: 'MEDIO',
    confidenceHigh: 'ALTO',

    // Market Analysis Templates
    marketTrendTemplate: 'El {model} disfruta de un mercado estable con una ligera tendencia al alza en su valor, especialmente para ejemplares bien mantenidos con kilometraje razonable. La demanda de coches {category} se mantiene fuerte en Europa, con un interés particular en modelos de marcas prestigiosas como {make}. El {model} es considerado un clásico moderno, lo que lleva a una apreciación constante de su valor.',
    
    listingDescriptionTemplate: 'Modelo {year} con {mileage} km. Estado {condition} con {features}.',
    similarMileageDesc: 'Kilometraje similar al suyo',
    lowerMileageDesc: 'Kilometraje inferior al suyo',
    higherMileageDesc: 'Kilometraje superior al suyo',
    similarFeaturesDesc: 'Características similares a las suyas',
    additionalFeaturesDesc: 'Incluye características adicionales',
    
    valuationExplanationTemplate: 'El {make} {model} de {year}, con sus características específicas y estado, mantiene un valor significativo en el mercado de coches usados, particularmente para coleccionistas y entusiastas de la marca. Dado su kilometraje de {mileage} km, estado {condition}, y la versión {version}, la valoración se deriva de un análisis cuidadoso del mercado. Las características como {features} aumentan su atractivo y valor. El mercado de los {make} {model}, especialmente la versión {version}, se mantiene robusto debido a su deseabilidad y disponibilidad relativamente limitada.',

    standardFeatures: 'Equipamiento de Serie',
    optionalFeatures: 'Equipamiento Opcional',
    additionalNotes: 'Notas Adicionales',
    additionalNotesPlaceholder: 'Ingrese detalles adicionales sobre el estado o características del vehículo',

    equipmentCategories: {
      basic: 'Equipamiento Básico',
      comfort: 'Equipamiento de Confort',
      safety: 'Equipamiento de Seguridad',
      technology: 'Equipamiento Tecnológico',
      exterior: 'Equipamiento Exterior',
      performance: 'Equipamiento de Desempeño'
    },

    equipment: {
      // Basic
      airConditioning: 'Aire Acondicionado',
      powerWindows: 'Vitres Électriques',
      powerLocks: 'Verrouillage Électrique',
      centralLocking: 'Central Locking',
      bluetoothConnectivity: 'Connectivité Bluetooth',
      usbPort: 'Port USB',
      cruiseControl: 'Cruise Control',
      backupCamera: 'Caméra de Recul',
      parkingSensors: 'Capteurs de Stationnement',
      androidAutoCarPlay: 'Android Auto & CarPlay',
      alloyWheels: 'Llantas de Aleación',
      fogLights: 'Feux Antibrouillard',
      roofRails: 'Barras de Techo',
      electricMirrors: 'Rétroviseurs Électriques',
      heightAdjustableDriverSeat: 'Siège Conducteur Réglable en Hauteur',

      // Additional equipment
      adaptiveCruiseControl: 'Control de Crucero Adaptativo',
      automaticClimate: 'Aire Acondicionado',
      heatedSeats: 'Asientos Calefactados',
      ventilatedSeats: 'Asientos Ventilados',
      leatherSeats: 'Asientos de Cuero',
      massageSeats: 'Asientos con Masaje',
      memorySeats: 'Memory Seats',
      powerSeats: 'Asientos Eléctricos',
      rearAC: 'Rückklimalüftung',
      navigationSystem: 'Sistema de Navegación',
      premiumSound: 'Sistema de Sonido Premium',
      wirelessCharging: 'Carga Inalámbrica',
      voiceControl: 'Voice Control',
      panoramicRoof: 'Techo Panorámico',
      powerFoldingMirrors: 'Espejos Plegables Eléctricos',
      privacyGlass: 'Glaseinbausieb',
      sunroof: 'Techo Solar',
      towBar: 'Portón Trasero Eléctrico',
      xenonLights: 'Faros Antiniebla'
    },

    packages: {
      amgLine: 'AMG Line',
      mSport: 'M Sport',
      sLine: 'S-Line',
      rLine: 'R-Line',
      sportLine: 'Sport Line',
      luxuryLine: 'Luxury Line'
    }
  }
}; 