'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a professional summary for a resume.
 *
 * It takes user's skills and experience as input and returns a compelling professional summary.
 * The file exports:
 * - `generateProfessionalSummary` - The main function to generate the summary.
 * - `ProfessionalSummaryInput` - The input type for the function.
 * - `ProfessionalSummaryOutput` - The output type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProfessionalSummaryInputSchema = z.object({
  skills: z.string().describe('A list of skills.'),
  experience: z.string().describe('A description of the user experience.'),
});
export type ProfessionalSummaryInput = z.infer<typeof ProfessionalSummaryInputSchema>;

const ProfessionalSummaryOutputSchema = z.object({
  summary: z.string().describe('A professional summary generated based on the input skills and experience.'),
  progress: z.string().describe('Progress summary.'),
});
export type ProfessionalSummaryOutput = z.infer<typeof ProfessionalSummaryOutputSchema>;

export async function generateProfessionalSummary(input: ProfessionalSummaryInput): Promise<ProfessionalSummaryOutput> {
  return generateProfessionalSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProfessionalSummaryPrompt',
  input: {schema: ProfessionalSummaryInputSchema},
  output: {schema: ProfessionalSummaryOutputSchema},
  prompt: `You are a professional resume writer. Generate a professional summary based on the provided skills and experience.

Skills: {{{skills}}}
Experience: {{{experience}}}

Summary:`,
});

const generateProfessionalSummaryFlow = ai.defineFlow(
  {
    name: 'generateProfessionalSummaryFlow',
    inputSchema: ProfessionalSummaryInputSchema,
    outputSchema: ProfessionalSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output!,
      progress: 'Generated a professional summary based on the user-provided skills and experience.',
    };
  }
);
