
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Wind, Sunrise, Zap, Waves, PlayCircle, Lightbulb } from 'lucide-react'; 
import { useToast } from "@/hooks/use-toast";
import type { LucideIcon } from 'lucide-react';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

interface PranayamaTechnique {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
  benefits: string[];
}

const pranayamaTechniques: PranayamaTechnique[] = [
  {
    id: "nadi-shodhana",
    name: "Nadi Shodhana (Alternate Nostril Breathing)",
    icon: Sunrise,
    description: "A powerful practice for calming the mind, balancing brain hemispheres, and purifying energy channels (nadis).",
    benefits: [
      "Reduces stress and anxiety.",
      "Improves focus and concentration.",
      "Supports respiratory function.",
    ],
  },
  {
    id: "bhastrika",
    name: "Bhastrika (Bellows Breath)",
    icon: Zap,
    description: "An energizing pranayama involving forceful inhalations and exhalations, clearing blockages and increasing prana.",
    benefits: [
      "Boosts energy levels and alertness.",
      "Clears nasal passages and lungs.",
      "Stimulates metabolism.",
    ],
  },
  {
    id: "ujjayi",
    name: "Ujjayi (Victorious Breath)",
    icon: Waves,
    description: "Also known as 'ocean breath', Ujjayi involves a gentle throat constriction, creating a soft, audible sound. It's calming and warming.",
    benefits: [
      "Calms the nervous system.",
      "Increases oxygenation.",
      "Promotes a meditative state.",
    ],
  }
];

export default function BreathAwarenessCalculator() {
  const [selectedTechnique, setSelectedTechnique] = useState<PranayamaTechnique | null>(null);
  const { toast } = useToast();

  const handleStartPractice = (technique: PranayamaTechnique) => {
    setSelectedTechnique(technique);
    trackCalculatorUsage('breath-awareness-training');
    toast({
      title: `Starting ${technique.name}`,
      description: "Guided session functionality is currently a placeholder.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-none shadow-none">
        <CardContent className="pt-6 space-y-4">
          <div className="text-center">
            <Wind className="h-12 w-12 text-primary mx-auto mb-3" />
            <p className="text-muted-foreground">
              Select a pranayama technique below to begin your practice.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {pranayamaTechniques.map((technique) => (
              <AccordionItem value={technique.id} key={technique.id} className="border border-border rounded-lg shadow-sm bg-card/40">
                <AccordionTrigger className="text-md hover:text-accent p-3 font-medium">
                  <div className="flex items-center">
                    <technique.icon className="h-5 w-5 mr-2.5 text-primary" />
                    {technique.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-3 pt-0 space-y-3">
                  <p className="text-xs text-muted-foreground">{technique.description}</p>
                  <div>
                    <h5 className="font-semibold text-foreground text-xs mb-1">Key Benefits:</h5>
                    <ul className="list-disc list-inside text-muted-foreground space-y-0.5 pl-2 text-xs">
                      {technique.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                    </ul>
                  </div>
                  <Button 
                    onClick={() => handleStartPractice(technique)} 
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 border-primary text-primary hover:bg-primary/10"
                  >
                    <PlayCircle className="mr-2 h-4 w-4" /> Start Practice
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {selectedTechnique && (
            <Card className="mt-4 bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                  Practicing: {selectedTechnique.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  Follow the guided instructions (placeholder for actual guided session). Focus on your breath and enjoy the practice.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Imagine a calm voice guiding you through each inhale, hold, and exhale...
                </p>
              </CardContent>
            </Card>
          )}
          
           <p className="text-xs text-muted-foreground mt-4 text-center italic">
            This is a basic interface. Full guided sessions with visual/audio cues are planned for future updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
