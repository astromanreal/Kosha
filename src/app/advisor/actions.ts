'use server';

import { koshaAdvisor, type KoshaAdvisorInput, type KoshaAdvisorOutput } from '@/ai/flows/kosha-advisor';

// This function is related to the AI Kosha Advisor, which is not currently used on the /advisor page
// as it has been replaced by a quiz. Keeping it for potential future use or if it's used elsewhere.
export async function getAdviceAction(data: KoshaAdvisorInput): Promise<KoshaAdvisorOutput | { error: string }> {
  try {
    const result = await koshaAdvisor(data);
    return result;
  } catch (error) {
    console.error("Error in Kosha Advisor server action:", error);
    return { error: error instanceof Error ? error.message : 'An unknown error occurred.' };
  }
}
