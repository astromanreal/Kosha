
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, CheckCircle, Timer, HeartHandshake, ListChecks, CalendarDays } from 'lucide-react';
import { trackCalculatorUsage } from '@/lib/activity-tracker';
import { useToast } from '@/hooks/use-toast';

export default function BhaktiTimerCalculator() {
  const { toast } = useToast();

  const whyImportantPoints = [
    "Experience deep bliss and peace through connection with the Divine.",
    "Cultivate a heart-centered practice of love and surrender.",
    "Strengthen the Anandamaya Kosha, opening yourself to divine grace and joy."
  ];

  const howItWorksSteps = [
    { title: "Start Your Practice", description: "Begin any devotional activity (chanting, singing, puja, seva).", icon: HeartHandshake },
    { title: "Start the Timer", description: "Track your time spent in devotion with a customizable timer.", icon: Timer },
    { title: "Reflect & Share", description: "After your session, reflect on the emotional and spiritual impact of the activity.", icon: Lightbulb },
    { title: "Track Your Journey", description: "Review how much time you’ve spent on devotion over time, noticing patterns of deeper connection.", icon: CalendarDays }
  ];

  const handleStartTimer = () => {
    trackCalculatorUsage('bhakti-timer');
    toast({
      title: "Bhakti Timer Started (Placeholder)",
      description: "Actual timer functionality coming soon.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-none shadow-none">
        <CardContent className="pt-6 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-lg flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-primary" />
              Why It&apos;s Important
            </h4>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
              {whyImportantPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
             <p className="text-xs text-muted-foreground mt-2 pl-2">
              Dedicate time to devotional activities to cultivate love, connection, and spiritual fulfillment.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 text-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-primary" />
              How It Works
            </h4>
            <div className="space-y-3">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <step.icon className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-sm text-foreground">{step.title}</h5>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
             <p className="text-xs text-muted-foreground mt-3 pl-2">
              Log time for chanting, puja, seva. Set reminders and view progress. This calculator is currently a placeholder. Full functionality coming soon.
            </p>
          </div>

          <div className="text-center pt-4">
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={handleStartTimer}>
              Start Bhakti Timer (Placeholder)
            </Button>
            <p className="text-xs text-muted-foreground mt-2 italic">
              Transform devotional practices into a sacred rhythm for lasting bliss.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
