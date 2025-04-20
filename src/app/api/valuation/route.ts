import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface MarketListing {
  price: number;
  mileage: number;
  year: number;
  location: string;
  description: string;
}

interface FormData {
  make: string;
  model: string;
  version?: string;  // Optional version/trim level
  year: number;
  mileage: number;
  condition: string;
  engineSize: string;
  enginePower: string;
  transmission: string;
  fuel: string;
  features: string[];
  country: string;
}

async function getMarketBasedValuation(data: FormData) {
  const prompt = `You are a professional vehicle valuation expert with access to current European used car market data. 
For this ${data.year} ${data.make} ${data.model}${data.version ? ` ${data.version}` : ''}, provide:

1. A market value estimation in EUR based on REAL market listings
2. At least 3 SPECIFIC, REAL example listings of similar vehicles (if exact matches aren't available, provide closest matches and explain differences)
3. Explanation of how features affect the value:
   - Mileage: ${data.mileage} km
   - Condition: ${data.condition}
   ${data.version ? `- Version: ${data.version}` : ''}
   ${data.engineSize ? `- Engine: ${data.engineSize}` : ''}
   ${data.enginePower ? `- Power: ${data.enginePower}` : ''}
   ${data.transmission ? `- Transmission: ${data.transmission}` : ''}
   ${data.fuel ? `- Fuel Type: ${data.fuel}` : ''}
   ${data.features?.length ? `- Features: ${data.features.join(', ')}` : ''}
4. Market trends for this specific model${data.version ? ` and version` : ''}
5. Price range (minimum and maximum)

IMPORTANT:
- You MUST ALWAYS provide a valuation response with a positive value
- If exact matches aren't found, use similar vehicles (±2 years, similar trim levels) and explain adjustments
- Base the valuation on the closest available market data
- Consider the ${data.country} market specifically
- If a version/trim level is specified (${data.version || 'none'}), factor this into the valuation
- Keep all impact percentages realistic:
  * Mileage impact: between -30% and +10%
  * Condition impact: between -20% and +15%
  * Market demand impact: between -15% and +15%
  * Features impact: between -10% and +10%

Even if exact matches are not found, provide your best estimate based on:
- Similar model years (±2 years)
- Similar models and versions from the same manufacturer
- Market trends for this vehicle category
- Historical depreciation rates
- Regional market conditions in ${data.country}

You MUST provide a valid JSON response with ALL fields populated:
{
  "value": number (REQUIRED, must be > 0),
  "confidence": "high|medium|low",
  "explanation": "string (REQUIRED)",
  "marketTrends": "string (REQUIRED)",
  "range": {
    "min": number (REQUIRED, must be > 0),
    "max": number (REQUIRED, must be > min)
  },
  "comparableListings": [
    {
      "price": number (REQUIRED, must be > 0),
      "mileage": number,
      "year": number,
      "version": string,
      "location": string,
      "description": string
    }
  ],
  "factors": {
    "mileageImpact": number,
    "conditionImpact": number,
    "marketDemand": number,
    "featuresPremium": number
  }
}`;

  try {
    console.log('Requesting market-based valuation...');
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a vehicle valuation expert with extensive knowledge of the European used car market. You MUST ALWAYS provide a complete valuation response with positive values, even if exact matches aren't available. Use similar vehicles, market trends, and historical data to make estimates. Keep all value impact factors within realistic ranges."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview", // Using GPT-4 for more reliable responses
      response_format: { type: "json_object" },
      temperature: 0.5 // Lower temperature for more consistent responses
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from valuation service');
    }

    let response;
    try {
      response = JSON.parse(completion.choices[0].message.content);
      console.log('Raw API response:', response);
    } catch (parseError) {
      console.error('Failed to parse API response:', parseError);
      throw new Error('Invalid response format from valuation service');
    }

    // Validate the response structure
    if (!response.value || typeof response.value !== 'number' || response.value <= 0) {
      console.error('Invalid value in response:', response.value);
      throw new Error('Invalid valuation amount received');
    }

    if (!response.range?.min || !response.range?.max || response.range.min <= 0 || response.range.max <= response.range.min) {
      console.error('Invalid range in response:', response.range);
      response.range = {
        min: Math.round(response.value * 0.9),
        max: Math.round(response.value * 1.1)
      };
    }

    // Ensure we have at least an empty array for comparableListings
    if (!Array.isArray(response.comparableListings)) {
      response.comparableListings = [];
    }

    // Validate and clean up comparable listings
    response.comparableListings = response.comparableListings
      .filter((listing: Partial<MarketListing>) => listing && typeof listing.price === 'number' && listing.price > 0)
      .map((listing: Partial<MarketListing>): MarketListing => ({
        price: listing.price!,
        mileage: listing.mileage || 0,
        year: listing.year || data.year,
        location: listing.location || data.country,
        description: listing.description || 'Similar vehicle'
      }));

    // Validate and clamp impact percentages to realistic ranges
    const clampedFactors = {
      mileageImpact: Math.max(-30, Math.min(10, response.factors?.mileageImpact ?? 0)),
      conditionImpact: Math.max(-20, Math.min(15, response.factors?.conditionImpact ?? 0)),
      marketDemand: Math.max(-15, Math.min(15, response.factors?.marketDemand ?? 0)),
      featuresPremium: Math.max(-10, Math.min(10, response.factors?.featuresPremium ?? 0))
    };

    // Ensure we have all required fields with reasonable defaults
    const validatedResponse = {
      value: Math.round(response.value),
      confidence: ['high', 'medium', 'low'].includes(response.confidence) ? response.confidence : 'medium',
      explanation: response.explanation || `Estimated value for ${data.year} ${data.make} ${data.model} based on market analysis.`,
      marketTrends: response.marketTrends || 'Market analysis based on similar vehicles and historical data.',
      range: {
        min: Math.round(response.range.min),
        max: Math.round(response.range.max)
      },
      comparableListings: response.comparableListings,
      factors: clampedFactors,
      source: 'Market Analysis'
    };

    console.log('Validated response:', validatedResponse);
    return validatedResponse;

  } catch (error: any) {
    console.error('Valuation Error:', error);
    throw new Error(error.message || 'Failed to get market-based valuation');
  }
}

export async function POST(request: Request) {
  console.log('Received valuation request');
  try {
    const data = await request.json();
    console.log('Processing request for:', data.make, data.model);

    // Validate required fields
    if (!data.make || !data.model || !data.year || !data.mileage || !data.condition) {
      return NextResponse.json(
        { error: 'Missing required vehicle information' },
        { status: 400 }
      );
    }

    // Get market-based valuation
    const valuation = await getMarketBasedValuation(data);
    console.log('Valuation completed successfully');

    return NextResponse.json(valuation);
  } catch (error: any) {
    console.error('Valuation Error:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to calculate valuation',
        errorDetails: error.toString()
      },
      { status: 500 }
    );
  }
} 