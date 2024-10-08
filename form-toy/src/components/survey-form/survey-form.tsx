'use client';

import { useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import StarRating from '@/components/star-rating/star-rating';

import { submitForm } from '@/actions';
import { formSchema, FormValues, FormState } from '@/lib/schemas';

function SubmitButton({ isPending }: { isPending: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending || isPending} className="flex-1">
      {pending || isPending ? 'Submitting...' : 'Submit'}
    </Button>
  );
}

export default function SurveyForm() {
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<FormState | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      location: '',
      rating: 0,
      feedback: ''
    },
    mode: 'onChange'
  });

  const nextStep = async () => {
    const isValid = await form.trigger(['email']);
    if (isValid) {
      const emailValue = form.getValues('email');
      const emailIsValid =
        await formSchema.shape.email.safeParseAsync(emailValue);
      if (emailIsValid.success) {
        setStep((prevStep) => prevStep + 1);
      } else {
        form.setError('email', {
          type: 'manual',
          message: 'Please enter a valid email address'
        });
      }
    }
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onSubmit = async (data: FormValues) => {
    // Validate rating before submitting
    const isValid = await form.trigger(['rating', 'feedback']);
    if (!isValid) {
      return; // Stop submission if validation fails
    }

    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      const result = await submitForm(null, formData);
      setFormState(result);
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto min-w-[640px]">
      <CardHeader>
        <CardTitle>Multi-step Survey</CardTitle>
        <CardDescription>
          Please fill in the information step by step
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Da Nang" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {step === 2 && (
              <>
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Feedback *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your feedback here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating *</FormLabel>
                      <FormControl>
                        <StarRating
                          onChange={(rating) => field.onChange(rating)}
                          initialRating={field.value}
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex gap-2">
              {step > 1 && (
                <Button type="button" onClick={prevStep} className="flex-1">
                  Previous
                </Button>
              )}
              {step < 2 ? (
                <Button type="button" onClick={nextStep} className="flex-1">
                  Next
                </Button>
              ) : (
                <SubmitButton isPending={isPending} />
              )}
            </div>
          </form>
        </Form>
      </CardContent>
      {formState?.success && (
        <CardFooter>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Submitted Data:</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
              {JSON.stringify(formState.data, null, 2)}
            </pre>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
