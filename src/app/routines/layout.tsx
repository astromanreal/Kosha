
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Ayurvedic Daily (Dinacharya) & Seasonal (Ritucharya) Routines Guide | Kosha Explorer',
  description: 'Learn and build your Ayurvedic Dinacharya (daily routine) and understand Ritucharya (seasonal regimen) with Kosha Explorer. Align your lifestyle with natural rhythms for optimal health, balance, and vitality. Interactive tools and guides.',
  keywords: ['Dinacharya Ayurvedic Daily Routine', 'Ritucharya Seasonal Regimen', 'Ayurveda Lifestyle Guide', 'Holistic Daily Practices', 'Seasonal Health Tips Ayurveda', 'Prakriti Based Routines', 'Wellness Routine Builder', 'Mind-Body Balance', 'Natural Rhythms Living', 'Ayurvedic Self-Care'],
  openGraph: {
    title: 'Ayurvedic Daily & Seasonal Routines for Optimal Health | Kosha Explorer',
    description: 'Discover Dinacharya (daily routines) and Ritucharya (seasonal regimens) in Ayurveda. Interactive tools to build habits for balance, vitality, and well-being.',
    url: `${siteBaseUrl}/routines`,
    type: 'website', 
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Ayurvedic+Routines+Guide`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Guide to Ayurvedic Daily and Seasonal Routines',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayurvedic Routines (Dinacharya & Ritucharya) | Kosha Explorer',
    description: 'Learn to align your lifestyle with nature through Ayurvedic daily (Dinacharya) and seasonal (Ritucharya) routines for lasting health and balance.',
    images: [`https://placehold.co/1200x630.png?text=Ayurvedic+Routines+Guide`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RoutinesLayout({ children }: { children: ReactNode }) {
  const pageUrl = `${siteBaseUrl}/routines`;
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
      "name": "Ayurvedic Routines",
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
