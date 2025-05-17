
'use client';

import { useSettings, type FontSize } from '@/contexts/settings-context';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"


const fontSizes: { value: FontSize; label: string; exampleClass: string }[] = [
  { value: 'sm', label: 'Small', exampleClass: 'text-xs' },
  { value: 'base', label: 'Medium', exampleClass: 'text-sm' },
  { value: 'lg', label: 'Large', exampleClass: 'text-base' },
];

export default function FontSizeSelector() {
  const { fontSize, setFontSize } = useSettings();

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Adjust the application's base text size.</p>
      <ToggleGroup 
        type="single" 
        defaultValue={fontSize} 
        onValueChange={(value) => {
          if (value) setFontSize(value as FontSize);
        }}
        className="flex flex-wrap gap-2"
        aria-label="Font size"
      >
        {fontSizes.map((sizeOption) => (
          <ToggleGroupItem 
            key={sizeOption.value} 
            value={sizeOption.value} 
            aria-label={sizeOption.label}
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex-1 min-w-[80px]"
            variant="outline"
          >
            <span className={sizeOption.exampleClass}>{sizeOption.label}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
