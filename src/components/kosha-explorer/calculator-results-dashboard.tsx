
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Droplets,
  BedDouble,
  Dumbbell,
  Smile,
  BookText,
  PenLine,
  Library,
  HeartHandshake,
  Gift,
  VolumeX,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { format, parseISO, isValid as isValidDate } from 'date-fns';
import type { LucideIcon } from 'lucide-react';

interface DashboardItem {
  id: string;
  title: string;
  Icon: LucideIcon;
  data: string | React.ReactNode;
  link: string;
  linkText?: string;
}

// Helper to safely parse JSON from localStorage
const getLocalStorageItem = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage item ${key}:`, error);
    return defaultValue;
  }
};

const getLocalStorageString = (key: string, defaultValue: string): string => {
    if (typeof window === 'undefined') return defaultValue;
    return localStorage.getItem(key) || defaultValue;
}

export default function CalculatorResultsDashboard() {
  const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([]);

  useEffect(() => {
    const items: DashboardItem[] = [];

    // Hydration Tracker
    const hydrationGoal = parseInt(getLocalStorageString('hydrationGoal', '2000'), 10);
    const dailyIntakeKey = `hydrationIntake_${new Date().toISOString().split('T')[0]}`;
    const currentHydrationIntake = parseInt(getLocalStorageString(dailyIntakeKey, '0'), 10);
    const hydrationProgress = hydrationGoal > 0 ? Math.min((currentHydrationIntake / hydrationGoal) * 100, 100) : 0;
    items.push({
      id: 'hydration',
      title: 'Hydration Status',
      Icon: Droplets,
      data: (
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Today: {currentHydrationIntake}ml / {hydrationGoal}ml</p>
          <Progress value={hydrationProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">{hydrationProgress.toFixed(0)}% of goal</p>
        </div>
      ),
      link: '/calculator/hydration-tracker',
    });

    // Sleep Quality Tracker
    const sleepSessions = getLocalStorageItem<any[]>('sleepQualitySessions', []);
    const latestSleep = sleepSessions.length > 0 ? sleepSessions[0] : null;
    items.push({
      id: 'sleep',
      title: 'Latest Sleep',
      Icon: BedDouble,
      data: latestSleep
        ? `${Math.floor(latestSleep.durationInMinutes / 60)}h ${latestSleep.durationInMinutes % 60}m (Score: ${latestSleep.sleepScore}/100)`
        : 'No sleep data logged yet.',
      link: '/calculator/sleep-quality-tracker',
    });

    // Exercise Log
    const exerciseLogs = getLocalStorageItem<any[]>('exerciseLogSessions', []);
    items.push({
      id: 'exercise',
      title: 'Recent Activity',
      Icon: Dumbbell,
      data: exerciseLogs.length > 0 ? `${exerciseLogs.length} exercise(s) logged.` : 'No exercises logged yet.',
      link: '/calculator/exercise-log-suggestor',
    });
    
    // Mood Tracker
    const moodLogs = getLocalStorageItem<any[]>('moodTrackerLogs', []);
    const latestMood = moodLogs.length > 0 ? moodLogs[0] : null;
    items.push({
        id: 'mood',
        title: 'Latest Mood',
        Icon: Smile,
        data: latestMood ? `${latestMood.moodEmoji} ${latestMood.moodLabel} on ${format(parseISO(latestMood.loggedAt), 'MMM d')}` : 'No moods logged yet.',
        link: '/calculator/mood-tracker'
    });

    // Meditation Journal
    const meditationEntries = getLocalStorageItem<any[]>('meditationJournalEntries', []);
    items.push({
        id: 'meditation',
        title: 'Meditation Journal',
        Icon: BookText,
        data: meditationEntries.length > 0 ? `${meditationEntries.length} reflections logged.` : 'No meditation reflections yet.',
        link: '/calculator/meditation-journal'
    });

    // Self-Inquiry Prompts
    const selfInquiryReflections = getLocalStorageItem<any[]>('selfInquiryReflections', []);
    items.push({
        id: 'selfInquiry',
        title: 'Self-Inquiry',
        Icon: PenLine,
        data: selfInquiryReflections.length > 0 ? `${selfInquiryReflections.length} reflections saved.` : 'No self-inquiry reflections yet.',
        link: '/calculator/self-inquiry-prompts'
    });

    // Spiritual Book Tracker
    const spiritualBooks = getLocalStorageItem<any[]>('spiritualBooks', []);
    items.push({
        id: 'books',
        title: 'Spiritual Reading',
        Icon: Library,
        data: spiritualBooks.length > 0 ? `Tracking ${spiritualBooks.length} text(s).` : 'No books being tracked.',
        link: '/calculator/spiritual-book-tracker'
    });

    // Sankalpa Recorder
    const sankalpaText = getLocalStorageString('sankalpaText', '');
    items.push({
        id: 'sankalpa',
        title: 'Your Sankalpa',
        Icon: HeartHandshake,
        data: sankalpaText ? `Intention set. ${getLocalStorageItem<any[]>('sankalpaReflections', []).length} reflections.` : 'No Sankalpa set yet.',
        link: '/calculator/sankalpa-recorder'
    });

    // Gratitude Log
    const gratitudeEntries = getLocalStorageItem<any[]>('gratitudeLogEntries', []);
    items.push({
        id: 'gratitude',
        title: 'Gratitude Log',
        Icon: Gift,
        data: gratitudeEntries.length > 0 ? `${gratitudeEntries.length} gratitude moments logged.` : 'No gratitude entries yet.',
        link: '/calculator/gratitude-log'
    });
    
    // Silence Tracker
    const silenceSessions = getLocalStorageItem<any[]>('silenceSessions', []);
    const totalSilenceDuration = silenceSessions.reduce((acc, s) => acc + (s.duration || 0), 0);
    const formatSilenceTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };
    items.push({
        id: 'silence',
        title: 'Silence Practice',
        Icon: VolumeX,
        data: silenceSessions.length > 0 ? `${silenceSessions.length} sessions, ${formatSilenceTime(totalSilenceDuration)} total.` : 'No silence sessions logged.',
        link: '/calculator/silence-tracker'
    });


    setDashboardItems(items);
  }, []);

  if (dashboardItems.length === 0) {
    return <p className="text-muted-foreground text-center">No calculator data available yet. Start using the tools to see your dashboard populate!</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardItems.map((item) => (
        <Card key={item.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <CardHeader className="flex flex-row items-center space-x-3 pb-3">
            <item.Icon className="h-8 w-8 text-primary" />
            <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="text-sm text-muted-foreground">
                {typeof item.data === 'string' ? <p>{item.data}</p> : item.data}
            </div>
          </CardContent>
          <div className="p-4 mt-auto">
            <Button variant="outline" asChild className="w-full group">
              <Link href={item.link}>
                {item.linkText || 'Open Calculator'} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </Card>
      ))}
       <Card className="md:col-span-2 lg:col-span-3 shadow-lg bg-muted/30 border-dashed">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary"/>More Insights Coming!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Results from BMI, Body Fat Percentage, Waist-Hip Ratio, Caloric Needs, Prakriti Quiz, and other tools will appear here as they are enhanced to store data. Explore the calculators to get started!
            </p>
          </CardContent>
           <div className="p-4 mt-auto">
            <Button variant="default" asChild className="w-full group">
              <Link href="/calculator">
                Explore All Calculators <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </Card>
    </div>
  );
}
