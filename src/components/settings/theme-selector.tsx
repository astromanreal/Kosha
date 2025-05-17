
'use client';

import { useSettings, type ThemeName } from '@/contexts/settings-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const themes: { name: ThemeName; label: string; colors: { bg: string; primary: string; accent: string } }[] = [
  { name: 'earthy', label: 'Earthy Tones', colors: { bg: 'hsl(35 55% 95%)', primary: 'hsl(90 35% 40%)', accent: 'hsl(51 100% 50%)' } },
  { name: 'spiritual-indigo', label: 'Spiritual Indigo', colors: { bg: 'hsl(240 50% 96%)', primary: 'hsl(260 60% 55%)', accent: 'hsl(300 70% 60%)' } },
  { name: 'sunrise-amber', label: 'Sunrise Amber', colors: { bg: 'hsl(45 100% 97%)', primary: 'hsl(35 80% 55%)', accent: 'hsl(50 100% 50%)' } },
  { name: 'forest-teal', label: 'Forest Teal', colors: { bg: 'hsl(160 30% 95%)', primary: 'hsl(180 50% 40%)', accent: 'hsl(100 60% 45%)' } },
  { name: 'serene-sky', label: 'Serene Sky', colors: { bg: 'hsl(200 70% 96%)', primary: 'hsl(210 65% 50%)', accent: 'hsl(230 70% 65%)' } },
];

export default function ThemeSelector() {
  const { theme: currentTheme, setTheme } = useSettings();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Select a visual theme for the application.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themes.map((themeOption) => (
          <Button
            key={themeOption.name}
            variant={currentTheme === themeOption.name ? 'default' : 'outline'}
            onClick={() => setTheme(themeOption.name)}
            className="h-auto p-0 border-2 data-[state=selected]:border-primary data-[state=selected]:ring-2 data-[state=selected]:ring-primary data-[state=selected]:ring-offset-2"
            data-state={currentTheme === themeOption.name ? 'selected' : 'unselected'}
          >
            <Card className={`w-full shadow-none border-none ${currentTheme === themeOption.name ? 'bg-transparent' : ''}`}>
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                    <span className={`font-medium ${currentTheme === themeOption.name ? 'text-primary-foreground' : 'text-card-foreground'}`}>{themeOption.label}</span>
                    {currentTheme === themeOption.name && <CheckCircle className="h-5 w-5 text-primary-foreground" />}
                </div>
                <div className="flex space-x-1 h-8 rounded overflow-hidden">
                  <div style={{ backgroundColor: themeOption.colors.bg }} className="w-1/3"></div>
                  <div style={{ backgroundColor: themeOption.colors.primary }} className="w-1/3"></div>
                  <div style={{ backgroundColor: themeOption.colors.accent }} className="w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          </Button>
        ))}
      </div>
    </div>
  );
}
