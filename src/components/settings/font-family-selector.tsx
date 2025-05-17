
'use client';

import { useSettings, type FontFamily } from '@/contexts/settings-context';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const fontFamilies: { value: FontFamily; label: string; exampleClass: string }[] = [
  { value: 'geist-sans', label: 'Geist Sans', exampleClass: 'font-[var(--font-geist-sans)]' },
  { value: 'geist-mono', label: 'Geist Mono', exampleClass: 'font-[var(--font-geist-mono)]' },
  { value: 'serif', label: 'Serif', exampleClass: 'font-[var(--font-serif)]' },
];

export default function FontFamilySelector() {
  const { fontFamily, setFontFamily } = useSettings();

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Select the primary font style for the application.</p>
       <ToggleGroup 
        type="single" 
        defaultValue={fontFamily} 
        onValueChange={(value) => {
          if (value) setFontFamily(value as FontFamily);
        }}
        className="flex flex-wrap gap-2"
        aria-label="Font family"
      >
        {fontFamilies.map((familyOption) => (
           <ToggleGroupItem 
            key={familyOption.value} 
            value={familyOption.value} 
            aria-label={familyOption.label}
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex-1 min-w-[100px]"
            variant="outline"
          >
            <span className={familyOption.exampleClass}>{familyOption.label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
