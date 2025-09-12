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
  headline: z.string().describe('A compelling, keyword-rich headline for the LinkedIn profile.'),
  linkedinSummary: z.string().describe('The generated LinkedIn "About" section summary.'),
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
  prompt: `You are a professional resume writer and LinkedIn profile optimization expert.
  Based on the provided resume text, generate two items:
  1.  A compelling, keyword-rich **headline**. The headline should be concise and grab the attention of recruiters. It should include key skills and the user's primary role.
  2.  A professional LinkedIn **"About" section summary**. The summary should highlight the user's key skills, experiences, and accomplishments in a narrative format. It should be engaging and tailored to attract recruiters and potential employers.

  Resume Text: {{{resumeText}}}
`,
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
      headline: output!.headline,
      linkedinSummary: output!.linkedinSummary,
      progress: 'Generated LinkedIn headline and summary based on resume content.',
    };
  }
);
