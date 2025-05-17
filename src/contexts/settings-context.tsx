
'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'earthy' | 'spiritual-indigo' | 'sunrise-amber' | 'forest-teal' | 'serene-sky';
export type FontSize = 'sm' | 'base' | 'lg';
export type FontFamily = 'geist-sans' | 'geist-mono' | 'serif';

interface SettingsContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  fontFamily: FontFamily;
  setFontFamily: (family: FontFamily) => void;
}

const defaultSettings: SettingsContextType = {
  theme: 'forest-teal', // Default color theme set to Forest Teal
  setTheme: () => {},
  fontSize: 'base',
  setFontSize: () => {},
  fontFamily: 'geist-sans',
  setFontFamily: () => {},
};

const SettingsContext = createContext<SettingsContextType>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [theme, setThemeState] = useState<ThemeName>(defaultSettings.theme);
  const [fontSize, setFontSizeState] = useState<FontSize>(defaultSettings.fontSize);
  const [fontFamily, setFontFamilyState] = useState<FontFamily>(defaultSettings.fontFamily);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('app-theme') as ThemeName | null;
    const storedFontSize = localStorage.getItem('app-font-size') as FontSize | null;
    const storedFontFamily = localStorage.getItem('app-font-family') as FontFamily | null;

    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      setThemeState('forest-teal'); // Ensure forest-teal is default if nothing in LS
    }
    if (storedFontSize) setFontSizeState(storedFontSize);
    if (storedFontFamily) setFontFamilyState(storedFontFamily);
    
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return; 
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);

    document.body.dataset.fontSize = fontSize;
    localStorage.setItem('app-font-size', fontSize);
    
    document.body.dataset.fontFamily = fontFamily;
    localStorage.setItem('app-font-family', fontFamily);

  }, [theme, fontSize, fontFamily, isMounted]);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  const setFontSize = (newSize: FontSize) => {
    setFontSizeState(newSize);
  };

  const setFontFamily = (newFamily: FontFamily) => {
    setFontFamilyState(newFamily);
  };
  
  if (!isMounted) {
    return null; 
  }


  return (
    <SettingsContext.Provider value={{ theme, setTheme, fontSize, setFontSize, fontFamily, setFontFamily }}>
      {children}
    </SettingsContext.Provider>
  );
};

