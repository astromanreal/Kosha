
'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PenLine, ListChecks, PlusCircle, Trash2, Edit3, RotateCcw, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const REFLECTIONS_LS_KEY = 'selfInquiryReflections';
const CURRENT_PROMPT_INDEX_LS_KEY = 'selfInquiryCurrentPromptIndex';

const prompts = [
  "Who am I beyond my roles and labels?",
  "What am I truly seeking today?",
  "What belief is shaping my decision right now?",
  "Am I acting from habit or awareness?",
  "What does my intuition whisper to me when I am still?",
  "If fear were not a factor, what would I do differently?",
  "What small act of kindness can I offer today?",
  "What am I grateful for in this present moment, no matter how small?",
  "What part of myself am I neglecting, and how can I nurture it?",
  "What does 'living authentically' mean to me right now?"
];

const reflectionSchema = z.object({
  reflectionText: z.string().min(10, "Reflection should be at least 10 characters.").max(2000, "Reflection is too long (max 2000 characters)."),
});

type ReflectionFormValues = z.infer<typeof reflectionSchema>;

interface LoggedReflection {
  id: string;
  prompt: string;
  reflectionText: string;
  loggedAt: string;
}

export default function SelfInquiryPromptsCalculator() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState<number>(0);
  const [reflections, setReflections] = useState<LoggedReflection[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedIndex = localStorage.getItem(CURRENT_PROMPT_INDEX_LS_KEY);
    if (storedIndex) {
      setCurrentPromptIndex(parseInt(storedIndex, 10) % prompts.length);
    } else {
        setCurrentPromptIndex(Math.floor(Math.random() * prompts.length));
    }

    const storedReflections = localStorage.getItem(REFLECTIONS_LS_KEY);
    if (storedReflections) {
      try {
        setReflections(JSON.parse(storedReflections));
      } catch (error) {
        console.error("Failed to parse reflections from localStorage:", error);
        localStorage.removeItem(REFLECTIONS_LS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CURRENT_PROMPT_INDEX_LS_KEY, String(currentPromptIndex));
  }, [currentPromptIndex]);

  useEffect(() => {
    localStorage.setItem(REFLECTIONS_LS_KEY, JSON.stringify(reflections));
  }, [reflections]);

  const form = useForm<ReflectionFormValues>({
    resolver: zodResolver(reflectionSchema),
    defaultValues: {
      reflectionText: '',
    },
  });

  const currentPrompt = prompts[currentPromptIndex];

  const handleSaveReflection: SubmitHandler<ReflectionFormValues> = (data) => {
    const newReflection: LoggedReflection = {
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      prompt: currentPrompt,
      reflectionText: data.reflectionText,
      loggedAt: new Date().toISOString(),
    };
    setReflections((prev) => [newReflection, ...prev.slice(0, 99)]); 
    form.reset();
    trackCalculatorUsage('self-inquiry-prompts');
    toast({ title: "Reflection Saved!", description: "Your thoughts have been recorded.", variant: "default" });
  };

  const handleDeleteReflection = (id: string) => {
    setReflections((prev) => prev.filter(r => r.id !== id));
    toast({ title: "Reflection Deleted", description: "The reflection has been removed.", variant: "default" });
  };

  const handleNewPrompt = () => {
    setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % prompts.length);
    form.reset(); 
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Lightbulb className="mr-3 h-6 w-6 text-accent" /> Current Inquiry Prompt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-foreground font-medium italic">"{currentPrompt}"</p>
        </CardContent>
        <CardFooter>
            <Button onClick={handleNewPrompt} variant="outline" className="w-full sm:w-auto">
                <RotateCcw className="mr-2 h-4 w-4" /> Get New Prompt
            </Button>
        </CardFooter>
      </Card>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSaveReflection)} className="space-y-4">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center">
                <Edit3 className="mr-2 h-5 w-5 text-accent" /> Your Reflection
              </CardTitle>
              <CardDescription>
                Journal your thoughts, intuitions, or realizations related to the prompt.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField control={form.control} name="reflectionText" render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="reflectionText" className="sr-only">Your Reflection</FormLabel>
                  <FormControl>
                    <Textarea 
                      id="reflectionText" 
                      placeholder="Start writing your reflection here..." 
                      rows={5} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <PenLine className="mr-2 h-4 w-4" /> Save Reflection
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center">
            <ListChecks className="mr-2 h-5 w-5 text-accent" /> Past Reflections (Last 100)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reflections.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No reflections saved yet. Respond to a prompt to begin!</p>
          ) : (
            <ScrollArea className="h-[400px] rounded-md border">
              <div className="p-3 space-y-2">
                {reflections.map((reflection) => (
                  <Card key={reflection.id} className="bg-card/60 relative group text-xs">
                    <CardContent className="p-2.5">
                      <div className="flex justify-between items-start mb-1.5">
                        <p className="text-muted-foreground/80 text-[11px]">
                          Prompt: <span className="italic">"{reflection.prompt}"</span>
                        </p>
                        <Button 
                          variant="ghost" size="icon" 
                          className="h-6 w-6 opacity-50 group-hover:opacity-100 text-destructive hover:bg-destructive/10 flex-shrink-0"
                          onClick={() => handleDeleteReflection(reflection.id)}
                          aria-label="Delete reflection"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      <p className="text-foreground text-sm whitespace-pre-wrap border-t border-border pt-1.5">
                        {reflection.reflectionText}
                      </p>
                      <p className="mt-1.5 text-muted-foreground/70 text-[10px] border-t pt-1.5">
                        Logged: {format(parseISO(reflection.loggedAt), "MMM d, yyyy h:mm a")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
         {reflections.length > 0 && (
             <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Total reflections: {reflections.length}. Keep exploring your inner wisdom!
                </p>
            </CardFooter>
          )}
      </Card>
    </div>
  );
}
