
'use client';

import type { WellnessPlanInput, WellnessPlanOutput } from '@/ai/flows/wellness-plan-flow';
import { generateWellnessPlanAction } from '@/app/account/actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import WellnessPlanDisplay from './wellness-plan-display';
import { trackWellnessPlanGeneration } from '@/lib/activity-tracker';

const prakritiOptions = [
  "Vata", "Pitta", "Kapha",
  "Vata-Pitta", "Vata-Kapha", "Pitta-Kapha",
  "Pitta-Vata", "Kapha-Vata", "Kapha-Pitta", // Aliases
  "Tridoshic"
] as const;

const wellnessPlanFormSchema = z.object({
  prakriti: z.enum(prakritiOptions, { required_error: "Please select your Prakriti." }),
  currentConcerns: z.string().max(500, "Concerns cannot exceed 500 characters.").optional(),
});

type WellnessPlanFormValues = z.infer<typeof wellnessPlanFormSchema>;

export default function WellnessPlanForm() {
  const [plan, setPlan] = useState<WellnessPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<WellnessPlanFormValues>({
    resolver: zodResolver(wellnessPlanFormSchema),
    defaultValues: {
      prakriti: undefined,
      currentConcerns: '',
    },
  });

  const onSubmit: SubmitHandler<WellnessPlanFormValues> = async (data) => {
    setIsLoading(true);
    setPlan(null);

    const result = await generateWellnessPlanAction(data);
    setIsLoading(false);

    if ('error' in result) {
      toast({
        title: "Error Generating Plan",
        description: result.error,
        variant: "destructive",
      });
    } else {
      setPlan(result);
      trackWellnessPlanGeneration(); // Track successful generation
      toast({
        title: "Wellness Plan Generated!",
        description: "Your personalized holistic wellness plan is ready.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prakriti"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Prakriti (Ayurvedic Constitution)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your dominant Prakriti" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {prakritiOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentConcerns"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Health Concerns or Goals (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., feeling stressed, want to improve digestion, increase energy..."
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate My Wellness Plan
              </>
            )}
          </Button>
        </form>
      </Form>

      {plan && <WellnessPlanDisplay plan={plan} />}
    </div>
  );
}
