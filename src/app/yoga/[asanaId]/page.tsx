import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { asanas, getAsanaBySlug, type AsanaInfo } from '../asanasData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ListChecks, CheckCircle, Settings2, AlertTriangle, Layers, Heart, Wind, User, Clock, Repeat, ExternalLink, Video } from 'lucide-react';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export async function generateStaticParams() {
  return asanas.map((asana) => ({
    asanaId: asana.slug,
  }));
}

export async function generateMetadata({ params }: { params: { asanaId: string } }): Promise<Metadata> {
  const asana = getAsanaBySlug(params.asanaId);
  if (!asana) {
    return {
      title: 'Asana Not Found | Kosha Explorer Yoga Library',
      description: 'The requested yoga asana could not be found in our library.',
    };
  }
  const pageTitle = `${asana.name} (${asana.englishName}) - Yoga Pose | Kosha Explorer`;
  const pageDescription = `Learn how to do ${asana.englishName} (${asana.name}). Explore benefits, step-by-step instructions, modifications, and contraindications for this ${asana.difficulty} ${asana.category} yoga pose.`;
  const pageKeywords = [asana.name, asana.englishName, "yoga pose", asana.category, asana.difficulty, ...asana.benefits.slice(0,3)].join(', ');
  const imageUrl = asana.image; // Assuming asana.image is a full URL

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteBaseUrl}/yoga/${asana.slug}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 800, // Assuming a general image width
          height: 600, // Assuming a general image height
          alt: `Illustration of ${asana.englishName} (${asana.name}) yoga pose`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}

interface DetailSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const DetailSection: React.FC<DetailSectionProps> = ({ title, icon: Icon, children }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center">
      <Icon className="mr-2 h-5 w-5 text-accent" />
      {title}
    </h2>
    {children}
  </div>
);

const StringList: React.FC<{ items: string[] }> = ({ items }) => {
  if (!items || items.length === 0) return <p className="text-sm text-muted-foreground italic">None specified.</p>;
  return (
    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm pl-5">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
};

export default function AsanaDetailPage({ params }: { params: { asanaId: string } }) {
  const asana = getAsanaBySlug(params.asanaId);

  if (!asana) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive mb-6">Yoga Asana Not Found</h1>
        <p className="text-muted-foreground mb-8">The yoga pose you are looking for does not exist in our library.</p>
        <Button asChild variant="outline">
          <Link href="/yoga">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Asana Library
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" asChild className="mb-2 text-primary hover:text-primary/80 hover:bg-primary/10 pl-0">
        <Link href="/yoga" className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Asana Library
        </Link>
      </Button>

      <Card className="shadow-2xl border-primary/20 overflow-hidden bg-card">
        <CardHeader className="bg-gradient-to-br from-card to-muted/50 p-6 md:p-8">
          <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary" role="heading" aria-level={1}>{asana.name} ({asana.englishName})</CardTitle>
          <CardDescription className="text-md md:text-lg text-muted-foreground mt-2">
            Category: <Badge variant="secondary">{asana.category}</Badge> | Difficulty: <Badge variant="outline">{asana.difficulty}</Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="aspect-[4/3] w-full max-w-xl mx-auto relative shadow-xl rounded-lg overflow-hidden border border-border">
              <Image
                src={asana.image}
                alt={`Illustration of ${asana.englishName} (${asana.name}) yoga pose`}
                fill
                className="object-cover"
                data-ai-hint={asana.imageHint || asana.englishName.toLowerCase().replace(' pose', '')}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                priority
              />
            </div>
            
            <Accordion type="multiple" defaultValue={['benefits', 'instructions']} className="w-full space-y-4">
              <AccordionItem value="benefits" className="border border-border rounded-lg bg-card/50 shadow-sm">
                <AccordionTrigger className="text-lg hover:text-accent p-4 font-medium">
                  <CheckCircle className="mr-3 h-5 w-5 text-green-500" /> Benefits of {asana.englishName}
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                  <StringList items={asana.benefits} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="instructions" className="border border-border rounded-lg bg-card/50 shadow-sm">
                <AccordionTrigger className="text-lg hover:text-accent p-4 font-medium">
                   <ListChecks className="mr-3 h-5 w-5 text-blue-500" /> Step-by-Step Instructions for {asana.englishName}
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0">
                   <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm pl-5">
                    {asana.instructions.map((step, index) => <li key={index}>{step}</li>)}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg rounded-lg border-border bg-card/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-foreground flex items-center">
                  <Settings2 className="mr-2 h-5 w-5 text-accent" /> Modifications for {asana.englishName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StringList items={asana.modifications} />
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg border-destructive/50 bg-destructive/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-destructive flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5" /> Contraindications for {asana.englishName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <StringList items={asana.contraindications} />
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg border-border bg-card/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-foreground flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-accent" /> Practice Details
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-1">
                <p><strong>Suggested Duration:</strong> {asana.duration}</p>
                <p><strong>Repetitions:</strong> {asana.repetitions}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg rounded-lg border-border bg-card/70">
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-foreground flex items-center">
                        <Layers className="mr-2 h-5 w-5 text-accent" /> Kosha Impact
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {asana.koshaImpact.map(kosha => <Badge key={kosha} variant="secondary">{kosha}</Badge>)}
                </CardContent>
            </Card>

             <Card className="shadow-lg rounded-lg border-border bg-card/70">
                <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-foreground flex items-center">
                         <User className="mr-2 h-5 w-5 text-accent" /> Dosha Impact
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    {asana.doshaImpact.balances.length > 0 && (
                        <div>
                            <strong>Balances:</strong> {asana.doshaImpact.balances.join(', ')}
                        </div>
                    )}
                    {asana.doshaImpact.mayAggravate.length > 0 && (
                         <div>
                            <strong>May Aggravate:</strong> {asana.doshaImpact.mayAggravate.join(', ')}
                        </div>
                    )}
                    {asana.doshaImpact.balances.length === 0 && asana.doshaImpact.mayAggravate.length === 0 && (
                        <p className="italic">Specific dosha impacts not detailed for {asana.englishName}.</p>
                    )}
                </CardContent>
            </Card>

            {asana.video && !asana.video.includes("example.com") && !asana.video.includes("placeholder.mp4") && (
              <Card className="shadow-lg rounded-lg border-border bg-card/70">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Video className="mr-2 h-5 w-5 text-accent" /> Video Guide for {asana.englishName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Watch a video demonstration: <br/>
                    <a href={asana.video} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">
                      {asana.video} <ExternalLink className="inline-block ml-1 h-3.5 w-3.5" />
                    </a>
                  </p>
                   <p className="text-xs text-muted-foreground italic mt-2">Note: Video content is external.</p>
                </CardContent>
              </Card>
            )}
          </aside>
        </CardContent>
      </Card>
    </div>
  );
}
