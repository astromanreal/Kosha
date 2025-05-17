
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
  keywords: ['Pancha Kosha', 'Ayurveda', 'Holistic Health', 'Yoga', 'Meditation', 'Wellness', 'Anatomy', 'Spiritual Growth'],
  openGraph: {
    title: 'Kosha Explorer | Holistic Health, Ayurveda, Yoga & Meditation',
    description: 'Your portal to physical, mental, and spiritual intelligence. Explore Pancha Koshas, anatomy, Ayurveda, yoga, and more.',
    url: siteBaseUrl,
    siteName: 'Kosha Explorer',
    images: [
      {
        url: 'https://picsum.photos/seed/kosha-explorer-og-default/1200/630',
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
    images: ['https://picsum.photos/seed/kosha-explorer-twitter-default/1200/630'],
    // site: '@yourtwitterhandle', // Optional: Add your Twitter handle
    // creator: '@yourtwitterhandle', // Optional: Add creator's Twitter handle
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
  icons: { // Favicon placeholder, actual file not generated as per guidelines
    icon: '/favicon.ico', // This path is conventional
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <SettingsProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="forest-teal" 
            enableSystem={false} // Disabled system preference, set forest-teal as default
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
