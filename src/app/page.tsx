import type { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Layers, WandSparkles, ScrollText, Scan, HeartPulse, Brain, Bone, Calculator as CalculatorSectionIcon } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { calculatorDetailsList, type CalculatorInfo } from '@/app/calculator/calculatorData';
import { getIconComponent } from "@/lib/icon-map";

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Kosha Explorer | Holistic Health, Ayurveda, Yoga & Meditation',
  description: 'Explore the Pancha Koshas, interactive anatomy, Ayurvedic wellness, yoga practices, and personalized tools for holistic well-being. Your portal to physical, mental, and spiritual intelligence.',
  keywords: ['Holistic Health', 'Pancha Kosha', 'Ayurveda', 'Yoga', 'Meditation', 'Wellness Journey', 'Anatomy Guide', 'Spiritual Wisdom'],
  openGraph: {
    title: 'Kosha Explorer | Holistic Health, Ayurveda, Yoga & Meditation',
    description: 'Your portal to physical, mental, and spiritual intelligence. Explore Pancha Koshas, anatomy, Ayurveda, yoga, and personalized tools.',
    url: `${siteBaseUrl}/`,
    type: 'website',
    images: [
      {
        url: `https://picsum.photos/seed/kosha-explorer-home/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Homepage Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kosha Explorer | Holistic Health, Ayurveda, Yoga & Meditation',
    description: 'Embark on a journey of self-discovery with Kosha Explorer. Integrate ancient wisdom with modern science for holistic health.',
    images: [`https://picsum.photos/seed/kosha-explorer-home-twitter/1200/630`],
  },
};

const features = [
  {
    title: "Interactive Anatomy Explorer",
    description: "Visually explore human anatomy. Learn about anatomical systems, organs, and their functions with our interactive body maps.",
    href: "/anatomy",
    iconName: "Scan", 
    color: "text-green-600",
  },
  {
    title: "Physical Body Guide (Annamaya Kosha)",
    description: "Delve into the Annamaya Kosha, your physical body. Discover insights on nutrition, lifestyle, and wellness practices.",
    href: "/physical-body",
    iconName: "Leaf", 
    color: "text-lime-600",
  },
  {
    title: "Pancha Kosha Integration",
    description: "Understand the five sheaths of existence (Pancha Koshas) from ancient yogic philosophy and their connection to your well-being.",
    href: "/koshas",
    iconName: "Layers", 
    color: "text-sky-600",
  },
  {
    title: "Kosha Advisor & Knowledge Quiz",
    description: "Test your knowledge on Koshas and anatomy or get AI-powered holistic recommendations based on Kosha imbalances.",
    href: "/advisor",
    iconName: "WandSparkles", 
    color: "text-purple-600",
  },
  {
    title: "Ancient Text Browser",
    description: "Browse ancient wisdom from texts related to the physical, energetic, and spiritual bodies. Deepen your understanding of yoga and Vedanta.",
    href: "/texts",
    iconName: "ScrollText", 
    color: "text-amber-600",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="text-center py-12 bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Welcome to Kosha Explorer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your portal to physical, mental & spiritual intelligence. Understand your body, explore the Pancha Koshas, and integrate ancient wisdom with modern science for holistic health.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/koshas">Explore the Koshas</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
              <Link href="/advisor">Knowledge Quiz</Link>
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-10 text-foreground">Discover Your Inner Universe: Core Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = getIconComponent(feature.iconName);
            return (
              <Card key={feature.title} className="hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card/70 hover:bg-card">
                <CardHeader className="flex-row items-start space-x-4 pb-4">
                  {IconComponent && <IconComponent className={`h-10 w-10 ${feature.color} mt-1 flex-shrink-0`} />}
                  <div>
                    <CardTitle className="text-xl text-primary">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="line-clamp-3">{feature.description}</CardDescription>
                </CardContent>
                <div className="p-4 pt-0 mt-auto">
                  <Button variant="outline" asChild className="w-full border-accent text-accent hover:bg-accent/10">
                    <Link href={feature.href}>Learn More</Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <div className="text-center mb-10">
          <CalculatorSectionIcon className="h-12 w-12 text-primary mx-auto mb-3" />
          <h2 className="text-3xl font-semibold text-foreground">Wellness Tools & Lifestyle Calculators</h2>
          <p className="text-md text-muted-foreground max-w-xl mx-auto mt-2">
            Gain insights into your well-being with our collection of Ayurvedic and health calculators.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorDetailsList.slice(0,6).map((calculator) => { 
            const CalIcon = getIconComponent(calculator.iconName);
            return (
              <Card key={calculator.slug} className="hover:shadow-xl transition-shadow duration-300 flex flex-col bg-card/70 hover:bg-card">
                <CardHeader className="flex-row items-start space-x-4 pb-4">
                  {CalIcon && <CalIcon className="h-10 w-10 text-accent mt-1 flex-shrink-0" />}
                  <div>
                    <CardTitle className="text-xl text-primary">{calculator.title}</CardTitle> 
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="line-clamp-3">{calculator.shortDescription}</CardDescription>
                  {calculator.status === 'comingSoon' && (
                    <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-2 italic">(Coming Soon)</p>
                  )}
                </CardContent>
                <div className="p-4 pt-0 mt-auto">
                  <Button
                    variant="outline"
                    asChild
                    className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                    disabled={calculator.status === 'comingSoon'}
                  >
                    <Link href={`/calculator/${calculator.slug}`}>
                      {calculator.status === 'available' ? 'Open Tool' : 'View Details'}
                    </Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
         <div className="text-center mt-8">
            <Button size="lg" asChild variant="link">
                <Link href="/calculator">View All Calculators &rarr;</Link>
            </Button>
        </div>
      </section>

      <section className="text-center mt-12">
        <Card className="bg-card">
            <CardHeader>
                <CardTitle className="text-3xl text-primary">Bridging Science and Spirituality</CardTitle>
                <CardDescription className="text-lg max-w-3xl mx-auto">
                Our platform integrates detailed anatomical knowledge with profound spiritual insights from yogic philosophy, offering a holistic path to well-being.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8 p-6">
                <div className="w-full md:w-1/2">
                    <Image
                        src="https://picsum.photos/seed/holistic-wellness/600/400"
                        alt="Holistic wellness chart with chakras and human anatomy"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-md object-cover aspect-[3/2]"
                        data-ai-hint="holistic wellness"
                        priority
                    />
                </div>
                <div className="w-full md:w-1/2 text-left space-y-4">
                    <p className="text-muted-foreground flex items-start"><HeartPulse className="h-6 w-6 mr-2 text-primary flex-shrink-0" /><span>Understand how your heart beats, blood flows, and organs function in harmony with our anatomy explorer.</span></p>
                    <p className="text-muted-foreground flex items-start"><Brain className="h-6 w-6 mr-2 text-primary flex-shrink-0" /><span>Explore the mind-body connection and how thoughts and emotions (Manomaya Kosha) impact your health.</span></p>
                    <p className="text-muted-foreground flex items-start"><Bone className="h-6 w-6 mr-2 text-primary flex-shrink-0" /><span>Learn about the physical structure (Annamaya Kosha) and its deeper energetic (Pranamaya Kosha) and spiritual layers.</span></p>
                </div>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
