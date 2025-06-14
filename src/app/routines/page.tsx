
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalendarCheck, Sunrise, Sun, Moon, Leaf, Settings2, ListChecks, Recycle } from 'lucide-react';
import Image from "next/image";
import DinacharyaBuilder from '@/components/kosha-explorer/dinacharya-builder';


const ritucharyaSeasons = [
  {
    season: "Vasant Ritu (Spring)",
    icon: Leaf,
    iconColor: "text-green-500",
    description: "Kapha dosha, accumulated during winter, liquefies in spring warmth. Focus on practices that are drying, warming, and stimulating to balance Kapha.",
    tips: [
      "Favor pungent, bitter, and astringent tastes (e.g., ginger, turmeric, leafy greens, lentils).",
      "Include barley, honey (in moderation), and warming spices like black pepper and cinnamon.",
      "Engage in vigorous exercise to reduce Kapha accumulation.",
      "Avoid heavy, oily, cold, sweet, and sour foods; minimize dairy products.",
      "Panchakarma (like Vamana - therapeutic emesis) may be beneficial under expert guidance."
    ]
  },
  {
    season: "Grishma Ritu (Summer)",
    icon: Sun,
    iconColor: "text-red-500",
    description: "Pitta dosha is naturally aggravated due to increased environmental heat. Focus on cooling, calming, and hydrating practices to balance Pitta.",
    tips: [
      "Favor sweet, bitter, and astringent tastes that are cooling in nature.",
      "Include cooling foods like cucumber, melon, coconut, ghee, milk, and sweet fruits (berries, pears).",
      "Drink plenty of cooling fluids (e.g., room temperature water, coconut water, mint tea) but avoid ice-cold drinks.",
      "Avoid excessive sun exposure, especially during midday. Opt for activities in cooler parts of the day.",
      "Wear light, breathable clothing (cotton, linen) in light colors."
    ]
  },
  {
    season: "Varsha Ritu (Monsoon/Rainy Season)",
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cloud-drizzle"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M8 19v1"/><path d="M8 14v1"/><path d="M16 19v1"/><path d="M16 14v1"/><path d="M12 16v1"/><path d="M12 21v1"/></svg>, 
    iconColor: "text-blue-500",
    description: "Agni (digestive fire) is generally weak, and Vata dosha can be aggravated due to atmospheric changes. Focus on easily digestible, warm foods and practices to maintain digestive strength and balance Vata.",
    tips: [
      "Favor light, warm, freshly cooked, and easily digestible meals. Include sour and salty tastes.",
      "Include ginger, garlic, asafoetida (hing), and other digestive spices in moderation.",
      "Avoid raw salads, leafy greens in excess, and heavy/oily/fermented foods.",
      "Drink warm water or herbal teas like ginger tea or CCF (cumin, coriander, fennel) tea.",
      "Keep surroundings dry and warm; protect yourself from dampness and cold drafts."
    ]
  },
  {
    season: "Sharad Ritu (Autumn)",
    icon: Leaf, 
    iconColor: "text-yellow-600",
    description: "Pitta dosha, often accumulated during summer, can become aggravated in early autumn. As the season progresses, Vata also increases due to dryness and coolness. Focus on pacifying Pitta initially, then balancing Vata.",
    tips: [
      "Favor sweet, bitter, and astringent tastes. Gradually introduce warming foods as it gets colder.",
      "Consume easily digestible foods like rice, moong dal, quinoa, and cooked vegetables.",
      "Ghee is beneficial for both Pitta and Vata. Use sweet fruits in moderation.",
      "Avoid excessively spicy, oily, sour, and fermented foods, especially in early autumn.",
      "Moderate exercise like yoga and walking. Practice Abhyanga (oil massage) with suitable oils."
    ]
  },
  {
    season: "Hemanta Ritu (Early Winter)",
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-coffee"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a4 4 0 0 1-4 4h-1a2 2 0 0 1-2-2V9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1Z"/><path d="M6 2h12v4a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V2Z"/><path d="M6 18h.01M18 18h.01"/></svg>, 
    iconColor: "text-blue-300",
    description: "Agni (digestive fire) is typically strong in winter, allowing for richer foods. Vata and Kapha doshas can increase due to cold. Focus on nourishing, warming foods and practices.",
    tips: [
      "Favor sweet, sour, and salty tastes. Include warm, unctuous (oily), and somewhat heavy foods.",
      "Consume grains like wheat and rice, dairy products (milk, ghee, butter), nuts, seeds, and root vegetables.",
      "Regular oil massage (Abhyanga) with warming oils (like sesame oil).",
      "Adequate physical activity to prevent Kapha accumulation and stimulate circulation.",
      "Enjoy sun exposure, especially in the mornings. Stay warm."
    ]
  },
  {
    season: "Shishira Ritu (Late Winter)",
    icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-snowflake"><path d="M2 12h10"/><path d="m7 2-5 10 5 10"/><path d="M22 12h-10"/><path d="m17 2 5 10-5 10"/><path d="m12 2 2.5 5M12 22l2.5-5M12 2l-2.5 5M12 22l-2.5-5"/></svg>,
    iconColor: "text-gray-400",
    description: "Cold and dryness intensify, further aggravating Vata and potentially Kapha. Continue with warming, nourishing routines, and protect against cold.",
    tips: [
      "Diet similar to Hemanta: emphasize warm, nourishing, sweet, sour, and salty foods. Ensure meals are well-cooked and moist.",
      "Protect yourself from cold winds and drafts. Wear warm clothing.",
      "Continue with warming exercises and oil massages. Ensure living spaces are comfortably warm.",
      "Sip warm water and herbal teas throughout the day.",
      "Ensure adequate intake of healthy fats to combat dryness."
    ]
  }
];

export default function RoutinesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <CalendarCheck className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Ayurvedic Daily & Seasonal Routines</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Align your life with the rhythms of nature. Dinacharya (daily routine) and Ritucharya (seasonal regimen) are cornerstone Ayurvedic practices for promoting health, balance, and vitality.
        </p>
      </section>

      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center">
            <ListChecks className="h-8 w-8 mr-3 text-orange-500" />
            Interactive Dinacharya Builder
          </CardTitle>
          <CardDescription>
            Craft and track your ideal Ayurvedic daily routine. Check off activities as you complete them to build healthy habits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DinacharyaBuilder />
        </CardContent>
      </Card>


      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center">
            <Sunrise className="h-8 w-8 mr-3 text-orange-500" />
            Dinacharya: The Art of Daily Living (Informational)
          </CardTitle>
          <CardDescription>
            Dinacharya outlines ideal daily practices from waking to sleeping to maintain doshic balance, strong Agni (digestive fire), and overall well-being. Consistency is key. This section provides general Ayurvedic wisdom.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-sm text-muted-foreground mb-4">
            Ayurveda emphasizes that our daily activities significantly impact our health. Dinacharya provides a structured approach to align our lifestyle with the natural cycles of the day, optimizing digestion, energy, and mental clarity.
          </p>
        </CardContent>
      </Card>


      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center">
            <Leaf className="h-8 w-8 mr-3 text-green-600" />
            Ritucharya: Harmonizing with the Seasons (Informational)
          </CardTitle>
          <CardDescription>
            Ritucharya involves adapting diet, lifestyle, and practices according to the prevailing season to counteract potential doshic imbalances and maintain health throughout the year.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Accordion type="single" collapsible className="w-full space-y-4">
            {ritucharyaSeasons.map((season) => (
              <AccordionItem value={season.season} key={season.season} className="border border-border rounded-lg shadow-sm bg-card/50">
                <AccordionTrigger className="text-xl hover:text-accent p-4">
                  <div className="flex items-center">
                    <season.icon className={`h-6 w-6 mr-3 ${season.iconColor}`} /> {season.season}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 space-y-2">
                  <p className="text-sm text-muted-foreground/90 mb-2">{season.description}</p>
                  <h4 className="font-semibold text-foreground text-md mb-1">Key Recommendations:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5 pl-4">
                    {season.tips.map(tip => <li key={tip}>{tip}</li>)}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-xl bg-primary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary flex items-center justify-center">
            <Settings2 className="h-7 w-7 mr-3 text-accent" /> Personalize Your Routine Further (Coming Soon)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center max-w-xl mx-auto">
          <p className="text-md text-muted-foreground leading-relaxed">
            Future updates to the interactive builder will allow you to generate and customize routines based on your Prakriti (Ayurvedic constitution), current imbalances (Vikriti), and personal wellness goals, including Ritucharya adjustments. Stay tuned!
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
