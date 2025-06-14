
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { SettingsProvider } from '@/contexts/settings-context';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteBaseUrl),
  title: {
    default: 'Kosha Explorer | Holistic Health, Ayurveda, Yoga & Meditation',
    template: '%s | Kosha Explorer',
  },
  description: 'Explore the Pancha Koshas, interactive anatomy, Ayurvedic wellness, yoga practices, and personalized tools for holistic well-being. Your portal to physical, mental, and spiritual intelligence.',
  keywords: ['Pancha Kosha', 'Ayurveda', 'Holistic Health', 'Yoga', 'Meditation', 'Wellness', 'Anatomy', 'Spiritual Growth', 'Mindfulness', 'Self-Discovery', 'Holistic Wellness Platform'],
  openGraph: {
    title: 'Kosha Explorer | Holistic Health, Ayurveda, Yoga & Meditation',
    description: 'Your portal to physical, mental, and spiritual intelligence. Explore Pancha Koshas, anatomy, Ayurveda, yoga, and personalized tools.',
    url: siteBaseUrl,
    siteName: 'Kosha Explorer',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Kosha+Explorer+Holistic+Wellness`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer - Holistic Wellness Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kosha Explorer | Holistic Health, Ayurveda, Yoga & Meditation',
    description: 'Explore Pancha Koshas, anatomy, Ayurveda, yoga, and personalized tools for holistic well-being.',
    images: [`https://placehold.co/1200x630.png?text=Kosha+Explorer+Holistic+Wellness`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { 
    icon: '/favicon.ico', 
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kosha Explorer",
    "url": siteBaseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteBaseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kosha Explorer",
    "url": siteBaseUrl,
    "logo": `https://placehold.co/200x60.png?text=Kosha+Explorer+Logo`
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SettingsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="forest-teal" 
            enableSystem={false} 
            disableTransitionOnChange
          >
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
