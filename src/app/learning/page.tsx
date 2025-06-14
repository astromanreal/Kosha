
import type { Metadata } from 'next';
import { learningModules, type LearningModuleInfo } from './learningModulesData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GraduationCap, ArrowRight, Clock, BarChart2, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getIconComponent } from '@/lib/icon-map';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Learning Modules | Guided Wellness & Spiritual Journeys | Kosha Explorer',
  description: 'Deepen your knowledge with Kosha Explorer\'s learning modules. Explore structured courses on Pranayama, Ayurveda, Pancha Koshas, Yoga Philosophy, and more for holistic well-being and self-discovery.',
  keywords: ['Online Learning Modules', 'Guided Wellness Courses Online', 'Pranayama Techniques Course Guide', 'Ayurveda Basics Online Learning', 'Pancha Kosha Study Material', 'Yoga Philosophy Teachings Online', 'Holistic Education Platform', 'Spiritual Development Programs', 'Mindfulness Training Modules', 'Self-Discovery Courses'],
  openGraph: {
    title: 'Guided Learning Modules for Holistic Wellness & Spiritual Growth | Kosha Explorer',
    description: 'Embark on structured learning paths covering Pranayama, Ayurveda, the Pancha Koshas, and yogic philosophy. Enhance your holistic knowledge with Kosha Explorer.',
    url: `${siteBaseUrl}/learning`,
    type: 'website', 
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Kosha+Explorer+Learning+Modules`, 
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Learning Modules for Spiritual and Wellness Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Learning Modules on Yoga, Ayurveda & Spirituality | Kosha Explorer',
    description: 'Discover guided learning modules on Pranayama, Ayurveda, Pancha Koshas, and more to deepen your holistic wellness practice and spiritual understanding on Kosha Explorer.',
    images: [`https://placehold.co/1200x630.png?text=Kosha+Explorer+Learning+Modules`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LearningModulesPage() {
  const pageUrl = `${siteBaseUrl}/learning`;
  const pageTitle = metadata.title as string;
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage", // Could be CollectionPage
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
      "name": "Learning Modules",
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
          <GraduationCap className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Learning Modules</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Deepen your understanding and practice with our structured learning modules. Explore topics like Pranayama, Ayurveda, the Pancha Koshas, and Yoga Philosophy at your own pace.
          </p>
        </section>

        {learningModules.length === 0 ? (
          <p className="text-muted-foreground text-center">No learning modules available yet. Please check back soon!</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {learningModules.map((module) => {
              const ModuleIcon = getIconComponent(module.iconName);
              return (
                <Link key={module.slug} href={`/learning/${module.slug}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl h-full">
                  <Card className="h-full flex flex-col overflow-hidden shadow-lg transform transition-all duration-300 ease-out group-hover:scale-102 group-hover:shadow-xl group-hover:-translate-y-1 bg-card hover:bg-muted/50 border border-border group-hover:border-primary/50">
                    <CardHeader className="p-6 items-center text-center">
                      {ModuleIcon && <ModuleIcon className="h-12 w-12 text-accent mb-4 group-hover:text-primary transition-colors" />}
                      <CardTitle className="text-xl text-primary group-hover:text-primary/90 transition-colors leading-tight">{module.title}</CardTitle>
                      <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                          <Badge variant="secondary" className="text-xs"><BookOpen className="h-3 w-3 mr-1"/>{module.category}</Badge>
                          <Badge variant="outline" className="text-xs"><Clock className="h-3 w-3 mr-1"/>{module.durationEstimate}</Badge>
                          <Badge variant="outline" className="text-xs"><BarChart2 className="h-3 w-3 mr-1"/>{module.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow px-6 pb-4 text-center">
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{module.description}</p>
                    </CardContent>
                    <div className="p-6 pt-2 mt-auto">
                      <Button variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        Start Learning <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        <section className="text-center mt-16 pt-8 border-t border-border">
          <h2 className="text-3xl font-semibold text-foreground mb-4">More Modules Coming Soon!</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We are actively developing new learning modules to cover a wider range of topics. Stay tuned for more guided journeys into holistic wellness and spiritual wisdom.
          </p>
        </section>
      </div>
    </>
  );
}
