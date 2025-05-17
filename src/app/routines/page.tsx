
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CalendarCheck, Sunrise, Sun, Moon, Leaf, Coffee, Bed, Sparkles, Settings2, Utensils, Zap, CloudDrizzle, Snowflake } from 'lucide-react';
import Image from "next/image";

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'Ayurvedic Daily & Seasonal Routines | Dinacharya & Ritucharya',
  description: 'Discover Dinacharya (Ayurvedic daily routine) and Ritucharya (seasonal regimen) for holistic health, vitality, and balance. Learn practices for morning, afternoon, evening, and seasonal well-being.',
  keywords: ['Dinacharya', 'Ritucharya', 'Ayurvedic Routine', 'Daily Routine', 'Seasonal Routine', 'Holistic Health', 'Ayurveda Lifestyle', 'Wellness Practices'],
  openGraph: {
    title: 'Ayurvedic Daily & Seasonal Routines | Dinacharya & Ritucharya | Kosha Explorer',
    description: 'Learn about Ayurvedic daily (Dinacharya) and seasonal (Ritucharya) routines to enhance health, balance doshas, and live in harmony with nature.',
    url: `${siteBaseUrl}/routines`,
    type: 'article',
    images: [
      {
        url: `https://placehold.co/1200x630.png`,
        width: 1200,
        height: 630,
        alt: 'Ayurvedic Daily and Seasonal Routines',
        data_ai_hint: 'calendar routine wellness'
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayurvedic Daily & Seasonal Routines | Kosha Explorer',
    description: 'Explore Dinacharya and Ritucharya for optimal health and well-being, guided by Ayurvedic principles.',
    images: [`https://placehold.co/1200x630.png`],
  },
};

const dinacharyaPractices = [
  {
    time: "Morning (Approx. 6 AM - 10 AM - Kapha Time)",
    icon: Sunrise,
    iconColor: "text-orange-400",
    activities: [
      { name: "Wake Up Early", description: "Ideally before sunrise, during Vata time (2-6 AM) for clarity or early Kapha time for stability.", points: ["Aligns with natural rhythms.", "Promotes mental clarity and freshness."] },
      { name: "Elimination (Shaucha)", description: "Evacuate bowels and bladder.", points: ["Aids detoxification.", "Lightens the body."] },
      { name: "Oral Hygiene (Danta Dhavana & Jihva Nirlekhana)", description: "Brush teeth and scrape tongue.", points: ["Removes Ama (toxins) from tongue.", "Improves taste perception and oral health."] },
      { name: "Oil Pulling (Gandusha/Kavala)", description: "Swish oil (sesame or coconut) in mouth.", points: ["Strengthens gums and teeth.", "Detoxifies oral cavity."] },
      { name: "Warm Water or Herbal Tea", description: "Sip warm water, possibly with lemon or ginger.", points: ["Stimulates digestion (Agni).", "Hydrates the body."] },
      { name: "Self-Massage (Abhyanga)", description: "Apply warm oil to the body.", points: ["Nourishes skin, calms Vata.", "Improves circulation and lymphatic drainage."] },
      { name: "Exercise (Vyayama)", description: "Yoga, walking, or other suitable exercise.", points: ["Boosts circulation and energy.", "Strengthens the body according to dosha."] },
      { name: "Bathing (Snana)", description: "Warm bath or shower.", points: ["Cleanses the body.", "Refreshes and energizes."] },
      { name: "Meditation & Pranayama", description: "Mindfulness, breathwork.", points: ["Calms the mind, balances Prana.", "Sets a positive tone for the day."] },
      { name: "Light Breakfast", description: "Nourishing and easy to digest.", points: ["Provides sustained energy.", "Should be taken after Agni is kindled."] },
    ]
  },
  {
    time: "Midday (Approx. 10 AM - 2 PM - Pitta Time)",
    icon: Sun,
    iconColor: "text-yellow-500",
    activities: [
      { name: "Main Meal", description: "Largest meal of the day when Agni is strongest.", points: ["Focus on wholesome, balanced foods.", "Eat mindfully, without distractions."] },
      { name: "Gentle Walk", description: "Short walk after lunch.", points: ["Aids digestion.", "Prevents post-meal sluggishness."] },
      { name: "Focused Work/Activity", description: "Utilize Pitta's sharp energy for productive tasks.", points: ["Mental clarity is high.", "Good time for decision-making."] },
    ]
  },
  {
    time: "Afternoon/Evening (Approx. 2 PM - 10 PM - Vata then Kapha Time)",
    icon: Moon,
    iconColor: "text-blue-400",
    activities: [
      { name: "Light Dinner (by 7-8 PM)", description: "Easily digestible meal, well before bedtime.", points: ["Allows proper digestion before sleep.", "Prevents Ama formation."] },
      { name: "Relaxation", description: "Wind down with calming activities.", points: ["Reading, gentle music, spending time with loved ones.", "Prepares mind for sleep."] },
      { name: "Limit Screen Time", description: "Reduce exposure to blue light before bed.", points: ["Supports natural melatonin production.", "Improves sleep quality."] },
      { name: "Prepare for Sleep", description: "Engage in a consistent bedtime routine.", points: ["Signals body it's time to rest.", "Promotes tranquility."] },
      { name: "Sleep by 10 PM", description: "During Kapha time for deep, restorative sleep.", points: ["Allows body to detoxify and repair.", "Crucial for overall health and vitality."] },
    ]
  }
];

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
    icon: CloudDrizzle, // Changed from Zap
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
    icon: Coffee, 
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
    icon: Snowflake, 
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
            <Sunrise className="h-8 w-8 mr-3 text-orange-500" />
            Dinacharya: The Art of Daily Living
          </CardTitle>
          <CardDescription>
            Dinacharya outlines ideal daily practices from waking to sleeping to maintain doshic balance, strong Agni (digestive fire), and overall well-being. Consistency is key.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-4" defaultValue={["Morning (Approx. 6 AM - 10 AM - Kapha Time)"]}>
            {dinacharyaPractices.map((period) => (
              <AccordionItem value={period.time} key={period.time} className="border border-border rounded-lg shadow-sm bg-card/50">
                <AccordionTrigger className="text-xl hover:text-accent p-4">
                  <div className="flex items-center">
                    <period.icon className={`h-6 w-6 mr-3 ${period.iconColor}`} /> {period.time}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 space-y-3">
                  {period.activities.map(activity => (
                    <div key={activity.name} className="py-2">
                      <h4 className="font-semibold text-foreground text-md mb-1">{activity.name}</h4>
                      <p className="text-sm text-muted-foreground/90 mb-1">{activity.description}</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5 pl-4">
                        {activity.points.map(point => <li key={point}>{point}</li>)}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center">
            <Leaf className="h-8 w-8 mr-3 text-green-600" />
            Ritucharya: Harmonizing with the Seasons
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
            <Settings2 className="h-7 w-7 mr-3 text-accent" /> Personalize Your Routine (Coming Soon)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center max-w-xl mx-auto">
          <p className="text-md text-muted-foreground leading-relaxed">
            Future updates will allow you to generate personalized daily and weekly routines based on your Prakriti (Ayurvedic constitution), current imbalances (Vikriti), and personal wellness goals. Stay tuned for these exciting enhancements!
          </p>
        </CardContent>
      </Card>

    </div>
  );
}
