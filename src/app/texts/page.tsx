
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { texts, type TextInfo } from "./textsData"; 

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Ancient Wisdom & Spiritual Texts Library | Kosha Explorer',
  description: 'Explore a curated collection of ancient scriptures (Vedas, Upanishads like Taittiriya, Vivekachudamani, Varaha) and contemporary writings on yoga, Ayurveda, and spiritual philosophy. Discover timeless wisdom on health, consciousness, and the Pancha Koshas with Kosha Explorer.',
  keywords: ['Ancient Spiritual Texts Library', 'Sacred Scriptures Online Index', 'Vedas Study Resources', 'Upanishads Explained Collection', 'Yoga Philosophy Texts Database', 'Advaita Vedanta Resources Online', 'Pancha Kosha Texts Guide', 'Spiritual Knowledge Compendium', 'Taittiriya Upanishad Summary', 'Vivekachudamani Insights', 'Varaha Upanishad Details'],
  openGraph: {
    title: 'Library of Ancient Wisdom & Spiritual Texts | Kosha Explorer',
    description: 'Dive into a rich collection of ancient scriptures and modern writings. Explore timeless wisdom on health, consciousness, and spiritual philosophy like the Pancha Koshas on Kosha Explorer.',
    url: `${siteBaseUrl}/texts`,
    type: 'website',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Kosha+Explorer+Spiritual+Texts`, 
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Library of Ancient Wisdom and Spiritual Texts Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Ancient Scriptures & Spiritual Wisdom | Kosha Explorer',
    description: 'Access a curated collection of ancient texts (Vedas, Upanishads) and modern writings on yoga, Ayurveda, and spiritual philosophy with Kosha Explorer.',
    images: [`https://placehold.co/1200x630.png?text=Kosha+Explorer+Spiritual+Texts`], 
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TextsPage() {
  const pageUrl = `${siteBaseUrl}/texts`;
  const pageTitle = metadata.title as string;
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage", // Could also be CollectionPage if it primarily lists items
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
      "name": "Ancient Texts",
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
          <ScrollText className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Wisdom from Ancient & Modern Spiritual Texts</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore a curated collection of insights from ancient scriptures like the Vedas and Upanishads, alongside contemporary writings on yoga and Ayurveda. Discover timeless wisdom on the human body, health, consciousness, and the intricate web of life.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {texts.map((text) => (
            <Link key={text.slug} href={`/texts/${text.slug}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl h-full">
              <Card className="h-full flex flex-col overflow-hidden shadow-lg transform transition-all duration-300 ease-out group-hover:scale-102 group-hover:shadow-2xl group-hover:-translate-y-1 bg-card hover:bg-muted/50 border border-border group-hover:border-primary/50">
                <CardHeader className="pt-6 pb-4 flex-grow">
                  <div className="flex items-start space-x-3 mb-2">
                      {text.icon && <text.icon className="h-10 w-10 text-accent flex-shrink-0 mt-1" />}
                      <div className="flex-1">
                          <CardTitle className="text-xl text-primary group-hover:text-primary/90 transition-colors leading-tight">{text.title}</CardTitle>
                          <CardDescription className="text-xs text-muted-foreground mt-1">
                              Category: {text.category} <br /> Origin: <span className="italic">{text.origin}</span>
                          </CardDescription>
                      </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4 px-6 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">{text.description || text.significance}</p>
                </CardContent>
                <div className="p-6 pt-2 mt-auto">
                  <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    Explore {text.title} <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
