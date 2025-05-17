
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Timer, Play, Pause, StopCircle, RotateCcw, Edit3, ListChecks, PlusCircle, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format, differenceInSeconds } from 'date-fns';
import { trackCalculatorUsage } from '@/lib/activity-tracker';
import { useToast } from '@/hooks/use-toast';

interface SilenceSession {
  id: string;
  date: string;
  duration: number; 
  reflection: string;
}

export default function SilenceTrackerCalculator() {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);
  
  const [sessions, setSessions] = useState<SilenceSession[]>([]);
  const [reflection, setReflection] = useState('');
  const [showLogForm, setShowLogForm] = useState(false);
  const [manualDuration, setManualDuration] = useState(''); 
  const { toast } = useToast();


  useEffect(() => {
    const storedSessions = localStorage.getItem('silenceSessions');
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('silenceSessions', JSON.stringify(sessions));
  }, [sessions]);


  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (isTimerRunning) return;
    setIsTimerRunning(true);
    const id = setInterval(() => {
      setTimerSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    setTimerIntervalId(id);
  };

  const pauseTimer = () => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      setTimerIntervalId(null);
    }
    setIsTimerRunning(false);
  };

  const stopTimerAndLog = () => {
    pauseTimer();
    if (timerSeconds > 0) {
      setShowLogForm(true); 
    }
  };
  
  const resetTimer = () => {
    pauseTimer();
    setTimerSeconds(0);
    setReflection('');
    setShowLogForm(false);
  };

  const handleLogSession = (durationToLog: number) => {
    if (durationToLog <= 0 && !manualDuration) {
        toast({title: "Invalid Duration", description:"Please ensure the timer has run or enter a manual duration.", variant: "destructive"});
        return;
    }
    
    let finalDuration = durationToLog;
    if (showLogForm && manualDuration && Number(manualDuration) > 0) {
        finalDuration = Number(manualDuration) * 60; 
    }


    const newSession: SilenceSession = {
      id: new Date().toISOString(),
      date: format(new Date(), "PPP p"),
      duration: finalDuration,
      reflection: reflection,
    };
    setSessions((prevSessions) => [newSession, ...prevSessions]);
    setReflection('');
    setManualDuration('');
    setShowLogForm(false); 
    trackCalculatorUsage('silence-tracker');
    toast({title: "Session Logged", description: `Silence of ${formatTime(finalDuration)} recorded.`, variant: "default"});
    if(!manualDuration) resetTimer(); 
  };

  const deleteSession = (id: string) => {
    setSessions(prevSessions => prevSessions.filter(session => session.id !== id));
    toast({title: "Session Deleted", description: "The silence log has been removed.", variant: "default"});
  };
  
  useEffect(() => {
    return () => {
      if (timerIntervalId) clearInterval(timerIntervalId);
    };
  }, [timerIntervalId]);

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Timer className="mr-3 h-6 w-6 text-accent" />
            Track Your Silence
          </CardTitle>
          <CardDescription>
            Use the timer to track your silence sessions or log them manually.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-foreground tabular-nums">
              {formatTime(timerSeconds)}
            </p>
            <p className="text-sm text-muted-foreground">Minutes : Seconds</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {!isTimerRunning && timerSeconds === 0 && (
              <Button onClick={startTimer} className="bg-green-600 hover:bg-green-700 text-white">
                <Play className="mr-2 h-4 w-4" /> Start
              </Button>
            )}
            {isTimerRunning && (
              <Button onClick={pauseTimer} variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                <Pause className="mr-2 h-4 w-4" /> Pause
              </Button>
            )}
            {!isTimerRunning && timerSeconds > 0 && (
              <Button onClick={startTimer} className="bg-green-600 hover:bg-green-700 text-white">
                <Play className="mr-2 h-4 w-4" /> Resume
              </Button>
            )}
            {timerSeconds > 0 && (
                 <Button onClick={stopTimerAndLog} variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10">
                    <StopCircle className="mr-2 h-4 w-4" /> Stop & Log
                </Button>
            )}
            <Button onClick={resetTimer} variant="ghost" className="text-muted-foreground hover:text-destructive">
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
            
          {!showLogForm && (
             <Button onClick={() => { resetTimer(); setShowLogForm(true);}} variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" /> Log Manually
            </Button>
          )}

          {showLogForm && (
            <Card className="bg-muted/50 p-4 mt-4">
              <CardHeader className="p-0 pb-2">
                <CardTitle className="text-lg">Log Your Silence Session</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                {timerSeconds === 0 && ( 
                     <div>
                        <Label htmlFor="manual-duration">Duration (minutes)</Label>
                        <Input 
                            id="manual-duration" 
                            type="number" 
                            placeholder="e.g., 15" 
                            value={manualDuration} 
                            onChange={(e) => setManualDuration(e.target.value)} 
                            className="mt-1"
                        />
                    </div>
                )}
                <div>
                  <Label htmlFor="reflection">Reflection (Optional)</Label>
                  <Textarea
                    id="reflection"
                    placeholder="How did you feel? Any insights?"
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    rows={3}
                    className="mt-1 bg-background"
                  />
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => handleLogSession(timerSeconds)} className="flex-1">
                        <Edit3 className="mr-2 h-4 w-4" /> Log Session
                    </Button>
                    <Button onClick={() => {setShowLogForm(false); setReflection(''); setManualDuration(''); if(timerSeconds === 0) resetTimer();}} variant="ghost" className="flex-1">
                        Cancel
                    </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <ListChecks className="mr-3 h-6 w-6 text-accent" />
            Session History
          </CardTitle>
          <CardDescription>
            Review your past silence sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-muted-foreground text-center">No sessions logged yet. Start tracking your silence!</p>
          ) : (
            <ScrollArea className="h-[300px] rounded-md border p-1">
              <div className="space-y-3 p-3">
                {sessions.map((session) => (
                  <Card key={session.id} className="bg-card/60 relative group">
                    <CardContent className="p-3">
                      <p className="font-semibold text-foreground">
                        {formatTime(session.duration)} of silence
                      </p>
                      <p className="text-xs text-muted-foreground">{session.date}</p>
                      {session.reflection && (
                        <p className="mt-1 text-sm text-muted-foreground italic whitespace-pre-wrap">
                          Reflection: {session.reflection}
                        </p>
                      )}
                       <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                        onClick={() => deleteSession(session.id)}
                        aria-label="Delete session"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
          {sessions.length > 0 && (
             <CardFooter>
                <p className="text-xs text-muted-foreground">
                    Total sessions logged: {sessions.length}. Total time in silence: {formatTime(sessions.reduce((acc, s) => acc + s.duration, 0))}.
                </p>
            </CardFooter>
          )}
      </Card>
    </div>
  );
}
