
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wind, Zap, Moon, Sunrise, Waves, CheckCircle, Lightbulb, CalendarDays, UserCheck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Breath Awareness Training | Pranayama Practices | Kosha Explorer',
  description: 'Learn guided pranayama techniques like Nadi Shodhana, Bhastrika, and Ujjayi to balance your Pranamaya Kosha (energy body), calm your mind, and enhance vitality.',
  keywords: ['Pranayama', 'Breathwork', 'Nadi Shodhana', 'Bhastrika', 'Ujjayi', 'Pranamaya Kosha', 'Energy Healing', 'Mindfulness', 'Stress Reduction'],
  openGraph: {
    title: 'Breath Awareness Training | Pranayama Practices | Kosha Explorer',
    description: 'Master your breath with guided pranayama techniques. Balance energy, calm the mind, and enhance vitality with Kosha Explorer.',
    url: `${siteBaseUrl}/pranamaya/breath-awareness`,
    type: 'article',
    images: [
      {
        url: `https://picsum.photos/seed/breath-awareness-og/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Breath Awareness Training - Pranayama Practices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Breath Awareness Training | Kosha Explorer',
    description: 'Explore guided pranayama practices like Nadi Shodhana, Bhastrika, and Ujjayi for energy balance and mental clarity.',
    images: [`https://picsum.photos/seed/breath-awareness-twitter/1200/630`],
  },
};

const pranayamaTechniques = [
  {
    id: "nadi-shodhana",
    name: "Nadi Shodhana (Alternate Nostril Breathing)",
    icon: Sunrise, // Represents balance and calm start
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
    icon: Zap, // Represents energy
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
    icon: Waves, // Represents the oceanic sound
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
  return (
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
  );
}
