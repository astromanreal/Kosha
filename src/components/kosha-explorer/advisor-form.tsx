'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import type { KoshaAdvisorOutput } from '@/ai/flows/kosha-advisor';
import { getAdviceAction } from '@/app/advisor/actions';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackKoshaAdvisorUsage } from '@/lib/activity-tracker';

const formSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }).max(2000, { message: 'Symptoms description cannot exceed 2000 characters.' }),
});

type AdvisorFormValues = z.infer<typeof formSchema>;


export default function AdvisorForm() {
  const [advice, setAdvice] = useState<KoshaAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<AdvisorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
    },
  });

  const onSubmit: SubmitHandler<AdvisorFormValues> = async (data) => {
    setIsLoading(true);
    setAdvice(null);
    
    const result = await getAdviceAction(data);

    setIsLoading(false);

    if ('error' in result) {
      toast({
        title: "Error",
        description: `Failed to get advice: ${result.error}`,
        variant: "destructive",
      });
    } else {
      setAdvice(result);
      trackKoshaAdvisorUsage(); // Track successful usage
      toast({
        title: "Advice Received",
        description: "Your personalized recommendations are ready.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="symptoms"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="symptoms" className="text-lg font-medium text-foreground">Describe your symptoms</FormLabel>
                <FormControl>
                  <Textarea
                    id="symptoms"
                    placeholder="e.g., I've been feeling constantly tired, have trouble sleeping, and experience frequent headaches..."
                    rows={6}
                    className="bg-input/50 focus:bg-background"
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
                Getting Advice...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Holistic Advice
              </>
            )}
          </Button>
        </form>
      </Form>

      {advice && (
        <Card className="mt-8 border-primary shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Sparkles className="mr-2 h-6 w-6 text-accent" />
              Your Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Based on your symptoms, here are some holistic suggestions considering your Pancha Koshas:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
              {advice.recommendations}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
