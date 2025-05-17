
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Zap, Activity, Brain, MoonStar, Utensils, CheckCircle2, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { trackCalculatorUsage } from '@/lib/activity-tracker';


const energyLevels = ["low", "moderate", "high"] as const;
const frequencyOptions = ["rarely", "sometimes", "often"] as const;
const qualityOptions = ["poor", "fair", "good", "excellent"] as const;
const breathOptions = ["shallow_rapid", "mostly_normal", "deep_calm"] as const;
const emotionalStateOptions = ["calm_joyful", "mixed_neutral", "anxious_irritable"] as const;
const focusOptions = ["difficult", "average", "good"] as const;
const dietImpactOptions = ["negatively", "neutral", "positively"] as const;


const energyAssessmentSchema = z.object({
  physicalEnergy: z.enum(energyLevels, { required_error: "Please rate your energy levels." }),
  physicalTension: z.enum(frequencyOptions, { required_error: "Please select tension frequency." }),
  breathQuality: z.enum(breathOptions, { required_error: "Please describe your breath quality." }),
  emotionalStress: z.enum(frequencyOptions, { required_error: "Please select stress frequency." }),
  emotionalState: z.enum(emotionalStateOptions, { required_error: "Please describe your emotional state." }),
  mentalFocus: z.enum(focusOptions, { required_error: "Please rate your focus." }),
  mentalFog: z.enum(frequencyOptions, { required_error: "Please select mental fog frequency." }),
  sleepQuality: z.enum(qualityOptions, { required_error: "Please rate your sleep quality." }),
  dietImpact: z.enum(dietImpactOptions, { required_error: "Please select diet impact." }),
});

type EnergyAssessmentFormValues = z.infer<typeof energyAssessmentSchema>;

interface AssessmentResult {
  summary: string;
  areasToFocus: string[];
}

const questionGroups = [
    {
        title: "Physical Symptoms",
        icon: Activity,
        questions: [
            { name: "physicalEnergy", label: "How would you rate your typical energy levels?", options: energyLevels, optionLabels: { low: "Low", moderate: "Moderate", high: "High" } },
            { name: "physicalTension", label: "How often do you experience physical tension (e.g., tight shoulders, jaw)?", options: frequencyOptions, optionLabels: { rarely: "Rarely", sometimes: "Sometimes", often: "Often" }  },
            { name: "breathQuality", label: "How would you describe your usual breathing pattern?", options: breathOptions, optionLabels: { shallow_rapid: "Shallow & Rapid", mostly_normal: "Mostly Normal", deep_calm: "Deep & Calm" }  },
        ]
    },
    {
        title: "Emotional Patterns",
        icon: Brain,
        questions: [
            { name: "emotionalStress", label: "How often do you generally feel stressed or overwhelmed?", options: frequencyOptions, optionLabels: { rarely: "Rarely", sometimes: "Sometimes", often: "Frequently" } },
            { name: "emotionalState", label: "What best describes your predominant emotional state recently?", options: emotionalStateOptions, optionLabels: { calm_joyful: "Mostly Calm/Joyful", mixed_neutral: "Mixed/Neutral", anxious_irritable: "Mostly Anxious/Irritable" } },
        ]
    },
    {
        title: "Mental Clarity",
        icon: Brain, 
        questions: [
            { name: "mentalFocus", label: "How would you rate your ability to focus and concentrate?", options: focusOptions, optionLabels: { difficult: "Difficult", average: "Average", good: "Good" } },
            { name: "mentalFog", label: "How often do you experience 'mental fog' or difficulty thinking clearly?", options: frequencyOptions, optionLabels: { rarely: "Rarely", sometimes: "Sometimes", often: "Often" } },
        ]
    },
    {
        title: "Lifestyle Habits",
        icon: Utensils, 
        questions: [
            { name: "sleepQuality", label: "How would you rate your overall sleep quality?", options: qualityOptions, optionLabels: { poor: "Poor", fair: "Fair", good: "Good", excellent: "Excellent" } },
            { name: "dietImpact", label: "How do you feel your diet impacts your energy?", options: dietImpactOptions, optionLabels: { negatively: "Negatively", neutral: "Neutral", positively: "Positively" } },
        ]
    }
];


export default function EnergyFlowAssessmentCalculator() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<EnergyAssessmentFormValues>({
    resolver: zodResolver(energyAssessmentSchema),
    defaultValues: {
        physicalEnergy: undefined,
        physicalTension: undefined,
        breathQuality: undefined,
        emotionalStress: undefined,
        emotionalState: undefined,
        mentalFocus: undefined,
        mentalFog: undefined,
        sleepQuality: undefined,
        dietImpact: undefined,
    },
  });

  const onSubmit: SubmitHandler<EnergyAssessmentFormValues> = (data) => {
    setIsLoading(true);
    setResult(null);

    setTimeout(() => {
      let summary = "Thank you for completing the assessment. ";
      const areasToFocus: string[] = [];

      if (data.physicalEnergy === 'low' || data.physicalTension === 'often' || data.breathQuality === 'shallow_rapid') {
        areasToFocus.push("Grounding practices and mindful breathing for physical balance.");
      }
      if (data.emotionalStress === 'often' || data.emotionalState === 'anxious_irritable') {
        areasToFocus.push("Stress-reduction techniques and emotional regulation exercises.");
      }
      if (data.mentalFocus === 'difficult' || data.mentalFog === 'often') {
        areasToFocus.push("Mindfulness meditation and practices to enhance mental clarity.");
      }
      if (data.sleepQuality === 'poor' || data.dietImpact === 'negatively') {
        areasToFocus.push("Improving sleep hygiene and making mindful dietary choices.");
      }

      if (areasToFocus.length === 0) {
        summary += "Your responses suggest a relatively balanced energy flow. Continue nurturing your well-being!";
      } else {
        summary += "Based on your responses, consider focusing on the following areas for enhanced well-being:";
      }

      setResult({ summary, areasToFocus });
      trackCalculatorUsage('energy-flow-assessment');
      setIsLoading(false);
      toast({
        title: "Assessment Complete!",
        description: "Your energy profile summary is ready below.",
      });
       window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {questionGroups.map(group => (
                 <Card key={group.title} className="shadow-sm border-border">
                    <CardHeader>
                        <CardTitle className="text-lg text-foreground flex items-center">
                            <group.icon className="mr-2 h-5 w-5 text-accent" /> {group.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {group.questions.map(q => (
                            <FormField
                                key={q.name}
                                control={form.control}
                                name={q.name as keyof EnergyAssessmentFormValues}
                                render={({ field }) => (
                                <FormItem className="space-y-2 p-3 border rounded-md bg-card/40">
                                    <FormLabel className="text-sm font-medium text-foreground">{q.label}</FormLabel>
                                    <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value || ""}
                                        className="flex flex-col sm:flex-row sm:flex-wrap gap-2 pt-1"
                                    >
                                        {(q.options as readonly string[]).map((opt) => (
                                        <FormItem key={opt} className="flex items-center space-x-2 space-y-0 p-2 rounded hover:bg-muted/50 transition-colors flex-1 min-w-[120px]">
                                            <FormControl>
                                            <RadioGroupItem value={opt} id={`${q.name}-${opt}`} />
                                            </FormControl>
                                            <FormLabel htmlFor={`${q.name}-${opt}`} className="font-normal text-xs text-muted-foreground cursor-pointer">
                                             {q.optionLabels[opt as keyof typeof q.optionLabels]}
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
                 </Card>
            ))}
         
          <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
            ) : (
              <><CheckCircle2 className="mr-2 h-4 w-4" /> Get Energy Profile</>
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <Card className="mt-8 border-primary/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Lightbulb className="mr-3 h-7 w-7 text-accent" />
              Your Energy Profile Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{result.summary}</p>
            {result.areasToFocus.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Potential areas to focus on:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  {result.areasToFocus.map((area, index) => <li key={index}>{area}</li>)}
                </ul>
              </div>
            )}
            <Alert variant="default" className="bg-accent/10 border-accent/20">
                <Zap className="h-5 w-5 text-accent" />
                <AlertTitle className="font-semibold text-accent">Advanced Features Coming Soon</AlertTitle>
                <AlertDescription className="text-accent-foreground/80">
                    Detailed energy maps, chakra-specific insights, and wearable sensor integration are planned for future updates to provide an even more comprehensive assessment.
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
