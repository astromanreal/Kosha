
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Zap, Moon, Sunrise, Waves, CheckCircle, Lightbulb, CalendarDays, UserCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Breath Awareness Training & Pranayama Practices | Pranamaya Kosha | Kosha Explorer',
  description: 'Master your breath with Kosha Explorer. Learn guided pranayama techniques like Nadi Shodhana, Bhastrika, and Ujjayi to balance your Pranamaya Kosha (energy body), calm your mind, reduce stress, and enhance vitality.',
  keywords: ['Pranayama Techniques Guide', 'Breathwork Exercises Online', 'Nadi Shodhana Instructions', 'Bhastrika Pranayama Benefits', 'Ujjayi Breath Tutorial', 'Pranamaya Kosha Balancing', 'Energy Healing Breathing Methods', 'Mindful Breathing Practices', 'Stress Reduction Breathing', 'Yoga Breathing Exercises', 'Vital Life Force Energy'],
  openGraph: {
    title: 'Guided Pranayama & Breath Awareness Training for Pranamaya Kosha | Kosha Explorer',
    description: 'Master your breath with guided pranayama techniques (Nadi Shodhana, Bhastrika, Ujjayi). Balance your Pranamaya Kosha (energy body), calm the mind, and enhance overall vitality.',
    url: `${siteBaseUrl}/pranamaya/breath-awareness`,
    type: 'article',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Pranayama+Breath+Awareness+Training`,
        width: 1200,
        height: 630,
        alt: 'Guided Breath Awareness Training and Pranayama Practices on Kosha Explorer',
      },
    ],
    article: {
      publishedTime: "2024-01-01T00:00:00.000Z",
      modifiedTime: new Date().toISOString(),
      authors: [`${siteBaseUrl}/about`],
      section: "Pranayama",
      tags: ['Pranayama', 'Breathwork', 'Pranamaya Kosha', 'Nadi Shodhana', 'Ujjayi'],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pranayama & Breathwork Guide for Energy Balancing | Kosha Explorer',
    description: 'Explore guided pranayama practices like Nadi Shodhana, Bhastrika, and Ujjayi for Pranamaya Kosha balance, energy enhancement, and mental clarity on Kosha Explorer.',
    images: [`https://placehold.co/1200x630.png?text=Pranayama+Breath+Awareness+Training`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const pranayamaTechniques = [
  {
    id: "nadi-shodhana",
    name: "Nadi Shodhana (Alternate Nostril Breathing)",
    icon: Sunrise, 
    description: "A powerful practice for calming the mind, balancing the hemispheres of the brain, and purifying energy channels (nadis). It involves alternately breathing through one nostril at a time.",
    benefits: [
      "Reduces stress and anxiety.",
      "Improves focus and concentration.",
      "Balances hormones.",
      "Supports respiratory function.",
      "Harmonizes Prana Vayus.",
    ],
    howItWillWork: "Visual cues for nostril switching, inhale, exhale, and optional retention timings. Customizable session length."
  },
  {
    id: "bhastrika",
    name: "Bhastrika (Bellows Breath)",
    icon: Zap, 
    description: "An energizing and detoxifying pranayama that involves forceful and rapid inhalations and exhalations, mimicking the action of a blacksmith's bellows. Increases prana and clears blockages.",
    benefits: [
      "Boosts energy levels and alertness.",
      "Clears nasal passages and lungs.",
      "Stimulates metabolism.",
      "Strengthens the nervous system.",
      "Prepares the mind for meditation.",
    ],
    howItWillWork: "Rhythmic audio/visual cues for rapid breaths, customizable rounds and speed. Caution for certain health conditions."
  },
  {
    id: "ujjayi",
    name: "Ujjayi (Victorious Breath)",
    icon: Waves, 
    description: "Also known as the 'ocean breath' or 'victorious breath', Ujjayi involves a gentle constriction at the back of the throat, creating a soft, audible hissing sound. It's calming and warming.",
    benefits: [
      "Calms the nervous system.",
      "Increases oxygenation and builds internal heat.",
      "Improves focus during asana practice.",
      "Can help regulate blood pressure.",
      "Promotes a meditative state.",
    ],
    howItWillWork: "Guidance on throat constriction, maintaining an even and smooth breath. Often integrated with mindful movement or meditation."
  }
];

export default function BreathAwarenessPage() {
  const pageUrl = `${siteBaseUrl}/pranamaya/breath-awareness`;
  const pageTitle = metadata.title as string;
  const pageDescription = metadata.description as string;
  const imageUrl = (metadata.openGraph?.images as any)?.[0]?.url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
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
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "articleSection": "Pranayama",
    "keywords": (metadata.keywords as string[]).join(", ")
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
      "name": "Pancha Koshas", // Assuming Pranamaya is under Koshas
      "item": `${siteBaseUrl}/koshas`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": "Pranamaya Kosha", // Placeholder, might need a dedicated Pranamaya landing page
      "item": `${siteBaseUrl}/koshas#pranamaya-kosha` // Or link to section on Koshas page
    },{
      "@type": "ListItem",
      "position": 4,
      "name": "Breath Awareness Training",
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
      <div className="space-y-12">
        <section className="text-center">
          <Wind className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Breath Awareness Training</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with your Pranamaya Kosha (energy body) through guided pranayama practices. Master your breath to balance energy, calm your mind, and enhance vitality.
          </p>
        </section>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Lightbulb className="h-7 w-7 mr-3 text-accent" />
              Why It's Important
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Your breath is the bridge between your body and mind. By training your breath through pranayama (yogic breathing techniques), you can:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4 pl-4">
              <li>Improve mental clarity and focus.</li>
              <li>Cultivate emotional balance and reduce stress.</li>
              <li>Enhance overall vitality and energy levels.</li>
              <li>Support better physical health by improving oxygen flow and respiratory function.</li>
            </ul>
          </CardContent>
        </Card>

        <section>
          <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-foreground">Guided Pranayama Techniques</h2>
              <p className="text-md text-muted-foreground max-w-xl mx-auto mt-2">
                Explore powerful ancient breathing practices with step-by-step guidance.
              </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {pranayamaTechniques.map((technique) => (
              <AccordionItem value={technique.id} key={technique.id} className="border border-border rounded-lg shadow-sm bg-card/50">
                <AccordionTrigger className="text-xl hover:text-accent p-4">
                  <div className="flex items-center">
                    <technique.icon className="h-7 w-7 mr-3 text-primary" />
                    {technique.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 space-y-4">
                  <p className="text-muted-foreground">{technique.description}</p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Key Benefits:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2 text-sm">
                      {technique.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Interactive Session:</h4>
                    <p className="text-sm text-muted-foreground mb-3">{technique.howItWillWork}</p>
                    <Button variant="outline" disabled className="w-full sm:w-auto">
                      Start Guided Session (Coming Soon)
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <UserCheck className="h-7 w-7 mr-3 text-accent" />
              How It Works (Future Feature)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Our upcoming interactive breathwork module will provide:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
              <li>
                <strong>Visual & Audio Cues:</strong> Clear guidance for inhale, exhale, and retention phases to help you maintain proper rhythm.
              </li>
              <li>
                <strong>Customizable Sessions:</strong> Choose a pranayama technique based on your intention (e.g., calm, focus, energize) and set session durations.
              </li>
              <li>
                <strong>Progress Tracking:</strong> Log your sessions and note any shifts in energy or mood to find your ideal daily breathwork practice.
              </li>
              <li>
                <strong>Routine Building:</strong> Set reminders to build a consistent pranayama schedule for morning, midday, or evening.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary flex items-center justify-center">
              <CalendarDays className="h-7 w-7 mr-3 text-accent" />
              Benefits of Regular Practice
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Consistent pranayama practice cultivates a deeper connection with your Pranamaya Kosha, leading to sustained improvements in physical health, mental clarity, emotional stability, and overall spiritual well-being.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
