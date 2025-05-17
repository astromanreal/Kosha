
'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Construction } from 'lucide-react';
import { getIconComponent } from '@/lib/icon-map'; // Import the helper

interface ExploreCardProps {
  title: string;
  description: string;
  href: string;
  iconName: string; // Changed from Icon: LucideIcon
  status: 'available' | 'comingSoon';
}

export default function ExploreCard({ title, description, href, iconName, status }: ExploreCardProps) {
  const isComingSoon = status === 'comingSoon';
  const IconComponent = getIconComponent(iconName); // Get the icon component

  return (
    <Link
      href={isComingSoon ? '#' : href}
      className={`group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl h-full ${isComingSoon ? 'cursor-not-allowed opacity-70' : ''}`}
      aria-disabled={isComingSoon}
      onClick={(e) => {
        if (isComingSoon) {
          e.preventDefault();
        }
      }}
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-lg transform transition-all duration-300 ease-out group-hover:scale-102 group-hover:shadow-2xl group-hover:-translate-y-1 bg-card hover:bg-muted/50 border border-border group-hover:border-primary/50">
        <CardHeader className="pt-6 pb-3 items-center text-center">
          <div className={`p-3 rounded-full inline-block mb-3 transition-colors ${isComingSoon ? 'bg-muted' : 'bg-primary/10 group-hover:bg-primary/20'}`}>
            {IconComponent && <IconComponent className={`h-10 w-10 transition-colors ${isComingSoon ? 'text-muted-foreground' : 'text-primary group-hover:text-primary/90'}`} />}
          </div>
          <CardTitle className={`text-xl font-semibold transition-colors ${isComingSoon ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary'}`}>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between px-5 pb-5 text-center">
          <CardDescription className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
            {description}
          </CardDescription>
          <div className="mt-auto">
            {isComingSoon ? (
              <div className="inline-flex items-center text-sm font-medium text-amber-600">
                <Construction className="mr-2 h-4 w-4" />
                Coming Soon
              </div>
            ) : (
              <div className="inline-flex items-center text-sm font-medium text-accent group-hover:underline group-hover:text-accent/90 transition-colors">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
