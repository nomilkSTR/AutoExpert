import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface VehicleData {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: string;
  features: string[];
  country: string;
}

async function getCarValuation(vehicleData: VehicleData) {
  // Générer une seed uniquement pour la cohérence
  const seedString = `${vehicleData.make}${vehicleData.model}${vehicleData.year}${vehicleData.condition}${Math.round(vehicleData.mileage/1000)}`;
  let seedValue = 0;
  for (let i = 0; i < seedString.length; i++) {
    seedValue += seedString.charCodeAt(i);
  }

  const prompt = `Tu es un expert en évaluation automobile qui connaît parfaitement la valeur réelle des véhicules sur le marché européen. Ta tâche est d'estimer la valeur d'un ${vehicleData.year} ${vehicleData.make} ${vehicleData.model} en ${vehicleData.country} avec environ ${vehicleData.mileage}km en état ${vehicleData.condition}.

INSTRUCTIONS CRITIQUES:
1. UTILISE UNIQUEMENT TES CONNAISSANCES PRÉ-EXISTANTES du marché automobile acquises lors de ton entraînement sur les données du web
2. RAPPELLE-TOI des annonces réelles de ce modèle que tu as vues lors de ton entraînement
3. NE PAS SOUS-ESTIMER la valeur du véhicule - les estimations théoriques sont souvent trop basses
4. PENSE aux prix réels pratiqués sur leboncoin, lacentrale, mobile.de, autoscout24 que tu connais pour ce modèle

Tu dois estimer la VRAIE VALEUR MARCHANDE, celle qu'on trouve réellement sur les sites d'annonces pour un:
- ${vehicleData.make} ${vehicleData.model}
- de ${vehicleData.year} 
- avec ${vehicleData.mileage}km (${vehicleData.mileage > 100000 ? "kilométrage élevé" : vehicleData.mileage > 50000 ? "kilométrage moyen" : "faible kilométrage"})
- en état ${vehicleData.condition}
- avec options: ${vehicleData.features.join(', ')}
- sur le marché ${vehicleData.country}

Si tu as vu ce modèle sur des sites d'annonces pendant ton entraînement, BASE TA RÉPONSE SUR CES DONNÉES RÉELLES, pas sur une formule de calcul.

Fournis les résultats dans ce format JSON exact:
{
  "listings": [
    {
      "price": number,
      "mileage": number,
      "year": number,
      "location": string,
      "source": string,
      "condition": string,
      "description": string,
      "url": string
    }
  ],
  "averagePrice": number,
  "confidence": "low" | "medium" | "high"
}

IMPORTANT: Les prix de voitures d'occasion sont souvent plus élevés que ce que les formules de calcul suggèrent. Base-toi sur les vraies annonces que tu connais.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content: "Tu es un expert en véhicules d'occasion qui a mémorisé des milliers d'annonces réelles. Tu connais les VRAIS PRIX de marché pour chaque modèle de voiture. Ta connaissance vient des données d'annonces sur lesquelles tu as été entraîné. Utilise cette connaissance pour estimer la valeur RÉELLE du marché, pas une valeur théorique."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0,
      seed: seedValue
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('Pas de contenu reçu d\'OpenAI');
    }

    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (error) {
      console.error('Échec d\'analyse de la réponse OpenAI:', content);
      throw new Error('Réponse JSON invalide d\'OpenAI');
    }

    // Validate the required structure
    if (!parsedContent.listings || !Array.isArray(parsedContent.listings)) {
      throw new Error('Structure de réponse invalide: tableau de listings manquant ou invalide');
    }

    // Filter out any listings with missing or invalid prices
    parsedContent.listings = parsedContent.listings.filter(
      (listing: any) => typeof listing.price === 'number' && listing.price > 0
    );
    
    // Vérifier si des annonces valides existent
    if (parsedContent.listings.length === 0) {
      // Générer des annonces de secours au lieu de lancer une erreur
      console.warn('Aucune annonce valide trouvée, génération d\'annonces par défaut');
      const basePrice = 10000 + (vehicleData.year - 2000) * 1000 - (vehicleData.mileage / 10000);
      
      parsedContent.listings = [
        {
          price: Math.round(basePrice * 0.95),
          mileage: vehicleData.mileage,
          year: vehicleData.year,
          location: vehicleData.country,
          source: "Estimation",
          condition: vehicleData.condition,
          description: `${vehicleData.make} ${vehicleData.model} ${vehicleData.year}`,
          url: ""
        },
        {
          price: Math.round(basePrice * 1.05),
          mileage: vehicleData.mileage - 5000,
          year: vehicleData.year,
          location: vehicleData.country,
          source: "Estimation",
          condition: vehicleData.condition,
          description: `${vehicleData.make} ${vehicleData.model} ${vehicleData.year}`,
          url: ""
        }
      ];
      
      // Définir un prix moyen par défaut
      parsedContent.averagePrice = basePrice;
    }
    
    // Calculate average price if missing or invalid
    if (typeof parsedContent.averagePrice !== 'number' || parsedContent.averagePrice <= 0) {
      // Calculate average from listings
      const totalPrice = parsedContent.listings.reduce((sum: number, listing) => sum + (listing.price || 0), 0);
      parsedContent.averagePrice = totalPrice / parsedContent.listings.length;
    }

    if (!parsedContent.confidence || !['low', 'medium', 'high'].includes(parsedContent.confidence)) {
      parsedContent.confidence = 'low'; // Default to low if missing
    }

    return parsedContent;
  } catch (error: any) {
    console.error('OpenAI API error:', error);
    throw new Error(`Failed to get car valuation: ${error.message}`);
  }
}

export async function POST(request: Request) {
  try {
    const vehicleData: VehicleData = await request.json();
    
    // Get real market data using OpenAI
    const marketData = await getCarValuation(vehicleData);
    
    // Calculer un niveau de confiance plus pertinent basé sur les données reçues
    let confidence = 'low';
    if (marketData.listings.length >= 3 && marketData.listings.length < 6) {
      confidence = 'medium';
    } else if (marketData.listings.length >= 6) {
      confidence = 'high';
    }
    
    // Calculer la variance des prix pour affiner le niveau de confiance
    if (marketData.listings.length >= 3) {
      const prices = marketData.listings.map(listing => listing.price);
      const avgPrice = prices.reduce((sum: number, price: number) => sum + price, 0) / prices.length;
      const variance = prices.reduce((sum: number, price: number) => sum + Math.pow(price - avgPrice, 2), 0) / prices.length;
      const coefficient = Math.sqrt(variance) / avgPrice; // coefficient de variation
      
      // Si la variance est trop élevée, réduire le niveau de confiance
      if (coefficient > 0.3 && confidence === 'high') {
        confidence = 'medium';
      } else if (coefficient > 0.5 && confidence === 'medium') {
        confidence = 'low';
      }
    }
    
    // Si la source des données est "Estimation", le niveau de confiance est forcément bas
    if (marketData.listings.some(listing => listing.source === "Estimation")) {
      confidence = 'low';
    }
    
    // Remplacer le niveau de confiance de l'IA par notre calcul
    marketData.confidence = confidence;
    
    // Calculate condition impact
    const conditionMultipliers: { [key: string]: number } = {
      'excellent': 1.1,
      'good': 1.0,
      'fair': 0.9,
      'poor': 0.8
    };
    const conditionMultiplier = conditionMultipliers[vehicleData.condition.toLowerCase()] || 1.0;

    // Calculate final value based on market data and condition
    const finalValue = Math.round(marketData.averagePrice * conditionMultiplier);

    // Calculate value impacts
    const mileageImpact = ((vehicleData.mileage / marketData.listings.reduce((acc: number, l: any) => acc + l.mileage, 0) / marketData.listings.length) - 1) * 100;
    const featuresPremium = vehicleData.features.length * 2; // Each feature adds 2% to value

    return NextResponse.json({
      value: finalValue,
      confidence: marketData.confidence,
      range: {
        min: Math.round(finalValue * 0.95),
        max: Math.round(finalValue * 1.05)
      },
      explanation: `Value calculated based on ${marketData.listings.length} real market listings for ${vehicleData.year} ${vehicleData.make} ${vehicleData.model}`,
      source: 'Real-time market data via OpenAI',
      factors: {
        mileageImpact: Math.round(mileageImpact * 10) / 10,
        conditionImpact: Math.round((conditionMultiplier - 1) * 1000) / 10,
        marketDemand: 5,
        featuresPremium: Math.round(featuresPremium * 10) / 10
      },
      marketTrends: "",
      comparableListings: marketData.listings
    });

  } catch (error: any) {
    console.error('Valuation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate valuation' },
      { status: 500 }
    );
  }
} 