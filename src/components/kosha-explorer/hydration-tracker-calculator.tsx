
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Droplets, PlusCircle, RotateCcw, Settings, Target } from 'lucide-react'; 
import { useToast } from '@/hooks/use-toast';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const GOAL_LS_KEY = 'hydrationGoal';
const getIntakeLsKey = () => `hydrationIntake_${new Date().toISOString().split('T')[0]}`;

export default function HydrationTrackerCalculator() {
  const [dailyGoal, setDailyGoal] = useState<number>(2000); 
  const [currentIntake, setCurrentIntake] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isGoalInputVisible, setIsGoalInputVisible] = useState<boolean>(false);
  const [tempGoal, setTempGoal] = useState<string>(String(dailyGoal));

  const { toast } = useToast();

  useEffect(() => {
    const storedGoal = localStorage.getItem(GOAL_LS_KEY);
    if (storedGoal) {
      const parsedGoal = parseInt(storedGoal, 10);
      if (!isNaN(parsedGoal) && parsedGoal > 0) {
        setDailyGoal(parsedGoal);
        setTempGoal(String(parsedGoal));
      }
    }

    const intakeKey = getIntakeLsKey();
    const storedIntake = localStorage.getItem(intakeKey);
    if (storedIntake) {
      const parsedIntake = parseInt(storedIntake, 10);
       if (!isNaN(parsedIntake)) {
        setCurrentIntake(parsedIntake);
      }
    } else {
        setCurrentIntake(0); 
    }
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('hydrationIntake_') && key !== intakeKey) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(GOAL_LS_KEY, String(dailyGoal));
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem(getIntakeLsKey(), String(currentIntake));
  }, [currentIntake]);

  const handleAddWater = (amount: number) => {
    if (amount <= 0) {
        toast({ title: "Invalid Amount", description: "Please enter a positive amount.", variant: "destructive"});
        return;
    }
    setCurrentIntake((prev) => prev + amount);
    trackCalculatorUsage('hydration-tracker');
    toast({ title: "Water Logged!", description: `${amount}ml added.`, variant: "default"});
  };

  const handleCustomAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const handleLogCustomAmount = () => {
    const amount = parseInt(customAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      handleAddWater(amount);
      setCustomAmount('');
    } else {
      toast({ title: "Invalid Custom Amount", description: "Please enter a valid positive number for custom amount.", variant: "destructive"});
    }
  };

  const handleResetDailyIntake = () => {
    setCurrentIntake(0);
    toast({ title: "Intake Reset", description: "Your daily water intake has been reset.", variant: "default"});
  };

  const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempGoal(e.target.value);
  };

  const handleSaveGoal = () => {
    const newGoal = parseInt(tempGoal, 10);
    if (!isNaN(newGoal) && newGoal > 0) {
      setDailyGoal(newGoal);
      setIsGoalInputVisible(false);
      trackCalculatorUsage('hydration-tracker'); 
      toast({ title: "Goal Updated", description: `Daily hydration goal set to ${newGoal}ml.`, variant: "default"});
    } else {
      toast({ title: "Invalid Goal", description: "Please enter a valid positive number for your goal.", variant: "destructive"});
    }
  };

  const progressPercentage = dailyGoal > 0 ? Math.min((currentIntake / dailyGoal) * 100, 100) : 0;

  const predefinedAmounts = [250, 500, 750, 1000]; 

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-border bg-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-primary flex items-center">
              <Target className="mr-2 h-6 w-6 text-accent" /> Daily Hydration Goal
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsGoalInputVisible(!isGoalInputVisible)}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          {!isGoalInputVisible ? (
             <CardDescription>
                Your current goal is {dailyGoal} ml.
             </CardDescription>
          ) : (
            <div className="flex items-center space-x-2 pt-2">
              <Input
                type="number"
                value={tempGoal}
                onChange={handleGoalChange}
                placeholder="Enter goal in ml"
                className="bg-input/80"
              />
              <Button onClick={handleSaveGoal} size="sm">Save Goal</Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
            <div className="space-y-1 text-center mb-6">
                 <p className="text-4xl font-bold text-foreground">{currentIntake} <span className="text-lg font-normal text-muted-foreground">ml</span></p>
                 <p className="text-sm text-muted-foreground">of {dailyGoal} ml goal</p>
            </div>
          <Progress value={progressPercentage} className="w-full h-3" />
           <p className="text-xs text-muted-foreground text-center mt-1">{progressPercentage.toFixed(0)}% completed</p>
        </CardContent>
      </Card>

      <Card className="shadow-md border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <PlusCircle className="mr-2 h-6 w-6 text-accent" /> Log Water Intake
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {predefinedAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => handleAddWater(amount)}
                className="w-full"
              >
                + {amount} ml
              </Button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Custom amount (ml)"
              className="bg-input/80"
            />
            <Button onClick={handleLogCustomAmount} className="bg-primary text-primary-foreground hover:bg-primary/90">Add</Button>
          </div>
        </CardContent>
      </Card>

      <Button
        variant="destructive"
        onClick={handleResetDailyIntake}
        className="w-full"
      >
        <RotateCcw className="mr-2 h-4 w-4" /> Reset Daily Intake
      </Button>
       <CardFooter className="pt-4">
        <p className="text-xs text-muted-foreground text-center w-full">
          Remember to drink water regularly throughout the day to stay properly hydrated. This tracker helps you monitor your intake based on your set goal.
        </p>
      </CardFooter>
    </div>
  );
}
