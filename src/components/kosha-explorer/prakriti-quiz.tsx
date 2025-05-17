
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, CheckCircle2, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { trackPrakritiQuizCompletion, trackCalculatorUsage } from '@/lib/activity-tracker';

const quizQuestions = [
  {
    id: 'q1',
    text: 'What best describes your physical build or body frame?',
    options: [
      { value: 'vata', label: 'Thin, light frame, find it hard to gain weight' },
      { value: 'pitta', label: 'Medium, athletic build, gain/lose weight moderately easily' },
      { value: 'kapha', label: 'Solid, larger frame, tend to gain weight easily' },
    ],
  },
  {
    id: 'q2',
    text: 'How is your typical appetite and digestion?',
    options: [
      { value: 'vata', label: 'Irregular appetite, variable digestion, prone to gas/bloating' },
      { value: 'pitta', label: 'Strong appetite, efficient digestion, can get irritable if hungry' },
      { value: 'kapha', label: 'Moderate but steady appetite, slower digestion, can feel heavy after meals' },
    ],
  },
  {
    id: 'q3',
    text: 'Which best describes your mental nature and activity?',
    options: [
      { value: 'vata', label: 'Quick, active mind, learns fast but also forgets fast, prone to worry' },
      { value: 'pitta', label: 'Sharp, focused intellect, good concentration, can be critical or impatient' },
      { value: 'kapha', label: 'Calm, steady mind, good long-term memory, can be slow to grasp but retains well' },
    ],
  },
  {
    id: 'q4',
    text: 'What are your typical sleep patterns like?',
    options: [
      { value: 'vata', label: 'Light, interrupted sleep, often less than 6-7 hours' },
      { value: 'pitta', label: 'Moderate, sound sleep, usually 7-8 hours, can wake feeling hot' },
      { value: 'kapha', label: 'Heavy, long sleep, often more than 8 hours, can feel groggy on waking' },
    ],
  },
];

const schemaObject = quizQuestions.reduce((acc, q) => {
  acc[q.id] = z.enum(['vata', 'pitta', 'kapha'], { required_error: `Please select an option for this question.` });
  return acc;
}, {} as Record<string, z.ZodEnum<['vata', 'pitta', 'kapha']>>);

const prakritiQuizSchema = z.object(schemaObject);

type PrakritiQuizFormValues = z.infer<typeof prakritiQuizSchema>;

interface QuizResult {
  dominantDosha: 'Vata' | 'Pitta' | 'Kapha' | 'Balanced' | 'Mixed' | string; // Allow string for Vata-Pitta etc.
  vataScore: number;
  pittaScore: number;
  kaphaScore: number;
  message: string;
}

export default function PrakritiQuiz() {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PrakritiQuizFormValues>({
    resolver: zodResolver(prakritiQuizSchema),
    defaultValues: quizQuestions.reduce((acc, q) => {
      acc[q.id] = undefined; 
      return acc;
    }, {} as PrakritiQuizFormValues),
  });

  const onSubmit: SubmitHandler<PrakritiQuizFormValues> = (data) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const scores = { vata: 0, pitta: 0, kapha: 0 };
      Object.values(data).forEach(answer => {
        if (answer) scores[answer]++;
      });

      let dominantDosha: QuizResult['dominantDosha'] = 'Mixed';
      let message = "Your constitution appears to be a mix of doshas. Personalized recommendations would be beneficial.";

      const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
      const dominantCount = Object.values(scores).filter(score => score === maxScore).length;
      
      if (dominantCount === 1) {
        if (scores.vata === maxScore) dominantDosha = 'Vata';
        else if (scores.pitta === maxScore) dominantDosha = 'Pitta';
        else if (scores.kapha === maxScore) dominantDosha = 'Kapha';
        message = `Your responses suggest a dominant ${dominantDosha} constitution. Explore foods and lifestyle practices that balance ${dominantDosha}.`;
      } else if (dominantCount === 2) {
        let primary = '', secondary = '';
        if(scores.vata === maxScore) primary = 'Vata';
        if(scores.pitta === maxScore) { if(primary) secondary = 'Pitta'; else primary = 'Pitta';}
        if(scores.kapha === maxScore) { if(primary) secondary = 'Kapha'; else primary = 'Kapha';}
        dominantDosha = `${primary}-${secondary}`; 
        message = `Your constitution shows strong characteristics of ${primary} and ${secondary}. Understanding this unique blend is key.`;
      } else if (scores.vata === scores.pitta && scores.pitta === scores.kapha && scores.vata !==0) {
        dominantDosha = 'Balanced';
        message = "Your responses suggest a balanced (Tridoshic) constitution, which is rare and indicates good overall harmony."
      }
      
      setQuizResult({
        dominantDosha,
        vataScore: scores.vata,
        pittaScore: scores.pitta,
        kaphaScore: scores.kapha,
        message,
      });
      trackPrakritiQuizCompletion();
      trackCalculatorUsage('nutrition-tracker-ayurveda');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {quizQuestions.map((question, index) => (
            <FormField
              key={question.id}
              control={form.control}
              name={question.id as keyof PrakritiQuizFormValues}
              render={({ field }) => (
                <FormItem className="space-y-3 p-4 border rounded-lg bg-card/30 shadow-sm">
                  <FormLabel className="text-md font-semibold text-foreground">
                    {index + 1}. {question.text}
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ""} 
                      className="flex flex-col space-y-2"
                    >
                      {question.options.map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-y-0 p-2 rounded hover:bg-muted/50 transition-colors">
                          <FormControl>
                            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          </FormControl>
                          <FormLabel htmlFor={`${question.id}-${option.value}`} className="font-normal text-muted-foreground cursor-pointer">
                            {option.label}
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
          <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              'Determine My Prakriti Insights'
            )}
          </Button>
        </form>
      </Form>

      {quizResult && (
        <Card className="mt-8 border-primary/50 shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <CheckCircle2 className="mr-2 h-7 w-7 text-accent" />
              Your Prakriti Insights
            </CardTitle>
            <CardDescription>
              Based on your responses, here's an initial understanding of your doshic constitution.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="default" className="bg-primary/10 border-primary/30">
              <Lightbulb className="h-5 w-5 text-primary" />
              <AlertTitle className="font-semibold text-primary">Dominant Constitution: {quizResult.dominantDosha}</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                {quizResult.message}
              </AlertDescription>
            </Alert>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Score Breakdown:</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Vata tendencies: {quizResult.vataScore}</li>
                <li>Pitta tendencies: {quizResult.pittaScore}</li>
                <li>Kapha tendencies: {quizResult.kaphaScore}</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Note: This is a simplified quiz for initial insight. A full Ayurvedic consultation provides a more comprehensive Prakriti assessment. These results can guide you towards general food and lifestyle choices suitable for your dominant dosha(s).
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => { setQuizResult(null); form.reset(); }} className="w-full">
              Retake Quiz
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
