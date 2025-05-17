
'use server';

import { getWellnessPlan, type WellnessPlanInput, type WellnessPlanOutput } from '@/ai/flows/wellness-plan-flow';

export async function generateWellnessPlanAction(data: WellnessPlanInput): Promise<WellnessPlanOutput | { error: string }> {
  try {
    const result = await getWellnessPlan(data);
    return result;
  } catch (error) {
    console.error("Error in Wellness Plan server action:", error);
    // Check if the error is from the Genkit flow itself or a network issue etc.
    let errorMessage = 'An unknown error occurred while generating the wellness plan.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { error: errorMessage };
  }
}
