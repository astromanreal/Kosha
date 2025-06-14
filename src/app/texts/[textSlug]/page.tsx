
import type { Metadata } from 'next';
import { texts, getTextBySlug, type TextInfo } from '@/app/texts/textsData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpenCheck, ExternalLink, Layers, Star, Info, BookMarked, Zap, Users, ChevronsRight, Milestone, Quote, Library, HelpCircle, BookCopy, Brain, Sun, AlignLeft, University, Leaf, Flame, GitBranch, Palette, BarChart3, Users2, Settings2, Lightbulb as LightbulbIcon, Edit3 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export async function generateStaticParams() {
  return texts.map((text) => ({
    textSlug: text.slug,
  }));
}

export async function generateMetadata({ params }: { params: { textSlug: string } }): Promise<Metadata> {
  const text = getTextBySlug(params.textSlug);
  if (!text) {
    return {
      title: 'Spiritual Text Not Found | Kosha Explorer Library',
      description: 'The requested spiritual text or philosophical writing could not be found in the Kosha Explorer library. Explore our curated collection.',
      robots: { index: false, follow: false }
    };
  }
  const pageTitle = `${text.title} | ${text.category} Wisdom | Kosha Explorer`;
  const pageDescription = `An in-depth exploration of ${text.title}, a key text in ${text.category}. Discover its significance, key concepts like ${text.keyConcepts.slice(0,2).join(', ')}, and its relevance to understanding the Pancha Koshas and holistic spirituality with Kosha Explorer.`;
  const pageKeywords = [
    text.title, text.category, text.origin, 
    ...(text.keyConcepts || []).slice(0, 5), 
    "Spiritual Philosophy Explained", "Ancient Wisdom Texts", "Pancha Kosha Insights from Scriptures", "Yoga Texts Analysis", "Vedanta Philosophy Study"
  ].filter(Boolean).slice(0, 15);

  const imageUrl = `https://placehold.co/1200x630.png?text=${encodeURIComponent(text.title)}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: pageKeywords.join(', '),
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteBaseUrl}/texts/${text.slug}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Exploring the wisdom of the spiritual text ${text.title} on Kosha Explorer.`,
        },
      ],
      article: {
        publishedTime: "2024-01-01T00:00:00.000Z",
        modifiedTime: new Date().toISOString(),
        authors: [`${siteBaseUrl}/about`],
        section: text.category,
        tags: pageKeywords,
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `Deep Dive into ${text.title} | Kosha Explorer Texts`,
      description: pageDescription,
      images: [imageUrl],
    },
    robots: {
        index: true,
        follow: true,
    }
  };
}

interface SectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const DetailSectionAccordion: React.FC<SectionProps> = ({ title, icon: Icon, children, defaultOpen = false }) => (
  <AccordionItem value={title.toLowerCase().replace(/\s+/g, '-')} className="border-border bg-card/50 shadow-sm rounded-lg">
    <AccordionTrigger className="text-lg hover:text-accent p-4 font-medium text-left">
      <div className="flex items-center">
        <Icon className="mr-3 h-5 w-5 text-primary flex-shrink-0" /> {title}
      </div>
    </AccordionTrigger>
    <AccordionContent className="p-4 pt-0 text-muted-foreground leading-relaxed space-y-2 text-sm">
      {children}
    </AccordionContent>
  </AccordionItem>
);

export default function TextDetailPage({ params }: { params: { textSlug: string } }) {
  const text = getTextBySlug(params.textSlug);

  if (!text) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive mb-6">Spiritual Text Not Found</h1>
        <p className="text-muted-foreground mb-8">The spiritual text or philosophical writing you are looking for does not exist.</p>
        <Button asChild variant="outline">
          <Link href="/texts">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Texts Browser
          </Link>
        </Button>
      </div>
    );
  }

  const PageIcon = text.icon && typeof text.icon !== 'string' ? text.icon : HelpCircle;
  const pageUrl = `${siteBaseUrl}/texts/${text.slug}`;
  const pageTitle = `${text.title} | ${text.category} Wisdom | Kosha Explorer`;
  // Description for schema from function, ensuring it's defined
  const pageDescription = `An in-depth exploration of ${text.title}, a key text in ${text.category}. Discover its significance, key concepts like ${text.keyConcepts.slice(0,2).join(', ')}, and its relevance to understanding the Pancha Koshas and holistic spirituality.`;
  const imageUrl = `https://placehold.co/1200x630.png?text=${encodeURIComponent(text.title)}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle", // Or "Article" if more general
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": pageUrl
    },
    "headline": pageTitle,
    "description": pageDescription,
    "image": imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Kosha Explorer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kosha Explorer",
      "logo": {
        "@type": "ImageObject",
        "url": `https://placehold.co/200x60.png?text=Kosha+Explorer+Logo`
      }
    },
    "datePublished": "2024-01-01", // Generic publication date
    "dateModified": new Date().toISOString().split('T')[0],
    "articleSection": text.category,
    "keywords": text.keyConcepts.join(", ")
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteBaseUrl
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Ancient Texts",
      "item": `${siteBaseUrl}/texts`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": text.title,
      "item": pageUrl
    }]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="space-y-8">
        <Button variant="ghost" asChild className="mb-2 text-primary hover:text-primary/80 hover:bg-primary/10 pl-0">
          <Link href="/texts" className="inline-flex items-center">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to All Spiritual Texts
          </Link>
        </Button>

        <Card className="shadow-2xl border-primary/20 overflow-hidden bg-card">
          <CardHeader className="bg-gradient-to-br from-card to-muted/50 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {PageIcon && <PageIcon className={`h-16 w-16 md:h-20 md:w-20 text-accent flex-shrink-0`} />}
              <div>
                <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary" role="heading" aria-level={1}>{text.title}</CardTitle>
                <CardDescription className="text-md md:text-lg text-muted-foreground mt-1">
                  Category: {text.category} <br /> Origin: <span className="italic">{text.origin}</span>
                  {text.associatedVeda && <><br/>Associated Veda: <span className="italic">{text.associatedVeda}</span></>}
                  {text.author && <><br/>Author/Compiler: <span className="italic">{text.author}</span></>}
                  {text.translation && <><br/>"{text.translation}"</>}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            
            <div className="aspect-video w-full max-w-2xl mx-auto relative my-4 shadow-lg rounded-lg overflow-hidden border border-border">
              <Image
                src={`https://placehold.co/800x450.png`}
                alt={`Illustration representing the spiritual text ${text.title} and its key concepts`}
                fill
                className="object-cover"
                data-ai-hint={text.imageHint || text.title.toLowerCase()}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                priority
              />
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              <Accordion type="multiple" defaultValue={['significance', 'key-concepts', 'pancha-kosha']}>
                <DetailSectionAccordion title={`Significance of ${text.title}`} icon={Star} defaultOpen>
                  <p className="text-base leading-relaxed">{text.significance}</p>
                </DetailSectionAccordion>

                {text.structureDetails && (
                  <DetailSectionAccordion title={`Structure of ${text.title}`} icon={AlignLeft}>
                      <p>{text.structureDetails}</p>
                  </DetailSectionAccordion>
                )}
                {text.structure && ( 
                  <DetailSectionAccordion title={`Structure of ${text.title}`} icon={AlignLeft}>
                      <p>Chapters: {text.structure.chapters}</p>
                      <p>Dialogue: {text.structure.dialogue}</p>
                  </DetailSectionAccordion>
                )}

                {text.philosophicalSchool && (
                    <DetailSectionAccordion title="Philosophical School" icon={University}>
                        <p>{text.philosophicalSchool}</p>
                    </DetailSectionAccordion>
                )}
                {text.philosophy && ( 
                    <DetailSectionAccordion title="Philosophy" icon={University}>
                        <p>{text.philosophy}</p>
                    </DetailSectionAccordion>
                )}
                {text.philosophicalBase && ( 
                    <DetailSectionAccordion title="Philosophical Base" icon={University}>
                        <p>{text.philosophicalBase}</p>
                    </DetailSectionAccordion>
                )}

                {text.purpose && (
                  <DetailSectionAccordion title={`Purpose of ${text.title}`} icon={BookMarked}>
                    <p>{text.purpose}</p>
                  </DetailSectionAccordion>
                )}
                {text.primaryGoal && ( 
                  <DetailSectionAccordion title="Primary Goal" icon={BookMarked}>
                    <p>{text.primaryGoal}</p>
                  </DetailSectionAccordion>
                )}

                {text.sections && text.sections.length > 0 && (
                  <DetailSectionAccordion title="Key Sections" icon={Library}>
                    <ul className="list-disc list-inside space-y-1">
                      {text.sections.map((section, index) => <li key={index}>{section}</li>)}
                    </ul>
                  </DetailSectionAccordion>
                )}

                {text.keyConcepts && text.keyConcepts.length > 0 && (
                  <DetailSectionAccordion title={`Key Concepts in ${text.title}`} icon={BookOpenCheck} defaultOpen>
                    <ul className="list-disc list-inside space-y-1">
                      {text.keyConcepts.map((concept, index) => <li key={index}>{concept}</li>)}
                    </ul>
                  </DetailSectionAccordion>
                )}
                {text.coreThemes && text.coreThemes.length > 0 && ( 
                  <DetailSectionAccordion title={`Core Themes in ${text.title}`} icon={BookOpenCheck} defaultOpen>
                    <ul className="list-disc list-inside space-y-1">
                      {text.coreThemes.map((theme, index) => <li key={index}>{theme}</li>)}
                    </ul>
                  </DetailSectionAccordion>
                )}

                {text.coreTeachings && ( 
                  <DetailSectionAccordion title="Core Teachings" icon={Brain}>
                    {text.coreTeachings.fourfoldQualifications && (
                      <div className="mb-3">
                        <h3 className="font-semibold text-foreground mb-1">{text.coreTeachings.fourfoldQualifications.description}:</h3>
                        <ul className="list-disc list-inside ml-4">
                          {text.coreTeachings.fourfoldQualifications.components.map(comp => <li key={comp}>{comp}</li>)}
                        </ul>
                      </div>
                    )}
                    {text.coreTeachings.natureOfSelf && (
                      <div className="mb-3">
                        <h3 className="font-semibold text-foreground mb-1">Nature of Self: {text.coreTeachings.natureOfSelf.description}</h3>
                        <ul className="list-disc list-inside ml-4">
                          {text.coreTeachings.natureOfSelf.attributes.map(attr => <li key={attr}>{attr}</li>)}
                        </ul>
                      </div>
                    )}
                    {text.coreTeachings.method && (
                      <div className="mb-3">
                        <h3 className="font-semibold text-foreground mb-1">Method ({text.coreTeachings.method.path}):</h3>
                        <ul className="list-disc list-inside ml-4">
                          {text.coreTeachings.method.steps.map(step => <li key={step}>{step}</li>)}
                        </ul>
                      </div>
                    )}
                    {text.coreTeachings.goal && <p><strong>Goal:</strong> {text.coreTeachings.goal}</p>}
                  </DetailSectionAccordion>
                )}

                {text.keyTeachings && ( 
                  <DetailSectionAccordion title="Key Teachings" icon={Brain}>
                    {Object.entries(text.keyTeachings).map(([key, teachingValue]) => (
                      <div key={key} className="mb-3">
                        <h3 className="font-semibold text-foreground capitalize mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}:</h3>
                        {typeof teachingValue === 'object' && teachingValue !== null ? (
                          <>
                            {'description' in teachingValue && typeof teachingValue.description === 'string' && <p className="mb-1">{teachingValue.description}</p>}
                            {'Brahman' in teachingValue && typeof teachingValue.Brahman === 'string' && <p><strong>Brahman:</strong> {teachingValue.Brahman}</p>}
                            {'Atman' in teachingValue && typeof teachingValue.Atman === 'string' && <p><strong>Atman:</strong> {teachingValue.Atman}</p>}
                            {'Jagat' in teachingValue && typeof teachingValue.Jagat === 'string' && <p><strong>Jagat (World):</strong> {teachingValue.Jagat}</p>}
                            {'characteristics' in teachingValue && Array.isArray(teachingValue.characteristics) && (
                              <ul className="list-disc list-inside ml-4">
                                  {teachingValue.characteristics.map((char: string) => <li key={char}>{char}</li>)}
                              </ul>
                            )}
                            {'recommendedPractices' in teachingValue && Array.isArray(teachingValue.recommendedPractices) && (
                              <ul className="list-disc list-inside ml-4">
                                  {teachingValue.recommendedPractices.map((prac: string) => <li key={prac}>{prac}</li>)}
                              </ul>
                            )}
                            {'importance' in teachingValue && typeof teachingValue.importance === 'string' && <p><strong>Importance:</strong> {teachingValue.importance}</p>}
                            {'quote' in teachingValue && typeof teachingValue.quote === 'string' && <p className="italic">"{teachingValue.quote}"</p>}
                          </>
                        ) : (
                          <p>{String(teachingValue)}</p>
                        )}
                      </div>
                    ))}
                  </DetailSectionAccordion>
                )}

                {text.panchaKosha && (
                  <DetailSectionAccordion title={`Pancha Kosha in ${text.title}`} icon={Layers} defaultOpen>
                    <p className="mb-3 text-foreground/90">{text.panchaKosha.description}</p>
                    <Accordion type="multiple" className="w-full space-y-2">
                      {text.panchaKosha.sheaths.map(sheath => (
                        <AccordionItem key={sheath.name} value={sheath.name.toLowerCase()} className="border-border bg-card/30 shadow-xs rounded-md">
                          <AccordionTrigger className="text-sm hover:text-accent p-3 font-medium text-left">
                            {sheath.layer}. {sheath.name} ({sheath.translation})
                          </AccordionTrigger>
                          <AccordionContent className="p-3 pt-0 text-xs">
                            <p className="mb-1">{sheath.description}</p>
                            <strong className="text-foreground/80">Attributes:</strong>
                            <ul className="list-disc list-inside pl-4 space-y-0.5 mt-1">
                              {sheath.attributes.map(attr => <li key={attr}>{attr}</li>)}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </DetailSectionAccordion>
                )}
                {text.panchaKoshaDetails && !text.panchaKosha && ( 
                  <DetailSectionAccordion title={`Pancha Kosha in ${text.title}`} icon={Layers}>
                    {Object.entries(text.panchaKoshaDetails).map(([key, value]) => (
                      <div key={key} className="mb-2">
                        <strong className="text-foreground/90">{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {typeof value === 'string' ? value : JSON.stringify(value)}
                      </div>
                    ))}
                  </DetailSectionAccordion>
                )}
                {text.panchaKoshaApplication && ( 
                  <DetailSectionAccordion title="Pancha Kosha Application" icon={Layers} defaultOpen>
                    {Object.entries(text.panchaKoshaApplication).map(([koshaKey, koshaValue]) => (
                      koshaValue && ( 
                        <div key={koshaKey} className="mb-3 p-2 border-b border-border/50">
                          <h3 className="font-semibold text-foreground mb-1">{koshaKey.replace('Kosha', ' Kosha')}: <span className="font-normal text-muted-foreground text-xs">{koshaValue.description}</span></h3>
                          {koshaValue.modernPractices && koshaValue.modernPractices.length > 0 && (
                            <>
                              <strong className="text-xs text-foreground/80">Modern Practices:</strong>
                              <ul className="list-disc list-inside ml-4 text-xs">
                                {koshaValue.modernPractices.map(practice => <li key={practice}>{practice}</li>)}
                              </ul>
                            </>
                          )}
                        </div>
                      )
                    ))}
                  </DetailSectionAccordion>
                )}

                {text.majorContributors && text.majorContributors.length > 0 && (
                  <DetailSectionAccordion title="Major Contributors" icon={Users}>
                    <div className="flex flex-wrap gap-2">
                      {text.majorContributors.map(contrib => (
                        <span key={contrib} className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground">{contrib}</span>
                      ))}
                    </div>
                  </DetailSectionAccordion>
                )}

                {text.therapeuticApplications && (
                  <DetailSectionAccordion title="Therapeutic Applications" icon={Leaf}>
                    {text.therapeuticApplications.yogaTherapy && (
                      <div className="mb-2">
                        <h3 className="font-semibold text-foreground mb-1">Yoga Therapy: {text.therapeuticApplications.yogaTherapy.description}</h3>
                        <ul className="list-disc list-inside ml-4">
                          {text.therapeuticApplications.yogaTherapy.uses.map(use => <li key={use}>{use}</li>)}
                        </ul>
                      </div>
                    )}
                    {text.therapeuticApplications.ayurvedicIntegration && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Ayurvedic Integration: {text.therapeuticApplications.ayurvedicIntegration.description}</h3>
                        <ul className="list-disc list-inside ml-4">
                          {text.therapeuticApplications.ayurvedicIntegration.methods.map(method => <li key={method}>{method}</li>)}
                        </ul>
                      </div>
                    )}
                  </DetailSectionAccordion>
                )}

                {text.teachingMethods && (
                  <DetailSectionAccordion title="Teaching Methods" icon={Edit3}>
                    {text.teachingMethods.settings && (
                      <div className="mb-2">
                        <h3 className="font-semibold text-foreground mb-1">Settings:</h3>
                        <p className="text-xs">{text.teachingMethods.settings.join(', ')}</p>
                      </div>
                    )}
                    {text.teachingMethods.media && (
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Media:</h3>
                        <p className="text-xs">{text.teachingMethods.media.join(', ')}</p>
                      </div>
                    )}
                  </DetailSectionAccordion>
                )}
                
                {text.visualIllustration && (
                  <DetailSectionAccordion title="Visual Illustration Concept" icon={Palette}>
                    <p><strong>Concept:</strong> {text.visualIllustration.concept}</p>
                    {text.visualIllustration.layers && text.visualIllustration.layers.length > 0 && (
                      <>
                        <p className="mt-1"><strong>Layers:</strong></p>
                        <ul className="list-disc list-inside ml-4 text-xs">
                          {text.visualIllustration.layers.map(layer => <li key={layer}>{layer}</li>)}
                        </ul>
                      </>
                    )}
                    {text.visualIllustration.usage && <p className="mt-1"><strong>Usage:</strong> {text.visualIllustration.usage}</p>}
                  </DetailSectionAccordion>
                )}

                {text.realizationPath && (
                  <DetailSectionAccordion title="Path to Realization" icon={Milestone}>
                    <p><strong>From:</strong> {text.realizationPath.from}</p>
                    <p><strong>To:</strong> {text.realizationPath.to}</p>
                    <p><strong>Culminates In:</strong> {text.realizationPath.culminatesIn}</p>
                  </DetailSectionAccordion>
                )}
                
                {text.teacherAndStudent && ( 
                  <DetailSectionAccordion title="Teacher & Student Dynamic" icon={Users2}>
                      {text.teacherAndStudent.dialogueFormat && <p>Presented in a dialogue format.</p>}
                      <p><strong>Teacher:</strong> {text.teacherAndStudent.teacher}</p>
                      <p><strong>Student:</strong> {text.teacherAndStudent.student}</p>
                      {text.teacherAndStudent.symbolism && <p><strong>Symbolism:</strong> {text.teacherAndStudent.symbolism}</p>}
                  </DetailSectionAccordion>
                )}

                {text.cosmicContext && ( 
                  <DetailSectionAccordion title="Cosmic Context" icon={Zap}>
                      <p><strong>Deity:</strong> {text.cosmicContext.deity}</p>
                      <p><strong>Symbolism:</strong> {text.cosmicContext.symbolism}</p>
                      <p><strong>Receiver:</strong> {text.cosmicContext.receiver}</p>
                  </DetailSectionAccordion>
                )}

                {text.metaphysicalInsights && ( 
                  <DetailSectionAccordion title="Metaphysical Insights" icon={LightbulbIcon}>
                      <p><strong>Illusion:</strong> {text.metaphysicalInsights.illusion}</p>
                      <p><strong>Freedom:</strong> {text.metaphysicalInsights.freedom}</p>
                      <p><strong>Non-duality:</strong> {text.metaphysicalInsights.nonDuality}</p>
                  </DetailSectionAccordion>
                )}

                {text.relatedConcepts && text.relatedConcepts.length > 0 && (
                  <DetailSectionAccordion title="Related Concepts" icon={GitBranch}>
                    <div className="flex flex-wrap gap-2">
                      {text.relatedConcepts.map(concept => (
                        <span key={concept} className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground">{concept}</span>
                      ))}
                    </div>
                  </DetailSectionAccordion>
                )}

                {text.recommendedPractices && text.recommendedPractices.length > 0 && ( 
                  <DetailSectionAccordion title="Recommended Practices" icon={Settings2}>
                      <ul className="list-disc list-inside">
                        {text.recommendedPractices.map(prac => <li key={prac}>{prac}</li>)}
                      </ul>
                  </DetailSectionAccordion>
                )}

                {text.quotes && text.quotes.length > 0 && (
                  <DetailSectionAccordion title="Key Quotes" icon={Quote}>
                    {text.quotes.map((quote, index) => (
                      <blockquote key={index} className="p-3 my-2 border-l-4 border-accent bg-muted/40 rounded-r-md">
                        {quote.chapter && quote.verse && <p className="text-xs text-muted-foreground/80 mb-1">Chapter {quote.chapter}, Verse {quote.verse}</p>}
                        {!quote.chapter && quote.verse && <p className="text-xs text-muted-foreground/80 mb-1">Verse {quote.verse}</p>}
                        <p className="italic text-foreground">"{quote.sanskrit}"</p>
                        <p className="mt-1">Translation: "{quote.translation}"</p>
                        {quote.context && <footer className="text-xs text-muted-foreground/80 mt-1">Context: {quote.context}</footer>}
                      </blockquote>
                    ))}
                  </DetailSectionAccordion>
                )}

                {text.externalResources && text.externalResources.length > 0 && (
                  <DetailSectionAccordion title="External Resources for Further Study" icon={Info}>
                    <ul className="space-y-2">
                      {text.externalResources.map(resource => (
                        <li key={resource.url}>
                          <Button variant="link" asChild className="p-0 h-auto text-accent hover:underline">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                              {resource.title} <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </DetailSectionAccordion>
                )}
                {text.recommendedResourcesList && (text.recommendedResourcesList.books?.length || text.recommendedResourcesList.organizations?.length) && (
                  <DetailSectionAccordion title="Recommended Resources" icon={BarChart3}>
                      {text.recommendedResourcesList.books && text.recommendedResourcesList.books.length > 0 && (
                          <div className="mb-2">
                              <h3 className="font-semibold text-foreground mb-1">Books:</h3>
                              <ul className="list-disc list-inside ml-4 text-xs">
                                  {text.recommendedResourcesList.books.map(book => <li key={book}>{book}</li>)}
                              </ul>
                          </div>
                      )}
                      {text.recommendedResourcesList.organizations && text.recommendedResourcesList.organizations.length > 0 && (
                          <div>
                              <h3 className="font-semibold text-foreground mb-1">Organizations:</h3>
                              <ul className="list-disc list-inside ml-4 text-xs">
                                  {text.recommendedResourcesList.organizations.map(org => <li key={org}>{org}</li>)}
                              </ul>
                          </div>
                      )}
                  </DetailSectionAccordion>
                )}
              </Accordion>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
