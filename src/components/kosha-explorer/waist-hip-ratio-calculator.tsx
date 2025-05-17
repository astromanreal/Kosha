
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
import { Calculator, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Ratio } from 'lucide-react';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const whrSchema = z.object({
  gender: z.enum(['male', 'female'], { required_error: "Please select your gender." }),
  waist: z.coerce
    .number({ invalid_type_error: 'Waist circumference must be a number.' })
    .positive({ message: 'Waist circumference must be positive.' })
    .min(30, { message: 'Waist circumference seems too small (min 30 cm).' })
    .max(250, { message: 'Waist circumference seems too large (max 250 cm).' })
    .default('' as unknown as number),
  hip: z.coerce
    .number({ invalid_type_error: 'Hip circumference must be a number.' })
    .positive({ message: 'Hip circumference must be positive.' })
    .min(30, { message: 'Hip circumference seems too small (min 30 cm).' })
    .max(250, { message: 'Hip circumference seems too large (max 250 cm).' })
    .default('' as unknown as number),
}).refine(data => data.hip > 0 && data.waist > 0 ? data.hip >= data.waist * 0.5 : true, {
  message: "Hip measurement seems too small relative to waist. Please double check.",
  path: ["hip"],
}).refine(data => data.hip > 0 && data.waist > 0 ? data.waist >= data.hip * 0.5 : true, {
  message: "Waist measurement seems too small relative to hip. Please double check.",
  path: ["waist"],
});


type WhrFormValues = z.infer<typeof whrSchema>;

interface WhrResult {
  value: number;
  category: string;
  color: string;
  Icon: React.ElementType;
}

export default function WaistHipRatioCalculator() {
  const [whrResult, setWhrResult] = useState<WhrResult | null>(null);

  const form = useForm<WhrFormValues>({
    resolver: zodResolver(whrSchema),
    defaultValues: {
      gender: undefined,
      waist: '' as unknown as number,
      hip: '' as unknown as number,
    },
  });

  const getWhrCategory = (whr: number, gender: 'male' | 'female'): Omit<WhrResult, 'value'> => {
    if (gender === 'male') {
      if (whr < 0.90) return { category: 'Low Risk', color: 'text-green-500', Icon: CheckCircle2 };
      if (whr <= 0.99) return { category: 'Moderate Risk', color: 'text-yellow-500', Icon: TrendingUp };
      return { category: 'High Risk', color: 'text-red-500', Icon: AlertTriangle };
    } else { 
      if (whr < 0.80) return { category: 'Low Risk', color: 'text-green-500', Icon: CheckCircle2 };
      if (whr <= 0.85) return { category: 'Moderate Risk', color: 'text-yellow-500', Icon: TrendingUp };
      return { category: 'High Risk', color: 'text-red-500', Icon: AlertTriangle };
    }
  };

  const onSubmit: SubmitHandler<WhrFormValues> = (data) => {
    if (data.hip === 0) {
        form.setError("hip", { type: "manual", message: "Hip circumference cannot be zero." });
        setWhrResult(null);
        return;
    }
    const whr = data.waist / data.hip;
    const categoryDetails = getWhrCategory(whr, data.gender);
    setWhrResult({
      value: parseFloat(whr.toFixed(2)),
      ...categoryDetails,
    });
    trackCalculatorUsage('waist-hip-ratio');
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
                      <FormControl><RadioGroupItem value="male" id="gender-male-whr" /></FormControl>
                      <FormLabel htmlFor="gender-male-whr" className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl><RadioGroupItem value="female" id="gender-female-whr" /></FormControl>
                      <FormLabel htmlFor="gender-female-whr" className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waist"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="waist-whr">Waist Circumference (cm)</FormLabel>
                <FormControl>
                  <Input id="waist-whr" type="number" placeholder="Narrowest point (belly button)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hip"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="hip-whr">Hip Circumference (cm)</FormLabel>
                <FormControl>
                  <Input id="hip-whr" type="number" placeholder="Widest point (buttocks)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Ratio className="mr-2 h-4 w-4" /> Calculate WHR
          </Button>
        </form>
      </Form>

      {whrResult && (
        <Card className="mt-6 border-border shadow-md bg-muted/30">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center">
              <whrResult.Icon className={`mr-2 h-6 w-6 ${whrResult.color}`} />
              Your Waist-to-Hip Ratio
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <p className="text-4xl font-bold text-foreground">{whrResult.value}</p>
            <p className={`text-lg font-semibold ${whrResult.color}`}>{whrResult.category}</p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground pt-4 flex-col items-start space-y-2">
             <p className="text-xs text-muted-foreground px-4 self-center text-center">
               WHR is an indicator of body fat distribution and potential health risks. Consult a healthcare professional for comprehensive advice.
            </p>
            <Card className="w-full p-3 bg-background/50">
                <CardDescription className="text-xs text-center mb-2 font-semibold text-foreground">General Risk Categories:</CardDescription>
                <ul className="list-disc list-inside space-y-0.5 text-left w-full px-2 text-xs">
                    <li><strong>Men:</strong> Low Risk (&lt;0.90), Moderate Risk (0.90-0.99), High Risk (&ge;1.0)</li>
                    <li><strong>Women:</strong> Low Risk (&lt;0.80), Moderate Risk (0.80-0.85), High Risk (&ge;0.86)</li>
                </ul>
            </Card>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
