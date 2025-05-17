
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Salad, Scale, Flame, FlaskConical, ListChecks, Dot, CheckCircle2, Leaf, Wheat, Fish, Drumstick, Milk, Carrot as CarrotIcon, Shell, Brain, Sun } from "lucide-react";
import Image from "next/image";
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
  title: 'Good Foods Guide | Balanced Diet, Nutrition & Micronutrients',
  description: 'Learn about balanced diets, calories, macronutrients (proteins, carbs, fats), and essential vitamins and minerals for optimal health and well-being. Practical tips for healthy eating.',
  keywords: ['Balanced Diet', 'Healthy Eating', 'Nutrition Guide', 'Macronutrients', 'Micronutrients', 'Vitamins', 'Minerals', 'Calorie Density', 'Wellness Diet'],
  openGraph: {
    title: 'Good Foods Guide | Balanced Diet & Nutrition Tips | Kosha Explorer',
    description: 'Your comprehensive guide to understanding macronutrients, micronutrients, calorie density, and practical tips for a healthy, balanced diet.',
    url: `${siteBaseUrl}/good-foods`,
    type: 'article',
    images: [
      {
        url: `https://picsum.photos/seed/good-foods-guide-og/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Good Foods Guide for a Balanced Diet',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Good Foods Guide | Nutrition & Healthy Eating | Kosha Explorer',
    description: 'Learn about balanced diets, macronutrients, micronutrients, and get practical tips for healthy eating habits.',
    images: [`https://picsum.photos/seed/good-foods-guide-twitter/1200/630`],
  },
};

const NutsIcon = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15.35 15.35c2.03-2.03 2.03-5.32 0-7.35S10.03 6 8 8s-4.77 3.27-2.74 5.3c2.03 2.03 5.32 2.03 7.35 0Z"/><path d="M16.5 16.5c1.28-1.28 1.28-3.36 0-4.63s-3.36-1.28-4.63 0c-1.28 1.28-1.28 3.36 0 4.63s3.36 1.28 4.63 0Z"/><path d="M11.65 11.65c.61-.61.61-1.6 0-2.21s-1.6-.61-2.21 0c-.61.61-.61 1.6 0 2.21s1.6.61 2.21 0Z"/><path d="M15.5 6.51c.78-.78.78-2.05 0-2.83s-2.05-.78-2.83 0c-.78.78-.78 2.05 0 2.83"/><path d="M15.5 17.49c.78-.78.78-2.05 0-2.83s-2.05-.78-2.83 0c-.78.78-.78 2.05 0 2.83"/><path d="M6.51 8.5c-.78-.78-2.05-.78-2.83 0s-.78 2.05 0 2.83c.78.78 2.05.78 2.83 0Z"/><path d="M17.49 8.5c-.78-.78-2.05-.78-2.83 0s-.78 2.05 0 2.83c.78.78 2.05.78 2.83 0Z"/></svg>;

const macronutrientsData = [
  {
    name: "Proteins",
    icon: Drumstick,
    role: "Essential for building and repairing tissues, producing enzymes and hormones, and supporting immune function. Important for muscle growth and overall body structure.",
    sources: ["Lentils, beans, chickpeas (legumes)", "Tofu, tempeh, edamame (soy products)", "Nuts and seeds (almonds, walnuts, chia, flax)", "Quinoa, amaranth (whole grains)", "Dairy products (milk, yogurt, cheese)", "Eggs", "Lean meats (chicken, turkey) and fish (salmon, tuna)"],
    details: "Aim for a variety of protein sources to ensure you get all essential amino acids. Protein needs vary based on age, activity level, and health goals."
  },
  {
    name: "Carbohydrates",
    icon: Wheat,
    role: "The body's primary source of energy for daily activities and brain function. Dietary fiber, a type of carbohydrate, aids in digestive health.",
    sources: ["Whole grains (oats, brown rice, quinoa, whole wheat bread, millet)", "Fruits (berries, apples, bananas, oranges)", "Vegetables (sweet potatoes, corn, peas, leafy greens)", "Legumes (beans, lentils, chickpeas)"],
    details: "Choose complex carbohydrates (whole grains, vegetables, fruits) over simple/refined carbs (sugary drinks, white bread, pastries) for sustained energy release and better nutrition."
  },
  {
    name: "Fats (Lipids)",
    icon: Fish, 
    role: "Important for energy storage, hormone production, absorption of fat-soluble vitamins (A, D, E, K), cell membrane structure, and protecting organs.",
    sources: ["Avocados", "Nuts and seeds (walnuts, almonds, chia seeds, flaxseeds, pumpkin seeds)", "Olive oil, avocado oil, coconut oil (in moderation)", "Fatty fish (salmon, mackerel, sardines - rich in Omega-3s)", "Ghee (clarified butter - in Ayurveda)"],
    details: "Focus on unsaturated fats (monounsaturated and polyunsaturated found in plant sources and fish) and limit saturated fats (animal products, some tropical oils) and trans fats (processed foods)."
  }
];

const calorieDensityData = [
  { foodType: "Leafy Greens (spinach, kale, lettuce)", density: "Very Low", example: "~20-30 kcal per 100g" },
  { foodType: "Non-Starchy Vegetables (broccoli, peppers, cucumber, zucchini)", density: "Low", example: "~30-50 kcal per 100g" },
  { foodType: "Fruits (berries, apples, oranges, melon)", density: "Low to Moderate", example: "~50-80 kcal per 100g" },
  { foodType: "Lean Proteins (chicken breast, fish, tofu, lentils)", density: "Moderate", example: "~120-170 kcal per 100g (cooked)" },
  { foodType: "Whole Grains (cooked rice, oats, quinoa)", density: "Moderate", example: "~110-150 kcal per 100g (cooked)" },
  { foodType: "Nuts and Seeds (almonds, chia, walnuts)", density: "High", example: "~500-600 kcal per 100g" },
  { foodType: "Oils and Fats (olive oil, butter, ghee)", density: "Very High", example: "~800-900 kcal per 100g" },
  { foodType: "Processed Snacks & Sweets (chips, cookies, candy)", density: "High to Very High", example: "~400-600+ kcal per 100g (often nutrient-poor)" },
];

const micronutrientsTableData = [
  { name: "Vitamin A", icon: CarrotIcon, role: "Vision, immune function, cell growth, skin health", sources: "Carrots, sweet potatoes, spinach, liver, dairy, eggs" },
  { name: "Vitamin C", icon: Leaf, role: "Antioxidant, immune support, collagen production, wound healing", sources: "Citrus fruits (oranges, lemons), berries, bell peppers, broccoli, tomatoes" },
  { name: "Vitamin D", icon: Sun, role: "Calcium absorption, bone health, immune function, mood regulation", sources: "Sunlight exposure, fatty fish (salmon, mackerel), fortified dairy, egg yolks" },
  { name: "Vitamin E", icon: Wheat, role: "Antioxidant, protects cells from damage, skin health", sources: "Nuts (almonds), seeds (sunflower seeds), vegetable oils, spinach, broccoli" },
  { name: "Vitamin K", icon: Leaf, role: "Blood clotting, bone health, heart health", sources: "Leafy green vegetables (kale, spinach, collard greens), broccoli, Brussels sprouts" },
  { name: "Calcium", icon: Milk, role: "Bone and teeth health, muscle function, nerve transmission, blood clotting", sources: "Dairy products, leafy greens (kale, collards), tofu, fortified foods, sesame seeds" },
  { name: "Iron", icon: Drumstick, role: "Oxygen transport (hemoglobin), energy production, immune function", sources: "Red meat, poultry, fish, lentils, spinach, fortified cereals, pumpkin seeds" },
  { name: "Magnesium", icon: NutsIcon, role: "Muscle and nerve function, blood sugar control, blood pressure regulation, energy production", sources: "Nuts (almonds, cashews), seeds (pumpkin, chia), whole grains, leafy greens, dark chocolate" },
  { name: "Potassium", icon: Leaf, role: "Fluid balance, nerve signals, muscle contractions, blood pressure regulation", sources: "Bananas, potatoes, beans, spinach, yogurt, avocados" },
  { name: "Zinc", icon: Shell, role: "Immune function, wound healing, DNA synthesis, taste and smell", sources: "Oysters, red meat, poultry, beans, nuts, dairy, seeds" },
  { name: "B Vitamins (B1, B2, B3, B5, B6, B7, B9, B12)", icon: Brain, role: "Energy production, brain function, cell metabolism, nerve function, red blood cell formation", sources: "Meat, eggs, dairy, legumes, leafy greens, fortified grains, nuts, seeds" }
];

const practicalTipsData = [
  "Plan your meals for the week to make healthy food choices easier and reduce impulsive unhealthy eating.",
  "Read food labels to understand ingredients, serving sizes, and nutritional content (calories, fats, sugars, sodium).",
  "Practice mindful eating: pay attention to your food, savor flavors, and listen to your body's hunger and fullness cues.",
  "Stay adequately hydrated by drinking plenty of water throughout the day; sometimes thirst is mistaken for hunger.",
  "Limit processed foods, sugary drinks, and unhealthy fats (trans fats, excessive saturated fats).",
  "Cook at home more often to have better control over ingredients, portion sizes, and cooking methods.",
  "Incorporate a variety of colorful fruits and vegetables into your diet daily for a wide range of micronutrients.",
  "Don't strive for perfection; aim for balance and consistency in your healthy eating habits. Occasional indulgences are okay."
];

export default function GoodFoodsPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <Salad className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Nourish Your Body: A Guide to Good Foods & Balanced Diet</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Discover the essentials of a balanced diet, understand calories, and learn about vital macronutrients and micronutrients for optimal health and well-being. Embrace healthy eating habits for a vibrant life.
        </p>
      </section>

      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center">
            <Scale className="h-8 w-8 mr-3 text-accent" />
            The Foundation: A Balanced Diet with Macronutrients
          </CardTitle>
          <CardDescription>
            A balanced diet provides your body with the necessary nutrients (macronutrients and micronutrients) to function correctly. It involves consuming a variety of foods in the right proportions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full space-y-4" defaultValue={["Proteins"]}>
            {macronutrientsData.map((macro) => (
              <AccordionItem value={macro.name} key={macro.name} className="border border-border rounded-lg shadow-sm bg-card/50">
                <AccordionTrigger className="text-xl hover:text-accent p-4">
                  <div className="flex items-center">
                    <macro.icon className="h-6 w-6 mr-3 text-primary" /> {macro.name}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 space-y-3">
                  <p className="text-muted-foreground">{macro.role}</p>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Key Food Sources:</h3>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-2">
                      {macro.sources.map(src => <li key={src}>{src}</li>)}
                    </ul>
                  </div>
                  <p className="text-sm text-muted-foreground/80 italic">{macro.details}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-6 p-4 border rounded-lg bg-muted/30">
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center"><CheckCircle2 className="h-5 w-5 mr-2 text-primary"/>The Healthy Plate Method</h2>
            <p className="text-muted-foreground">A simple way to visualize a balanced meal: Fill half your plate with non-starchy vegetables, a quarter with lean protein, and a quarter with whole grains or starchy vegetables. Add a source of healthy fat in moderation. This promotes a balanced intake of macronutrients and micronutrients.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-3xl text-primary flex items-center">
            <Flame className="h-8 w-8 mr-3 text-accent" />
            Understanding Calories & Nutrient Density
          </CardTitle>
          <CardDescription>
            Calories are units of energy your body uses for all its functions. While important for energy balance, the quality of calories (nutrient density) matters as much as quantity for overall health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Your daily caloric needs depend on factors like age, sex, activity level, and metabolic rate (Basal Metabolic Rate - BMR, and Total Daily Energy Expenditure - TDEE). Focus on nutrient-dense foods that provide vitamins, minerals, and fiber along with calories, rather than "empty calories" from processed foods which offer little nutritional value.
          </p>
          <h2 className="text-xl font-semibold text-foreground mb-3">Approximate Calorie Density of Common Foods:</h2>
            <div className="overflow-x-auto rounded-lg border shadow-md">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Food Type / Group</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Calorie Density Level</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Example (kcal per 100g)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-background divide-y divide-border">
                {calorieDensityData.map((item) => (
                  <TableRow key={item.foodType} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{item.foodType}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.density}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.example}</TableCell>
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
            <FlaskConical className="h-8 w-8 mr-3 text-accent" />
            Essential Micronutrients: Vitamins & Minerals Guide
          </CardTitle>
          <CardDescription>
            Micronutrients are vital vitamins and minerals your body needs in smaller amounts to function properly, support metabolism, and maintain overall health.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground mb-4">
            A varied and colorful diet, rich in whole foods like fruits, vegetables, whole grains, proteins, and healthy fats, is the best way to ensure adequate intake of essential micronutrients.
          </p>
          <div className="overflow-x-auto rounded-lg border shadow-md">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-1/12"></TableHead>
                  <TableHead className="w-2/12 px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Micronutrient</TableHead>
                  <TableHead className="w-4/12 px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Key Roles in the Body</TableHead>
                  <TableHead className="w-5/12 px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Rich Food Sources</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-background divide-y divide-border">
                {micronutrientsTableData.map((item) => (
                  <TableRow key={item.name} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="px-6 py-4 text-center"><item.icon className="h-5 w-5 text-primary mx-auto" /></TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">{item.name}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.role}</TableCell>
                    <TableCell className="px-6 py-4 text-sm text-muted-foreground">{item.sources}</TableCell>
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
            <ListChecks className="h-8 w-8 mr-3 text-accent" />
            Practical Tips for Healthy Eating & Nutrition
          </CardTitle>
          <CardDescription>
            Incorporate these simple habits into your daily routine for better nutrition, improved energy, and overall well-being.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {practicalTipsData.map((tip, index) => (
              <li key={index} className="flex items-start p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
                <Dot className="h-6 w-6 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}
