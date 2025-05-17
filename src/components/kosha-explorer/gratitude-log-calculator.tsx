
'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Gift, ListChecks, PlusCircle, Trash2, NotebookText, Smile, BarChart3, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const GRATITUDE_LOGS_LS_KEY = 'gratitudeLogEntries';

const gratitudeLogSchema = z.object({
  entryText: z.string().min(5, "Gratitude entry must be at least 5 characters.").max(500, "Entry is too long (max 500 characters)."),
});

type GratitudeLogFormValues = z.infer<typeof gratitudeLogSchema>;

interface LoggedGratitude extends GratitudeLogFormValues {
  id: string;
  loggedAt: string;
}

export default function GratitudeLogCalculator() {
  const [gratitudeEntries, setGratitudeEntries] = useState<LoggedGratitude[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedEntries = localStorage.getItem(GRATITUDE_LOGS_LS_KEY);
    if (storedEntries) {
      try {
        setGratitudeEntries(JSON.parse(storedEntries));
      } catch (error) {
        console.error("Failed to parse gratitude entries from localStorage:", error);
        localStorage.removeItem(GRATITUDE_LOGS_LS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(GRATITUDE_LOGS_LS_KEY, JSON.stringify(gratitudeEntries));
  }, [gratitudeEntries]);

  const form = useForm<GratitudeLogFormValues>({
    resolver: zodResolver(gratitudeLogSchema),
    defaultValues: {
      entryText: '',
    },
  });

  const onSubmit: SubmitHandler<GratitudeLogFormValues> = (data) => {
    const newEntry: LoggedGratitude = {
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      loggedAt: new Date().toISOString(),
      ...data,
    };
    setGratitudeEntries((prev) => [newEntry, ...prev.slice(0, 99)]); 
    form.reset();
    trackCalculatorUsage('gratitude-log');
    toast({ title: "Gratitude Logged!", description: "Your moment of gratitude has been recorded.", variant: "default" });
  };

  const handleDeleteEntry = (id: string) => {
    setGratitudeEntries((prev) => prev.filter(entry => entry.id !== id));
    toast({ title: "Entry Deleted", description: "The gratitude log has been removed.", variant: "default" });
  };

  const whyImportantPoints = [
    "Shifts your focus from scarcity to abundance.",
    "Cultivates joy and peace from within.",
    "Deepens your connection to the Anandamaya Kosha, fostering inner bliss."
  ];

  const howItWorksSteps = [
    { title: "Log Gratitude", description: "At any time during the day, write down something you're grateful for.", icon: NotebookText },
    { title: "Reflect on the Positives", description: "Use reminders or prompts to inspire gratitude moments.", icon: Smile },
    { title: "Track Growth", description: "Look back at entries to recognize patterns of joy.", icon: BarChart3 },
    { title: "Feel the Shift", description: "Regular practice increases positive emotions and bliss.", icon: Sparkles }
  ];

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center">
                <PlusCircle className="mr-2 h-5 w-5 text-accent" /> Add Gratitude Entry
              </CardTitle>
              <CardDescription>
                Take a moment to reflect on something you are grateful for today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField control={form.control} name="entryText" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="entryText" className="sr-only">Gratitude Entry</FormLabel>
                  <FormControl>
                    <Textarea 
                      id="entryText" 
                      placeholder="e.g., I am grateful for the warm sunshine today..." 
                      rows={4} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Gift className="mr-2 h-4 w-4" /> Log Gratitude
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center">
            <ListChecks className="mr-2 h-5 w-5 text-accent" /> Gratitude History (Last 100)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {gratitudeEntries.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No gratitude entries logged yet. Start your log today!</p>
          ) : (
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-3 space-y-2">
                {gratitudeEntries.map((entry) => (
                  <Card key={entry.id} className="bg-card/60 relative group text-xs">
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start">
                        <p className="text-muted-foreground italic whitespace-pre-wrap text-sm flex-grow pr-8">
                          {entry.entryText}
                        </p>
                        <Button 
                          variant="ghost" size="icon" 
                          className="h-6 w-6 opacity-50 group-hover:opacity-100 text-destructive hover:bg-destructive/10 flex-shrink-0"
                          onClick={() => handleDeleteEntry(entry.id)}
                          aria-label="Delete entry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                       <p className="mt-1.5 text-muted-foreground/70 text-[10px] border-t pt-1.5">
                          Logged: {format(parseISO(entry.loggedAt), "MMM d, yyyy h:mm a")}
                        </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
        {gratitudeEntries.length > 0 && (
             <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Total entries: {gratitudeEntries.length}.
                </p>
            </CardFooter>
          )}
      </Card>
    </div>
  );
}
