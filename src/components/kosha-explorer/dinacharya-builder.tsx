
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sunrise, Sun, Moon, Coffee, CheckCircle, Activity, Wind, Droplets, Sparkles, Users, Brain, Zap, Eye, Smile, Type, Edit, Bed, Palette, Sprout, Recycle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const DINACHARYA_PROGRESS_LS_KEY_PREFIX = 'dinacharyaProgress_';

interface DinacharyaActivity {
  id: string;
  name: string;
  description: string;
  ayurvedicBenefit: string;
  icon?: LucideIcon;
  defaultTime?: string; // e.g., "6:00 AM - 6:30 AM"
}

interface DinacharyaPeriod {
  id: string;
  periodName: string;
  icon: LucideIcon;
  iconColor: string;
  activities: DinacharyaActivity[];
}

const dinacharyaTemplate: DinacharyaPeriod[] = [
  {
    id: 'morning',
    periodName: 'Morning Routine (Approx. 6 AM - 10 AM - Kapha Time)',
    icon: Sunrise,
    iconColor: 'text-orange-400',
    activities: [
      { id: 'wake_up', name: 'Wake Up Early (Brahmamuhurta)', description: 'Ideally before sunrise.', ayurvedicBenefit: 'Aligns with natural rhythms, promotes mental clarity and freshness.', icon: Bed, defaultTime: 'Before 6 AM' },
      { id: 'elimination', name: 'Elimination (Shaucha)', description: 'Evacuate bowels and bladder.', ayurvedicBenefit: 'Aids detoxification, lightens the body.', icon: Recycle, defaultTime: 'Upon waking' },
      { id: 'oral_hygiene', name: 'Oral Hygiene (Danta Dhavana & Jihva Nirlekhana)', description: 'Brush teeth and scrape tongue.', ayurvedicBenefit: 'Removes Ama (toxins), improves taste perception.', icon: Smile, defaultTime: 'After elimination' },
      { id: 'oil_pulling', name: 'Oil Pulling (Gandusha/Kavala)', description: 'Swish oil (sesame or coconut) in mouth for 5-10 mins.', ayurvedicBenefit: 'Strengthens gums, detoxifies oral cavity.', icon: Droplets, defaultTime: 'After oral hygiene' },
      { id: 'warm_water', name: 'Warm Water or Herbal Tea', description: 'Sip warm water, possibly with lemon/ginger.', ayurvedicBenefit: 'Stimulates Agni, hydrates.', icon: Coffee, defaultTime: 'After oil pulling' },
      { id: 'abhyanga', name: 'Self-Massage (Abhyanga)', description: 'Apply warm oil to the body.', ayurvedicBenefit: 'Nourishes skin, calms Vata, improves circulation.', icon: Palette, defaultTime: 'Before exercise/bath' },
      { id: 'vyayama', name: 'Exercise (Vyayama)', description: 'Yoga, walking, or other suitable exercise.', ayurvedicBenefit: 'Boosts circulation, strengthens body, balances doshas.', icon: Activity, defaultTime: 'Morning' },
      { id: 'snana', name: 'Bathing (Snana)', description: 'Warm bath or shower.', ayurvedicBenefit: 'Cleanses the body, refreshes and energizes.', icon: Droplets, defaultTime: 'After exercise' },
      { id: 'meditation_pranayama', name: 'Meditation & Pranayama', description: 'Mindfulness, breathwork.', ayurvedicBenefit: 'Calms mind, balances Prana, sets positive tone.', icon: Wind, defaultTime: 'After bathing / Before breakfast' },
      { id: 'breakfast', name: 'Light Breakfast', description: 'Nourishing and easy to digest.', ayurvedicBenefit: 'Provides sustained energy after Agni is kindled.', icon: Sprout, defaultTime: 'By 8-9 AM' },
    ]
  },
  {
    id: 'midday',
    periodName: 'Midday Routine (Approx. 10 AM - 2 PM - Pitta Time)',
    icon: Sun,
    iconColor: 'text-yellow-500',
    activities: [
      { id: 'main_meal', name: 'Main Meal (Lunch)', description: 'Largest meal when Agni is strongest.', ayurvedicBenefit: 'Optimal digestion and nutrient assimilation.', icon: Sprout, defaultTime: '12 PM - 1 PM' },
      { id: 'gentle_walk_lunch', name: 'Gentle Walk After Lunch', description: 'Short, leisurely walk (10-15 mins).', ayurvedicBenefit: 'Aids digestion, prevents post-meal sluggishness.', icon: Activity, defaultTime: 'After lunch' },
      { id: 'focused_work', name: 'Focused Work/Activity', description: 'Utilize Pitta\'s sharp energy.', ayurvedicBenefit: 'Mental clarity is high for productive tasks.', icon: Brain, defaultTime: 'During Pitta hours' },
    ]
  },
  {
    id: 'evening',
    periodName: 'Evening & Night Routine (Approx. 2 PM - 10 PM - Vata then Kapha Time)',
    icon: Moon,
    iconColor: 'text-blue-400',
    activities: [
      { id: 'light_dinner', name: 'Light Dinner', description: 'Easily digestible meal, well before bedtime.', ayurvedicBenefit: 'Allows proper digestion before sleep, prevents Ama.', icon: Sprout, defaultTime: '6 PM - 7 PM' },
      { id: 'relax_wind_down', name: 'Relaxation & Winding Down', description: 'Calming activities like reading, gentle music.', ayurvedicBenefit: 'Prepares mind for sleep, reduces Vata.', icon: Eye, defaultTime: 'After dinner' },
      { id: 'limit_screens', name: 'Limit Screen Time', description: 'Reduce exposure to blue light before bed.', ayurvedicBenefit: 'Supports natural melatonin production.', icon: Edit, defaultTime: '1-2 hours before sleep' },
      { id: 'prepare_sleep', name: 'Prepare for Sleep', description: 'Consistent bedtime routine.', ayurvedicBenefit: 'Signals body it\'s time to rest, promotes tranquility.', icon: Bed, defaultTime: 'Around 9 PM' },
      { id: 'sleep_by_10', name: 'Sleep by 10 PM', description: 'During Kapha time for deep, restorative sleep.', ayurvedicBenefit: 'Allows body to detoxify and repair, crucial for health.', icon: Moon, defaultTime: 'By 10 PM' },
    ]
  }
];

export default function DinacharyaBuilder() {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const { toast } = useToast();
  const [currentDateKey, setCurrentDateKey] = useState('');

  useEffect(() => {
    const todayKey = DINACHARYA_PROGRESS_LS_KEY_PREFIX + new Date().toISOString().split('T')[0];
    setCurrentDateKey(todayKey);

    const storedProgress = localStorage.getItem(todayKey);
    if (storedProgress) {
      try {
        setCompletedTasks(JSON.parse(storedProgress));
      } catch (error) {
        console.error("Failed to parse Dinacharya progress from localStorage:", error);
        localStorage.removeItem(todayKey);
      }
    } else {
      // If no progress for today, clear any old progress
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(DINACHARYA_PROGRESS_LS_KEY_PREFIX) && key !== todayKey) {
          localStorage.removeItem(key);
        }
      });
      setCompletedTasks({}); // Start fresh for the new day
    }
  }, []);

  useEffect(() => {
    if(currentDateKey){
        localStorage.setItem(currentDateKey, JSON.stringify(completedTasks));
    }
  }, [completedTasks, currentDateKey]);

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
    trackCalculatorUsage('dinacharya-builder'); // Track interaction
  };

  const handleResetProgress = () => {
    setCompletedTasks({});
    if(currentDateKey) {
        localStorage.removeItem(currentDateKey);
    }
    toast({ title: "Progress Reset", description: "Your daily Dinacharya progress has been cleared." });
  };
  
  const totalTasks = dinacharyaTemplate.reduce((sum, period) => sum + period.activities.length, 0);
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercentage = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg text-foreground flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-accent" /> Today's Dinacharya Progress
          </CardTitle>
          <CardDescription>
            Track your adherence to the daily routine. Current progress: {completedCount} / {totalTasks} tasks ({progressPercentage.toFixed(0)}%).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-2 bg-muted rounded-full mb-4">
            <div
              className="h-2 bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <Button onClick={handleResetProgress} variant="outline" size="sm" className="w-full sm:w-auto">
            <Recycle className="mr-2 h-4 w-4" /> Reset Today's Progress
          </Button>
        </CardContent>
      </Card>

      <Accordion type="multiple" defaultValue={['morning']} className="w-full space-y-4">
        {dinacharyaTemplate.map((period) => (
          <AccordionItem value={period.id} key={period.id} className="border border-border rounded-lg shadow-sm bg-card/50">
            <AccordionTrigger className="text-xl hover:text-accent p-4">
              <div className="flex items-center">
                <period.icon className={`h-6 w-6 mr-3 ${period.iconColor}`} /> {period.periodName}
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4 pt-0 space-y-3">
              {period.activities.map((activity) => (
                <Card key={activity.id} className={`p-3 shadow-xs transition-all ${completedTasks[activity.id] ? 'bg-green-500/10 border-green-500/30' : 'bg-card/30'}`}>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={activity.id}
                      checked={!!completedTasks[activity.id]}
                      onCheckedChange={() => handleTaskToggle(activity.id)}
                      className="mt-1 flex-shrink-0 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <div className="flex-grow">
                      <label htmlFor={activity.id} className="font-medium text-foreground cursor-pointer flex items-center">
                        {activity.icon && <activity.icon className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />}
                        {activity.name}
                        {activity.defaultTime && <span className="text-xs text-muted-foreground/70 ml-2">({activity.defaultTime})</span>}
                      </label>
                      <p className="text-xs text-muted-foreground mt-0.5">{activity.description}</p>
                      <p className="text-xs text-muted-foreground/80 italic mt-0.5">Benefit: {activity.ayurvedicBenefit}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-xs text-muted-foreground text-center italic mt-4">
        This is a general Dinacharya template. Personalize it based on your Prakriti, current condition (Vikriti), and lifestyle.
      </p>
    </div>
  );
}
