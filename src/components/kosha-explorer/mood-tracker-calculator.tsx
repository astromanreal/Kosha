
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SmilePlus, Edit3, Trash2, ListChecks, Lightbulb, MessageSquareQuote, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const MOOD_LOGS_LS_KEY = 'moodTrackerLogs';

const moodOptions = [
  { value: 'happy', label: 'Happy', emoji: '😊' },
  { value: 'sad', label: 'Sad', emoji: '😢' },
  { value: 'anxious', label: 'Anxious', emoji: '😟' },
  { value: 'calm', label: 'Calm', emoji: '😌' },
  { value: 'angry', label: 'Angry', emoji: '😠' },
  { value: 'excited', label: 'Excited', emoji: '🎉' },
  { value: 'tired', label: 'Tired', emoji: '😴' },
  { value: 'neutral', label: 'Neutral', emoji: '😐' },
];

const moodLogSchema = z.object({
  mood: z.string().min(1, "Please select a mood."),
  journal: z.string().max(500, "Journal entry cannot exceed 500 characters.").optional().default(''),
});

type MoodLogFormValues = z.infer<typeof moodLogSchema>;

interface LoggedMood {
  id: string;
  moodValue: string; 
  moodEmoji: string;
  moodLabel: string;
  journal: string;
  loggedAt: string; 
}

const journalingPrompts = [
  "What's one thing that made you smile today?",
  "What challenged you emotionally today, and how did you handle it?",
  "Describe a moment today when you felt truly present.",
  "What are you looking forward to tomorrow?",
  "What small act of self-care can you do for yourself right now?",
  "What thought or feeling is most prominent for you at this moment?",
  "Is there anything you need to let go of today?"
];

export default function MoodTrackerCalculator() {
  const [loggedMoods, setLoggedMoods] = useState<LoggedMood[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const { toast } = useToast();

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * journalingPrompts.length);
    setCurrentPrompt(journalingPrompts[randomIndex]);
  };

  useEffect(() => {
    getRandomPrompt(); 
    const storedLogs = localStorage.getItem(MOOD_LOGS_LS_KEY);
    if (storedLogs) {
      try {
        setLoggedMoods(JSON.parse(storedLogs));
      } catch (error) {
        console.error("Failed to parse mood logs from localStorage:", error);
        localStorage.removeItem(MOOD_LOGS_LS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(MOOD_LOGS_LS_KEY, JSON.stringify(loggedMoods));
  }, [loggedMoods]);

  const form = useForm<MoodLogFormValues>({
    resolver: zodResolver(moodLogSchema),
    defaultValues: {
      mood: '',
      journal: '',
    },
  });

  const onSubmit: SubmitHandler<MoodLogFormValues> = (data) => {
    const selectedMoodOption = moodOptions.find(opt => opt.value === data.mood);
    if (!selectedMoodOption) {
        toast({ title: "Error", description: "Invalid mood selected.", variant: "destructive"});
        return;
    }

    const newLog: LoggedMood = {
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      moodValue: selectedMoodOption.value,
      moodEmoji: selectedMoodOption.emoji,
      moodLabel: selectedMoodOption.label,
      journal: data.journal,
      loggedAt: new Date().toISOString(),
    };
    setLoggedMoods((prev) => [newLog, ...prev.slice(0, 49)]); 
    form.reset();
    getRandomPrompt(); 
    trackCalculatorUsage('mood-tracker');
    toast({ title: "Mood Logged!", description: `Feeling ${selectedMoodOption.label.toLowerCase()} today.`, variant: "default" });
  };

  const handleDeleteLog = (id: string) => {
    setLoggedMoods((prev) => prev.filter(log => log.id !== id));
    toast({ title: "Log Deleted", description: "The mood log has been removed.", variant: "default" });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center">
                <Edit3 className="mr-2 h-5 w-5 text-accent" /> Log Your Current Mood
              </CardTitle>
              <CardDescription>
                Select how you're feeling and optionally add a journal entry.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-medium">How are you feeling?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1"
                      >
                        {moodOptions.map((option) => (
                          <FormItem key={option.value} className="flex-1">
                            <FormControl>
                               <RadioGroupItem value={option.value} id={`mood-${option.value}`} className="sr-only peer" />
                            </FormControl>
                            <FormLabel 
                                htmlFor={`mood-${option.value}`} 
                                className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
                            >
                                <span className="text-2xl mb-1">{option.emoji}</span>
                                <span className="text-xs font-normal">{option.label}</span>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="journal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="journal" className="text-md font-medium">Journal Entry (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        id="journal"
                        placeholder="Reflect on your mood, thoughts, or events..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <SmilePlus className="mr-2 h-4 w-4" /> Log Mood
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {currentPrompt && (
          <Card className="border-dashed border-accent shadow-sm bg-accent/10">
            <CardHeader>
                 <CardTitle className="text-md text-accent flex items-center">
                    <MessageSquareQuote className="mr-2 h-5 w-5"/> Journaling Prompt
                 </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-accent-foreground italic">"{currentPrompt}"</p>
            </CardContent>
            <CardFooter>
                 <Button variant="ghost" size="sm" onClick={getRandomPrompt} className="text-accent hover:text-accent/80">
                    <RefreshCw className="mr-2 h-3 w-3"/> New Prompt
                </Button>
            </CardFooter>
          </Card>
      )}

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center">
            <ListChecks className="mr-2 h-5 w-5 text-accent" /> Mood History (Last 50)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loggedMoods.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No moods logged yet. Start tracking how you feel!</p>
          ) : (
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-3 space-y-2">
                {loggedMoods.map((log) => (
                  <Card key={log.id} className="bg-card/60 relative group text-xs">
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                           <span className="text-2xl mr-2">{log.moodEmoji}</span>
                           <div>
                                <p className="font-semibold text-foreground text-sm">{log.moodLabel}</p>
                                <p className="text-muted-foreground/80 text-[10px]">
                                    Logged: {format(parseISO(log.loggedAt), "MMM d, yyyy h:mm a")}
                                </p>
                           </div>
                        </div>
                        <Button
                          variant="ghost" size="icon"
                          className="h-6 w-6 opacity-50 group-hover:opacity-100 text-destructive hover:bg-destructive/10 flex-shrink-0"
                          onClick={() => handleDeleteLog(log.id)}
                          aria-label="Delete log"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {log.journal && (
                        <p className="mt-1.5 text-muted-foreground italic whitespace-pre-wrap text-[11px] border-t pt-1.5">
                          {log.journal}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
        {loggedMoods.length > 0 && (
             <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Total logs: {loggedMoods.length}. Keep observing your inner landscape!
                </p>
            </CardFooter>
          )}
      </Card>
    </div>
  );
}
