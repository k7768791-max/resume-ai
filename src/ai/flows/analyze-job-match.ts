'use server';

/**
 * @fileOverview An AI agent for analyzing the match between a resume and a job description.
 *
 * - analyzeJobMatch - A function that handles the job match analysis process.
 * - AnalyzeJobMatchInput - The input type for the analyzeJobMatch function.
 * - AnalyzeJobMatchOutput - The return type for the analyzeJobMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJobMatchInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume.'),
  jobDescription: z
    .string()
    .describe('The text content of the job description.'),
});
export type AnalyzeJobMatchInput = z.infer<typeof AnalyzeJobMatchInputSchema>;

const AnalyzeJobMatchOutputSchema = z.object({
  matchScore: z
    .number()
    .describe('Overall match score between the resume and job description (0-100).'),
  missingRequirements: z
    .array(z.string())
    .describe('List of key requirements from the job description missing in the resume.'),
});
export type AnalyzeJobMatchOutput = z.infer<typeof AnalyzeJobMatchOutputSchema>;

export async function analyzeJobMatch(input: AnalyzeJobMatchInput): Promise<AnalyzeJobMatchOutput> {
  return analyzeJobMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJobMatchPrompt',
  input: {schema: AnalyzeJobMatchInputSchema},
  output: {schema: AnalyzeJobMatchOutputSchema},
  prompt: `You are a job matching expert. Analyze the following resume and job description to determine the match score and identify missing requirements.

Resume:
{{{resumeText}}}

Job Description:
{{{jobDescription}}}

Provide a match score (0-100) and a list of key requirements from the job description that are missing in the resume.
`, 
});

const analyzeJobMatchFlow = ai.defineFlow(
  {
    name: 'analyzeJobMatchFlow',
    inputSchema: AnalyzeJobMatchInputSchema,
    outputSchema: AnalyzeJobMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
