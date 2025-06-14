
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Yoga Asana Library | Poses, Instructions & Benefits | Kosha Explorer',
  description: 'Explore a comprehensive Yoga Asana Library on Kosha Explorer. Find detailed instructions, benefits, modifications, and contraindications for various yoga poses. Filter by category and difficulty to enhance your practice for physical and mental well-being.',
  keywords: ['Yoga Asana Library Online', 'Yoga Poses Guide Detailed', 'Yoga Pose Instructions', 'Asana Benefits Explained', 'Yoga Modifications and Props', 'Beginner Yoga Poses List', 'Intermediate Yoga Asanas', 'Advanced Yoga Postures', 'Standing Yoga Poses', 'Seated Yoga Poses', 'Backbends Yoga Guide', 'Inversions Yoga Tutorial', 'Yoga for Flexibility and Strength', 'Yoga for Stress Relief'],
  openGraph: {
    title: 'Comprehensive Yoga Asana Library | Instructions, Benefits & More | Kosha Explorer',
    description: 'Your ultimate guide to yoga poses. Discover detailed instructions, benefits, and modifications for asanas. Filter by category and difficulty to deepen your practice.',
    url: `${siteBaseUrl}/yoga`,
    type: 'website',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Kosha+Explorer+Yoga+Library`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Yoga Asana Library Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Yoga Asanas: Library, Instructions & Benefits | Kosha Explorer',
    description: 'Dive into our extensive Yoga Asana Library. Find poses, detailed instructions, benefits, and filter options to suit your practice level and goals.',
    images: [`https://placehold.co/1200x630.png?text=Kosha+Explorer+Yoga+Library`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function YogaLayout({ children }: { children: ReactNode }) {
  const pageUrl = `${siteBaseUrl}/yoga`;
  const pageTitle = metadata.title as string; 
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage", // Could be CollectionPage if it's a list of asanas
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
      "name": "Yoga Asana Library",
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
      <div className="space-y-8">
        {children}
      </div>
    </>
  );
}
