import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Telescope, Brain as BrainIcon, BookOpenCheck, Microscope, Users as UsersIcon, Utensils, AirVent } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { systems } from "./systemsData"; 

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Interactive Anatomy Explorer | Human Body Systems & Organs',
  description: 'Explore detailed human anatomy systems including skeletal, muscular, circulatory, respiratory, and nervous systems. Learn about organs, functions, and common disorders.',
  keywords: ['Human Anatomy', 'Body Systems', 'Organs', 'Skeletal System', 'Muscular System', 'Circulatory System', 'Respiratory System', 'Nervous System', 'Anatomy Guide'],
  openGraph: {
    title: 'Interactive Anatomy Explorer | Human Body Systems & Organs',
    description: 'Visually explore human anatomy systems, organs, and functions. Learn about their roles and common health conditions.',
    url: `${siteBaseUrl}/anatomy`,
    type: 'website',
    images: [
      {
        url: `https://picsum.photos/seed/anatomy-explorer-og/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Interactive Human Anatomy Explorer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Anatomy Explorer | Kosha Explorer',
    description: 'Dive into the complexities of the human body. Explore anatomical systems, organs, and their functions in detail.',
    images: [`https://picsum.photos/seed/anatomy-explorer-twitter/1200/630`],
  },
};

const keyHighlightsPurpose = [
    { point: "Educational tool for learning human anatomy systems and organs.", icon: BookOpenCheck},
    { point: "Aims to combine interactivity with deep anatomical knowledge for students and professionals.", icon: Microscope },
    { point: "Suitable for students, health professionals, and anyone curious about the human body.", icon: UsersIcon },
];

const keyHighlightsFeatures = [
  { feature: "Human Body Model", description: "Explore major systems and body parts visually (planned 3D/2D interactivity)." },
  { feature: "System Overviews", description: "Learn key functions, organs, and roles of each human body system." },
  { feature: "Organ Insights", description: "Detailed descriptions of organ location, function, and interactions within anatomical systems." },
  { feature: "Educational Texts", description: "Well-structured explanations with diagrams and references for anatomy learning." },
  { feature: "Future Add-ons", description: "Interactive quizzes, anatomy labels-on-hover, and animations." },
];

export default function AnatomyPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <Telescope className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Interactive Human Anatomy Explorer</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Embark on a visual journey through the human body. Our explorer aims to combine detailed anatomical knowledge with intuitive interactivity, making learning about body systems and organs engaging for everyone.
        </p>
      </section>

      <section>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card/90">
          <CardHeader className="items-center pb-4 text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
                <BrainIcon className="h-10 w-10 text-accent" />
                <CardTitle className="text-3xl text-primary">Anatomy Explorer Highlights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-center text-primary mb-3">Purpose of Our Anatomy Guide</h2>
                <ul className="space-y-3 max-w-xl mx-auto">
                    {keyHighlightsPurpose.map((item) => (
                        <li key={item.point} className="flex items-start text-muted-foreground">
                            <item.icon className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                            <span>{item.point}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-semibold text-center text-primary mb-4 mt-6">Core Anatomy Features (Planned & Current)</h2>
                <div className="overflow-hidden rounded-lg border shadow-md">
                <Table>
                    <TableHeader className="bg-muted/50">
                    <TableRow>
                        <TableHead className="w-[30%] px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Feature</TableHead>
                        <TableHead className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Description</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody className="bg-background divide-y divide-border">
                    {keyHighlightsFeatures.map((item) => (
                        <TableRow key={item.feature} className="hover:bg-muted/30 transition-colors">
                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{item.feature}</TableCell>
                        <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.description}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Key Human Body Systems Covered</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system) => (
            <Link key={system.name} href={`/anatomy/${system.slug}`} className="block group">
              <Card className="hover:shadow-xl transition-shadow duration-300 bg-card/80 h-full flex flex-col group-hover:ring-2 group-hover:ring-accent group-focus-visible:ring-2 group-focus-visible:ring-accent">
                <CardHeader className="flex flex-row items-center space-x-4 pb-3">
                  <system.icon className={`w-10 h-10 ${system.color} flex-shrink-0`} />
                  <CardTitle className="text-xl text-primary">{system.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{system.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="text-center">
        <Card className="overflow-hidden shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Visualizing the Human Form: Anatomical Systems</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[16/10] w-full max-w-3xl mx-auto relative">
              <Image
                src="https://picsum.photos/seed/human-anatomy-overview/800/500"
                alt="Diagram illustrating various human anatomy systems"
                fill
                className="rounded-md object-cover"
                data-ai-hint="human anatomy systems"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                priority
              />
            </div>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              An illustrative representation of the human body's complex structures. Future updates will allow interactive exploration of different anatomical systems.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
