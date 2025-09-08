// OptimizeResumeContent - A Genkit Flow to optimize the content of a specific section in a resume.

'use server';

/**
 * @fileOverview A Genkit Flow to optimize the content of a specific section in a resume.
 *
 * - optimizeResumeContent - A function that optimizes the content of a specific section in a resume.
 * - OptimizeResumeContentInput - The input type for the optimizeResumeContent function.
 * - OptimizeResumeContentOutput - The return type for the optimizeResumeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeResumeContentInputSchema = z.object({
  resumeSection: z.string().describe('The content of the resume section to optimize.'),
  jobDescription: z.string().optional().describe('The job description to tailor the resume section to.'),
});
export type OptimizeResumeContentInput = z.infer<typeof OptimizeResumeContentInputSchema>;

const OptimizeResumeContentOutputSchema = z.object({
  optimizedContent: z.string().describe('The optimized content of the resume section.'),
});
export type OptimizeResumeContentOutput = z.infer<typeof OptimizeResumeContentOutputSchema>;

export async function optimizeResumeContent(input: OptimizeResumeContentInput): Promise<OptimizeResumeContentOutput> {
  return optimizeResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeResumeContentPrompt',
  input: {
    schema: OptimizeResumeContentInputSchema,
  },
  output: {
    schema: OptimizeResumeContentOutputSchema,
  },
  prompt: `You are a resume optimization expert. Optimize the following resume section to be more effective and ATS-friendly.\n\nResume Section: {{{resumeSection}}}\n\n{{~#if jobDescription}}\nTailor the resume section to the following job description:\n{{{jobDescription}}}\n{{~/if}}\n\nOptimized Resume Section:`, // Ensure Handlebars syntax is correctly formatted
});

const optimizeResumeContentFlow = ai.defineFlow(
  {
    name: 'optimizeResumeContentFlow',
    inputSchema: OptimizeResumeContentInputSchema,
    outputSchema: OptimizeResumeContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
