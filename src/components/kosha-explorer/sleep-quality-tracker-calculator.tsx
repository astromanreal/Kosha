
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; 
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BedDouble, MoonStar, Clock, ListChecks, Edit3, Trash2, AlertCircle, BarChart3, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, differenceInMinutes, parseISO, isValid } from 'date-fns';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const SESSIONS_LS_KEY = 'sleepQualitySessions';

const sleepQualitySchema = z.object({
  sleepDate: z.string().refine((val) => val && isValid(parseISO(val)), { message: "Please select a valid date for when sleep began."}),
  bedTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM (e.g., 22:30)."),
  wakeTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format. Use HH:MM (e.g., 06:30)."),
  quality: z.enum(['poor', 'fair', 'good', 'excellent'], { required_error: "Please rate your sleep quality." }),
  awakenings: z.coerce.number().int().min(0, "Awakenings cannot be negative.").optional().default(0),
  notes: z.string().max(300, "Notes cannot exceed 300 characters.").optional().default(''),
});

type SleepQualityFormValues = z.infer<typeof sleepQualitySchema>;

interface SleepSession extends SleepQualityFormValues {
  id: string;
  loggedAt: string;
  durationInMinutes: number;
  sleepScore: number;
}

const qualityScoreMapping = {
  poor: 25,
  fair: 50,
  good: 75,
  excellent: 100,
};

const sleepHygieneTips = [
  "Stick to a consistent sleep schedule, even on weekends.",
  "Create a relaxing bedtime routine (e.g., reading, warm bath).",
  "Ensure your bedroom is dark, quiet, cool, and comfortable.",
  "Avoid large meals, caffeine, and alcohol close to bedtime.",
  "Limit exposure to blue light from screens in the evening.",
  "Get regular physical activity, but not too close to bedtime.",
  "Avoid long or irregular naps during the day.",
  "If you can't sleep, get out of bed for a while and do something relaxing.",
];


export default function SleepQualityTrackerCalculator() {
  const [sessions, setSessions] = useState<SleepSession[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedSessions = localStorage.getItem(SESSIONS_LS_KEY);
    if (storedSessions) {
      try {
        setSessions(JSON.parse(storedSessions));
      } catch (error) {
        console.error("Failed to parse sleep sessions from localStorage:", error);
        localStorage.removeItem(SESSIONS_LS_KEY); 
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SESSIONS_LS_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const form = useForm<SleepQualityFormValues>({
    resolver: zodResolver(sleepQualitySchema),
    defaultValues: {
      sleepDate: new Date(Date.now() - 24*60*60*1000).toISOString().split('T')[0], 
      bedTime: '22:00',
      wakeTime: '06:00',
      quality: undefined,
      awakenings: 0,
      notes: '',
    },
  });

  const calculateSleepDetails = (data: SleepQualityFormValues): { durationInMinutes: number; sleepScore: number } => {
    const bedDateTimeStr = `${data.sleepDate}T${data.bedTime}:00`;
    let wakeDateTimeStr = `${data.sleepDate}T${data.wakeTime}:00`;

    const bedDateTime = parseISO(bedDateTimeStr);
    let wakeDateTime = parseISO(wakeDateTimeStr);
    
    if (!isValid(bedDateTime) || !isValid(wakeDateTime)) {
        throw new Error("Invalid date or time provided for calculation.");
    }

    if (wakeDateTime < bedDateTime) {
      const wakeDate = new Date(wakeDateTime);
      wakeDate.setDate(wakeDate.getDate() + 1);
      wakeDateTime = wakeDate;
    }

    const durationInMinutes = differenceInMinutes(wakeDateTime, bedDateTime);

    if (durationInMinutes <= 0) {
      throw new Error("Wake time must be after bed time. Calculated duration is not positive.");
    }

    const qualityNumericScore = qualityScoreMapping[data.quality];
    let durationScore = (durationInMinutes / (8 * 60)) * 100; 
    durationScore = Math.min(Math.max(durationScore, 0), 100); 

    let score = (durationScore * 0.6) + (qualityNumericScore * 0.4); 
    
    if (data.awakenings && data.awakenings > 0) {
        score -= Math.min(data.awakenings * 5, 20);
    }
    
    const sleepScore = Math.round(Math.max(score, 0)); 

    return { durationInMinutes, sleepScore };
  };


  const onSubmit: SubmitHandler<SleepQualityFormValues> = (data) => {
    try {
      const { durationInMinutes, sleepScore } = calculateSleepDetails(data);
      
      const newSession: SleepSession = {
        id: new Date().toISOString() + Math.random().toString(36).substr(2, 9), 
        loggedAt: new Date().toISOString(),
        ...data,
        durationInMinutes,
        sleepScore,
      };
      setSessions((prev) => [newSession, ...prev.slice(0, 29)]); 
      form.reset({ 
        ...form.getValues(), 
        sleepDate: new Date(Date.now() - 24*60*60*1000).toISOString().split('T')[0], 
        notes: '', awakenings: 0 
      });
      trackCalculatorUsage('sleep-quality-tracker');
      toast({ title: "Sleep Logged!", description: `Duration: ${Math.floor(durationInMinutes / 60)}h ${durationInMinutes % 60}m. Score: ${sleepScore}/100.`, variant: "default" });
    } catch (error) {
       toast({ title: "Calculation Error", description: error instanceof Error ? error.message : "Failed to calculate sleep details.", variant: "destructive"});
    }
  };

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter(session => session.id !== id));
    toast({ title: "Session Deleted", description: "The sleep log has been removed.", variant: "default" });
  };
  
  const latestSession = sessions.length > 0 ? sessions[0] : null;

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center"><Edit3 className="mr-2 h-5 w-5 text-accent" /> Log New Sleep Session</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="sleepDate" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="sleepDate">Date Sleep Began</FormLabel>
                  <FormControl><Input id="sleepDate" type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="quality" render={({ field }) => (
                <FormItem>
                  <FormLabel>Sleep Quality</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex space-x-2 sm:space-x-3 pt-2">
                      {(['poor', 'fair', 'good', 'excellent'] as const).map(q => (
                        <FormItem key={q} className="flex items-center space-x-1.5 space-y-0">
                          <FormControl><RadioGroupItem value={q} id={`quality-${q}`} /></FormControl>
                          <FormLabel htmlFor={`quality-${q}`} className="font-normal capitalize cursor-pointer">{q}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="bedTime" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bedTime">Bedtime</FormLabel>
                  <FormControl><Input id="bedTime" type="time" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="wakeTime" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="wakeTime">Wake-up Time</FormLabel>
                  <FormControl><Input id="wakeTime" type="time" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="awakenings" render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel htmlFor="awakenings">Number of Awakenings (Optional)</FormLabel>
                  <FormControl><Input id="awakenings" type="number" min="0" placeholder="e.g., 1" {...field} onChange={e => field.onChange(e.target.value === '' ? undefined : +e.target.value)} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="notes" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel htmlFor="notes">Notes / Dream Journal (Optional)</FormLabel>
                  <FormControl><Textarea id="notes" placeholder="e.g., Felt restless, vivid dream about..." rows={2} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <BedDouble className="mr-2 h-4 w-4" /> Log Sleep
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

    {latestSession && (
        <Card className="border-accent shadow-md bg-accent/5">
            <CardHeader>
                <CardTitle className="text-lg text-accent flex items-center"><MoonStar className="mr-2 h-5 w-5" /> Last Night's Sleep Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-3xl font-bold text-foreground">{Math.floor(latestSession.durationInMinutes / 60)}<span className="text-lg">h</span> {latestSession.durationInMinutes % 60}<span className="text-lg">m</span></p>
                    <p className="text-xs text-muted-foreground">Sleep Duration</p>
                </div>
                <div>
                    <p className="text-3xl font-bold text-foreground">{latestSession.sleepScore}<span className="text-lg">/100</span></p>
                    <p className="text-xs text-muted-foreground">Sleep Score</p>
                </div>
                 <div className="col-span-2 text-sm text-muted-foreground">
                    <p>Logged on: {format(parseISO(latestSession.loggedAt), "MMM d, yyyy h:mm a")}</p>
                    <p>For night of: {format(parseISO(latestSession.sleepDate), "MMM d, yyyy")} ({latestSession.bedTime} - {latestSession.wakeTime})</p>
                    <p>Quality: <span className="capitalize font-medium">{latestSession.quality}</span></p>
                    {latestSession.awakenings !== undefined && <p>Awakenings: {latestSession.awakenings}</p>}
                 </div>
            </CardContent>
        </Card>
    )}

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center"><ListChecks className="mr-2 h-5 w-5 text-accent" /> Sleep History (Last 30)</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No sleep sessions logged yet.</p>
          ) : (
            <ScrollArea className="h-[300px] rounded-md border">
              <div className="p-3 space-y-2">
                {sessions.map((session) => (
                  <Card key={session.id} className="bg-card/60 relative group text-xs">
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-foreground">
                                Night of: {format(parseISO(session.sleepDate), "MMM d, yy")} ({session.bedTime} - {session.wakeTime})
                            </p>
                            <p className="text-muted-foreground">
                                Duration: {Math.floor(session.durationInMinutes / 60)}h {session.durationInMinutes % 60}m | Score: {session.sleepScore}/100
                            </p>
                            <p className="text-muted-foreground">Quality: <span className="capitalize">{session.quality}</span> | Awakenings: {session.awakenings ?? 'N/A'}</p>
                        </div>
                        <Button 
                            variant="ghost" size="icon" 
                            className="h-6 w-6 opacity-50 group-hover:opacity-100 text-destructive hover:bg-destructive/10 flex-shrink-0"
                            onClick={() => handleDeleteSession(session.id)}
                            aria-label="Delete session"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {session.notes && (
                        <p className="mt-1.5 text-muted-foreground italic whitespace-pre-wrap text-[11px] border-t pt-1.5">
                          Notes: {session.notes}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-accent" /> Sleep Hygiene Tips</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 pl-2">
                {sleepHygieneTips.map((tip, index) => <li key={index}>{tip}</li>)}
            </ul>
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground italic">Improving sleep quality is a journey. Be patient and consistent with good habits.</p>
        </CardFooter>
      </Card>

    </div>
  );
}
