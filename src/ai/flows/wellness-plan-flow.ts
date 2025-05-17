
'use server';
/**
 * @fileOverview A Genkit flow for generating personalized holistic wellness plans.
 *
 * - getWellnessPlan - A function that takes user's Prakriti and concerns to generate a wellness plan.
 * - WellnessPlanInput - The input type for the getWellnessPlan function.
 * - WellnessPlanOutput - The return type for the getWellnessPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WellnessPlanInputSchema = z.object({
  prakriti: z
    .string()
    .describe("The user's primary Ayurvedic constitution (e.g., Vata, Pitta, Kapha, Vata-Pitta, Tridoshic)."),
  currentConcerns: z
    .string()
    .optional()
    .describe("Optional: Any specific health concerns or goals the user wants to address (e.g., stress, poor digestion, improve energy)."),
});
export type WellnessPlanInput = z.infer<typeof WellnessPlanInputSchema>;

const WellnessPlanOutputSchema = z.object({
  prakritiAnalysis: z
    .string()
    .describe("A brief confirmation or analysis of the provided Prakriti and its general characteristics."),
  dietarySuggestions: z
    .string()
    .describe("Detailed dietary suggestions, including foods to favor, foods to limit or avoid, and general eating habits suitable for the Prakriti. Use Markdown for lists and formatting."),
  lifestyleAdjustments: z
    .string()
    .describe("Recommendations for daily routine (Dinacharya), types of exercise, and sleep habits suitable for the Prakriti. Use Markdown for lists and formatting."),
  mindfulnessPractices: z
    .string()
    .describe("Suggested meditation techniques, yoga asanas (if applicable), or other mindfulness and self-care practices beneficial for the Prakriti. Use Markdown for lists and formatting."),
  disclaimer: z
    .string()
    .describe("A standard disclaimer stating that these suggestions are not medical advice and to consult with healthcare professionals for personal health issues."),
});
export type WellnessPlanOutput = z.infer<typeof WellnessPlanOutputSchema>;

export async function getWellnessPlan(input: WellnessPlanInput): Promise<WellnessPlanOutput> {
  return wellnessPlanFlow(input);
}

const wellnessPlanPrompt = ai.definePrompt({
  name: 'wellnessPlanPrompt',
  input: {schema: WellnessPlanInputSchema},
  output: {schema: WellnessPlanOutputSchema},
  prompt: `You are an expert Ayurvedic wellness advisor.
The user's Ayurvedic constitution (Prakriti) is {{prakriti}}.
{{#if currentConcerns}}
The user also has the following current concerns or goals: {{{currentConcerns}}}
{{/if}}

Based on this information, provide a personalized holistic wellness plan.
Structure your response according to the output schema.
For dietarySuggestions, lifestyleAdjustments, and mindfulnessPractices, use Markdown bullet points for clear, actionable advice.
Ensure the prakritiAnalysis briefly explains the key traits of the provided {{prakriti}} constitution.
The advice should be practical and aim to promote balance and well-being according to Ayurvedic principles.
Include a standard disclaimer.

Example of how to format lists in your response (e.g., for dietarySuggestions):
"Foods to Favor:
* Fresh, cooked vegetables
* Warm, nourishing grains like oatmeal
* Sweet fruits in moderation"
`,
});

const wellnessPlanFlow = ai.defineFlow(
  {
    name: 'wellnessPlanFlow',
    inputSchema: WellnessPlanInputSchema,
    outputSchema: WellnessPlanOutputSchema,
  },
  async (input) => {
    const {output} = await wellnessPlanPrompt(input);
    if (!output) {
      throw new Error('Failed to generate wellness plan. The AI model did not return a valid output.');
    }
    return output;
  }
);
