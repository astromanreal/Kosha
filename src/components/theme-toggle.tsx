
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  if (!mounted) {
    // Render a disabled button or a placeholder to avoid hydration mismatch
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle light/dark mode</span>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle light/dark mode">
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle light/dark mode</span>
    </Button>
  );
}
