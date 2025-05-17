
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Loader2, CheckCircle2, Sparkles, Anchor, Waves, Sun, Heart, Mic2, Eye, Crown, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { LucideIcon } from 'lucide-react';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

interface ChakraOption {
  value: 'underactive' | 'balanced' | 'overactive';
  label: string;
}

interface ChakraInfo {
  id: string;
  name: string;
  sanskritName: string;
  element: string;
  colorName: string;
  colorClass: string; 
  icon: LucideIcon;
  mainQuestion: string;
  options: ChakraOption[];
  healingTips: {
    underactive: string[];
    balanced: string[];
    overactive: string[];
  };
  affirmations: {
    underactive: string;
    balanced: string;
    overactive: string;
  };
}

const chakraDataList: ChakraInfo[] = [
  {
    id: 'muladhara',
    name: 'Root Chakra',
    sanskritName: 'Mūlādhāra',
    element: 'Earth',
    colorName: 'Red',
    colorClass: 'text-red-500',
    icon: Anchor,
    mainQuestion: 'Regarding your sense of safety, security, and physical grounding:',
    options: [
      { value: 'underactive', label: 'I often feel insecure, fearful, or ungrounded.' },
      { value: 'balanced', label: 'I generally feel safe, stable, and connected to my body.' },
      { value: 'overactive', label: 'I can be overly materialistic, rigid, or resistant to change.' },
    ],
    healingTips: {
      underactive: ['Practice grounding exercises (walking barefoot).', 'Eat root vegetables.', 'Use red jasper or hematite.', 'Yoga: Mountain Pose, Warrior Poses.'],
      balanced: ['Maintain healthy routines.', 'Connect with nature regularly.', 'Continue practices that support stability.'],
      overactive: ['Practice letting go (declutter).', 'Engage in dynamic movement or dance.', 'Focus on generosity and non-attachment.'],
    },
    affirmations: {
      underactive: "I am safe, secure, and grounded.",
      balanced: "I am stable, strong, and connected to the Earth.",
      overactive: "I release control and embrace the flow of life.",
    }
  },
  {
    id: 'svadhisthana',
    name: 'Sacral Chakra',
    sanskritName: 'Svādhiṣṭhāna',
    element: 'Water',
    colorName: 'Orange',
    colorClass: 'text-orange-500',
    icon: Waves,
    mainQuestion: 'Regarding your emotions, creativity, and pleasure:',
    options: [
      { value: 'underactive', label: 'I often feel emotionally numb, lack creativity, or have difficulty experiencing joy.' },
      { value: 'balanced', label: 'I embrace my emotions, express creativity freely, and enjoy life\'s pleasures.' },
      { value: 'overactive', label: 'I can be overly emotional, indulgent, or struggle with emotional boundaries.' },
    ],
    healingTips: {
      underactive: ['Engage in creative hobbies (painting, writing).', 'Move your body fluidly (dance, swim).', 'Use carnelian or orange calcite.', 'Yoga: Hip-opening poses.'],
      balanced: ['Continue to nurture your creative expression.', 'Maintain healthy emotional boundaries.', 'Enjoy sensory experiences mindfully.'],
      overactive: ['Practice emotional regulation techniques.', 'Set healthy boundaries in relationships.', 'Channel excess energy into constructive activities.'],
    },
    affirmations: {
        underactive: "I embrace my creativity and flow with my emotions.",
        balanced: "I honor my feelings and express my creativity with joy.",
        overactive: "I find balance in my emotions and passions.",
    }
  },
  {
    id: 'manipura',
    name: 'Solar Plexus Chakra',
    sanskritName: 'Maṇipūra',
    element: 'Fire',
    colorName: 'Yellow',
    colorClass: 'text-yellow-500',
    icon: Sun,
    mainQuestion: 'Regarding your personal power, self-esteem, and willpower:',
    options: [
      { value: 'underactive', label: 'I often lack confidence, feel powerless, or have low self-esteem.' },
      { value: 'balanced', label: 'I feel confident, empowered, and able to assert myself appropriately.' },
      { value: 'overactive', label: 'I can be overly controlling, aggressive, or have an inflated ego.' },
    ],
    healingTips: {
      underactive: ['Set and achieve small goals.', 'Practice assertiveness.', 'Use citrine or tiger\'s eye.', 'Yoga: Core-strengthening poses, Sun Salutations.'],
      balanced: ['Continue to trust your inner strength.', 'Use your power wisely and for good.', 'Maintain self-respect and respect for others.'],
      overactive: ['Practice humility and active listening.', 'Engage in activities that require cooperation.', 'Focus on relaxing the abdomen (deep breathing).'],
    },
    affirmations: {
        underactive: "I am confident, powerful, and capable.",
        balanced: "I honor my personal power and use it wisely.",
        overactive: "I channel my strength with wisdom and compassion.",
    }
  },
  {
    id: 'anahata',
    name: 'Heart Chakra',
    sanskritName: 'Anāhata',
    element: 'Air',
    colorName: 'Green',
    colorClass: 'text-green-500',
    icon: Heart,
    mainQuestion: 'Regarding love, compassion, forgiveness, and relationships:',
    options: [
      { value: 'underactive', label: 'I often find it hard to give or receive love, feel disconnected, or hold grudges.' },
      { value: 'balanced', label: 'I feel open to love, practice compassion and forgiveness, and have healthy relationships.' },
      { value: 'overactive', label: 'I can be overly dependent, possessive, or give too much of myself at my own expense.' },
    ],
    healingTips: {
      underactive: ['Practice self-love and self-compassion.', 'Perform acts of kindness.', 'Use rose quartz or green aventurine.', 'Yoga: Chest-opening poses, backbends.'],
      balanced: ['Continue to cultivate loving-kindness.', 'Maintain healthy boundaries in relationships.', 'Express gratitude for connections.'],
      overactive: ['Practice self-care and setting boundaries.', 'Focus on self-worth independent of others.', 'Cultivate discernment in relationships.'],
    },
    affirmations: {
        underactive: "I am open to giving and receiving love unconditionally.",
        balanced: "My heart is open, and I radiate love and compassion.",
        overactive: "I love myself and others with healthy boundaries.",
    }
  },
  {
    id: 'vishuddha',
    name: 'Throat Chakra',
    sanskritName: 'Viśuddha',
    element: 'Ether/Space',
    colorName: 'Blue',
    colorClass: 'text-blue-500',
    icon: Mic2,
    mainQuestion: 'Regarding communication, self-expression, and speaking your truth:',
    options: [
      { value: 'underactive', label: 'I often have difficulty expressing myself, fear speaking up, or feel unheard.' },
      { value: 'balanced', label: 'I communicate clearly, honestly, and effectively, and listen well to others.' },
      { value: 'overactive', label: 'I can talk too much, interrupt others, or use words to dominate or criticize.' },
    ],
    healingTips: {
      underactive: ['Practice speaking your truth in safe spaces.', 'Sing, chant, or write.', 'Use turquoise or aquamarine.', 'Yoga: Neck stretches, Lion Pose.'],
      balanced: ['Continue to express yourself authentically.', 'Practice active listening.', 'Use your voice for positive impact.'],
      overactive: ['Practice mindful listening before speaking.', 'Pause and reflect before responding.', 'Speak with kindness and consideration.'],
    },
    affirmations: {
        underactive: "I express my truth with clarity and confidence.",
        balanced: "My voice is heard, and I speak my truth with integrity.",
        overactive: "I listen with an open mind and speak with kindness.",
    }
  },
  {
    id: 'ajna',
    name: 'Third Eye Chakra',
    sanskritName: 'Ājñā',
    element: 'Light',
    colorName: 'Indigo',
    colorClass: 'text-indigo-500',
    icon: Eye,
    mainQuestion: 'Regarding intuition, insight, wisdom, and imagination:',
    options: [
      { value: 'underactive', label: 'I often distrust my intuition, feel confused, or lack clarity and vision.' },
      { value: 'balanced', label: 'I trust my intuition, have clear insights, and use my wisdom to navigate life.' },
      { value: 'overactive', label: 'I can be lost in fantasy, experience mental overload, or be disconnected from reality.' },
    ],
    healingTips: {
      underactive: ['Practice meditation and mindfulness.', 'Pay attention to your dreams and intuitive nudges.', 'Use lapis lazuli or amethyst.', 'Yoga: Child\'s Pose, focused gazing (Trataka).'],
      balanced: ['Continue to honor your inner wisdom.', 'Use your intuition to guide your decisions.', 'Stay open to new perspectives.'],
      overactive: ['Practice grounding techniques.', 'Engage in activities that connect you to the physical world.', 'Focus on discerning reality from imagination.'],
    },
    affirmations: {
        underactive: "I trust my intuition and see clearly.",
        balanced: "My inner wisdom guides me with clarity and insight.",
        overactive: "I am grounded in reality while open to inspiration.",
    }
  },
  {
    id: 'sahasrara',
    name: 'Crown Chakra',
    sanskritName: 'Sahasrāra',
    element: 'Consciousness',
    colorName: 'Violet/White',
    colorClass: 'text-purple-500',
    icon: Crown,
    mainQuestion: 'Regarding your connection to spirituality, higher consciousness, and purpose:',
    options: [
      { value: 'underactive', label: 'I often feel disconnected from spirituality, lack a sense of purpose, or feel cynical.' },
      { value: 'balanced', label: 'I feel connected to a higher power/purpose, experience a sense of unity, and live with meaning.' },
      { value: 'overactive', label: 'I can be overly dogmatic, detached from worldly life, or spiritually bypass emotions.' },
    ],
    healingTips: {
      underactive: ['Practice meditation and prayer.', 'Spend time in nature, feeling a sense of awe.', 'Use clear quartz or selenite.', 'Yoga: Headstand (with caution), Savasana.'],
      balanced: ['Continue to nurture your spiritual connection.', 'Live with purpose and meaning.', 'Share your spiritual insights with others.'],
      overactive: ['Practice grounding and embodiment.', 'Engage with the world and community.', 'Integrate spiritual insights into daily life with compassion.'],
    },
    affirmations: {
        underactive: "I am connected to divine wisdom and universal consciousness.",
        balanced: "I am one with the universe and live with purpose.",
        overactive: "I integrate my spiritual insights with grounded presence.",
    }
  },
];

const schemaObject = chakraDataList.reduce((acc, chakra) => {
  acc[chakra.id] = z.enum(['underactive', 'balanced', 'overactive'], {
    required_error: `Please select an option for ${chakra.name}.`,
  });
  return acc;
}, {} as Record<string, z.ZodEnum<['underactive', 'balanced', 'overactive']>>);

const chakraCheckinSchema = z.object(schemaObject);
type ChakraCheckinFormValues = z.infer<typeof chakraCheckinSchema>;

interface CheckinResult {
  chakraId: string;
  name: string;
  sanskritName: string;
  icon: LucideIcon;
  colorClass: string;
  assessment: 'underactive' | 'balanced' | 'overactive';
  tips: string[];
  affirmation: string;
}

export default function ChakraCheckinCalculator() {
  const [results, setResults] = useState<CheckinResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ChakraCheckinFormValues>({
    resolver: zodResolver(chakraCheckinSchema),
    defaultValues: chakraDataList.reduce((acc, chakra) => {
      acc[chakra.id as keyof ChakraCheckinFormValues] = undefined;
      return acc;
    }, {} as Partial<ChakraCheckinFormValues>),
  });

  const onSubmit: SubmitHandler<ChakraCheckinFormValues> = (data) => {
    setIsLoading(true);
    setResults(null);

    setTimeout(() => {
      const processedResults: CheckinResult[] = chakraDataList.map((chakra) => {
        const assessment = data[chakra.id as keyof ChakraCheckinFormValues];
        return {
          chakraId: chakra.id,
          name: chakra.name,
          sanskritName: chakra.sanskritName,
          icon: chakra.icon,
          colorClass: chakra.colorClass,
          assessment: assessment,
          tips: chakra.healingTips[assessment],
          affirmation: chakra.affirmations[assessment],
        };
      });
      setResults(processedResults);
      setIsLoading(false);
      trackCalculatorUsage('chakra-checkin');
      toast({
        title: "Chakra Check-in Complete!",
        description: "Your personalized insights and tips are ready below.",
      });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-accent" /> Reflect on Your Chakras
              </CardTitle>
              <CardDescription>
                Answer the following questions to get insights into your current chakra balance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {chakraDataList.map((chakra, index) => (
                <FormField
                  key={chakra.id}
                  control={form.control}
                  name={chakra.id as keyof ChakraCheckinFormValues}
                  render={({ field }) => (
                    <FormItem className="space-y-2 p-4 border rounded-lg bg-card/40 shadow-sm">
                      <FormLabel className="text-md font-semibold text-foreground flex items-center">
                        <chakra.icon className={`mr-2 h-5 w-5 ${chakra.colorClass}`} />
                        {index + 1}. {chakra.name} ({chakra.sanskritName}) - {chakra.mainQuestion}
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          className="flex flex-col space-y-1 pt-1"
                        >
                          {chakra.options.map((option) => (
                            <FormItem key={option.value} className="flex items-center space-x-3 space-y-0 p-2 rounded hover:bg-muted/50 transition-colors">
                              <FormControl>
                                <RadioGroupItem value={option.value} id={`${chakra.id}-${option.value}`} />
                              </FormControl>
                              <FormLabel htmlFor={`${chakra.id}-${option.value}`} className="font-normal text-sm text-muted-foreground cursor-pointer">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Get Chakra Insights
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      {results && (
        <Card className="mt-8 border-primary/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Lightbulb className="mr-3 h-7 w-7 text-accent" />
              Your Chakra Check-in Results
            </CardTitle>
            <CardDescription>
              Here's an overview of your chakra assessment with personalized tips.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full space-y-3">
              {results.map((result) => (
                <AccordionItem value={result.chakraId} key={result.chakraId} className="border border-border rounded-lg shadow-sm bg-card/30">
                  <AccordionTrigger className={`p-4 text-lg font-medium hover:text-accent ${result.assessment === 'underactive' ? 'text-blue-600' : result.assessment === 'overactive' ? 'text-red-600' : 'text-green-600'}`}>
                    <div className="flex items-center">
                      <result.icon className={`mr-3 h-6 w-6 ${result.colorClass}`} />
                      {result.name} ({result.sanskritName}) - <span className="ml-1 capitalize font-semibold">{result.assessment}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Affirmation:</h4>
                      <p className="text-sm text-muted-foreground italic">"{result.affirmation}"</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Healing Tips:</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 pl-2">
                        {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
                      </ul>
                    </div>
                     <p className="text-xs text-muted-foreground/80 pt-2">
                       Element: {chakraDataList.find(c=>c.id === result.chakraId)?.element} | Color: {chakraDataList.find(c=>c.id === result.chakraId)?.colorName}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
           <CardFooter>
            <p className="text-xs text-muted-foreground italic">
              These insights are for self-reflection and general guidance. For deeper imbalances, consider consulting with an energy healing practitioner or therapist.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
