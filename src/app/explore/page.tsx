

import type { Metadata } from 'next';
import {
  Compass,
  Layers,
  Calculator as CalculatorIcon, 
  GraduationCap,
  CalendarCheck,
} from 'lucide-react';
import ExploreCard from '@/components/kosha-explorer/explore-card';
import { calculatorDetailsList } from '@/app/calculator/calculatorData';
import { getIconComponent } from '@/lib/icon-map';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Explore All Features | Kosha Explorer Tools & Guides',
  description: 'Discover all features of Kosha Explorer: Interactive Anatomy, Pancha Kosha guides, Yoga Library, Learning Modules, Daily Routines, Wellness Calculators, Ancient Texts, and more for holistic well-being.',
  keywords: ['Kosha Explorer Features', 'Holistic Tools', 'Wellness Guides', 'Anatomy Explorer', 'Pancha Kosha Guide', 'Yoga Library', 'Learning Modules', 'Daily Routines', 'Wellness Calculators', 'Ancient Texts'],
  openGraph: {
    title: 'Explore All Features | Kosha Explorer Tools & Guides',
    description: 'Navigate through all of Kosha Explorer\'s offerings: interactive anatomy, Kosha guides, yoga, wellness calculators, spiritual texts, learning modules, and daily routines.',
    url: `${siteBaseUrl}/explore`,
    type: 'website',
    images: [
      {
        url: `https://placehold.co/1200x630.png`, 
        width: 1200,
        height: 630,
        alt: 'Explore Kosha Explorer Features',
        
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore All Features | Kosha Explorer',
    description: 'Discover all tools and guides available on Kosha Explorer for holistic well-being.',
    images: [`https://placehold.co/1200x630.png`],
  },
};

const coreFeaturesData = [
  {
    title: "Interactive Anatomy Explorer",
    description: "Visually explore human anatomy systems, organs, and their functions with our detailed interactive maps.",
    href: "/anatomy",
    iconName: "Scan", 
  },
  {
    title: "Physical Body Guide (Annamaya Kosha)",
    description: "Delve into the Annamaya Kosha. Learn about Ayurvedic nutrition, lifestyle, and wellness practices for a healthy physical body.",
    href: "/physical-body",
    iconName: "Leaf", 
  },
  {
    title: "Pancha Kosha Integration Guide",
    description: "Understand the five sheaths of existence (Pancha Koshas) and how they intricately connect to your overall well-being and spiritual growth.",
    href: "/koshas",
    iconName: "Layers", 
  },
  {
    title: "Yoga & Asana Library", 
    description: "Discover a comprehensive library of yoga poses (asanas) with detailed instructions, benefits, and modifications to enhance your practice.",
    href: "/yoga",
    iconName: "Yoga", 
  },
   {
    title: "Good Foods Guide: Nutrition & Diet",
    description: "Learn about balanced diets, calories, macronutrients (proteins, carbs, fats), and essential micronutrients for optimal health and physical well-being.",
    href: "/good-foods",
    iconName: "Salad", 
  },
  {
    title: "Learning Modules",
    description: "Engage with structured courses on Pranayama, Ayurveda, and more to deepen your holistic knowledge.",
    href: "/learning",
    iconName: "GraduationCap",
  },
  {
    title: "Daily & Weekly Routines",
    description: "Explore Ayurvedic Dinacharya (daily routine) and Ritucharya (seasonal regimen) for balanced living and well-being.",
    href: "/routines",
    iconName: "CalendarCheck",
  },
  {
    title: "Knowledge Quiz",
    description: "Test your knowledge on Koshas, anatomy, and holistic wellness principles.",
    href: "/advisor",
    iconName: "WandSparkles", 
  },
  {
    title: "Ancient & Spiritual Text Browser",
    description: "Browse insights from ancient scriptures and modern texts related to the physical, energetic, and spiritual bodies for deeper wisdom.",
    href: "/texts",
    iconName: "ScrollText", 
  },
  {
    title: "Ayurvedic Prakriti Quiz",
    description: "Take a quiz to get insights into your Ayurvedic mind-body constitution (Vata, Pitta, Kapha) for personalized wellness.",
    href: "/calculator/nutrition-tracker-ayurveda", 
    iconName: "Users", 
  }
];

export default function ExplorePage() {
  const exploreCalculatorTools = calculatorDetailsList.map(calc => ({
    title: calc.title,
    description: calc.shortDescription,
    href: `/calculator/${calc.slug}`,
    iconName: calc.iconName, 
    status: calc.status,
  }));

  return (
    <div className="space-y-16">
      <section className="text-center">
        <Compass className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Explore All Kosha Explorer Features</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover all the features and tools our platform offers to guide you on your journey to holistic well-being. Navigate through interactive wellness calculators, anatomy guides, spiritual texts, and insightful resources with ease.
        </p>
      </section>

      <section>
        <div className="text-center mb-10">
            <CalculatorIcon className="h-12 w-12 text-accent mx-auto mb-3" />
            <h2 className="text-3xl font-semibold text-foreground">Wellness Calculators & Health Tools</h2>
            <p className="text-md text-muted-foreground max-w-xl mx-auto mt-2">
            Utilize our suite of calculators to gain insights into various aspects of your physical (Annamaya Kosha), energetic (Pranamaya Kosha), mental (Manomaya Kosha), and spiritual well-being. Each tool is designed to empower you on your path to balance and health.
            </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {exploreCalculatorTools.map((tool) => (
            <ExploreCard
              key={tool.title}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              iconName={tool.iconName} 
              status={tool.status}
            />
          ))}
        </div>
      </section>

      <section className="pt-8">
         <div className="text-center mb-10">
            <Layers className="h-12 w-12 text-accent mx-auto mb-3" />
            <h2 className="text-3xl font-semibold text-foreground">Core Platform Features & Guides</h2>
            <p className="text-md text-muted-foreground max-w-xl mx-auto mt-2">
            Dive into detailed guides on human anatomy, the Pancha Koshas, yoga asanas, ancient spiritual texts, and structured learning modules. Deepen your understanding of holistic well-being and conscious living.
            </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeaturesData.sort((a,b) => a.title.localeCompare(b.title)).map((feature) => ( 
            <ExploreCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              iconName={feature.iconName} 
              status="available" 
            />
          ))}
        </div>
      </section>

    </div>
  );
}
