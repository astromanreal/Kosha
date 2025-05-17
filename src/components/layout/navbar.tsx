

import Link from 'next/link';
import { Compass, MoreVertical, Settings, Mail, User, Calculator, GraduationCap, CalendarCheck, HomeIcon, Scan, Leaf, Layers, WandSparkles, ScrollText, Salad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { getIconComponent } from '@/lib/icon-map';

const YogaIcon = getIconComponent('Yoga'); 

const mainNavLinks = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/anatomy', label: 'Anatomy Explorer', icon: Scan },
  { href: '/physical-body', label: 'Physical Body', icon: Leaf },
  { href: '/koshas', label: 'Pancha Koshas', icon: Layers },
  { href: '/yoga', label: 'Yoga Library', icon: YogaIcon }, 
  { href: '/good-foods', label: 'Good Foods', icon: Salad },
  { href: '/learning', label: 'Learning Modules', icon: GraduationCap },
  { href: '/routines', label: 'Daily Routines', icon: CalendarCheck },
  { href: '/advisor', label: 'Knowledge Quiz', icon: WandSparkles },
  { href: '/texts', label: 'Ancient Texts', icon: ScrollText },
];

const rightToolbarIcons = [
  { href: '/explore', label: 'Explore All Features', icon: Compass },
  { href: '/calculator', label: 'Wellness Calculators', icon: Calculator },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/contact', label: 'Contact Us', icon: Mail },
];

export default function Navbar() {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg width="32" height="32" viewBox="0 0 100 100" className="text-primary" xmlns="http://www.w3.org/2000/svg">
            {/* Annamaya Kosha - Outer, grounded */}
            <path d="M50 90 C20 90 10 50 50 10 C90 50 80 90 50 90 Z" fill="hsl(var(--primary))" opacity="0.3"/>
            {/* Pranamaya Kosha */}
            <path d="M50 80 C30 80 20 50 50 20 C80 50 70 80 50 80 Z" fill="hsl(var(--primary))" opacity="0.5"/>
            {/* Manomaya Kosha */}
            <path d="M50 70 C40 70 30 50 50 30 C70 50 60 70 50 70 Z" fill="hsl(var(--primary))" opacity="0.7"/>
            {/* Vijnanamaya Kosha */}
            <path d="M50 60 C45 60 40 50 50 40 C60 50 55 60 50 60 Z" fill="hsl(var(--accent))" opacity="0.8"/>
            {/* Anandamaya Kosha - Inner, bliss */}
            <circle cx="50" cy="50" r="10" fill="hsl(var(--accent))"/>
          </svg>
          <span className="text-xl font-semibold text-primary">Kosha Explorer</span>
        </Link>
        
        <div className="flex items-center space-x-1 sm:space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {mainNavLinks.sort((a,b) => a.label.localeCompare(b.label)).map((item) => ( 
                <DropdownMenuItem key={item.label} asChild>
                  <Link href={item.href} className="flex items-center space-x-2 w-full">
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {rightToolbarIcons.map((item) => (
            <Button key={item.label} variant="ghost" size="icon" asChild>
              <Link href={item.href} aria-label={item.label}>
                <item.icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
    
