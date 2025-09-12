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
import {ResumeData} from '@/types/resume';


const ResumeDataSchema = z.object({
  personal: z.object({
    fullName: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
  }),
  summary: z.string(),
  skills: z.object({
    technical: z.array(z.string()),
    soft: z.array(z.string()).optional(),
  }),
  work: z.array(
    z.object({
      title: z.string(),
      company: z.string(),
      description: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      techStack: z.string(),
      description: z.string(),
    })
  ),
  education: z.array(
    z.object({
      school: z.string(),
      degree: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      gpa: z.string().optional(),
    })
  ),
  certifications: z.array(z.string()).optional(),
  extras: z.object({
      languages: z.array(z.string()).optional(),
      interests: z.array(z.string()).optional(),
      awards: z.array(z.string()).optional(),
    }).optional(),
  custom: z.array(
      z.object({
        title: z.string(),
        items: z.array(
          z.object({
            name: z.string(),
            description: z.string(),
          })
        ),
      })
    ).optional(),
});


const OptimizeResumeContentInputSchema = z.object({
  resumeData: ResumeDataSchema.describe('The JSON object of the resume to optimize.'),
  jobDescription: z.string().optional().describe('The optional job description to tailor the resume to.'),
});
export type OptimizeResumeContentInput = z.infer<typeof OptimizeResumeContentInputSchema>;

export type OptimizeResumeContentOutput = ResumeData;


export async function optimizeResumeContent(input: OptimizeResumeContentInput): Promise<OptimizeResumeContentOutput> {
  return optimizeResumeContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeResumeContentPrompt',
  input: {
    schema: OptimizeResumeContentInputSchema,
  },
  output: {
    schema: ResumeDataSchema,
  },
  prompt: `You are a resume optimization expert. Your task is to analyze the provided resume JSON and enhance its content to be more professional, impactful, and ATS-friendly.

Follow these rules strictly:
1.  **Do NOT add any new skills, experiences, or facts.** You must only work with the information already present in the resume.
2.  Rewrite descriptions, summaries, and bullet points to use stronger action verbs and quantify achievements where possible based on the existing text.
3.  Ensure all original sections and data points (names, dates, companies) are preserved.
4.  Return a complete JSON object in the exact same structure as the input.

Resume Data:
{{{json resumeData}}}

{{#if jobDescription}}
Additionally, tailor the content to better align with the following job description:
{{{jobDescription}}}
{{/if}}

Return the full, optimized resume as a valid JSON object.
`,
});

const optimizeResumeContentFlow = ai.defineFlow(
  {
    name: 'optimizeResumeContentFlow',
    inputSchema: OptimizeResumeContentInputSchema,
    outputSchema: ResumeDataSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
