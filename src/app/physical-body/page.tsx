
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Leaf, KeyRound, Apple, Droplets, BedDouble, Bike, ScrollText, Sparkles, Utensils, Compass, Beaker, Bone, Brain, Sun, Lightbulb, Recycle, BrainCog, MoonStar, Dumbbell, Activity, Library, Users, Vegan, Flame, Sprout, Dot } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Annamaya Kosha (Physical Body) Guide | Ayurvedic Nutrition & Wellness | Kosha Explorer',
  description: 'Explore the Annamaya Kosha, your physical sheath, with Kosha Explorer. Learn about Ayurvedic nutrition principles, hydration, quality sleep, appropriate exercise, and mindful lifestyle practices for a healthy, vibrant physical body.',
  keywords: ['Annamaya Kosha Guide', 'Physical Body Wellness', 'Ayurvedic Diet Principles', 'Holistic Nutrition Plan', 'Yoga for Physical Health', 'Healthy Lifestyle Practices', 'Sleep Hygiene Ayurveda Tips', 'Exercise for Dosha Balance', 'Body Nourishment Guide', 'Physical Sheath Yoga'],
  openGraph: {
    title: 'Annamaya Kosha: The Complete Guide to Your Physical Body | Kosha Explorer',
    description: 'Deep dive into the Annamaya Kosha. Understand how to nourish your physical body through Ayurvedic nutrition, hydration, sleep, exercise, and mindful lifestyle choices for lasting health and vitality.',
    url: `${siteBaseUrl}/physical-body`,
    type: 'article',
    images: [
      {
        url: `https://placehold.co/1200x630.png?text=Annamaya+Kosha+Physical+Body+Guide`,
        width: 1200,
        height: 630,
        alt: 'Annamaya Kosha - Nurturing The Physical Body for Holistic Wellness on Kosha Explorer',
      },
    ],
    article: {
      publishedTime: "2024-01-01T00:00:00.000Z",
      modifiedTime: new Date().toISOString(),
      authors: [`${siteBaseUrl}/about`],
      section: "Pancha Koshas",
      tags: ['Annamaya Kosha', 'Physical Health', 'Ayurveda', 'Nutrition', 'Yoga'],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Master Your Annamaya Kosha (Physical Body) with Kosha Explorer',
    description: 'Nourish your physical body with practical insights on diet, hydration, sleep, and exercise from an Ayurvedic perspective, enhancing your Annamaya Kosha.',
    images: [`https://placehold.co/1200x630.png?text=Annamaya+Kosha+Physical+Body+Guide`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const keyConceptsData = [
  { aspect: "Nature", description: "Gross, physical body — skin, bones, muscles, organs. The most tangible of the Pancha Koshas." },
  { aspect: "Sustained By", description: "Food (Anna), water, rest, exercise, and lifestyle choices." },
  { aspect: "Governed By", description: "Earth element (Prithvi) and gross physical matter. Represents the material aspect of being." },
  { aspect: "Associated With", description: "Basic survival, sensory perception, physical movement, and interaction with the external world." },
  { aspect: "Health Goal", description: "Balance through Ayurvedic nutrition, proper hydration, adequate sleep, suitable exercise, and mindful lifestyle practices." },
  { aspect: "Vulnerability", description: "Disease, fatigue, toxicity, imbalances from improper diet, sedentary habits, and environmental factors." },
];

const essentialNutrientsData = [
  { name: "Calcium", sources: "sesame, leafy greens, dairy products", icon: Bone, benefit: "Essential for bone and teeth health, muscle function." },
  { name: "Iron", sources: "beets, spinach, jaggery, lentils", icon: Droplets, benefit: "Crucial for hemoglobin production and energy levels." },
  { name: "Protein", sources: "lentils, legumes, dairy, nuts, seeds", icon: Utensils, benefit: "Building blocks for cell repair and muscle growth." },
  { name: "Omega-3 Fatty Acids", sources: "flax seeds, walnuts, ghee, fatty fish", icon: Brain, benefit: "Supports brain health and nerve function, reduces inflammation." },
  { name: "Vitamin D", sources: "sunlight exposure, mushrooms, fortified dairy", icon: Sun, benefit: "Vital for immune health, calcium absorption, and bone strength." },
];

const hydrationTipsData = [
  "Drink warm water upon waking to stimulate digestion and cleanse the system.",
  "Avoid ice-cold water, especially with meals, as it can weaken Agni (digestive fire).",
  "Sip herbal teas like cumin, coriander, and fennel (CCF tea) to support digestion and hydration.",
  "Adjust water intake based on climate, individual body type (Prakriti), and activity level.",
];

const functionsOfRestData = [
  "Cellular repair, growth, and detoxification processes.",
  "Brain function, memory consolidation, and cognitive restoration.",
  "Hormonal balance, including melatonin (sleep) and cortisol (stress).",
  "Emotional regulation, stress resilience, and overall mental well-being.",
];

const ayurvedicSleepTipsData = [
  "Aim to sleep by 10 PM, aligning with natural Kapha rhythms for restorative sleep.",
  "Avoid screens, stimulating activities, and heavy food at least 2 hours before bedtime.",
  "Consider calming Ayurvedic herbs like Brahmi, Ashwagandha, or Chamomile tea (consult a practitioner).",
  "Establish a soothing evening routine: warm bath, gentle yoga, self-oil massage (Abhyanga).",
];

const exerciseBenefitsData = [
  "Enhances circulation of blood and lymph, aiding detoxification and nutrient delivery.",
  "Improves joint mobility, muscular strength, and overall physical stamina.",
  "Releases endorphins, promoting mental well-being and reducing stress.",
  "Supports healthy digestion (Agni) and metabolism.",
];

const ayurvedicActivitiesData = [
  { dosha: "Vata", activities: "Gentle, grounding yoga (e.g., Hatha, Restorative), walking, Tai Chi, light cycling." },
  { dosha: "Pitta", activities: "Cooling and moderate activities like swimming, brisk walking in nature, recreational sports, Pitta-balancing yoga." },
  { dosha: "Kapha", activities: "Vigorous and stimulating exercises such as running, dynamic yoga (e.g., Vinyasa), hiking, team sports." },
];

const ayurvedicCoreConceptsData = [
  { concept: "Shad Rasa (Six Tastes)", description: "Incorporating all six tastes (Sweet, Sour, Salty, Bitter, Pungent, Astringent) in meals for balanced nutrition and dosha harmony." },
  { concept: "Food Combining (Viruddha Ahara)", description: "Understanding and avoiding incompatible food combinations (e.g., milk with fish or sour fruits) to prevent digestive issues and Ama (toxin) formation." },
  { concept: "Mindful Eating", description: "Eating slowly, chewing food thoroughly, and focusing on the meal without distractions to enhance digestion and nutrient absorption." },
  { concept: "Seasonal Diet (Ritucharya)", description: "Adapting food habits and lifestyle according to seasonal changes to maintain doshic balance and prevent seasonal ailments." },
];

export default function PhysicalBodyPage() {
  const pageUrl = `${siteBaseUrl}/physical-body`;
  const pageTitle = (metadata.title as { default: string }).default || metadata.title as string;
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
    "articleSection": "Pancha Koshas",
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
      "name": "Pancha Koshas",
      "item": `${siteBaseUrl}/koshas`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": "Annamaya Kosha",
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
          <Leaf className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Annamaya Kosha: The Physical Sheath Guide</h1>
          <p className="text-lg text-muted-foreground font-medium">"Anna" (Food) + "Maya" (Made of/Filled with) + Kosha (Sheath)</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-2">
            This guide explores the Annamaya Kosha, the outermost layer of human existence—the gross physical body, formed and sustained by the food we eat. Understanding and nurturing this sheath is foundational for overall health and higher states of consciousness.
          </p>
        </section>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center">
              <KeyRound className="h-8 w-8 mr-3 text-accent" />
              Key Concepts of Annamaya Kosha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border shadow-md">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[30%] px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Aspect</TableHead>
                    <TableHead className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Description of the Physical Body</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-background divide-y divide-border">
                  {keyConceptsData.map((item) => (
                    <TableRow key={item.aspect} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{item.aspect}</TableCell>
                      <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center">
              <Apple className="h-8 w-8 mr-3 text-accent" />
              Nutrition for the Physical Body: Fueling Your Temple
            </CardTitle>
            <CardDescription className="text-md">
              "You are what you eat"—this principle is paramount for the Annamaya Kosha. Proper nutrition nourishes every cell, enhances immunity, and maintains vitality.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                <Compass className="h-6 w-6 mr-2 text-secondary" />
                Ayurvedic Guiding Principles for Diet
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sattvic">
                  <AccordionTrigger className="text-lg hover:text-accent">Sattvic Diet</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-2 space-y-1">
                    <p className="flex items-center"><Vegan className="h-4 w-4 mr-2 text-green-500" /> Emphasizes fresh, plant-based, seasonal, and easily digestible foods that promote clarity, balance, and lightness in the body and mind.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="dosha">
                  <AccordionTrigger className="text-lg hover:text-accent">Dosha-Based Diet</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-2 space-y-2">
                    <p className="flex items-start"><Users className="h-4 w-4 mr-2 mt-1 text-blue-500 flex-shrink-0" /> <strong>Vata Prakriti:</strong> Favor warm, moist, oily, and grounding foods (e.g., soups, stews, root vegetables, ghee).</p>
                    <p className="flex items-start"><Users className="h-4 w-4 mr-2 mt-1 text-red-500 flex-shrink-0" /> <strong>Pitta Prakriti:</strong> Opt for cooling, sweet, and bitter foods (e.g., coconut, cucumber, milk, leafy greens).</p>
                    <p className="flex items-start"><Users className="h-4 w-4 mr-2 mt-1 text-yellow-600 flex-shrink-0" /> <strong>Kapha Prakriti:</strong> Choose light, spicy, dry, and warming foods (e.g., lentils, leafy greens, ginger, pungent spices).</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="agni">
                  <AccordionTrigger className="text-lg hover:text-accent">Digestive Fire (Agni)</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pl-2 space-y-1">
                    <p className="flex items-center"><Flame className="h-4 w-4 mr-2 text-orange-500" /> Maintaining a strong Agni is crucial for proper digestion and assimilation of nutrients. Weak Agni can lead to Ama (undigested toxins).</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 mt-6 flex items-center">
                <Beaker className="h-6 w-6 mr-2 text-secondary" />
                Essential Nutrients for Physical Well-being
              </h2>
              <ul className="space-y-3">
                {essentialNutrientsData.map((nutrient) => (
                  <li key={nutrient.name} className="flex items-start p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
                    <nutrient.icon className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{nutrient.name}: <span className="font-normal text-accent-foreground">{nutrient.benefit}</span></h3>
                      <p className="text-sm text-muted-foreground">Found in: {nutrient.sources}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <Droplets className="h-7 w-7 mr-3 text-accent" />
                Hydration: The Elixir of Life for the Physical Body
              </CardTitle>
              <CardDescription className="text-md">
                Water is central to all physiological processes: nutrient transport, temperature regulation, detoxification, and cellular function. Proper hydration is key for Annamaya Kosha health.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-secondary" />
                Ayurvedic Hydration Tips
              </h3>
              <ul className="space-y-2">
                {hydrationTipsData.map((tip, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <Dot className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center">
                <BedDouble className="h-7 w-7 mr-3 text-accent" />
                Sleep & Rest: The Art of Rejuvenating the Physical Body
              </CardTitle>
              <CardDescription className="text-md">
              Sleep is not a luxury—it's a biological necessity for the repair and maintenance of the Annamaya Kosha.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <Recycle className="h-5 w-5 mr-2 text-secondary" />
                  Functions of Rest for Physical Health
                </h3>
                <ul className="space-y-2">
                  {functionsOfRestData.map((func, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <Dot className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                      {func}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                  <MoonStar className="h-5 w-5 mr-2 text-secondary" />
                  Ayurvedic Sleep Tips for Body Rejuvenation
                </h3>
                <ul className="space-y-2">
                  {ayurvedicSleepTipsData.map((tip, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <Dot className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center">
              <Bike className="h-8 w-8 mr-3 text-accent" />
              Exercise for the Physical Body: Movement as Medicine
            </CardTitle>
            <CardDescription className="text-md">
              Regular and appropriate physical movement keeps the Annamaya Kosha energized, strong, and resilient.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                <BrainCog className="h-6 w-6 mr-2 text-secondary" />
                Benefits of Exercise for the Physical Sheath
              </h2>
              <ul className="space-y-2">
                {exerciseBenefitsData.map((benefit, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <Dot className="h-5 w-5 mr-2 text-accent flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 mt-6 flex items-center">
                <Activity className="h-6 w-6 mr-2 text-secondary" />
                Ayurveda-Recommended Activities for Body Types
              </h2>
              <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                  {ayurvedicActivitiesData.map((item) => (
                      <div key={item.dosha} className="p-4 bg-muted/30 rounded-md">
                          <h3 className="font-semibold text-foreground mb-1">{item.dosha} Prakriti:</h3>
                          <p className="text-sm text-muted-foreground">{item.activities}</p>
                      </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-3xl text-primary flex items-center">
              <Sprout className="h-8 w-8 mr-3 text-accent" />
              Ayurvedic Wisdom: Ancient Food Principles for Physical Health
            </CardTitle>
            <CardDescription className="text-md">
              Ayurveda offers a comprehensive framework for nourishment and balance, directly impacting the Annamaya Kosha.
            </CardDescription>
          </CardHeader>
          <CardContent>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Library className="h-6 w-6 mr-2 text-secondary" />
                Core Ayurvedic Concepts for Diet
              </h2>
              <ul className="space-y-3">
                {ayurvedicCoreConceptsData.map((item) => (
                  <li key={item.concept} className="flex items-start p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
                    <Dot className="h-5 w-5 mr-2 mt-1 text-accent flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">{item.concept}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-primary flex items-center justify-center">
              <Sparkles className="h-8 w-8 mr-3 text-accent" />
              Spiritual Significance of the Physical Body
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              The Annamaya Kosha is not merely a physical structure but a sacred vessel for the soul's journey. Proper care and nourishment of the physical body are essential for spiritual growth, as it supports the health and balance of the higher, more subtle koshas: Pranamaya (energy), Manomaya (mind), Vijnanamaya (wisdom), and Anandamaya (bliss). A healthy body provides a stable foundation for deeper spiritual practices.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
