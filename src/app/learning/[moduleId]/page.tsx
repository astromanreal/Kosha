
'use client';

import type { Metadata } from 'next'; // Keep for potential future use, but not used by generateMetadata
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { learningModules, getLearningModuleBySlug, type LearningModuleInfo, type ModuleDay } from '../learningModulesData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"; // Keep for content
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, BookOpen, Clock, BarChart2, CheckCircle, Edit3, Lightbulb as LightbulbIcon, CheckSquare, Square, ChevronDown } from 'lucide-react';
import { getIconComponent } from '@/lib/icon-map';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';
const LEARNING_PROGRESS_LS_KEY = 'learningProgress';

// Since this is a client component, generateMetadata won't run here directly.
// Metadata for dynamic client routes is typically handled by a generateMetadata in a parent server layout/page or by updating document.title.
// For this exercise, we'll focus on dynamic document.title update and assume more complex SEO could be handled by parent.

interface DayItemProps {
  day: ModuleDay;
  moduleSlug: string;
  isCompleted: boolean;
  onToggleComplete: (dayNumber: number) => void;
}

const DayItem: React.FC<DayItemProps> = ({ day, moduleSlug, isCompleted, onToggleComplete }) => (
  <AccordionItem value={`day-${day.dayNumber}`} className="border border-border rounded-lg bg-card/50 shadow-sm mb-3">
    <AccordionPrimitive.Header className="flex items-center w-full p-4 text-lg font-medium">
      <Checkbox
        id={`${moduleSlug}-day-${day.dayNumber}-complete`}
        checked={isCompleted}
        onCheckedChange={() => onToggleComplete(day.dayNumber)}
        className="mr-3 h-5 w-5 flex-shrink-0 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
        aria-label={`Mark Day ${day.dayNumber} as complete`}
      />
      <AccordionPrimitive.Trigger className={cn(
        "flex flex-1 items-center justify-between text-left hover:text-accent data-[state=open]:text-accent [&[data-state=open]>svg]:rotate-180 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm p-0 hover:no-underline"
      )}>
        <span className={`text-base sm:text-lg ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          <span className="text-primary font-semibold">Day {day.dayNumber}:</span> {day.title}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 ml-2" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
    <AccordionContent className="p-4 pt-2 space-y-4">
      <div className="prose prose-sm sm:prose dark:prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
        {day.content}
      </div>
      {day.practiceSuggestion && (
        <div className="mt-3 p-3 border-l-4 border-accent bg-accent/10 rounded-r-md">
          <h4 className="font-semibold text-accent-foreground mb-1 flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-accent" /> Practice Suggestion
          </h4>
          <p className="text-sm text-muted-foreground">{day.practiceSuggestion}</p>
        </div>
      )}
      {day.reflectionPrompt && (
        <div className="mt-3 p-3 border-l-4 border-primary bg-primary/10 rounded-r-md">
          <h4 className="font-semibold text-primary-foreground mb-1 flex items-center">
            <Edit3 className="mr-2 h-4 w-4 text-primary" /> Reflection Prompt
          </h4>
          <p className="text-sm text-muted-foreground">{day.reflectionPrompt}</p>
        </div>
      )}
    </AccordionContent>
  </AccordionItem>
);


export default function LearningModuleDetailPage() {
  const params = useParams();
  const moduleId = typeof params.moduleId === 'string' ? params.moduleId : '';
  
  const [module, setModule] = useState<LearningModuleInfo | undefined | null>(undefined); // null for not found after mount
  const [completedDays, setCompletedDays] = useState<Record<number, boolean>>({});
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    const currentModule = getLearningModuleBySlug(moduleId);
    setModule(currentModule || null); // Set to null if not found after mount

    if (currentModule) {
      document.title = `${currentModule.title} | Learning Module | Kosha Explorer`;
      try {
        const allProgress = JSON.parse(localStorage.getItem(LEARNING_PROGRESS_LS_KEY) || '{}');
        const moduleProgressNumbers: number[] = allProgress[currentModule.slug] || [];
        const initialCompletedDays: Record<number, boolean> = {};
        moduleProgressNumbers.forEach(dayNum => {
          initialCompletedDays[dayNum] = true;
        });
        setCompletedDays(initialCompletedDays);
      } catch (error) {
        console.error("Error loading learning progress from localStorage:", error);
        setCompletedDays({});
      }
    } else if (moduleId) { // If moduleId is present but module not found after mount
        document.title = "Module Not Found | Kosha Explorer";
    }
  }, [moduleId]);

  useEffect(() => {
    if (!isMounted || !module) return;
    try {
      const allProgress = JSON.parse(localStorage.getItem(LEARNING_PROGRESS_LS_KEY) || '{}');
      const completedDayNumbers = Object.entries(completedDays)
        .filter(([, isDone]) => isDone)
        .map(([dayNumStr]) => parseInt(dayNumStr, 10));
      
      allProgress[module.slug] = completedDayNumbers;
      localStorage.setItem(LEARNING_PROGRESS_LS_KEY, JSON.stringify(allProgress));
    } catch (error) {
      console.error("Error saving learning progress to localStorage:", error);
    }
  }, [completedDays, module, isMounted]);

  const handleToggleComplete = (dayNumber: number) => {
    setCompletedDays(prev => {
      const newCompleted = { ...prev, [dayNumber]: !prev[dayNumber] };
      const isNowComplete = newCompleted[dayNumber];
      
      setTimeout(() => {
        toast({
          title: `Day ${dayNumber} ${isNowComplete ? 'Completed' : 'Marked Incomplete'}`,
          description: module?.days.find(d => d.dayNumber === dayNumber)?.title,
        });
      }, 0);
      return newCompleted;
    });
  };

  if (module === undefined) { 
    return <div className="text-center py-20">Loading module details...</div>;
  }
  
  if (module === null) { 
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive mb-6">Learning Module Not Found</h1>
        <p className="text-muted-foreground mb-8">The learning module you are looking for does not exist.</p>
        <Button asChild variant="outline">
          <Link href="/learning">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning Modules
          </Link>
        </Button>
      </div>
    );
  }
  
  const ModuleIcon = getIconComponent(module.iconName);
  const totalDays = module.days?.length || 0;
  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const progressPercentage = totalDays > 0 ? (completedCount / totalDays) * 100 : 0;

  // For Open Graph and Twitter, if a server-side mechanism is not used for dynamic client routes,
  // these tags might not be optimally picked up by crawlers.
  // A more robust solution involves server-rendering or pre-rendering these pages with metadata.
  // For this client component, we'll primarily manage document.title.

  return (
    <div className="space-y-8">
      {/* Placeholder for OG/Twitter tags if this were server-rendered or using a different approach */}
      {/* <Head> tags from next/head are not used in App Router client components for metadata */}

      <Button variant="ghost" asChild className="mb-2 text-primary hover:text-primary/80 hover:bg-primary/10 pl-0">
        <Link href="/learning" className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to All Learning Modules
        </Link>
      </Button>

      <Card className="shadow-2xl border-primary/20 overflow-hidden bg-card">
        <CardHeader className="bg-gradient-to-br from-card to-muted/50 p-6 md:p-8">
          <div className="flex items-center space-x-4 mb-3">
            {ModuleIcon && <ModuleIcon className={`h-16 w-16 text-accent flex-shrink-0`} />}
            <div>
              <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary" role="heading" aria-level={1}>
                {module.title}
              </CardTitle>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="secondary" className="text-sm"><BookOpen className="h-4 w-4 mr-1.5"/>{module.category}</Badge>
              <Badge variant="outline" className="text-sm"><Clock className="h-4 w-4 mr-1.5"/>{module.durationEstimate}</Badge>
              <Badge variant="outline" className="text-sm"><BarChart2 className="h-4 w-4 mr-1.5"/>{module.difficulty}</Badge>
          </div>
          <CardDescription className="text-md md:text-lg text-muted-foreground mt-4">
            {module.longDescription || module.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          {totalDays > 0 && (
            <div className="mb-8 p-4 border rounded-lg bg-muted/30">
              <h3 className="text-lg font-semibold text-foreground mb-2">Module Progress</h3>
              <Progress value={progressPercentage} className="w-full h-3 mb-1" />
              <p className="text-sm text-muted-foreground text-right">{completedCount} / {totalDays} days completed ({progressPercentage.toFixed(0)}%)</p>
            </div>
          )}

          <div className="w-full aspect-video max-w-2xl mx-auto relative my-6 shadow-xl rounded-lg overflow-hidden border border-border">
            <Image
              src={module.coverImage}
              alt={`Cover image for ${module.title}`}
              fill
              className="object-cover"
              data-ai-hint={module.imageHint}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
              priority
            />
          </div>
          
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center">
              <LightbulbIcon className="mr-3 h-7 w-7 text-primary" /> Module Content & Daily Lessons
            </h2>
            {module.days && module.days.length > 0 ? (
              <Accordion type="multiple" className="w-full space-y-3" defaultValue={[`day-${module.days[0].dayNumber}`]}>
                {module.days.map((day) => (
                  <DayItem 
                    key={day.dayNumber} 
                    day={day} 
                    moduleSlug={module.slug}
                    isCompleted={!!completedDays[day.dayNumber]}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground">No daily lessons defined for this module yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
