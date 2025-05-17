
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
import { HeartHandshake, Edit3, Mic, ListChecks, PlusCircle, Trash2, RotateCcw, Lightbulb, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, parseISO } from 'date-fns';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const SANKALPA_LS_KEY = 'sankalpaText';
const SANKALPA_REFLECTIONS_LS_KEY = 'sankalpaReflections';

const sankalpaSchema = z.object({
  sankalpaText: z.string().min(10, "Sankalpa must be at least 10 characters.").max(300, "Sankalpa is too long (max 300 characters)."),
});
type SankalpaFormValues = z.infer<typeof sankalpaSchema>;

const reflectionSchema = z.object({
  reflectionText: z.string().min(10, "Reflection should be at least 10 characters.").max(1000, "Reflection is too long (max 1000 characters)."),
});
type ReflectionFormValues = z.infer<typeof reflectionSchema>;

interface ReflectionEntry {
  id: string;
  text: string;
  loggedAt: string;
}

export default function SankalpaRecorderCalculator() {
  const [sankalpa, setSankalpa] = useState<string | null>(null);
  const [isEditingSankalpa, setIsEditingSankalpa] = useState(false);
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedSankalpa = localStorage.getItem(SANKALPA_LS_KEY);
    if (storedSankalpa) {
      setSankalpa(storedSankalpa);
    } else {
      setIsEditingSankalpa(true); 
    }

    const storedReflections = localStorage.getItem(SANKALPA_REFLECTIONS_LS_KEY);
    if (storedReflections) {
      try {
        setReflections(JSON.parse(storedReflections));
      } catch (error) {
        console.error("Failed to parse Sankalpa reflections from localStorage:", error);
        localStorage.removeItem(SANKALPA_REFLECTIONS_LS_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (sankalpa) {
      localStorage.setItem(SANKALPA_LS_KEY, sankalpa);
    } else {
      localStorage.removeItem(SANKALPA_LS_KEY);
    }
  }, [sankalpa]);

  useEffect(() => {
    localStorage.setItem(SANKALPA_REFLECTIONS_LS_KEY, JSON.stringify(reflections));
  }, [reflections]);

  const sankalpaForm = useForm<SankalpaFormValues>({
    resolver: zodResolver(sankalpaSchema),
    defaultValues: { sankalpaText: sankalpa || '' },
  });

  const reflectionForm = useForm<ReflectionFormValues>({
    resolver: zodResolver(reflectionSchema),
    defaultValues: { reflectionText: '' },
  });
  
  useEffect(() => {
    sankalpaForm.reset({ sankalpaText: sankalpa || '' });
  }, [sankalpa, sankalpaForm]);


  const handleSetSankalpa: SubmitHandler<SankalpaFormValues> = (data) => {
    setSankalpa(data.sankalpaText);
    setIsEditingSankalpa(false);
    trackCalculatorUsage('sankalpa-recorder');
    toast({ title: "Sankalpa Set!", description: "Your heartfelt intention has been recorded." });
  };

  const handleAddReflection: SubmitHandler<ReflectionFormValues> = (data) => {
    const newReflection: ReflectionEntry = {
      id: new Date().toISOString() + Math.random().toString(36).substr(2, 9),
      text: data.reflectionText,
      loggedAt: new Date().toISOString(),
    };
    setReflections((prev) => [newReflection, ...prev.slice(0, 49)]); 
    reflectionForm.reset();
    trackCalculatorUsage('sankalpa-recorder');
    toast({ title: "Reflection Added!", description: "Your thoughts on your Sankalpa have been saved." });
  };
  
  const handleDeleteReflection = (id: string) => {
    setReflections((prev) => prev.filter(r => r.id !== id));
    toast({ title: "Reflection Deleted", description: "The reflection has been removed." });
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/30 shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-primary flex items-center">
              <HeartHandshake className="mr-3 h-6 w-6 text-accent" /> Your Sankalpa (Heartfelt Intention)
            </CardTitle>
            {sankalpa && !isEditingSankalpa && (
              <Button variant="ghost" size="icon" onClick={() => { sankalpaForm.setValue("sankalpaText", sankalpa || ""); setIsEditingSankalpa(true); }}>
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditingSankalpa || !sankalpa ? (
            <Form {...sankalpaForm}>
              <form onSubmit={sankalpaForm.handleSubmit(handleSetSankalpa)} className="space-y-4">
                <FormField
                  control={sankalpaForm.control}
                  name="sankalpaText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="sankalpaText">
                        {sankalpa ? "Edit your Sankalpa:" : "Define your Sankalpa (e.g., 'I am courageous and compassionate'):"}
                      </FormLabel>
                      <FormControl>
                        <Textarea id="sankalpaText" placeholder="Write your positive, present-tense intention here..." rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                        {sankalpa ? "Update Sankalpa" : "Set Sankalpa"}
                    </Button>
                    {sankalpa && isEditingSankalpa && (
                        <Button type="button" variant="outline" onClick={() => setIsEditingSankalpa(false)} className="flex-1">Cancel</Button>
                    )}
                </div>
              </form>
            </Form>
          ) : (
            <p className="text-lg text-foreground italic p-4 bg-muted/50 rounded-md">"{sankalpa}"</p>
          )}
        </CardContent>
        {!isEditingSankalpa && sankalpa && (
           <CardFooter>
             <p className="text-xs text-muted-foreground">Voice recording (placeholder) and reminders will be added in future updates.</p>
           </CardFooter>
        )}
      </Card>

      {sankalpa && !isEditingSankalpa && (
        <Form {...reflectionForm}>
          <form onSubmit={reflectionForm.handleSubmit(handleAddReflection)} className="space-y-4">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-foreground flex items-center">
                  <PlusCircle className="mr-2 h-5 w-5 text-accent" /> Add Reflection on Your Sankalpa
                </CardTitle>
                <CardDescription>
                  How is your Sankalpa influencing your thoughts, actions, or feelings today?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={reflectionForm.control}
                  name="reflectionText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="reflectionText" className="sr-only">Reflection</FormLabel>
                      <FormControl>
                        <Textarea id="reflectionText" placeholder="Your insights, challenges, or affirmations related to your Sankalpa..." rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  <Edit3 className="mr-2 h-4 w-4" /> Save Reflection
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      )}

      {sankalpa && (
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center">
              <History className="mr-2 h-5 w-5 text-accent" /> Sankalpa Reflections (Last 50)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reflections.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No reflections yet. Add your thoughts above.</p>
            ) : (
              <ScrollArea className="h-[300px] rounded-md border">
                <div className="p-3 space-y-2">
                  {reflections.map((reflection) => (
                    <Card key={reflection.id} className="bg-card/60 relative group text-xs">
                      <CardContent className="p-2.5">
                        <div className="flex justify-between items-start">
                            <p className="text-muted-foreground/80 text-[10px]">
                                Logged: {format(parseISO(reflection.loggedAt), "MMM d, yyyy h:mm a")}
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
                        <p className="text-foreground text-sm whitespace-pre-wrap border-t border-border mt-1 pt-1.5">
                          {reflection.text}
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
                Total reflections: {reflections.length}. Keep aligning with your intention!
              </p>
            </CardFooter>
          )}
        </Card>
      )}
    </div>
  );
}
