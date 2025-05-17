'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Label is imported but FormLabel is used from form.tsx. This is fine.
// import { Label } from '@/components/ui/label'; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Percent, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { trackCalculatorUsage } from '@/lib/activity-tracker';

const bodyFatSchema = z.object({
  gender: z.enum(['male', 'female'], { required_error: "Please select your gender." }),
  age: z.coerce
    .number({ invalid_type_error: 'Age must be a number.' })
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
  neck: z.coerce
    .number({ invalid_type_error: 'Neck circumference must be a number.' })
    .positive({ message: 'Neck circumference must be positive.' })
    .min(20, { message: 'Neck circumference seems too small (min 20 cm).' })
    .max(70, { message: 'Neck circumference seems too large (max 70 cm).' })
    .default('' as unknown as number),
  waist: z.coerce
    .number({ invalid_type_error: 'Waist circumference must be a number.' })
    .positive({ message: 'Waist circumference must be positive.' })
    .min(40, { message: 'Waist circumference seems too small (min 40 cm).' })
    .max(200, { message: 'Waist circumference seems too large (max 200 cm).' })
    .default('' as unknown as number),
  hip: z.coerce
    .number({ invalid_type_error: 'Hip circumference must be a number.' })
    .positive({ message: 'Hip circumference must be positive.' })
    .min(40, { message: 'Hip circumference seems too small (min 40 cm).' })
    .max(200, { message: 'Hip circumference seems too large (max 200 cm).' })
    .optional(),
}).superRefine((data, ctx) => {
  if (data.gender === 'female' && (data.hip === undefined || data.hip <= 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Hip circumference is required for females.",
      path: ["hip"],
    });
  }
  if (data.gender === 'male' && data.waist <= data.neck) {
     ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Waist circumference must be greater than neck circumference for males.",
      path: ["waist"],
    });
  }
   if (data.gender === 'female' && data.hip && (data.waist + data.hip <= data.neck)) {
     ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Sum of waist and hip must be greater than neck circumference for females.",
      path: ["waist"], 
    });
  }
});

type BodyFatFormValues = z.infer<typeof bodyFatSchema>;

interface BodyFatResult {
  value: number;
  category: string;
  color: string;
  Icon: React.ElementType;
}

export default function BodyFatCalculator() {
  const [bodyFatResult, setBodyFatResult] = useState<BodyFatResult | null>(null);
  const [calculationError, setCalculationError] = useState<string | null>(null);

  const form = useForm<BodyFatFormValues>({
    resolver: zodResolver(bodyFatSchema),
    defaultValues: {
      gender: undefined,
      age: '' as unknown as number,
      height: '' as unknown as number,
      weight: '' as unknown as number,
      neck: '' as unknown as number,
      waist: '' as unknown as number,
      hip: undefined, 
    },
  });

  const { watch } = form;
  const genderValue = watch('gender');

  const getBodyFatCategory = (bfp: number, gender: 'male' | 'female'): Omit<BodyFatResult, 'value'> => {
    if (gender === 'male') {
      if (bfp < 2) return { category: 'Critically Low / Essential Fat Boundary', color: 'text-red-600', Icon: AlertTriangle };
      if (bfp < 6) return { category: 'Essential Fat', color: 'text-blue-500', Icon: TrendingDown };
      if (bfp < 14) return { category: 'Athletes', color: 'text-green-500', Icon: CheckCircle2 };
      if (bfp < 18) return { category: 'Fitness', color: 'text-green-600', Icon: CheckCircle2 };
      if (bfp < 25) return { category: 'Average', color: 'text-yellow-500', Icon: TrendingUp };
      return { category: 'Obese', color: 'text-red-500', Icon: AlertTriangle };
    } else { 
      if (bfp < 10) return { category: 'Critically Low / Essential Fat Boundary', color: 'text-red-600', Icon: AlertTriangle };
      if (bfp < 14) return { category: 'Essential Fat', color: 'text-blue-500', Icon: TrendingDown };
      if (bfp < 21) return { category: 'Athletes', color: 'text-green-500', Icon: CheckCircle2 };
      if (bfp < 25) return { category: 'Fitness', color: 'text-green-600', Icon: CheckCircle2 };
      if (bfp < 32) return { category: 'Average', color: 'text-yellow-500', Icon: TrendingUp };
      return { category: 'Obese', color: 'text-red-500', Icon: AlertTriangle };
    }
  };

  const onSubmit: SubmitHandler<BodyFatFormValues> = (data) => {
    setBodyFatResult(null);
    setCalculationError(null);
    let bfp: number;

    try {
      const heightCm = data.height;
      const neckCm = data.neck;
      const waistCm = data.waist;

      if (data.gender === 'male') {
        const logTermWaistNeck = Math.log10(waistCm - neckCm);
        const logTermHeight = Math.log10(heightCm);

        if (!isFinite(logTermWaistNeck) || !isFinite(logTermHeight)) {
            throw new Error("Logarithm calculation failed due to invalid intermediate values (e.g., log of zero or negative). Please check inputs.");
        }
        
        const denominator = 1.0324 - (0.19077 * logTermWaistNeck) + (0.15456 * logTermHeight);
        if (denominator === 0 || !isFinite(denominator)) {
          throw new Error("Calculation error (denominator issue). Ensure measurements are accurate and distinct.");
        }
        bfp = (495 / denominator) - 450;

      } else { 
        const hipCm = data.hip as number; 
        const logTermWaistHipNeck = Math.log10(waistCm + hipCm - neckCm);
        const logTermHeightFemale = Math.log10(heightCm);
        
        if (!isFinite(logTermWaistHipNeck) || !isFinite(logTermHeightFemale)) {
            throw new Error("Logarithm calculation failed due to invalid intermediate values. Please check inputs.");
        }
        
        const denominator = 1.29579 - (0.35004 * logTermWaistHipNeck) + (0.22100 * logTermHeightFemale);
        if (denominator === 0 || !isFinite(denominator)) {
          throw new Error("Calculation error (denominator issue). Ensure measurements are accurate and distinct.");
        }
        bfp = (495 / denominator) - 450;
      }

      if (bfp < 0 || bfp > 70 || isNaN(bfp) || !isFinite(bfp)) {
        const bfpDisplay = (isNaN(bfp) || !isFinite(bfp)) ? "an invalid number" : `${bfp.toFixed(1)}%`;
        throw new Error(`Calculated body fat percentage (${bfpDisplay}) is outside the plausible range (0-70%). Please re-check your measurements for accuracy and consistency.`);
      }

      const categoryDetails = getBodyFatCategory(bfp, data.gender);
      setBodyFatResult({
        value: parseFloat(bfp.toFixed(1)),
        ...categoryDetails,
      });
      trackCalculatorUsage('body-fat-percentage');

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
                    onValueChange={(value) => {
                      field.onChange(value);
                      if (value === 'male') {
                        form.setValue('hip', undefined); 
                      }
                      setBodyFatResult(null); 
                      setCalculationError(null);
                    }}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" id="male-bfp" />
                      </FormControl>
                      <FormLabel htmlFor="male-bfp" className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" id="female-bfp" />
                      </FormControl>
                      <FormLabel htmlFor="female-bfp" className="font-normal">Female</FormLabel>
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
                <FormLabel htmlFor="age-bfp">Age (years)</FormLabel>
                <FormControl>
                  <Input id="age-bfp" type="number" placeholder="e.g., 30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="height-bfp">Height (cm)</FormLabel>
                <FormControl>
                  <Input id="height-bfp" type="number" placeholder="e.g., 170" {...field} />
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
                <FormLabel htmlFor="weight-bfp">Weight (kg)</FormLabel>
                <FormControl>
                  <Input id="weight-bfp" type="number" placeholder="e.g., 70 (for record, not used in U.S. Navy formula)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neck"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="neck-bfp">Neck Circumference (cm)</FormLabel>
                <FormControl>
                  <Input id="neck-bfp" type="number" placeholder="Measure below larynx (Adam's apple)" {...field} />
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
                <FormLabel htmlFor="waist-bfp">Waist Circumference (cm)</FormLabel>
                <FormControl>
                  <Input id="waist-bfp" type="number" placeholder="Men: at navel; Women: narrowest point" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {genderValue === 'female' && (
            <FormField
              control={form.control}
              name="hip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="hip-bfp">Hip Circumference (cm)</FormLabel>
                  <FormControl>
                    <Input id="hip-bfp" type="number" placeholder="Widest point of hips/buttocks" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Percent className="mr-2 h-4 w-4" /> Calculate Body Fat %
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

      {bodyFatResult && !calculationError && (
        <Card className="mt-6 border-border shadow-md bg-muted/30">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-center">
              <bodyFatResult.Icon className={`mr-2 h-6 w-6 ${bodyFatResult.color}`} />
              Your Estimated Body Fat
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <p className="text-4xl font-bold text-foreground">{bodyFatResult.value}%</p>
            <p className={`text-lg font-semibold ${bodyFatResult.color}`}>{bodyFatResult.category}</p>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground pt-4 flex-col items-start space-y-2">
             <p className="text-xs text-muted-foreground px-4 self-center text-center">
              This is an estimate based on the U.S. Navy formula. Consult a healthcare professional for precise measurements and advice. Measurement accuracy is key.
            </p>
            <Card className="w-full p-3 bg-background/50">
              <CardDescription className="text-xs text-center mb-2 font-semibold text-foreground">General Body Fat Percentage Categories (ACE):</CardDescription>
              {genderValue === 'male' ? (
                <ul className="list-disc list-inside space-y-0.5 text-left w-full px-2 text-xs">
                  <li><strong>Essential Fat:</strong> 2-5%</li>
                  <li><strong>Athletes:</strong> 6-13%</li>
                  <li><strong>Fitness:</strong> 14-17%</li>
                  <li><strong>Average:</strong> 18-24%</li>
                  <li><strong>Obese:</strong> 25%+</li>
                </ul>
              ) : genderValue === 'female' ? (
                 <ul className="list-disc list-inside space-y-0.5 text-left w-full px-2 text-xs">
                  <li><strong>Essential Fat:</strong> 10-13%</li>
                  <li><strong>Athletes:</strong> 14-20%</li>
                  <li><strong>Fitness:</strong> 21-24%</li>
                  <li><strong>Average:</strong> 25-31%</li>
                  <li><strong>Obese:</strong> 32%+</li>
                </ul>
              ) : null}
            </Card>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
