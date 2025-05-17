import type { Metadata } from 'next';
import { systems, slugify, type ComponentDetail, type MuscleGroup, type MuscleType, type EnzymeHormoneDetail, type GlandDetail, type HormoneDetail, type ImmuneCells, type DefenseMechanisms, getSystemBySlug } from '@/app/anatomy/systemsData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, ListChecks, Microscope, ShieldCheck, Activity, GitFork, Shapes, Lightbulb, UsersRound, AlertTriangle, Link as LinkIcon, Dot, Dumbbell, Layers as LayersIcon, ExternalLink, Droplets, Wind as WindIcon, Clock, FlaskConical, SplitSquareVertical, Cog, Zap as ZapIcon, Network as NetworkIcon, Users as UsersIcon, Shield as ShieldIcon, Filter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export async function generateStaticParams() {
  return systems.map((system) => ({
    systemName: system.slug || slugify(system.name),
  }));
}

type PageProps = {
  params: { systemName: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Add if you use searchParams
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const system = getSystemBySlug(params.systemName);
  if (!system) {
    return {
      title: 'System Not Found | Kosha Explorer Anatomy',
      description: 'The requested anatomical system could not be found.',
    };
  }
  const pageTitle = `${system.name} | Anatomy Explorer | Kosha Explorer`;
  const pageDescription = `Explore the ${system.name.toLowerCase()}: ${system.details.overview || system.description} Learn about its key components, functions, common disorders, and health tips.`;
  const pageKeywords = [system.name, "human anatomy", "body system", ...system.details.keyComponents?.map(c => c.name) || [], ...system.details.keyOrgans?.map(o => o.name) || []].join(', ');
  const imageUrl = `https://placehold.co/1200x630.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteBaseUrl}/anatomy/${system.slug || slugify(system.name)}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Illustration of the ${system.name}`,
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

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const DetailSection: React.FC<SectionProps> = ({ title, icon: Icon, children }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
      <Icon className="mr-3 h-7 w-7 text-accent" />
      {title}
    </h2>
    {children}
  </section>
);

const ComponentList: React.FC<{ items: ComponentDetail[] | string[] | GlandDetail[], titleSingular: string }> = ({ items, titleSingular }) => {
  if (!items || items.length === 0) return null;

  const renderGlandDetail = (item: GlandDetail, index: number) => (
    <AccordionItem value={`gland-item-${index}`} key={index} className="border border-border rounded-lg bg-card/50 shadow-sm">
      <AccordionTrigger className="text-md hover:text-accent p-3 font-medium text-left">
        {item.name}
      </AccordionTrigger>
      <AccordionContent className="p-3 pt-0 text-sm text-muted-foreground space-y-2">
        {item.location && <p><strong>Location:</strong> {item.location}</p>}
        <p><strong>Function:</strong> {item.function}</p>
        {item.hormones && item.hormones.length > 0 && (
          <div>
            <h4 className="font-semibold text-xs text-foreground mb-1">Hormones Produced:</h4>
            <ul className="list-disc list-inside space-y-0.5">
              {item.hormones.map((hormone, hIndex) => <li key={hIndex}>{hormone}</li>)}
            </ul>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );

  const renderComponentDetail = (item: ComponentDetail, index: number) => (
    <AccordionItem value={`item-${index}`} key={index} className="border border-border rounded-lg bg-card/50 shadow-sm">
      <AccordionTrigger className="text-md hover:text-accent p-3 font-medium text-left">
        {item.name}
      </AccordionTrigger>
      <AccordionContent className="p-3 pt-0 text-sm text-muted-foreground">
        <p>{item.description}</p>
        {item.location && <p className="mt-1"><strong>Location:</strong> {item.location}</p>}
        {item.function && <p className="mt-1"><strong>Function:</strong> {item.function}</p>}
        {item.subtypes && item.subtypes.length > 0 && (
          <div className="mt-2 pl-4">
            <h4 className="font-semibold text-xs text-foreground mb-1">Subtypes/Details:</h4>
            <ul className="list-disc list-inside space-y-1">
              {item.subtypes.map((subtype, subIndex) => (
                <li key={subIndex}>
                  <strong>{subtype.name}:</strong> {subtype.description}
                  {subtype.location && <span className="text-xs"> (Location: {subtype.location})</span>}
                  {subtype.function && <span className="text-xs"> (Function: {subtype.function})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );

  if (typeof items[0] === 'string') { 
    return (
      <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-5">
        {(items as string[]).map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    );
  }
  
  if (items[0] && (('hormones' in items[0]) || ('location' in items[0] && !('description' in items[0] && 'subtypes' in items[0])))) { 
    return (
      <Accordion type="multiple" className="w-full space-y-3">
        {(items as GlandDetail[]).map(renderGlandDetail)}
      </Accordion>
    );
  }

  return (
    <Accordion type="multiple" className="w-full space-y-3">
      {(items as ComponentDetail[]).map(renderComponentDetail)}
    </Accordion>
  );
};

export default function SystemDetailPage({ params }: PageProps) {
  const system = systems.find(s => (s.slug || slugify(s.name)) === params.systemName);

  if (!system) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive mb-6">Anatomical System Not Found</h1>
        <p className="text-muted-foreground mb-8">The anatomical system you are looking for does not exist.</p>
        <Button asChild variant="outline">
          <Link href="/anatomy">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Anatomy Explorer
          </Link>
        </Button>
      </div>
    );
  }

  const SystemIcon = system.icon;

  return (
    <div className="space-y-10">
      <Button variant="ghost" asChild className="mb-2 text-primary hover:text-primary/80 hover:bg-primary/10 pl-0">
        <Link href="/anatomy" className="inline-flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Anatomy Explorer
        </Link>
      </Button>

      <Card className="shadow-2xl border-primary/20 overflow-hidden bg-card">
        <CardHeader className="bg-gradient-to-br from-card to-muted/50 p-6 md:p-8 text-center">
          <SystemIcon className={`h-20 w-20 md:h-24 md:w-24 ${system.color || 'text-primary'} mx-auto mb-4`} />
          <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl text-primary" role="heading" aria-level={1}>{system.name}</CardTitle>
          {system.details.sanskritName && (
            <p className="text-lg md:text-xl text-muted-foreground/80 font-serif mt-1">{system.details.sanskritName}</p>
          )}
          <CardDescription className="text-md md:text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">{system.details.overview || system.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8 space-y-10">
          
          <div className="w-full relative my-6 shadow-xl rounded-lg overflow-hidden border border-border">
            <Image
              src={`https://placehold.co/1200x400.png`}
              alt={`${system.name} diagram - detailed illustration of the ${system.details.imageHint || system.name.toLowerCase()}`}
              width={1200}
              height={400}
              className="w-full h-auto block object-cover"
              data-ai-hint={system.details.imageHint || system.name.split(' ')[0].toLowerCase()}
              sizes="100vw"
              priority
            />
          </div>
          {system.details.illustrationCaption && (
            <div className="text-center max-w-2xl mx-auto -mt-2 mb-6">
              <p className="text-sm text-muted-foreground italic">
                {system.details.illustrationCaption.description}
              </p>
            </div>
          )}
          
          <div className="max-w-4xl mx-auto space-y-10">
            <DetailSection title="Detailed Overview" icon={Microscope}>
              <p className="text-muted-foreground leading-relaxed">{system.details.overview || system.description}</p>
            </DetailSection>

            {(system.details.keyComponents || system.details.keyOrgans) && (
              <DetailSection title={`Key Components of the ${system.name}`} icon={ListChecks}>
                <ComponentList items={system.details.keyComponents || system.details.keyOrgans!} titleSingular="Component" />
              </DetailSection>
            )}
            
            {system.details.majorGlands && system.details.majorGlands.length > 0 && (
              <DetailSection title={`Major Glands in the ${system.name}`} icon={ListChecks}>
                <ComponentList items={system.details.majorGlands} titleSingular="Gland" />
              </DetailSection>
            )}

            {system.details.lymphNodeDetails && (
              <DetailSection title="Lymph Node Details" icon={NetworkIcon}>
                <Card className="bg-card/50 p-4 shadow-sm">
                  <p className="text-muted-foreground mb-2">{system.details.lymphNodeDetails.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground mb-1">Key Locations:</h3>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        {system.details.lymphNodeDetails.locations.map(loc => <li key={loc}>{loc}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-foreground mb-1">Main Functions:</h3>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        {system.details.lymphNodeDetails.functions.map(func => <li key={func}>{func}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-semibold text-sm text-foreground mb-1">Structure:</h3>
                    <ul className="list-disc list-inside text-xs text-muted-foreground">
                      <li><strong>Capsule:</strong> {system.details.lymphNodeDetails.structure.capsule}</li>
                      <li><strong>Cortex:</strong> {system.details.lymphNodeDetails.structure.cortex}</li>
                      <li><strong>Medulla:</strong> {system.details.lymphNodeDetails.structure.medulla}</li>
                      <li><strong>Afferent Vessels:</strong> {system.details.lymphNodeDetails.structure.afferentVessels}</li>
                      <li><strong>Efferent Vessel:</strong> {system.details.lymphNodeDetails.structure.efferentVessel}</li>
                    </ul>
                  </div>
                </Card>
              </DetailSection>
            )}

            {system.details.immuneCells && (
              <DetailSection title="Key Immune Cells" icon={UsersRound}>
                <Accordion type="multiple" className="w-full space-y-3">
                  <AccordionItem value="lymphocytes" className="border border-border rounded-lg bg-card/50 shadow-sm">
                    <AccordionTrigger className="text-md hover:text-accent p-3 font-medium">Lymphocytes</AccordionTrigger>
                    <AccordionContent className="p-3 pt-0 text-sm text-muted-foreground space-y-2">
                      <h3 className="font-semibold text-xs text-foreground">T-Cells:</h3>
                      <ul className="list-disc list-inside pl-2">
                        {Object.entries(system.details.immuneCells.Lymphocytes.TCells.types).map(([type, desc]) => (
                          <li key={type}><strong>{type}:</strong> {desc}</li>
                        ))}
                      </ul>
                       <h3 className="font-semibold text-xs text-foreground mt-1">B-Cells:</h3>
                       <p>{system.details.immuneCells.Lymphocytes.BCells.description}</p>
                       <p><em>Plasma Cells:</em> {system.details.immuneCells.Lymphocytes.BCells.plasmaCells}</p>
                       <h3 className="font-semibold text-xs text-foreground mt-1">Natural Killer Cells:</h3>
                       <p>{system.details.immuneCells.Lymphocytes.NaturalKillerCells.description}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="phagocytes" className="border border-border rounded-lg bg-card/50 shadow-sm">
                    <AccordionTrigger className="text-md hover:text-accent p-3 font-medium">Phagocytes</AccordionTrigger>
                    <AccordionContent className="p-3 pt-0 text-sm text-muted-foreground space-y-1">
                      <p><strong>Macrophages:</strong> {system.details.immuneCells.Phagocytes.Macrophages}</p>
                      <p><strong>Dendritic Cells:</strong> {system.details.immuneCells.Phagocytes.DendriticCells}</p>
                      <p><strong>Neutrophils:</strong> {system.details.immuneCells.Phagocytes.Neutrophils}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </DetailSection>
            )}

            {system.details.defenseMechanisms && (
              <DetailSection title="Defense Mechanisms of the Immune System" icon={ShieldCheck}>
                 <Accordion type="multiple" className="w-full space-y-3">
                  <AccordionItem value="innate" className="border border-border rounded-lg bg-card/50 shadow-sm">
                    <AccordionTrigger className="text-md hover:text-accent p-3 font-medium">Innate Immunity</AccordionTrigger>
                    <AccordionContent className="p-3 pt-0 text-sm text-muted-foreground space-y-2">
                      <p>{system.details.defenseMechanisms.InnateImmunity.description}</p>
                      {system.details.defenseMechanisms.InnateImmunity.components && (
                        <>
                          <h3 className="font-semibold text-xs text-foreground mt-1">Components:</h3>
                          <ul className="list-disc list-inside pl-2">
                            {system.details.defenseMechanisms.InnateImmunity.components.map(comp => <li key={comp}>{comp}</li>)}
                          </ul>
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="adaptive" className="border border-border rounded-lg bg-card/50 shadow-sm">
                    <AccordionTrigger className="text-md hover:text-accent p-3 font-medium">Adaptive Immunity</AccordionTrigger>
                    <AccordionContent className="p-3 pt-0 text-sm text-muted-foreground space-y-2">
                      <p>{system.details.defenseMechanisms.AdaptiveImmunity.description}</p>
                      {system.details.defenseMechanisms.AdaptiveImmunity.features && (
                        <>
                          <h3 className="font-semibold text-xs text-foreground mt-1">Features:</h3>
                          <ul className="list-disc list-inside pl-2">
                            {system.details.defenseMechanisms.AdaptiveImmunity.features.map(feat => <li key={feat}>{feat}</li>)}
                          </ul>
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </DetailSection>
            )}

            {system.details.divisions && system.details.divisions.length > 0 && (
              <DetailSection title="Nervous System Divisions" icon={SplitSquareVertical}>
                <ComponentList items={system.details.divisions} titleSingular="Division" />
              </DetailSection>
            )}

            {(system.details.primaryFunctions || system.details.functions) && (
              <DetailSection title={`Primary Functions of the ${system.name}`} icon={Activity}>
                 <ComponentList items={system.details.primaryFunctions || system.details.functions!} titleSingular="Function" />
              </DetailSection>
            )}
            
            {system.details.keyProcesses && system.details.keyProcesses.length > 0 && (
              <DetailSection title={`Key Processes in the ${system.name}`} icon={Cog}>
                <ComponentList items={system.details.keyProcesses} titleSingular="Process" />
              </DetailSection>
            )}
            
            {system.details.neurotransmitters && system.details.neurotransmitters.length > 0 && (
              <DetailSection title="Key Neurotransmitters" icon={ZapIcon}>
                <ComponentList items={system.details.neurotransmitters} titleSingular="Neurotransmitter" />
              </DetailSection>
            )}

            {system.details.typesOfBreathing && system.details.typesOfBreathing.length > 0 && (
              <DetailSection title="Types of Breathing" icon={WindIcon}>
                <ComponentList items={system.details.typesOfBreathing} titleSingular="Breathing Type" />
              </DetailSection>
            )}
            
            {system.details.urineFormationStages && system.details.urineFormationStages.length > 0 && (
                <DetailSection title="Urine Formation Stages" icon={Filter}>
                    <ComponentList items={system.details.urineFormationStages} titleSingular="Stage" />
                </DetailSection>
            )}

            {system.details.skeletalDivisions && system.details.skeletalDivisions.length > 0 && (
              <DetailSection title="Skeletal Divisions" icon={GitFork}>
                <ComponentList items={system.details.skeletalDivisions} titleSingular="Division" />
              </DetailSection>
            )}
            
            {system.details.typesOfCirculation && system.details.typesOfCirculation.length > 0 && (
              <DetailSection title="Types of Circulation" icon={Droplets}> 
                <ComponentList items={system.details.typesOfCirculation} titleSingular="Circulation Type" />
              </DetailSection>
            )}

            {system.details.boneTypes && system.details.boneTypes.length > 0 && (
              <DetailSection title="Types of Bones" icon={Shapes}>
                <div className="flex flex-wrap gap-2">
                  {system.details.boneTypes.map(type => <Badge key={type} variant="secondary" className="text-sm">{type}</Badge>)}
                </div>
              </DetailSection>
            )}

            {system.details.muscleGroups && system.details.muscleGroups.length > 0 && (
              <DetailSection title="Major Muscle Groups" icon={Dumbbell}>
                <Accordion type="multiple" className="w-full space-y-3">
                  {system.details.muscleGroups.map((group: MuscleGroup, index: number) => (
                    <AccordionItem value={`muscle-group-${index}`} key={index} className="border border-border rounded-lg bg-card/50 shadow-sm">
                      <AccordionTrigger className="text-md hover:text-accent p-3 font-medium">
                        {group.group}
                      </AccordionTrigger>
                      <AccordionContent className="p-3 pt-0 text-sm text-muted-foreground">
                        <ul className="list-disc list-inside">
                          {group.examples.map(example => <li key={example}>{example}</li>)}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </DetailSection>
            )}

            {system.details.muscleTypes && system.details.muscleTypes.length > 0 && (
                <DetailSection title="Types of Muscles" icon={LayersIcon}>
                    <div className="overflow-x-auto rounded-lg border shadow-md">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Control</TableHead>
                                    <TableHead>Appearance</TableHead>
                                    <TableHead>Location</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {system.details.muscleTypes.map((type: MuscleType) => (
                                    <TableRow key={type.type}>
                                        <TableCell className="font-medium text-foreground">{type.type}</TableCell>
                                        <TableCell className="text-muted-foreground">{type.control}</TableCell>
                                        <TableCell className="text-muted-foreground">{type.appearance}</TableCell>
                                        <TableCell className="text-muted-foreground">{type.location}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </DetailSection>
            )}
            
            {system.details.digestionPhases && system.details.digestionPhases.length > 0 && (
              <DetailSection title="Digestion Phases" icon={Clock}>
                <ComponentList items={system.details.digestionPhases} titleSingular="Phase" />
              </DetailSection>
            )}

            {system.details.enzymesAndHormones && system.details.enzymesAndHormones.length > 0 && (
              <DetailSection title="Key Enzymes & Hormones (Digestive)" icon={FlaskConical}>
                <div className="overflow-x-auto rounded-lg border shadow-md">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Function</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {system.details.enzymesAndHormones.map((item: EnzymeHormoneDetail) => (
                        <TableRow key={item.name}>
                          <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                          <TableCell className="text-muted-foreground">{item.source}</TableCell>
                          <TableCell className="text-muted-foreground">{item.function}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DetailSection>
            )}

            {system.details.keyHormones && system.details.keyHormones.length > 0 && (
              <DetailSection title="Key Hormones (Endocrine)" icon={FlaskConical}>
                <div className="overflow-x-auto rounded-lg border shadow-md">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Produced By</TableHead>
                        <TableHead>Function</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {system.details.keyHormones.map((item: HormoneDetail) => (
                        <TableRow key={item.name}>
                          <TableCell className="font-medium text-foreground">{item.name}</TableCell>
                          <TableCell className="text-muted-foreground">{item.producedBy || 'N/A'}</TableCell>
                          <TableCell className="text-muted-foreground">{item.function}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </DetailSection>
            )}

            {(system.details.healthAndWellness || system.details.healthTips) && (
              <DetailSection title={`Health & Wellness for the ${system.name}`} icon={ShieldCheck}>
                {system.details.healthAndWellness ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Tips for Maintenance:</h3>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-5">
                        {system.details.healthAndWellness.tips.map(tip => <li key={tip}>{tip}</li>)}
                      </ul>
                    </div>
                    {system.details.healthAndWellness.preventiveCare && system.details.healthAndWellness.preventiveCare.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-foreground mb-2 mt-4">Preventive Care:</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-5">
                          {system.details.healthAndWellness.preventiveCare.map(tip => <li key={tip}>{tip}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground pl-5">
                    {system.details.healthTips!.map(tip => <li key={tip}>{tip}</li>)}
                  </ul>
                )}
                <p className="mt-4 text-sm text-muted-foreground/80">
                  Maintaining a healthy lifestyle, proper nutrition, and regular check-ups are important for the well-being of the {system.name.toLowerCase()}. Consult with healthcare professionals for personalized advice.
                </p>
              </DetailSection>
            )}
            
            {system.details.commonDisorders && system.details.commonDisorders.length > 0 && (
              <DetailSection title={`Common Disorders of the ${system.name}`} icon={AlertTriangle}>
                <ComponentList items={system.details.commonDisorders} titleSingular="Disorder" />
              </DetailSection>
            )}

            {system.details.interestingFacts && system.details.interestingFacts.length > 0 && (
              <DetailSection title={`Interesting Facts about the ${system.name}`} icon={Lightbulb}>
                <ul className="space-y-2">
                  {system.details.interestingFacts.map((fact, index) => (
                    <li key={index} className="flex items-start text-muted-foreground">
                      <Dot className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0"/>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}
            
            {system.details.relatedSystems && system.details.relatedSystems.length > 0 && (
                <DetailSection title={`Related Systems to the ${system.name}`} icon={UsersIcon}>
                    <div className="flex flex-wrap gap-2">
                        {system.details.relatedSystems.map(related => {
                            const relatedSystemSlug = slugify(typeof related === 'string' ? related : String(related));
                            const relatedSystemMatch = systems.find(s => s.slug === relatedSystemSlug);
                            return (
                                relatedSystemMatch ? (
                                <Link key={relatedSystemSlug} href={`/anatomy/${relatedSystemSlug}`}>
                                    <Badge variant="outline" className="text-sm p-2 hover:bg-accent hover:text-accent-foreground transition-colors">
                                        {typeof related === 'string' ? related : String(related)}
                                    </Badge>
                                </Link>
                                ) : (
                                <Badge key={typeof related === 'string' ? related : String(related)} variant="outline" className="text-sm p-2">
                                    {typeof related === 'string' ? related : String(related)}
                                </Badge>
                                )
                            );
                        })}
                    </div>
                </DetailSection>
            )}

            {system.details.externalResources && system.details.externalResources.length > 0 && (
              <DetailSection title="External Resources for Further Study" icon={LinkIcon}>
                <ul className="space-y-2">
                  {system.details.externalResources.map(resource => (
                    <li key={resource.url}>
                      <Button variant="link" asChild className="p-0 h-auto text-accent hover:underline">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                          {resource.title} <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
