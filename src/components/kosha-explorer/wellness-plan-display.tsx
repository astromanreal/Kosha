
import type { WellnessPlanOutput } from '@/ai/flows/wellness-plan-flow';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Apple, PersonStanding, Brain } from 'lucide-react'; // Using PersonStanding for Lifestyle, Brain for Mindfulness

interface WellnessPlanDisplayProps {
  plan: WellnessPlanOutput;
}

export default function WellnessPlanDisplay({ plan }: WellnessPlanDisplayProps) {
  return (
    <Card className="mt-8 border-primary shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Your Personalized Holistic Plan</CardTitle>
        <CardDescription>{plan.prakritiAnalysis}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['diet', 'lifestyle', 'mindfulness']} className="w-full space-y-3">
          <AccordionItem value="diet" className="border border-border rounded-lg bg-card/50">
            <AccordionTrigger className="text-lg hover:text-accent p-4">
              <div className="flex items-center">
                <Apple className="mr-3 h-5 w-5 text-green-500" /> Dietary Suggestions
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <div className="prose prose-sm sm:prose dark:prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
                {plan.dietarySuggestions}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="lifestyle" className="border border-border rounded-lg bg-card/50">
            <AccordionTrigger className="text-lg hover:text-accent p-4">
              <div className="flex items-center">
                <PersonStanding className="mr-3 h-5 w-5 text-blue-500" /> Lifestyle Adjustments
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <div className="prose prose-sm sm:prose dark:prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
                {plan.lifestyleAdjustments}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="mindfulness" className="border border-border rounded-lg bg-card/50">
            <AccordionTrigger className="text-lg hover:text-accent p-4">
              <div className="flex items-center">
                <Brain className="mr-3 h-5 w-5 text-purple-500" /> Mindfulness Practices
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0">
              <div className="prose prose-sm sm:prose dark:prose-invert max-w-none whitespace-pre-wrap text-muted-foreground">
                {plan.mindfulnessPractices}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <p className="mt-6 text-xs text-muted-foreground italic text-center">
          {plan.disclaimer}
        </p>
      </CardContent>
    </Card>
  );
}
