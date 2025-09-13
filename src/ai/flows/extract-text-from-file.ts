
'use server';

/**
 * @fileOverview A Genkit flow for extracting text from various file types.
 *
 * This flow takes a file encoded as a data URI and its MIME type,
 * then extracts the text content from it. It supports DOCX, and plain text files.
 *
 * - extractTextFromFile - The main function to trigger the text extraction flow.
 * - ExtractTextFromFileInput - The input type for the function.
 * - ExtractTextFromFileOutput - The output type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import mammoth from 'mammoth';

const ExtractTextFromFileInputSchema = z.object({
    fileDataUri: z.string().describe("The file content as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."),
    mimeType: z.string().describe("The MIME type of the file (e.g., 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')."),
});
export type ExtractTextFromFileInput = z.infer<typeof ExtractTextFromFileInputSchema>;

const ExtractTextFromFileOutputSchema = z.object({
    text: z.string().describe('The extracted text content from the file.'),
});
export type ExtractTextFromFileOutput = z.infer<typeof ExtractTextFromFileOutputSchema>;

export async function extractTextFromFile(input: ExtractTextFromFileInput): Promise<ExtractTextFromFileOutput> {
  return extractTextFromFileFlow(input);
}

const extractTextFromFileFlow = ai.defineFlow(
  {
    name: 'extractTextFromFileFlow',
    inputSchema: ExtractTextFromFileInputSchema,
    outputSchema: ExtractTextFromFileOutputSchema,
  },
  async ({ fileDataUri, mimeType }) => {
    const base64Data = fileDataUri.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');
    let text = '';

    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const { value } = await mammoth.extractRawText({ buffer });
        text = value;
    } else if (mimeType.startsWith('text/')) {
        text = buffer.toString('utf-8');
    } else {
        throw new Error(`Unsupported file type: ${mimeType}. Please use a .docx or .txt file.`);
    }

    return { text };
  }
);
