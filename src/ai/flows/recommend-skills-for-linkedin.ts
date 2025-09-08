// The `ai` object is pre-existing from src/ai/genkit.ts.
'use server';
/**
 * @fileOverview This file defines a Genkit flow to recommend relevant skills for a LinkedIn profile.
 *
 * The flow takes industry and experience level as input and suggests skills to improve profile visibility.
 * - recommendSkillsForLinkedIn - A function that handles the skill recommendation process.
 * - RecommendSkillsInput - The input type for the recommendSkillsForLinkedIn function.
 * - RecommendSkillsOutput - The return type for the recommendSkillsForLinkedIn function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSkillsInputSchema = z.object({
  industry: z.string().describe('The industry of the user.'),
  experienceLevel: z.string().describe('The experience level of the user (e.g., Entry-level, Mid-level, Senior-level).'),
});
export type RecommendSkillsInput = z.infer<typeof RecommendSkillsInputSchema>;

const RecommendSkillsOutputSchema = z.object({
  recommendedSkills: z.array(z.string()).describe('An array of recommended skills to add to the LinkedIn profile.'),
});
export type RecommendSkillsOutput = z.infer<typeof RecommendSkillsOutputSchema>;

export async function recommendSkillsForLinkedIn(input: RecommendSkillsInput): Promise<RecommendSkillsOutput> {
  return recommendSkillsForLinkedInFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSkillsPrompt',
  input: {schema: RecommendSkillsInputSchema},
  output: {schema: RecommendSkillsOutputSchema},
  prompt: `You are a career advisor specializing in LinkedIn profile optimization.

  Based on the user's industry ({{{industry}}}) and experience level ({{{experienceLevel}}}), recommend a list of skills that they should add to their LinkedIn profile to improve its visibility to recruiters. Provide specific skills, not general areas of knowledge.

  The skills should be highly relevant to the industry and experience level provided. The recommended skills must improve profile visiblity.

  Skills:`,
});

const recommendSkillsForLinkedInFlow = ai.defineFlow(
  {
    name: 'recommendSkillsForLinkedInFlow',
    inputSchema: RecommendSkillsInputSchema,
    outputSchema: RecommendSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
