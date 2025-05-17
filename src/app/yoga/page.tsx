import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { asanas } from './asanasData';
import type { AsanaInfo } from './asanasData';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getIconComponent } from '@/lib/icon-map';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Yoga Asana Library | Poses, Benefits & Instructions | Kosha Explorer',
  description: 'Explore a comprehensive library of yoga asanas (poses) with detailed instructions, benefits, modifications, and contraindications. Enhance your yoga practice and understanding.',
  keywords: ['Yoga Asanas', 'Yoga Poses', 'Yoga Library', 'Yoga Instructions', 'Asana Benefits', 'Hatha Yoga', 'Vinyasa Yoga'],
  openGraph: {
    title: 'Yoga Asana Library | Poses, Benefits & Instructions | Kosha Explorer',
    description: 'Discover a vast collection of yoga poses with detailed guides, benefits, and tips for all levels. Enhance your yoga journey.',
    url: `${siteBaseUrl}/yoga`,
    type: 'website',
    images: [
      {
        url: `https://picsum.photos/seed/yoga-asana-library-og/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Yoga Asana Library - Kosha Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yoga Asana Library | Kosha Explorer',
    description: 'Explore yoga poses with instructions, benefits, and modifications. Deepen your practice with our comprehensive asana library.',
    images: [`https://picsum.photos/seed/yoga-asana-library-twitter/1200/630`],
  },
};

const YogaIcon = getIconComponent('Yoga');

export default function YogaLibraryPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        {YogaIcon && <YogaIcon className="h-20 w-20 text-primary mx-auto mb-6" />}
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Yoga Asana Library</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore a collection of yoga asanas (poses) with detailed instructions, benefits, and considerations for your practice. Deepen your understanding and enhance your journey on the mat.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Discover Yoga Asanas</h2>
        {asanas.length === 0 ? (
          <p className="text-muted-foreground text-center">No asanas available yet. Please check back later for our growing library of yoga poses.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {asanas.map((asana: AsanaInfo) => (
              <Link key={asana.id} href={`/yoga/${asana.slug}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl">
                <Card className="h-full flex flex-col overflow-hidden shadow-lg transform transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-1 bg-card hover:bg-muted/50 border border-border group-hover:border-primary/50">
                  <div className="relative w-full h-56">
                    <Image
                      src={asana.image}
                      alt={`${asana.englishName} (${asana.name}) - Yoga Pose`}
                      fill
                      className="object-cover"
                      data-ai-hint={asana.imageHint || asana.englishName.toLowerCase().replace(' pose', '')}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <CardTitle className="text-xl font-semibold text-primary group-hover:text-primary/90 transition-colors leading-tight">
                      {asana.name} <span className="text-lg font-normal text-muted-foreground">({asana.englishName})</span>
                    </CardTitle>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="secondary" className="text-xs">Category: {asana.category}</Badge>
                        <Badge variant="outline" className="text-xs">Difficulty: {asana.difficulty}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow px-4 pb-4">
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      Key benefits: {asana.benefits[0]}{asana.benefits.length > 1 ? `, ${asana.benefits[1].toLowerCase()}` : ''}...
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-2">
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      View Details <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="text-center mt-16 pt-8 border-t border-border">
        <h2 className="text-3xl font-semibold text-foreground mb-4">More Asanas & Yoga Sequences Coming Soon!</h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          We are continuously expanding our Asana Library to support your yoga journey. Stay tuned for more poses, guided sequences, and detailed insights into yoga philosophy.
        </p>
      </section>
    </div>
  );
}
