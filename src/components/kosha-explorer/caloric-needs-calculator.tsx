
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Flame, Activity, AlertTriangle } from 'lucide-react';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)', factor: 1.2 },
  { value: 'light', label: 'Lightly active (1-3 days/week)', factor: 1.375 },
  { value: 'moderate', label: 'Moderately active (3-5 days/week)', factor: 1.55 },
  { value: 'active', label: 'Very active (6-7 days/week)', factor: 1.725 },
  { value: 'extra', label: 'Extra active (physical job or 2x training)', factor: 1.9 },
] as const;

type ActivityLevelValue = typeof activityLevels[number]['value'];

const caloricNeedsSchema = z.object({
  gender: z.enum(['male', 'female'], { required_error: "Please select your gender." }),
  age: z.coerce
    .number({ invalid_type_error: 'Age must be a number.' })
    .int({ message: 'Age must be a whole number.'})
    .positive({ message: 'Age must be positive.' })
    .min(15, { message: 'Age must be at least 15.' })
    .max(99, { message: 'Age cannot exceed 99.' })
    .default('' as unknown as number),
  height: z.coerce
    .number({ invalid_type_error: 'Height must be a number.' })
    .positive({ message: 'Height must be positive.' })
    .min(100, { message: 'Height must be at least 100 cm.' })
    .max(250, { message: 'Height cannot exceed 250 cm.' })
    .default('' as unknown as number),
  weight: z.coerce
    .number({ invalid_type_error: 'Weight must be a number.' })
    .positive({ message: 'Weight must be positive.' })
    .min(20, { message: 'Weight must be at least 20 kg.' })
    .max(300, { message: 'Weight cannot exceed 300 kg.' })
    .default('' as unknown as number),
  activityLevel: z.enum(activityLevels.map(al => al.value) as [ActivityLevelValue, ...ActivityLevelValue[]], {
    required_error: "Please select your activity level."
  }),
});

type CaloricNeedsFormValues = z.infer<typeof caloricNeedsSchema>;

interface CaloricNeedsResult {
  bmr: number;
  tdee: number;
}

export default function CaloricNeedsCalculator() {
  const [caloricNeedsResult, setCaloricNeedsResult] = useState<CaloricNeedsResult | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const form = useForm<CaloricNeedsFormValues>({
    resolver: zodResolver(caloricNeedsSchema),
    defaultValues: {
      gender: undefined,
      age: '' as unknown as number,
      height: '' as unknown as number,
      weight: '' as unknown as number,
      activityLevel: undefined,
    },
  });

  const onSubmit: SubmitHandler<CaloricNeedsFormValues> = (data) => {
    setCaloricNeedsResult(null);
    setCalculationError(null);

    let bmr: number;
    try {
      if (data.gender === 'male') {
        bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) + 5;
      } else { 
        bmr = (10 * data.weight) + (6.25 * data.height) - (5 * data.age) - 161;
      }

      if (bmr <= 0 || !isFinite(bmr)) {
        throw new Error("BMR calculation resulted in an invalid value. Please check your inputs.");
      }

      const activityFactor = activityLevels.find(al => al.value === data.activityLevel)?.factor;
      if (!activityFactor) {
        throw new Error("Invalid activity level selected.");
      }

      const tdee = bmr * activityFactor;

      if (tdee <= 0 || !isFinite(tdee)) {
         throw new Error("TDEE calculation resulted in an invalid value. Please check your inputs and activity level.");
      }

      setCaloricNeedsResult({
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
      });
      trackCalculatorUsage('daily-caloric-needs');

    } catch (error) {
        setCalculationError(error instanceof Error ? error.message : "An unknown error occurred during calculation.");
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl><RadioGroupItem value="male" id="gender-male-cal" /></FormControl>
                      <FormLabel htmlFor="gender-male-cal" className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl><RadioGroupItem value="female" id="gender-female-cal" /></FormControl>
                      <FormLabel htmlFor="gender-female-cal" className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="age-cal">Age (years)</FormLabel>
                <FormControl><Input id="age-cal" type="number" placeholder="e.g., 30" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="height-cal">Height (cm)</FormLabel>
                <FormControl><Input id="height-cal" type="number" placeholder="e.g., 170" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="weight-cal">Weight (kg)</FormLabel>
                <FormControl><Input id="weight-cal" type="number" placeholder="e.g., 70" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {activityLevels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calculator className="mr-2 h-4 w-4" /> Calculate Needs
          </Button>
        </form>
      </Form>

      {calculationError && (
        <Card className="mt-6 border-destructive shadow-md bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-xl text-destructive flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Calculation Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{calculationError}</p>
          </CardContent>
        </Card>
      )}

      {caloricNeedsResult && !calculationError && (
        <Card className="mt-6 border-border shadow-md bg-muted/30">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center">
              <Flame className="mr-2 h-6 w-6 text-accent" />
              Estimated Daily Caloric Needs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Basal Metabolic Rate (BMR)</p>
              <p className="text-3xl font-bold text-foreground">{caloricNeedsResult.bmr} <span className="text-lg font-normal">kcal/day</span></p>
              <p className="text-xs text-muted-foreground mt-1">Calories your body burns at rest.</p>
            </div>
            <div className="text-center pt-2 border-t border-border">
              <p className="text-sm text-muted-foreground">Total Daily Energy Expenditure (TDEE)</p>
              <p className="text-3xl font-bold text-foreground">{caloricNeedsResult.tdee} <span className="text-lg font-normal">kcal/day</span></p>
              <p className="text-xs text-muted-foreground mt-1">Total calories burned including activity.</p>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground pt-4 flex-col items-center space-y-2">
             <p className="text-xs text-muted-foreground px-4 text-center">
              These are estimates (Mifflin-St Jeor formula). Individual needs may vary. Consult a healthcare or nutrition professional for personalized advice.
            </p>
            <Card className="w-full p-3 bg-background/50">
                <CardDescription className="text-xs text-center mb-2 font-semibold text-foreground">Understanding Your Results:</CardDescription>
                <ul className="list-disc list-inside space-y-1 text-left w-full px-2 text-xs">
                  <li><strong>BMR:</strong> Minimum calories for basic bodily functions.</li>
                  <li><strong>TDEE:</strong> Estimated daily calories to maintain current weight with your activity level.</li>
                  <li>To lose weight, consume fewer calories than TDEE.</li>
                  <li>To gain weight, consume more calories than TDEE.</li>
                </ul>
            </Card>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
