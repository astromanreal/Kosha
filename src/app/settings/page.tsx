import type { Metadata } from 'next';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeSelector from '@/components/settings/theme-selector';
import FontSizeSelector from '@/components/settings/font-size-selector';
import FontFamilySelector from '@/components/settings/font-family-selector';
import { ThemeToggle } from '@/components/theme-toggle'; 

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Settings | Customize Your Experience | Kosha Explorer',
  description: 'Personalize your Kosha Explorer experience. Adjust themes, dark/light mode, font sizes, and font families for optimal readability and visual comfort.',
  keywords: ['Application Settings', 'Theme Customization', 'Font Settings', 'Accessibility', 'User Preferences'],
  openGraph: {
    title: 'Application Settings | Kosha Explorer',
    description: 'Customize themes, display modes, font sizes, and font families on Kosha Explorer.',
    url: `${siteBaseUrl}/settings`,
    type: 'website',
    images: [
      {
        url: `https://picsum.photos/seed/kosha-settings-og/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Application Settings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Application Settings | Kosha Explorer',
    description: 'Personalize your Kosha Explorer experience: themes, fonts, and display modes.',
    images: [`https://picsum.photos/seed/kosha-settings-twitter/1200/630`],
  },
  robots: {
    index: false, // Settings page generally shouldn't be indexed
    follow: false,
  },
};

export default function SettingsPage() {
  return (
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
  );
}
