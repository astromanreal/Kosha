
import type { Metadata } from 'next';
import { calculatorDetailsList, type CalculatorInfo } from '@/app/calculator/calculatorData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calculator as CalculatorIconLucide, ArrowRight } from 'lucide-react';
import { getIconComponent } from '@/lib/icon-map';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Wellness Calculators & Health Tools | Kosha Explorer',
  description: 'Explore a comprehensive suite of wellness calculators: BMI, Body Fat Percentage, Caloric Needs, Hydration Tracker, Ayurvedic Prakriti Quiz, Sleep Quality, Mood Tracker, and more. Tools to support your Annamaya, Pranamaya, Manomaya, Vijnanamaya, and Anandamaya Koshas for holistic health.',
  keywords: ['Wellness Calculators', 'Health Tools Online', 'BMI Calculator Online', 'Body Fat Estimator', 'Calorie Needs Calculator', 'Hydration Tracking App', 'Ayurvedic Prakriti Test', 'Sleep Quality Assessment', 'Mood Journal App', 'Chakra Balancing Tools', 'Pancha Kosha Resources', 'Holistic Health Check', 'Self-Assessment Tools'],
  openGraph: {
    title: 'Comprehensive Wellness & Lifestyle Calculators | Kosha Explorer',
    description: 'Access a diverse range of tools for assessing physical health, energy levels, mental well-being, and spiritual alignment. Empower your journey through all Pancha Koshas.',
    url: `${siteBaseUrl}/calculator`,
    type: 'website',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Kosha+Explorer+Wellness+Calculators`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Wellness Calculators Suite Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wellness Calculators for Holistic Health | Kosha Explorer',
    description: 'Explore our suite of wellness calculators for BMI, body fat, caloric needs, hydration, Prakriti, sleep quality, mood tracking, and more tools for self-assessment and well-being.',
    images: [`https://placehold.co/1200x630.png?text=Kosha+Explorer+Wellness+Calculators`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const koshaOrder: Record<string, number> = {
  "Annamaya Kosha": 1,
  "Pranamaya Kosha": 2,
  "Manomaya Kosha": 3,
  "Vijnanamaya Kosha": 4,
  "Anandamaya Kosha": 5,
};

const koshaIconNames: Record<string, string> = {
  "Annamaya Kosha": "PersonStanding",
  "Pranamaya Kosha": "Wind",
  "Manomaya Kosha": "BrainCircuit",
  "Vijnanamaya Kosha": "Lightbulb", 
  "Anandamaya Kosha": "Sparkles", 
};

export default function WellnessCalculatorsPage() {
  const groupedCalculators = calculatorDetailsList.reduce((acc, calculator) => {
    const kosha = calculator.kosha || 'Other';
    if (!acc[kosha]) {
      acc[kosha] = [];
    }
    acc[kosha].push(calculator);
    return acc;
  }, {} as Record<string, CalculatorInfo[]>);

  const sortedKoshas = Object.keys(groupedCalculators).sort((a, b) => (koshaOrder[a] || 99) - (koshaOrder[b] || 99));

  const pageUrl = `${siteBaseUrl}/calculator`;
  const pageTitle = metadata.title as string;
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": pageUrl,
    "name": pageTitle,
    "description": pageDescription,
    "isPartOf": {
      "@type": "WebSite",
      "url": siteBaseUrl,
      "name": "Kosha Explorer"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": imageUrl
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
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
      "item": pageUrl
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="space-y-12">
        <section className="text-center">
          <CalculatorIconLucide className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Wellness & Lifestyle Calculators</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a suite of tools to help you understand various aspects of your well-being and make informed lifestyle choices across all your Koshas. From physical health metrics to mindfulness aids, find calculators to support your journey.
          </p>
        </section>

        {sortedKoshas.map((koshaName) => {
          const KoshaDisplayIcon = getIconComponent(koshaIconNames[koshaName] || 'Calculator'); 
          return (
            <section key={koshaName} className="pt-8">
              <div className="text-center mb-8">
                {KoshaDisplayIcon && <KoshaDisplayIcon className="h-12 w-12 text-accent mx-auto mb-3" />}
                <h2 className="text-3xl font-semibold text-foreground">{koshaName} Calculators</h2>
                <p className="text-md text-muted-foreground max-w-xl mx-auto mt-2">
                  Tools and trackers focused on the {koshaName.replace(' Kosha', '').toLowerCase()} aspects of your being.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
                {groupedCalculators[koshaName].map((calculator) => {
                  const SpecificIcon = getIconComponent(calculator.iconName); 
                  return (
                    <Card key={calculator.slug} className="shadow-xl rounded-xl overflow-hidden border border-border h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
                      <CardHeader className="items-center text-center pb-4">
                        {SpecificIcon && <SpecificIcon className="h-10 w-10 text-primary mb-3" />}
                        <CardTitle className="text-xl text-primary">{calculator.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow text-center">
                        <p className="text-sm text-muted-foreground line-clamp-3">{calculator.shortDescription}</p>
                        {calculator.status === 'comingSoon' && (
                          <p className="text-xs text-accent mt-2 italic">(Coming Soon)</p>
                        )}
                      </CardContent>
                      <div className="p-4 mt-auto">
                        <Button asChild variant="outline" className="w-full group" disabled={calculator.status === 'comingSoon'}>
                          <Link href={`/calculator/${calculator.slug}`}>
                            {calculator.status === 'available' ? 'Open Calculator' : 'View Details'}
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="text-center mt-16 pt-8 border-t border-border">
          <h2 className="text-3xl font-semibold text-foreground mb-4">More Wellness Tools Coming Soon!</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We are continuously expanding our suite of calculators and tools to support all aspects of your Pancha Koshas and enhance your journey to holistic well-being. Stay tuned for new additions!
          </p>
        </section>
      </div>
    </>
  );
}
