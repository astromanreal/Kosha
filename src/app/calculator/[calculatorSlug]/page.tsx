
import type { Metadata } from 'next';
import { calculatorDetailsList, type CalculatorInfo, getCalculatorBySlug } from '@/app/calculator/calculatorData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Lightbulb, CheckCircle, Info, Construction, Settings2 } from 'lucide-react';
import { getIconComponent } from '@/lib/icon-map';

// Import all calculator components
import BmiCalculator from '@/components/kosha-explorer/bmi-calculator';
import BodyFatCalculator from '@/components/kosha-explorer/body-fat-calculator';
import WaistHipRatioCalculator from '@/components/kosha-explorer/waist-hip-ratio-calculator';
import CaloricNeedsCalculator from '@/components/kosha-explorer/caloric-needs-calculator';
import PrakritiQuiz from '@/components/kosha-explorer/prakriti-quiz';
import ChakraCheckinCalculator from '@/components/kosha-explorer/chakra-checkin-calculator';
import MoodTrackerCalculator from '@/components/kosha-explorer/mood-tracker-calculator';
import StressScannerCalculator from '@/components/kosha-explorer/stress-scanner-calculator';
import MeditationJournalCalculator from '@/components/kosha-explorer/meditation-journal-calculator';
import SelfInquiryPromptsCalculator from '@/components/kosha-explorer/self-inquiry-prompts-calculator';
import SpiritualBookTrackerCalculator from '@/components/kosha-explorer/spiritual-book-tracker-calculator';
import SankalpaRecorderCalculator from '@/components/kosha-explorer/sankalpa-recorder-calculator';
import GratitudeLogCalculator from '@/components/kosha-explorer/gratitude-log-calculator';
import BhaktiTimerCalculator from '@/components/kosha-explorer/bhakti-timer-calculator';
import SilenceTrackerCalculator from '@/components/kosha-explorer/silence-tracker-calculator';
import HydrationTrackerCalculator from '@/components/kosha-explorer/hydration-tracker-calculator';
import SleepQualityTrackerCalculator from '@/components/kosha-explorer/sleep-quality-tracker-calculator';
import ExerciseLogSuggestor from '@/components/kosha-explorer/exercise-log-suggestor';
import BreathAwarenessCalculator from '@/components/kosha-explorer/breath-awareness-calculator';
import EnergyFlowAssessmentCalculator from '@/components/kosha-explorer/energy-flow-assessment-calculator';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

function getCalculatorComponent(slug: string): React.ComponentType<any> | null {
  switch (slug) {
    case 'bmi-calculator': return BmiCalculator;
    case 'body-fat-percentage': return BodyFatCalculator;
    case 'waist-hip-ratio': return WaistHipRatioCalculator;
    case 'daily-caloric-needs': return CaloricNeedsCalculator;
    case 'hydration-tracker': return HydrationTrackerCalculator;
    case 'nutrition-tracker-ayurveda': return PrakritiQuiz;
    case 'sleep-quality-tracker': return SleepQualityTrackerCalculator;
    case 'exercise-log-suggestor': return ExerciseLogSuggestor;
    case 'chakra-checkin': return ChakraCheckinCalculator;
    case 'mood-tracker': return MoodTrackerCalculator;
    case 'stress-scanner': return StressScannerCalculator;
    case 'meditation-journal': return MeditationJournalCalculator;
    case 'self-inquiry-prompts': return SelfInquiryPromptsCalculator;
    case 'spiritual-book-tracker': return SpiritualBookTrackerCalculator;
    case 'sankalpa-recorder': return SankalpaRecorderCalculator;
    case 'gratitude-log': return GratitudeLogCalculator;
    case 'bhakti-timer': return BhaktiTimerCalculator;
    case 'silence-tracker': return SilenceTrackerCalculator;
    case 'breath-awareness-training': return BreathAwarenessCalculator; 
    case 'energy-flow-assessment': return EnergyFlowAssessmentCalculator; 
    default: return null;
  }
}

export async function generateStaticParams() {
  return calculatorDetailsList.map((calc) => ({
    calculatorSlug: calc.slug,
  }));
}

export async function generateMetadata({ params }: { params: { calculatorSlug: string } }): Promise<Metadata> {
  const calculator = getCalculatorBySlug(params.calculatorSlug);
  if (!calculator) {
    return {
      title: 'Wellness Calculator Not Found | Kosha Explorer',
      description: 'The requested wellness calculator could not be found on Kosha Explorer. Explore our other health and wellness tools.',
      robots: { index: false, follow: false }
    };
  }
  const pageTitle = `${calculator.title} | ${calculator.kosha} Wellness Tool | Kosha Explorer`;
  const pageDescription = `Use the ${calculator.title} on Kosha Explorer to gain insights into your ${calculator.kosha.toLowerCase()}. ${calculator.detailedDescription.substring(0,100)}... Calculate and track for better health.`;
  const pageKeywords = [
    calculator.title, "Online Health Calculator", "Wellness Assessment Tool", calculator.kosha, 
    ...calculator.shortDescription.split(' ').slice(0,5).filter(w => w.length > 2), 
    ...calculator.detailedDescription.split(' ').slice(0,8).filter(w => w.length > 3)
  ].filter(Boolean).slice(0, 15);

  const imageUrl = `https://placehold.co/1200x630.png?text=${encodeURIComponent(calculator.title)}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.join(', '),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteBaseUrl}/calculator/${calculator.slug}`,
      type: 'article', 
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Kosha Explorer - ${calculator.title} for ${calculator.kosha} well-being.`,
        },
      ],
      article: {
        publishedTime: "2024-01-01T00:00:00.000Z",
        modifiedTime: new Date().toISOString(),
        authors: [`${siteBaseUrl}/about`],
        section: "Wellness Calculators",
        tags: pageKeywords,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: `Try the ${calculator.title} for insights into your ${calculator.kosha} well-being on Kosha Explorer. A valuable tool for holistic health.`,
      images: [imageUrl],
    },
    robots: {
        index: true,
        follow: true,
    }
  };
}

export default function SingleCalculatorPage({ params }: { params: { calculatorSlug: string } }) {
  const calculator = getCalculatorBySlug(params.calculatorSlug);

  if (!calculator) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive mb-6">Calculator Not Found</h1>
        <p className="text-muted-foreground mb-8">The wellness calculator you are looking for does not exist.</p>
        <Button asChild variant="outline">
          <Link href="/calculator">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Calculators
          </Link>
        </Button>
      </div>
    );
  }

  const CalculatorComponent = getCalculatorComponent(calculator.slug);
  const PageIcon = getIconComponent(calculator.iconName); 

  const pageUrl = `${siteBaseUrl}/calculator/${calculator.slug}`;
  const pageTitle = `${calculator.title} | ${calculator.kosha} Wellness Tool | Kosha Explorer`;
  const pageDescription = `Use the ${calculator.title} on Kosha Explorer. ${calculator.detailedDescription} Relevant for your ${calculator.kosha}.`;
  const imageUrl = `https://placehold.co/1200x630.png?text=${encodeURIComponent(calculator.title)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    // Consider using "HowTo" or a more specific type if applicable, "Article" is a safe default.
    "@type": "Article", 
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Kosha Explorer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kosha Explorer",
      "logo": {
        "@type": "ImageObject",
        "url": `https://placehold.co/200x60.png?text=Kosha+Explorer+Logo`
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "keywords": [calculator.title, "Wellness Calculator", calculator.kosha].join(", ")
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteBaseUrl
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Wellness Calculators",
      "item": `${siteBaseUrl}/calculator`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": calculator.title,
      "item": pageUrl
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="space-y-10">
        <Button variant="ghost" asChild className="mb-2 text-primary hover:text-primary/80 hover:bg-primary/10 pl-0">
          <Link href="/calculator" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to All Wellness Calculators
          </Link>
        </Button>

        <section className="text-center">
          {PageIcon && <PageIcon className="h-20 w-20 text-primary mx-auto mb-6" />}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{calculator.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {calculator.detailedDescription}
          </p>
        </section>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            {calculator.status === 'available' && CalculatorComponent && (
              <Card className="shadow-xl rounded-xl overflow-hidden border border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <Settings2 className="mr-3 h-7 w-7 text-accent"/>
                    Try the {calculator.title}
                  </CardTitle>
                  <CardDescription>
                    Enter your details below to calculate your results or track your progress.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CalculatorComponent />
                </CardContent>
              </Card>
            )}

            {calculator.status === 'comingSoon' && ( 
              <Card className="shadow-xl rounded-xl overflow-hidden border border-border">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <Construction className="mr-3 h-7 w-7 text-accent"/>
                    Feature Coming Soon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert variant="default" className="bg-primary/10 border-primary/20">
                    <Construction className="h-5 w-5 text-primary" />
                    <AlertTitle className="font-semibold">Under Development</AlertTitle>
                    <AlertDescription>
                      The interactive "{calculator.title}" is currently under development and will be available soon. Thank you for your patience!
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg rounded-lg border-border bg-card/70">
              <CardHeader>
                <CardTitle className="text-xl text-foreground flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                  Why {calculator.title} is Important
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {calculator.whyImportant}
                </p>
              </CardContent>
            </Card>

            {calculator.howItWorksSteps && calculator.howItWorksSteps.length > 0 && (
              <Card className="shadow-lg rounded-lg border-border bg-card/70">
                  <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-accent" />
                      How The {calculator.title} Works
                  </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                  {calculator.howItWorksSteps.map((step, index) => {
                      const StepIcon = step.iconName ? getIconComponent(step.iconName) : Info; 
                      return (
                      <div key={index} className="flex items-start">
                          {StepIcon && <StepIcon className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />}
                          <div>
                          <h3 className="font-medium text-sm text-foreground">{step.title}</h3>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                          </div>
                      </div>
                      );
                  })}
                  </CardContent>
              </Card>
            )}
            {calculator.howItWorksSummary && !calculator.howItWorksSteps && (
              <Card className="shadow-lg rounded-lg border-border bg-card/70">
                  <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-accent" />
                      How The {calculator.title} Works
                  </CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                          {calculator.howItWorksSummary}
                      </p>
                  </CardContent>
              </Card>
            )}

            {calculator.healthContext && (
              <Alert variant="default" className="bg-muted/50 border-border">
                <Info className="h-5 w-5 text-muted-foreground" />
                <AlertTitle className="font-semibold text-foreground">Please Note</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground">
                  {calculator.healthContext}
                </AlertDescription>
              </Alert>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
