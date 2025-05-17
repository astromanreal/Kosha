import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

interface SectionCardProps {
  title: string;
  description: string;
  Icon?: LucideIcon;
  imageUrl?: string;
  imageAlt?: string;
  imageHint?: string;
  children?: React.ReactNode;
}

export function SectionCard({ title, description, Icon, imageUrl, imageAlt = "Section Image", imageHint, children }: SectionCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image 
            src={imageUrl} 
            alt={imageAlt} 
            layout="fill" 
            objectFit="cover" 
            data-ai-hint={imageHint || "decorative"}
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center space-x-3">
          {Icon && <Icon className="h-8 w-8 text-accent" />}
          <CardTitle className="text-2xl text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        {children}
      </CardContent>
    </Card>
  );
}
