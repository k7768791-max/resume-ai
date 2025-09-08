// @fileOverview A cover letter generation AI agent.
//
// - generateCoverLetter - A function that handles the cover letter generation process.
// - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
// - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  resume: z.string().describe('The resume content to base the cover letter on.'),
  jobDescription: z.string().describe('The job description to tailor the cover letter to.'),
  tone: z.string().optional().describe('The tone of the cover letter (e.g., formal, informal, enthusiastic).'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated cover letter.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert at writing cover letters. Using the job description and resume provided, generate a tailored cover letter.

Job Description: {{{jobDescription}}}

Resume: {{{resume}}}

Tone: {{tone}}

Cover Letter:`, 
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
