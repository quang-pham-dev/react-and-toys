import * as z from 'zod';

export const formSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  location: z.string().optional(),
  feedback: z
    .string()
    .min(1, 'Feedback is required')
    .max(500, 'Feedback must be at most 500 characters long'),
  rating: z
    .number()
    .min(1, { message: 'Rating is required' })
    .max(5, 'Rating must be at most 5')
});

export type FormValues = z.infer<typeof formSchema>;

export type FormState = {
  success: boolean;
  data?: FormValues;
  error?: string;
};
