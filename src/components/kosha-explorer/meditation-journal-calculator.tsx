
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookText, Edit3, ListChecks, Palette, PlayCircle, PlusCircle, RotateCcw, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const MEDITATION_JOURNAL_LS_KEY = 'meditationJournalEntries';

const emotions = [
  { value: 'anxiety', label: 'Anxiety', meditationTitle: 'Calming Breath Meditation' },
  { value: 'sadness', label: 'Sadness', meditationTitle: 'Heart-Opening Compassion Meditation' },
  { value: 'joy', label: 'Joy', meditationTitle: 'Gratitude & Presence Meditation' },
  { value: 'confusion', label: 'Confusion', meditationTitle: 'Clarity & Focus Meditation' },
  { value: 'restlessness', label: 'Restlessness', meditationTitle: 'Grounding Body Scan' },
  { value: 'neutral', label: 'Neutral/Observing', meditationTitle: 'Mindful Awareness Meditation' },
];

const journalSchema = z.object({
  selectedEmotion: z.string().min(1, "Please select an emotion."),
  reflectionText: z.string().min(10, "Reflection should be at least 10 characters.").max(2000, "Reflection is too long (max 2000 characters)."),
});

type JournalFormValues = z.infer<typeof journalSchema>;

interface JournalEntry {
  id: string;
  emotionSelected: string;
  meditationTitle: string;
  reflectionText: string;
  loggedAt: string;
}

export default function MeditationJournalCalculator() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isMeditating, setIsMeditating] = useState(false); 
  const [currentMeditation, setCurrentMeditation] = useState<{ title: string; emotion: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedEntries = localStorage.getItem(MEDITATION_JOURNAL_LS_KEY);
    if (storedEntries) {
      try {
        setJournalEntries(JSON.parse(storedEntries));
      } catch (error) {
        console.error("Failed to parse meditation journal entries from localStorage:", error);
        localStorage.removeItem(MEDITATION_JOURNAL_LS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(MEDITATION_JOURNAL_LS_KEY, JSON.stringify(journalEntries));
  }, [journalEntries]);

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      selectedEmotion: '',
      reflectionText: '',
    },
  });

  const handleStartMeditation = () => {
    const selectedEmotionValue = form.getValues("selectedEmotion");
    const emotionData = emotions.find(e => e.value === selectedEmotionValue);
    if (emotionData) {
      setCurrentMeditation({ title: emotionData.meditationTitle, emotion: emotionData.label });
      setIsMeditating(true); 
      toast({ title: "Meditation Started", description: `Focusing on ${emotionData.label} with ${emotionData.meditationTitle}. (This is a placeholder for a real meditation session)` });
    } else {
      toast({ title: "Select Emotion", description: "Please select an emotion before starting meditation.", variant: "destructive" });
    }
  };
  
  const handleSaveReflection: SubmitHandler<JournalFormValues> = (data) => {
    if (!currentMeditation) {
        toast({ title: "Start Meditation First", description: "Please 'start' a meditation session before saving a reflection.", variant: "destructive" });
        return;
    }
    const newEntry: JournalEntry = {
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      emotionSelected: currentMeditation.emotion,
      meditationTitle: currentMeditation.title,
      reflectionText: data.reflectionText,
      loggedAt: new Date().toISOString(),
    };
    setJournalEntries((prev) => [newEntry, ...prev.slice(0, 99)]); 
    form.reset({selectedEmotion: data.selectedEmotion, reflectionText: ''}); 
    setIsMeditating(false); 
    setCurrentMeditation(null);
    trackCalculatorUsage('meditation-journal');
    toast({ title: "Reflection Saved!", description: "Your meditation journal entry has been recorded.", variant: "default" });
  };

  const handleDeleteEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter(entry => entry.id !== id));
    toast({ title: "Entry Deleted", description: "The journal entry has been removed.", variant: "default" });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveReflection)} className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center">
                <Palette className="mr-2 h-5 w-5 text-accent" /> Select Your Current Emotional State
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="selectedEmotion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="selectedEmotion">How are you feeling right now?</FormLabel>
                    <Select onValueChange={(value) => {field.onChange(value); setIsMeditating(false); setCurrentMeditation(null);}} value={field.value} disabled={isMeditating}>
                      <FormControl>
                        <SelectTrigger id="selectedEmotion">
                          <SelectValue placeholder="Select an emotion to guide your meditation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {emotions.map(emotion => (
                          <SelectItem key={emotion.value} value={emotion.value}>
                            {emotion.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={handleStartMeditation} className="w-full" disabled={!form.watch("selectedEmotion") || isMeditating}>
                <PlayCircle className="mr-2 h-4 w-4" /> Start Guided Meditation (Placeholder)
              </Button>
            </CardContent>
          </Card>

          {isMeditating && currentMeditation && (
             <Card className="border-primary/50 shadow-md bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-md text-primary">Meditating on: {currentMeditation.emotion}</CardTitle>
                    <CardDescription>Practice: {currentMeditation.title}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Imagine a soothing voice guiding you... (This is a placeholder. Real meditation content would play here). Once done, write your reflections below.</p>
                </CardContent>
             </Card>
          )}

          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center">
                <Edit3 className="mr-2 h-5 w-5 text-accent" /> Post-Meditation Reflection
              </CardTitle>
              <CardDescription>
                After your meditation, journal your thoughts, feelings, or insights.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField control={form.control} name="reflectionText" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="reflectionText" className="sr-only">Reflection</FormLabel>
                  <FormControl>
                    <Textarea 
                      id="reflectionText" 
                      placeholder="e.g., During the meditation, I noticed..." 
                      rows={5} 
                      {...field} 
                      disabled={!isMeditating && !currentMeditation} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={!currentMeditation || !form.watch("reflectionText")}>
                <BookText className="mr-2 h-4 w-4" /> Save Reflection
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center">
            <ListChecks className="mr-2 h-5 w-5 text-accent" /> Journal History (Last 100)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {journalEntries.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No journal entries yet. Complete a meditation and reflection to see your history.</p>
          ) : (
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-3 space-y-2">
                {journalEntries.map((entry) => (
                  <Card key={entry.id} className="bg-card/60 relative group text-xs">
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start mb-1.5">
                        <div>
                            <p className="font-semibold text-foreground text-sm">
                                Emotion: {entry.emotionSelected}
                            </p>
                            <p className="text-muted-foreground/90 text-[11px]">
                                Meditation: <span className="italic">{entry.meditationTitle}</span>
                            </p>
                            <p className="text-muted-foreground/70 text-[10px]">
                                Logged: {format(parseISO(entry.loggedAt), "MMM d, yyyy h:mm a")}
                            </p>
                        </div>
                        <Button 
                          variant="ghost" size="icon" 
                          className="h-6 w-6 opacity-50 group-hover:opacity-100 text-destructive hover:bg-destructive/10 flex-shrink-0"
                          onClick={() => handleDeleteEntry(entry.id)}
                          aria-label="Delete entry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <p className="text-foreground text-sm whitespace-pre-wrap border-t border-border pt-1.5">
                        {entry.reflectionText}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
         {journalEntries.length > 0 && (
             <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Total entries: {journalEntries.length}. Keep reflecting and growing!
                </p>
            </CardFooter>
          )}
      </Card>
    </div>
  );
}
