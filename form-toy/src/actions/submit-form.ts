'use server';

import { revalidatePath } from 'next/cache';

import { FormState } from '@/lib/schemas';

export async function submitForm(prevState: unknown, formData: FormData) {
  try {
    // Process the form data
    const email = formData.get('email');
    const location = formData.get('location');
    const rating = formData.get('rating');
    const feedback = formData.get('feedback');

    // Here you would typically save this data to a database
    // For now, we'll just return it
    const data = { email, location, rating, feedback };

    // Revalidate the home page
    revalidatePath('/');

    const result: FormState = {
      success: true,
      data: {
        email: email as string,
        feedback: feedback as string,
        rating: Number(rating),
        location: location as string | undefined
      }
    };

    return result;
  } catch (error) {
    return { success: false, error: 'Failed to submit the form' };
  }
}
