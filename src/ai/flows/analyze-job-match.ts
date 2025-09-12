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
    .describe('A holistic match score from 0-100, calculated based on keyword relevance, quantifiable achievements, and overall alignment.'),
  metRequirements: z
    .array(z.string())
    .describe('List of key requirements from the job description that ARE PRESENT in the resume.'),
  missingRequirements: z
    .array(z.string())
    .describe('List of key requirements from the job description that ARE MISSING from the resume.'),
  analysisSummary: z
    .string()
    .describe('A brief summary of why the score was given, highlighting strengths and weaknesses.'),
});
export type AnalyzeJobMatchOutput = z.infer<typeof AnalyzeJobMatchOutputSchema>;

export async function analyzeJobMatch(input: AnalyzeJobMatchInput): Promise<AnalyzeJobMatchOutput> {
  return analyzeJobMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJobMatchPrompt',
  input: {schema: AnalyzeJobMatchInputSchema},
  output: {schema: AnalyzeJobMatchOutputSchema},
  prompt: `You are a highly advanced ATS (Applicant Tracking System) simulation and a job matching expert. Your task is to analyze a resume against a job description with extreme scrutiny.

Analyze the following resume and job description to determine the match score and identify met and missing requirements.

Resume:
{{{resumeText}}}

Job Description:
{{{jobDescription}}}

Follow these steps for your analysis:
1.  **Keyword Analysis**: Identify all key skills, technologies, and qualifications mentioned in the job description. Cross-reference them with the resume.
2.  **Quantifiable Achievements**: Look for measurable results in the resume's experience section (e.g., "Increased sales by 20%", "Reduced server costs by 15%").
3.  **Action Verbs**: Assess the quality and variety of action verbs used to describe accomplishments.
4.  **Overall Alignment**: Consider the overall alignment of the candidate's experience and skills with the seniority and focus of the role.

Based on this comprehensive analysis, provide the following:
- **matchScore**: A holistic score from 0-100. A score of 85+ indicates a very strong match. A score below 70 indicates significant gaps. The score should be heavily weighted on the presence of required skills and quantifiable results.
- **metRequirements**: A list of key requirements from the job description that are clearly present in the resume.
- **missingRequirements**: A list of key requirements from the job description that are missing or not clearly stated in the resume.
- **analysisSummary**: A concise, 1-2 sentence summary explaining the score. For example: "The resume is a strong match for keywords like 'React' and 'Node.js' but lacks quantifiable achievements and misses the 'CI/CD' requirement."
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
