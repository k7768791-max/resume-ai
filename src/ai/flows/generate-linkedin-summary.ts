'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a compelling LinkedIn summary based on a user's resume.
 *
 * It includes:
 * - GenerateLinkedInSummaryInput: Input type for the flow, containing the resume text.
 * - GenerateLinkedInSummaryOutput: Output type for the flow, containing the generated LinkedIn summary and progress.
 * - generateLinkedInSummary: The main function to trigger the flow and generate the summary.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLinkedInSummaryInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the user\'s resume.'),
});
export type GenerateLinkedInSummaryInput = z.infer<typeof GenerateLinkedInSummaryInputSchema>;

const GenerateLinkedInSummaryOutputSchema = z.object({
  linkedinSummary: z.string().describe('The generated LinkedIn summary.'),
  progress: z.string().describe('Progress summary of LinkedIn summary generation.'),
});
export type GenerateLinkedInSummaryOutput = z.infer<typeof GenerateLinkedInSummaryOutputSchema>;

export async function generateLinkedInSummary(input: GenerateLinkedInSummaryInput): Promise<GenerateLinkedInSummaryOutput> {
  return generateLinkedInSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLinkedInSummaryPrompt',
  input: {schema: GenerateLinkedInSummaryInputSchema},
  output: {schema: GenerateLinkedInSummaryOutputSchema},
  prompt: `You are a professional resume writer specializing in creating compelling LinkedIn summaries.
  Based on the provided resume text, generate a LinkedIn summary that highlights the user's key skills, experiences, and accomplishments.
  The summary should be concise, engaging, and tailored to attract recruiters and potential employers.

  Resume Text: {{{resumeText}}}

  LinkedIn Summary:`, // Removed JSON formatting request as the output is a string.
});

const generateLinkedInSummaryFlow = ai.defineFlow(
  {
    name: 'generateLinkedInSummaryFlow',
    inputSchema: GenerateLinkedInSummaryInputSchema,
    outputSchema: GenerateLinkedInSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      linkedinSummary: output!.linkedinSummary,
      progress: 'Generated LinkedIn summary based on resume content.',
    };
  }
);
