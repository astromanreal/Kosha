
import { User, Settings2, LogOut, Calculator as CalculatorIcon, PersonStanding, Wind, BrainCircuit, Lightbulb as LightbulbIconLucide, Sparkles as SparklesIcon, ArrowRight } from 'lucide-react'; // Renamed Lightbulb to avoid conflict
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { calculatorDetailsList, type CalculatorInfo } from '@/app/calculator/calculatorData';
import type { LucideIcon } from 'lucide-react';
import { getIconComponent } from '@/lib/icon-map'; // Import the helper

// Define Kosha order and icons locally for this page, similar to calculator/page.tsx
const koshaOrder: Record<string, number> = {
  "Annamaya Kosha": 1,
  "Pranamaya Kosha": 2,
  "Manomaya Kosha": 3,
  "Vijnanamaya Kosha": 4,
  "Anandamaya Kosha": 5,
};

const koshaIconNames: Record<string, string> = { // Changed to icon names
  "Annamaya Kosha": "PersonStanding",
  "Pranamaya Kosha": "Wind",
  "Manomaya Kosha": "BrainCircuit",
  "Vijnanamaya Kosha": "Lightbulb", // Assuming 'Lightbulb' is the string name for LightbulbIconLucide
  "Anandamaya Kosha": "Sparkles",  // Assuming 'Sparkles' is for SparklesIcon
};


export default function ProfilePage() {
  const user = {
    name: 'JivaYatri',
    description: 'Your Kosha Explorer dashboard: personalized insights for holistic well-being. Track progress and deepen your connection on the path to vitality.',
    avatarSrc: 'https://picsum.photos/seed/jiva_yatri_kosha/200/200',
    avatarFallback: 'JY',
  };

  const groupedCalculators = calculatorDetailsList.reduce((acc, calculator) => {
    const kosha = calculator.kosha || 'Other'; // Group by Kosha
    if (!acc[kosha]) {
      acc[kosha] = [];
    }
    acc[kosha].push(calculator);
    return acc;
  }, {} as Record<string, CalculatorInfo[]>);

  const sortedKoshas = Object.keys(groupedCalculators).sort(
    (a, b) => (koshaOrder[a] || 99) - (koshaOrder[b] || 99)
  );

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      <section className="text-center">
        <User className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-2">User Profile</h1>
      </section>

      <div className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto">
        <Card className="w-full shadow-xl rounded-2xl overflow-hidden bg-card border border-border">
          <CardHeader className="p-6 sm:p-8 text-center bg-muted/30">
            <Avatar className="w-32 h-32 sm:w-40 sm:h-40 mb-6 mx-auto ring-4 ring-primary/40 shadow-lg">
              <AvatarImage src={user.avatarSrc} alt={`${user.name}'s Avatar`} data-ai-hint="spiritual meditation" />
              <AvatarFallback className="text-4xl sm:text-5xl bg-muted text-muted-foreground font-semibold">
                {user.avatarFallback}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-primary">{user.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 text-center">
            <CardDescription className="text-md text-muted-foreground italic leading-relaxed max-w-xl mx-auto">
              {user.description}
            </CardDescription>
          </CardContent>
           <CardFooter className="px-8 pb-8 flex-col sm:flex-row gap-3 justify-center">
             <Button variant="outline" asChild className="flex-1 w-full sm:w-auto">
                 <Link href="/account"><Settings2 className="mr-2 h-4 w-4"/> Account Settings</Link>
             </Button>
             <Button variant="destructive" asChild className="flex-1 w-full sm:w-auto">
                 <Link href="/"><LogOut className="mr-2 h-4 w-4"/> Logout (Placeholder)</Link>
             </Button>
         </CardFooter>
        </Card>

        <section className="w-full pt-8">
          <div className="text-center mb-10">
            <CalculatorIcon className="h-12 w-12 text-accent mx-auto mb-3" />
            <h2 className="text-3xl font-semibold text-foreground">Your Wellness Tools</h2>
            <p className="text-md text-muted-foreground max-w-xl mx-auto mt-2">
              Explore calculators to gain insights into various aspects of your well-being.
            </p>
          </div>

          {sortedKoshas.map((koshaName) => {
            const KoshaDisplayIcon = getIconComponent(koshaIconNames[koshaName] || 'Calculator'); // Use helper
            return (
              <div key={koshaName} className="mb-12">
                <div className="text-center mb-6">
                  {KoshaDisplayIcon && <KoshaDisplayIcon className="h-10 w-10 text-primary mx-auto mb-2" />}
                  <h3 className="text-2xl font-semibold text-primary">{koshaName} Tools</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {groupedCalculators[koshaName].map((calculator) => {
                    const SpecificIcon = getIconComponent(calculator.iconName); // Use helper
                    return (
                      <Card key={calculator.slug} className="shadow-lg rounded-xl overflow-hidden border border-border h-full flex flex-col hover:shadow-xl transition-shadow duration-300 hover:border-accent/70">
                        <CardHeader className="items-center text-center pb-3">
                          {SpecificIcon && <SpecificIcon className="h-10 w-10 text-accent mb-2" />}
                          <CardTitle className="text-lg text-foreground">{calculator.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow text-center px-4">
                          <p className="text-xs text-muted-foreground line-clamp-3">{calculator.shortDescription}</p>
                          {calculator.status === 'comingSoon' && (
                            <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-1 italic">(Coming Soon)</p>
                          )}
                        </CardContent>
                        <CardFooter className="p-4 mt-auto">
                          <Button
                            asChild
                            variant="outline"
                            className="w-full group border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary"
                            disabled={calculator.status === 'comingSoon'}
                          >
                            <Link href={`/calculator/${calculator.slug}`}>
                              {calculator.status === 'available' ? 'Open Tool' : 'Details'}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}
