
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { learningModules, getLearningModuleBySlug, type LearningModuleInfo, type ModuleDay } from '../learningModulesData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, Clock, BarChart2, CheckCircle, Edit3, Lightbulb as LightbulbIcon } from 'lucide-react';
import { getIconComponent } from '@/lib/icon-map';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export async function generateStaticParams() {
  return learningModules.map((module) => ({
    moduleId: module.slug,
  }));
}

export async function generateMetadata({ params }: { params: { moduleId: string } }): Promise<Metadata> {
  const module = getLearningModuleBySlug(params.moduleId);
  if (!module) {
    return {
      title: 'Learning Module Not Found | Kosha Explorer',
      description: 'The requested learning module could not be found.',
    };
  }
  const pageTitle = `${module.title} | Learning Module | Kosha Explorer`;
  const pageDescription = module.longDescription || `Explore the ${module.title} learning module: ${module.description}. Dive into daily lessons, practices, and reflections.`;
  const pageKeywords = [module.title, module.category, "learning module", "guided course", ...module.description.split(' ').slice(0,3)].join(', ');
  
  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteBaseUrl}/learning/${module.slug}`,
      type: 'article',
      images: [
        {
          url: module.coverImage,
          width: 600, 
          height: 400, 
          alt: `Kosha Explorer - ${module.title} Learning Module`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [module.coverImage],
    },
  };
}

interface DayItemProps {
  day: ModuleDay;
  moduleTitle: string;
}

const DayItem: React.FC<DayItemProps> = ({ day, moduleTitle }) => (
  <AccordionItem value={`day-${day.dayNumber}`} className="border border-border rounded-lg bg-card/50 shadow-sm mb-3">
    <AccordionTrigger className="text-lg hover:text-accent p-4 font-medium text-left">
      <div className="flex items-center">
        <span className="text-primary mr-3 font-semibold">Day {day.dayNumber}:</span> {day.title}
      </div>
    </AccordionTrigger>
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


export default function LearningModuleDetailPage({ params }: { params: { moduleId: string } }) {
  const module = getLearningModuleBySlug(params.moduleId);

  if (!module) {
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

  return (
    <div className="space-y-8">
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
                  <DayItem key={day.dayNumber} day={day} moduleTitle={module.title} />
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
