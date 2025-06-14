
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
  title: 'Kosha Explorer | Holistic Health, Ayurveda, Yoga & Meditation Platform',
  description: 'Embark on a journey of self-discovery with Kosha Explorer. Explore the Pancha Koshas, interactive human anatomy, Ayurvedic wellness principles, yoga practices, and personalized tools for holistic well-being. Your comprehensive portal to physical, mental, and spiritual intelligence.',
  keywords: ['Holistic Health Platform', 'Pancha Kosha Guide', 'Ayurveda Wellness Principles', 'Yoga Asanas Library', 'Meditation Practices Online', 'Wellness Journey App', 'Interactive Anatomy Explorer', 'Spiritual Wisdom Texts', 'Mind-Body Balance Tools', 'Self-Discovery Resources'],
  openGraph: {
    title: 'Kosha Explorer | Your Guide to Holistic Well-being & Spiritual Growth',
    description: 'Discover interactive tools and ancient wisdom for physical, mental, and spiritual harmony. Explore Pancha Koshas, anatomy, Ayurveda, yoga, and personalized wellness insights.',
    url: `${siteBaseUrl}/`,
    type: 'website',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Kosha+Explorer+Homepage`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Homepage - Exploring layers of well-being and holistic health.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kosha Explorer | Integrate Ancient Wisdom for Modern Well-being',
    description: 'Your journey to holistic health starts here. Explore Pancha Koshas, anatomy, Ayurveda, yoga, and meditation with Kosha Explorer.',
    images: [`https://placehold.co/1200x630.png?text=Kosha+Explorer+Homepage`],
  },
  robots: {
    index: true,
    follow: true,
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
  const pageUrl = siteBaseUrl;
  const pageTitle = metadata.title as string; 
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url || `https://placehold.co/1200x630.png?text=Kosha+Explorer+Homepage`;

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
    "inLanguage": "en-US",
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
                          src="https://placehold.co/600x400.png?text=Holistic+Wellness+Diagram"
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
    </>
  );
}
