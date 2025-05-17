'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Calculator, Zap, Users, ClipboardCheck, Activity as ActivityIcon, HelpCircle } from 'lucide-react';
import { getProgressStats } from '@/lib/activity-tracker';
import { formatDistanceToNow, parseISO, isValid } from 'date-fns';
import type { LucideIcon } from 'lucide-react';

interface StatItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value, description }) => (
  <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg text-center shadow-sm hover:bg-muted/50 transition-colors">
    <Icon className="h-8 w-8 text-accent mb-2" />
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
    {description && <p className="text-xs text-muted-foreground/80 mt-1">{description}</p>}
  </div>
);

export default function ProgressTrackingDashboard() {
  const [stats, setStats] = useState<ReturnType<typeof getProgressStats> | null>(null);

  useEffect(() => {
    setStats(getProgressStats());
  }, []);

  if (!stats) {
    return (
      <Card className="w-full shadow-xl rounded-2xl overflow-hidden bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold text-primary text-center">Loading Activity...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">Loading your progress data...</p>
        </CardContent>
      </Card>
    );
  }
  
  const lastActivityDisplay = stats.lastActivityDate && isValid(parseISO(stats.lastActivityDate))
    ? formatDistanceToNow(parseISO(stats.lastActivityDate), { addSuffix: true })
    : 'N/A';

  const activityDataAvailable = 
    stats.totalCalculatorsUsed > 0 ||
    stats.prakritiQuizCompletions > 0 ||
    stats.wellnessPlanGenerations > 0 ||
    stats.koshaAdvisorUsages > 0 ||
    stats.totalQuizAttempts > 0;

  return (
    <Card className="w-full shadow-xl rounded-2xl overflow-hidden bg-card border border-border">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <BarChart3 className="h-10 w-10 text-accent" />
          <CardTitle className="text-2xl md:text-3xl font-semibold text-primary">Your Activity & Progress</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Overview of your engagement and achievements on Kosha Explorer.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {activityDataAvailable ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatItem
              icon={Calculator}
              label="Total Calculator Uses"
              value={stats.totalCalculatorsUsed}
              description={`${stats.uniqueCalculatorsUsedCount} unique types`}
            />
            <StatItem
              icon={Users}
              label="Prakriti Quizzes Taken"
              value={stats.prakritiQuizCompletions}
            />
             <StatItem
              icon={HelpCircle} 
              label="Knowledge Quizzes Taken"
              value={stats.totalQuizAttempts}
            />
            <StatItem
              icon={ClipboardCheck}
              label="Wellness Plans Generated"
              value={stats.wellnessPlanGenerations}
            />
            <StatItem
              icon={Zap}
              label="AI Advisor Consultations"
              value={stats.koshaAdvisorUsages}
              description='(Former Feature)'
            />
          </div>
        ) : (
            <p className="text-muted-foreground text-center py-4">
                You haven't used any tracked features yet. Start exploring to see your progress here!
            </p>
        )}
         <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
            <ActivityIcon className="inline-block h-4 w-4 mr-1.5 align-text-bottom" />
            Last activity: {lastActivityDisplay}
        </div>
      </CardContent>
    </Card>
  );
}
