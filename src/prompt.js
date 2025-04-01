import { z } from 'zod';
import { zodResponseFormat } from "openai/helpers/zod";

export const promptFunction = (answers) => `
You are a professional travel agent. Based on the following user preferences, generate a realistic, detailed, and personalized travel itinerary.
Your goal is to create a balanced, exciting, and budget-appropriate travel plan that reflects the user's interests, limitations, comfort needs, and travel style.

User preferences:
Budget: ${answers.budget};
Duration: ${answers.duration};
Vacation type(s): ${answers.vacationType.join(", ")};
Country of departure: ${answers.departureCountry};
Preferred destination (if any): ${answers.priorityCountry};
Transportation: ${answers.transportation.join(", ")};
Accommodation: ${answers.accommodation};
Dietary restrictions: ${answers.dietaryRestrictions};
Activities: ${answers.activities.join(", ")};
Traveling with children: ${answers.travelWithKids};
Comfort level: ${answers.comfortLevel};
Season: ${answers.season};
Include local events: ${answers.localEvents};

Your response should:

1. Provide a short description of the selected country or cities and explain why they suit the user's preferences.
2. Present a **realistic day-by-day itinerary** based on the trip duration.
3. Include **travel logistics** — flights, transfers, local transportation (adapted to selected transport type).
4. Recommend specific **accommodations** for each destination, using realistic names of hotels, guesthouses, or hostels. Match suggestions to:
   - comfort level,
   - season (A/C for summer, heating for winter),
   - budget limits,
   - dietary or family needs.
5. Suggest **places to eat** (restaurants, cafés, food markets) with realistic names. Ensure:
   - they fit the dietary restrictions,
   - pricing fits the budget,
   - ambiance matches the travel style (romantic, family-friendly, adventurous, etc.).
6. Propose **activities and attractions** adjusted to user preferences, budget, and comfort level.
7. If "Include local events" is Yes, include festivals, public celebrations, concerts or seasonal markets.
8. Reflect **weather and seasonal conditions** in the suggestions — include tips for temperature comfort.
9. Ensure that all parts of the trip remain within the selected budget. Choose free or affordable options when needed.
10. End with a short **summary paragraph** capturing the emotional value of the trip.
11. If the user specifies more than 14 days, write down everything for each day.
12. Correctly conjugate words, especially countries.

Write in the tone of an inspiring and friendly travel blog.
Use formatting: no emojis, bold titles, bullet points, and spacing for better readability.

**Write your full response in Ukrainian.**
`;

export const travelDataSchema = z.object({
  destination: z.object({
    country: z.string(),
    cities: z.array(z.string()),
    description: z.string(),
  }),
  accommodation: z.array(
    z.object({
      city: z.string(),
      name: z.string(),
      type: z.string(),
      features: z.array(z.string()),
      estimatedPricePerNight: z.number(),
    })
  ),
  foodRecommendations: z.array(
    z.object({
      name: z.string(),
      location: z.string(),
      type: z.string(),
      highlight: z.string(),
      averagePrice: z.number(),
    })
  ),
  itinerary: z.array(
    z.object({
      day: z.number(),
      title: z.string(),
      activities: z.array(z.string()),
    })
  ),
  events: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      location: z.string(),
      day: z.number(),
    })
  ),
  summary: z.string(),
  totalBudgetEstimate: z.number(),
});

export const responseFormat = zodResponseFormat(travelDataSchema, "travel_plan")