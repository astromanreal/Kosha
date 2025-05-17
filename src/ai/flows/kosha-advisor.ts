// KoshaAdvisor.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for the Kosha Advisor, which provides holistic recommendations based on user-reported symptoms, considering imbalances across the Pancha Koshas.
 *
 * - koshaAdvisor - A function that takes user input and returns personalized recommendations.
 * - KoshaAdvisorInput - The input type for the koshaAdvisor function.
 * - KoshaAdvisorOutput - The return type for the koshaAdvisor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KoshaAdvisorInputSchema = z.object({
  symptoms: z
    .string()
    .describe(
      'A description of the symptoms or ailments the user is experiencing.'
    ),
});
export type KoshaAdvisorInput = z.infer<typeof KoshaAdvisorInputSchema>;

const KoshaAdvisorOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'Personalized recommendations that consider potential imbalances across the Pancha Koshas (physical, energetic, mental/emotional, wisdom, and bliss bodies), offering practices like nutrition, yoga, meditation, and lifestyle adjustments.'
    ),
});
export type KoshaAdvisorOutput = z.infer<typeof KoshaAdvisorOutputSchema>;

export async function koshaAdvisor(input: KoshaAdvisorInput): Promise<KoshaAdvisorOutput> {
  return koshaAdvisorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'koshaAdvisorPrompt',
  input: {schema: KoshaAdvisorInputSchema},
  output: {schema: KoshaAdvisorOutputSchema},
  prompt: `You are a holistic wellness advisor, specializing in the Pancha Koshas.

You will receive a description of the user's symptoms or ailments. Your task is to provide personalized recommendations that consider potential imbalances across the five Koshas: Annamaya, Pranamaya, Manomaya, Vijnanamaya, and Anandamaya.

Offer practical advice spanning nutrition, yoga, meditation, breathwork, and lifestyle adjustments. Explain how each recommendation relates to the Koshas and can help restore balance and promote overall well-being. Focus not only on the physical aspect of well being but also the mental and spiritual dimensions of health.

Symptoms: {{{symptoms}}}

Recommendations:`,
});

const koshaAdvisorFlow = ai.defineFlow(
  {
    name: 'koshaAdvisorFlow',
    inputSchema: KoshaAdvisorInputSchema,
    outputSchema: KoshaAdvisorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
