import type { Metadata } from 'next';
import { User, Zap, Sparkles, BarChart3, ClipboardCheck, Diamond, Leaf, Settings2, Trophy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import WellnessPlanForm from '@/components/kosha-explorer/wellness-plan-form';
import CalculatorResultsDashboard from '@/components/kosha-explorer/calculator-results-dashboard';
import ProgressTrackingDashboard from '@/components/kosha-explorer/progress-tracking-dashboard'; 

const siteBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.koshaexplorer.com';

export const metadata: Metadata = {
  title: 'My Wellness Hub | Personalized Insights & Progress | Kosha Explorer',
  description: 'Your personal dashboard on Kosha Explorer. Track your activity, view calculator results, generate wellness plans, and discover personalized insights for holistic well-being.',
  keywords: ['Wellness Dashboard', 'Personalized Health', 'Activity Tracking', 'Ayurvedic Profile', 'Prakriti', 'Holistic Growth', 'User Account'],
  openGraph: {
    title: 'My Wellness Hub | Personalized Insights & Progress | Kosha Explorer',
    description: 'Access your personal dashboard for activity tracking, wellness plan generation, calculator results, and personalized Kosha insights.',
    url: `${siteBaseUrl}/account`,
    type: 'profile', // Using 'profile' type
    images: [
      {
        url: `https://picsum.photos/seed/wellness-hub-og/1200/630`,
        width: 1200,
        height: 630,
        alt: 'Kosha Explorer Wellness Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Wellness Hub | Kosha Explorer',
    description: 'Your personal dashboard for tracking progress, generating wellness plans, and discovering insights on Kosha Explorer.',
    images: [`https://picsum.photos/seed/wellness-hub-twitter/1200/630`],
  },
  // robots: { // Consider noindex if this page displays highly sensitive personal info not meant for public view
  //   index: false,
  //   follow: false,
  // },
};

const futureFeatures = [
  {
    title: "Personalized Kosha Insights",
    description: "Discover your unique mind-body constitution (Prakriti) and receive tailored guidance for balancing your Koshas.",
    icon: Zap, 
  },
  {
    title: "Levels & Rewards System",
    description: "Earn points and unlock new levels as you explore content, complete tasks, and interact with the platform. Gamify your wellness journey!",
    icon: Trophy, 
  },
];

export default function AccountPage() {
  const user = {
    name: 'JivaYatri', 
    description: 'Your Kosha Explorer dashboard: personalized insights for holistic well-being. Track progress and deepen your connection on the path to vitality.',
    avatarSrc: 'https://picsum.photos/seed/jiva_yatri_kosha/200/200',
    avatarFallback: 'JY',
  };

  return (
    <div className="space-y-10 flex flex-col items-center py-8 px-4">
      <section className="text-center w-full max-w-3xl">
        <User className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Your Wellness Hub</h1>
        <p className="text-lg text-muted-foreground">
          Welcome, {user.name}. Your personalized dashboard for holistic growth, activity tracking, and well-being insights.
        </p>
      </section>

      <Card className="w-full max-w-xl shadow-xl rounded-2xl overflow-hidden bg-card border border-border">
        <CardContent className="p-8 text-center">
          <Avatar className="w-32 h-32 mb-6 mx-auto ring-4 ring-primary/40 shadow-xl">
            <AvatarImage 
              src={user.avatarSrc} 
              alt={`${user.name}'s Avatar - Spiritual Journey`} 
              data-ai-hint="spiritual journey meditation" 
            />
            <AvatarFallback className="text-4xl bg-muted text-muted-foreground font-semibold">
              {user.avatarFallback}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-3xl font-bold text-foreground mb-3">{user.name}</h2>
          <p className="text-md text-muted-foreground italic leading-relaxed max-w-md mx-auto">
            {user.description}
          </p>
        </CardContent>
      </Card>

      <ProgressTrackingDashboard />

      <Card className="w-full max-w-3xl shadow-xl rounded-2xl overflow-hidden bg-card border border-border">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <ClipboardCheck className="h-10 w-10 text-accent" />
            <CardTitle className="text-2xl md:text-3xl font-semibold text-primary">Your Holistic Wellness Plan Generator</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Receive AI-powered personalized dietary suggestions, lifestyle adjustments, and mindfulness practices based on your Ayurvedic Prakriti and current concerns.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <WellnessPlanForm />
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden bg-card border border-border">
        <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
                <Sparkles className="h-10 w-10 text-accent" />
                <CardTitle className="text-2xl md:text-3xl font-semibold text-primary">Wellness Calculator Results Dashboard</CardTitle>
            </div>
          <CardDescription className="text-muted-foreground">
            View and manage your results from various wellness calculators (BMI, body fat, hydration, etc.) in one convenient place.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <CalculatorResultsDashboard />
        </CardContent>
      </Card>

      {futureFeatures.length > 0 && (
        <section className="w-full max-w-3xl pt-10">
          <Card className="shadow-xl rounded-2xl overflow-hidden bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold text-primary mb-2">Future Enhancements to Your Dashboard</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your personalized dashboard is evolving! Here's what's coming soon to help you on your wellness journey:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {futureFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <feature.icon className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="text-center px-6 pb-6">
              <p className="text-sm text-muted-foreground mt-4">
                Stay tuned as we build a more interactive and insightful experience tailored just for your holistic growth!
              </p>
            </CardFooter>
          </Card>
        </section>
      )}
      
      <section className="text-center w-full max-w-3xl px-4 mt-8">
        <p className="text-muted-foreground">
          Want to explore other Kosha Explorer features now?
        </p>
        <Button asChild size="lg" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/explore">Explore All Features</Link>
        </Button>
       </section>
    </div>
  );
}
