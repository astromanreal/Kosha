
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, ShieldAlert, Activity, Brain, Moon, FileQuestion, Lightbulb, CheckCircle2, Settings2 } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const stressFrequencyOptions = ["never", "rarely", "sometimes", "often", "always"] as const;
const tensionLevelOptions = ["relaxed", "slightly_tense", "moderately_tense", "very_tense"] as const;
const sleepQualityOptions = ["excellent", "good", "fair", "poor"] as const;

const stressScannerSchema = z.object({
  qOverwhelmed: z.enum(stressFrequencyOptions, { required_error: "Please select an option." }),
  qMuscleTension: z.enum(tensionLevelOptions, { required_error: "Please select an option." }),
  qConcentration: z.enum(stressFrequencyOptions, { required_error: "Please select an option." }),
  qSleepQuality: z.enum(sleepQualityOptions, { required_error: "Please select an option." }),
  qIrritable: z.enum(stressFrequencyOptions, { required_error: "Please select an option." }),
});

type StressScannerFormValues = z.infer<typeof stressScannerSchema>;

interface StressResult {
  score: number;
  level: 'Low' | 'Moderate' | 'High';
  message: string;
  tips: string[];
  color: string;
}

const questions = [
  { id: "qOverwhelmed", text: "How often have you felt overwhelmed in the past week?", options: stressFrequencyOptions, icon: Brain, labels: { never: "Never", rarely: "Rarely", sometimes: "Sometimes", often: "Often", always: "Always" } },
  { id: "qMuscleTension", text: "How would you rate your muscle tension (e.g., shoulders, neck, jaw) recently?", options: tensionLevelOptions, icon: Activity, labels: { relaxed: "Relaxed", slightly_tense: "Slightly Tense", moderately_tense: "Moderately Tense", very_tense: "Very Tense" } },
  { id: "qConcentration", text: "How often have you had trouble concentrating or experienced 'mental fog'?", options: stressFrequencyOptions, icon: Brain, labels: { never: "Never", rarely: "Rarely", sometimes: "Sometimes", often: "Often", always: "Always" } },
  { id: "qSleepQuality", text: "How would you describe your sleep quality recently?", options: sleepQualityOptions, icon: Moon, labels: { excellent: "Excellent", good: "Good", fair: "Fair", poor: "Poor" } },
  { id: "qIrritable", text: "How often have you felt irritable or easily agitated?", options: stressFrequencyOptions, icon: Brain, labels: { never: "Never", rarely: "Rarely", sometimes: "Sometimes", often: "Often", always: "Always" } },
];

export default function StressScannerCalculator() {
  const [result, setResult] = useState<StressResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<StressScannerFormValues>({
    resolver: zodResolver(stressScannerSchema),
    defaultValues: {
      qOverwhelmed: undefined,
      qMuscleTension: undefined,
      qConcentration: undefined,
      qSleepQuality: undefined,
      qIrritable: undefined,
    },
  });

  const calculateScore = (data: StressScannerFormValues): number => {
    let score = 0;
    const scoreMapFrequency = { never: 0, rarely: 1, sometimes: 2, often: 3, always: 4 };
    const scoreMapTension = { relaxed: 0, slightly_tense: 1, moderately_tense: 2, very_tense: 3 };
    const scoreMapSleep = { excellent: 0, good: 1, fair: 2, poor: 3 };

    score += scoreMapFrequency[data.qOverwhelmed];
    score += scoreMapTension[data.qMuscleTension];
    score += scoreMapFrequency[data.qConcentration];
    score += scoreMapSleep[data.qSleepQuality];
    score += scoreMapFrequency[data.qIrritable];
    
    return score;
  };

  const getResultDetails = (score: number): Omit<StressResult, 'score'> => {
    if (score <= 5) { 
      return {
        level: 'Low',
        message: "Your stress levels appear to be low. Keep up your healthy habits!",
        tips: ["Continue practicing mindfulness.", "Ensure adequate rest and good nutrition.", "Engage in activities you enjoy."],
        color: "text-green-600",
      };
    } else if (score <= 11) { 
      return {
        level: 'Moderate',
        message: "You might be experiencing some stress. Consider incorporating relaxation techniques.",
        tips: ["Practice deep breathing exercises daily.", "Take short breaks throughout your day.", "Engage in light physical activity or a hobby you enjoy.", "Ensure you are getting enough quality sleep."],
        color: "text-yellow-600",
      };
    } else {
      return {
        level: 'High',
        message: "It seems you're under significant stress. Prioritize self-care and consider seeking support.",
        tips: ["Practice deep breathing or meditation regularly.", "Incorporate regular physical activity into your routine.", "Talk to a trusted friend, family member, or professional.", "Prioritize good sleep hygiene and adequate rest.", "Consider reducing commitments if possible."],
        color: "text-red-600",
      };
    }
  };

  const onSubmit: SubmitHandler<StressScannerFormValues> = (data) => {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      const score = calculateScore(data);
      const resultDetails = getResultDetails(score);
      setResult({ score, ...resultDetails });
      trackCalculatorUsage('stress-scanner');
      setIsLoading(false);
      toast({
        title: "Stress Scan Complete!",
        description: `Your estimated stress level is ${resultDetails.level}.`,
      });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center">
                <ShieldAlert className="mr-2 h-5 w-5 text-accent" /> Stress Self-Assessment
              </CardTitle>
              <CardDescription>
                Answer the following questions to get an estimate of your current stress level.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((q, index) => (
                <FormField
                  key={q.id}
                  control={form.control}
                  name={q.id as keyof StressScannerFormValues}
                  render={({ field }) => (
                    <FormItem className="space-y-2 p-4 border rounded-lg bg-card/40 shadow-sm">
                      <FormLabel className="text-md font-semibold text-foreground flex items-center">
                        <q.icon className="mr-2 h-5 w-5 text-primary" /> {index + 1}. {q.text}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          className="flex flex-col space-y-1 pt-1"
                        >
                          {(q.options as readonly string[]).map((opt) => (
                            <FormItem key={opt} className="flex items-center space-x-3 space-y-0 p-2 rounded hover:bg-muted/50 transition-colors">
                              <FormControl>
                                <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                              </FormControl>
                              <FormLabel htmlFor={`${q.id}-${opt}`} className="font-normal text-sm text-muted-foreground cursor-pointer">
                                {q.labels[opt as keyof typeof q.labels]}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                ) : (
                  <><CheckCircle2 className="mr-2 h-4 w-4" /> Get Stress Insights</>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 border-primary/50 shadow-lg">
          <CardHeader>
            <CardTitle className={`text-2xl ${result.color} flex items-center`}>
              <ShieldAlert className="mr-3 h-7 w-7" />
              Your Stress Level: {result.level}
            </CardTitle>
            <CardDescription>
              {result.message} (Score: {result.score})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Suggestions for managing stress:</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {result.tips.map((tip, index) => <li key={index}>{tip}</li>)}
              </ul>
            </div>
            <Alert variant="default" className="bg-accent/10 border-accent/20">
                <Settings2 className="h-5 w-5 text-accent" />
                <AlertTitle className="font-semibold text-accent">Advanced Features Coming Soon</AlertTitle>
                <AlertDescription className="text-accent-foreground/80">
                    AI-powered voice and facial cue analysis for stress detection are planned for future updates to provide an even more comprehensive assessment.
                </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
             <Button variant="outline" onClick={() => { setResult(null); form.reset(); }} className="w-full">
              Retake Assessment
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
