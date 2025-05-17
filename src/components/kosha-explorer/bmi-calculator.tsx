'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Label is imported but FormLabel is used from form.tsx. This is fine.
// import { Label } from '@/components/ui/label'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calculator, TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const bmiSchema = z.object({
  height: z.coerce
    .number({ invalid_type_error: 'Height must be a number.' })
    .positive({ message: 'Height must be a positive value.' })
    .min(50, { message: 'Height must be at least 50 cm.' })
    .max(300, { message: 'Height cannot exceed 300 cm.' })
    .default('' as unknown as number), 
  weight: z.coerce
    .number({ invalid_type_error: 'Weight must be a number.' })
    .positive({ message: 'Weight must be a positive value.' })
    .min(1, { message: 'Weight must be at least 1 kg.' })
    .max(500, { message: 'Weight cannot exceed 500 kg.' })
    .default('' as unknown as number), 
});

type BmiFormValues = z.infer<typeof bmiSchema>;

interface BmiResult {
  value: number;
  category: string;
  color: string;
  Icon: React.ElementType;
}

export default function BmiCalculator() {
  const [bmiResult, setBmiResult] = useState<BmiResult | null>(null);

  const form = useForm<BmiFormValues>({
    resolver: zodResolver(bmiSchema),
    defaultValues: {
      height: '' as unknown as number, 
      weight: '' as unknown as number, 
    },
  });

  const getBmiCategory = (bmi: number): Omit<BmiResult, 'value'> => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500', Icon: TrendingDown };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-500', Icon: CheckCircle2 };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500', Icon: TrendingUp };
    return { category: 'Obesity', color: 'text-red-500', Icon: AlertCircle };
  };

  const onSubmit: SubmitHandler<BmiFormValues> = (data) => {
    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);
    const categoryDetails = getBmiCategory(bmi);
    setBmiResult({
      value: parseFloat(bmi.toFixed(1)),
      ...categoryDetails,
    });
    trackCalculatorUsage('bmi-calculator');
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="height">Height (cm)</FormLabel>
                <FormControl>
                  <Input id="height" type="number" placeholder="Enter your height in cm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="weight">Weight (kg)</FormLabel>
                <FormControl>
                  <Input id="weight" type="number" placeholder="Enter your weight in kg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calculator className="mr-2 h-4 w-4" /> Calculate BMI
          </Button>
        </form>
      </Form>

      {bmiResult && (
        <Card className="mt-6 border-border shadow-md bg-muted/30">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center">
              <bmiResult.Icon className={`mr-2 h-6 w-6 ${bmiResult.color}`} />
              Your BMI Result
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <p className="text-4xl font-bold text-foreground">{bmiResult.value}</p>
            <p className={`text-lg font-semibold ${bmiResult.color}`}>{bmiResult.category}</p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground pt-4 flex-col items-start space-y-2">
            <p className="text-xs text-muted-foreground px-4 self-center">
              BMI is a general indicator. Consult a healthcare professional for personalized advice.
            </p>
            <ul className="list-disc list-inside space-y-1 text-left w-full px-2">
                <li><strong>Underweight:</strong> Less than 18.5</li>
                <li><strong>Normal weight:</strong> 18.5 – 24.9</li>
                <li><strong>Overweight:</strong> 25 – 29.9</li>
                <li><strong>Obesity:</strong> 30 or greater</li>
            </ul>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
