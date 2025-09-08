// @ts-nocheck
'use server';

/**
 * @fileOverview A resume tailoring AI agent that tailors a resume to a specific job description.
 *
 * - tailorResumeToJobDescription - A function that handles the resume tailoring process.
 * - TailorResumeToJobDescriptionInput - The input type for the tailorResumeToJobDescription function.
 * - TailorResumeToJobDescriptionOutput - The return type for the tailorResumeToJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TailorResumeToJobDescriptionInputSchema = z.object({
  resumeText: z.string().describe('The text of the resume to tailor.'),
  jobDescription: z.string().describe('The job description to tailor the resume to.'),
});

export type TailorResumeToJobDescriptionInput = z.infer<
  typeof TailorResumeToJobDescriptionInputSchema
>;

const TailorResumeToJobDescriptionOutputSchema = z.object({
  tailoredResumeText: z
    .string()
    .describe('The tailored resume text that is optimized for the job description.'),
  analysis: z.string().describe('The analysis of the resume and job description.'),
});

export type TailorResumeToJobDescriptionOutput = z.infer<
  typeof TailorResumeToJobDescriptionOutputSchema
>;

export async function tailorResumeToJobDescription(
  input: TailorResumeToJobDescriptionInput
): Promise<TailorResumeToJobDescriptionOutput> {
  return tailorResumeToJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tailorResumeToJobDescriptionPrompt',
  input: {schema: TailorResumeToJobDescriptionInputSchema},
  output: {schema: TailorResumeToJobDescriptionOutputSchema},
  prompt: `You are an AI resume tailoring expert. Your goal is to tailor the
provided resume to the provided job description.

First, analyze the resume and job description and identify the key skills and
experience that are required for the job. Then, rewrite the resume to
highlight those skills and experience. Make sure to use the same keywords
that are used in the job description.

Resume:
{{resumeText}}

Job Description:
{{jobDescription}}

Tailored Resume:`,
});

const tailorResumeToJobDescriptionFlow = ai.defineFlow(
  {
    name: 'tailorResumeToJobDescriptionFlow',
    inputSchema: TailorResumeToJobDescriptionInputSchema,
    outputSchema: TailorResumeToJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
