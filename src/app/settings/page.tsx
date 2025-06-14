
import type { Metadata } from 'next';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeSelector from '@/components/settings/theme-selector';
import FontSizeSelector from '@/components/settings/font-size-selector';
import FontFamilySelector from '@/components/settings/font-family-selector';
import { ThemeToggle } from '@/components/theme-toggle'; 

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Application Settings | Customize Your Kosha Explorer Experience',
  description: 'Personalize your Kosha Explorer experience. Adjust themes (Earthy, Indigo, Amber, Teal, Sky), toggle dark/light mode, modify font sizes (Small, Medium, Large), and choose font families (Sans, Mono, Serif) for optimal readability and visual comfort.',
  keywords: ['Kosha Explorer Settings', 'Theme Customization', 'Font Size Adjustment', 'Font Family Selection', 'Dark Mode Toggle', 'Light Mode Toggle', 'Accessibility Options', 'User Interface Preferences', 'UI Customization'],
  openGraph: {
    title: 'Customize Application Settings | Kosha Explorer',
    description: 'Tailor your Kosha Explorer interface: select themes, adjust display modes (light/dark), and choose preferred font sizes and families for a personalized experience.',
    url: `${siteBaseUrl}/settings`,
    type: 'website',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Kosha+Explorer+Settings`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Application Settings Customization Panel',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personalize Your Kosha Explorer Experience | Settings',
    description: 'Adjust themes, dark/light mode, font sizes, and font families to make Kosha Explorer your own. Optimize for readability and visual comfort.',
    images: [`https://placehold.co/1200x630.png?text=Kosha+Explorer+Settings`],
  },
  robots: {
    index: false, 
    follow: false,
  },
};

export default function SettingsPage() {
  const pageUrl = `${siteBaseUrl}/settings`;
  const pageTitle = metadata.title as string;

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
      "name": "Settings",
      "item": pageUrl
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="space-y-8">
        <section className="text-center">
          <SettingsIcon className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Application Settings</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Customize your Kosha Explorer experience. Adjust visual themes, font preferences, and display modes.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Appearance Theme</CardTitle>
              <CardDescription>
                Choose a color theme for the application. This works alongside light/dark mode to provide distinct visual styles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSelector />
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Display Mode</CardTitle>
              <CardDescription>
                Select your preferred light, dark, or system-default display mode for the application interface.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <ThemeToggle />
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Font Size</CardTitle>
              <CardDescription>
                Adjust the overall font size for better readability across the Kosha Explorer application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FontSizeSelector />
            </CardContent>
          </Card>

          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Font Family</CardTitle>
              <CardDescription>
                Choose your preferred font style (e.g., Sans Serif, Mono, Serif) for the application text.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FontFamilySelector />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
