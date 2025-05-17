
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dumbbell, ListChecks, Edit3, Trash2, BarChart3, PlusCircle, Settings2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO, isValid } from 'date-fns';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { trackCalculatorUsage } from '@/lib/activity-tracker';


const EXERCISE_SESSIONS_LS_KEY = 'exerciseLogSessions';
const exerciseIntensityOptions = ["low", "moderate", "high"] as const;
type ExerciseIntensity = typeof exerciseIntensityOptions[number];

const exerciseLogSchema = z.object({
  exerciseDate: z.string().refine((val) => val && isValid(parseISO(val)), {
    message: "Please select a valid date for the exercise.",
  }),
  exerciseType: z.string().min(3, "Exercise type must be at least 3 characters.").max(100, "Exercise type is too long."),
  duration: z.coerce.number().int().positive("Duration must be a positive number of minutes.").min(1, "Minimum duration is 1 minute.").max(360, "Maximum duration is 360 minutes (6 hours)."),
  intensity: z.enum(exerciseIntensityOptions, { required_error: "Please select an intensity level." }),
  notes: z.string().max(500, "Notes cannot exceed 500 characters.").optional().default(''),
});

type ExerciseLogFormValues = z.infer<typeof exerciseLogSchema>;

interface LoggedExercise extends ExerciseLogFormValues {
  id: string;
  loggedAt: string;
}

export default function ExerciseLogSuggestor() {
  const [loggedExercises, setLoggedExercises] = useState<LoggedExercise[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedSessions = localStorage.getItem(EXERCISE_SESSIONS_LS_KEY);
    if (storedSessions) {
      try {
        setLoggedExercises(JSON.parse(storedSessions));
      } catch (error) {
        console.error("Failed to parse exercise sessions from localStorage:", error);
        localStorage.removeItem(EXERCISE_SESSIONS_LS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(EXERCISE_SESSIONS_LS_KEY, JSON.stringify(loggedExercises));
  }, [loggedExercises]);

  const form = useForm<ExerciseLogFormValues>({
    resolver: zodResolver(exerciseLogSchema),
    defaultValues: {
      exerciseDate: new Date().toISOString().split('T')[0],
      exerciseType: '',
      duration: undefined, 
      intensity: undefined,
      notes: '',
    },
  });

  const onSubmit: SubmitHandler<ExerciseLogFormValues> = (data) => {
    const newExercise: LoggedExercise = {
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      loggedAt: new Date().toISOString(),
      ...data,
    };
    setLoggedExercises((prev) => [newExercise, ...prev.slice(0, 49)]); 
    form.reset({
      exerciseDate: new Date().toISOString().split('T')[0],
      exerciseType: '',
      duration: undefined,
      intensity: undefined,
      notes: '',
    });
    trackCalculatorUsage('exercise-log-suggestor');
    toast({ title: "Exercise Logged!", description: `${data.exerciseType} for ${data.duration} minutes added.`, variant: "default" });
  };

  const handleDeleteExercise = (id: string) => {
    setLoggedExercises((prev) => prev.filter(ex => ex.id !== id));
    toast({ title: "Exercise Deleted", description: "The exercise log has been removed.", variant: "default" });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center"><PlusCircle className="mr-2 h-5 w-5 text-accent" /> Log New Exercise</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="exerciseDate" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="exerciseDate">Date</FormLabel>
                  <FormControl><Input id="exerciseDate" type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="exerciseType" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="exerciseType">Type of Exercise</FormLabel>
                  <FormControl><Input id="exerciseType" placeholder="e.g., Running, Yoga, Weights" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="duration" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="duration">Duration (minutes)</FormLabel>
                  <FormControl><Input id="duration" type="number" placeholder="e.g., 30" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="intensity" render={({ field }) => (
                <FormItem>
                  <FormLabel>Intensity</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select intensity level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {exerciseIntensityOptions.map(level => (
                        <SelectItem key={level} value={level} className="capitalize">
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel htmlFor="notes">Notes (Optional)</FormLabel>
                  <FormControl><Textarea id="notes" placeholder="e.g., Felt strong, specific achievements, focus areas..." rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Dumbbell className="mr-2 h-4 w-4" /> Log Exercise
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center"><ListChecks className="mr-2 h-5 w-5 text-accent" /> Exercise History (Last 50)</CardTitle>
        </CardHeader>
        <CardContent>
          {loggedExercises.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No exercises logged yet. Start tracking your activity!</p>
          ) : (
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-3 space-y-2">
                {loggedExercises.map((ex) => (
                  <Card key={ex.id} className="bg-card/60 relative group text-xs">
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {ex.exerciseType} - <span className="capitalize">{ex.intensity}</span>
                          </p>
                          <p className="text-muted-foreground">
                            {format(parseISO(ex.exerciseDate), "MMM d, yyyy")} | {ex.duration} mins
                          </p>
                        </div>
                        <Button 
                          variant="ghost" size="icon" 
                          className="h-6 w-6 opacity-50 group-hover:opacity-100 text-destructive hover:bg-destructive/10 flex-shrink-0"
                          onClick={() => handleDeleteExercise(ex.id)}
                          aria-label="Delete exercise"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {ex.notes && (
                        <p className="mt-1.5 text-muted-foreground italic whitespace-pre-wrap text-[11px] border-t pt-1.5">
                          Notes: {ex.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
        {loggedExercises.length > 0 && (
             <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Total exercises logged: {loggedExercises.length}.
                </p>
            </CardFooter>
          )}
      </Card>
      
      <Alert variant="default" className="bg-accent/10 border-accent/30">
        <Settings2 className="h-5 w-5 text-accent" />
        <AlertTitle className="font-semibold text-accent">Exercise Suggestor - Coming Soon!</AlertTitle>
        <AlertDescription className="text-accent-foreground/80">
            Personalized exercise suggestions based on your logged activities, fitness goals, and Ayurvedic body type (Prakriti) will be available in a future update. Stay tuned!
        </AlertDescription>
      </Alert>
    </div>
  );
}
