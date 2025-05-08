'use server';
/**
 * @fileOverview A Bible verse search AI agent.
 *
 * - searchBibleVerse - A function that handles the Bible verse search process.
 * - SearchBibleVerseInput - The input type for the searchBibleVerse function.
 * - SearchBibleVerseOutput - The return type for the searchBibleVerse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchBibleVerseInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The search query for a Bible verse, which can be a reference (e.g., "John 3:16"), a keyword (e.g., "love"), or a phrase (e.g., "the Lord is my shepherd").'
    ),
});
export type SearchBibleVerseInput = z.infer<typeof SearchBibleVerseInputSchema>;

const SearchBibleVerseOutputSchema = z.object({
  book: z.string().describe('The name of the Bible book.'),
  chapter: z.number().describe('The chapter number.'),
  verse: z.number().describe('The verse number.'),
  text: z.string().describe('The text of the Bible verse.'),
  found: z
    .boolean()
    .describe(
      'Whether a relevant verse was found based on the query. If false, a default verse may still be provided.'
    ),
});
export type SearchBibleVerseOutput = z.infer<typeof SearchBibleVerseOutputSchema>;

export async function searchBibleVerse(input: SearchBibleVerseInput): Promise<SearchBibleVerseOutput> {
  return searchBibleVerseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchBibleVersePrompt',
  input: {schema: SearchBibleVerseInputSchema},
  output: {schema: SearchBibleVerseOutputSchema},
  prompt: `You are a helpful assistant and an expert in the Holy Bible (Christian Bible).
Your task is to find a relevant Bible verse based on the user's query.

User Query: "{{{query}}}"

Please provide the book, chapter, verse number, and the text of the verse.
If the query is specific like "John 3:16", return that exact verse.
If the query is a keyword or phrase like "love" or "do not be afraid", find a suitable and well-known verse that matches the theme.

The user is likely Portuguese-speaking, so prioritize Portuguese Bible versions (like Almeida Revista e Corrigida - ARC, or Nova Versão Internacional - NVI em Português) for the verse text if the query suggests a Portuguese context or if not specified. If the query is clearly in English, use an English version. In case of doubt, Portuguese (NVI or ARC) is a good default for the verse text.

If you cannot find a verse specifically matching the query, or if the query is too vague or nonsensical for a direct match, please set 'found' to false. In this case, provide a general, well-known, and uplifting verse as a fallback (e.g., João 3:16, Filipenses 4:13, Salmos 23:1). Ensure all fields (book, chapter, verse, text) are still populated with this fallback verse.

Return the information in the specified output format.
Example for João 3:16 (NVI):
Book: João
Chapter: 3
Verse: 16
Text: "Porque Deus tanto amou o mundo que deu o seu Filho Unigênito, para que todo o que nele crer não pereça, mas tenha a vida eterna."
Found: true (if query was "João 3:16") / false (if query was "xyz" and this is fallback)
`,
});

const searchBibleVerseFlow = ai.defineFlow(
  {
    name: 'searchBibleVerseFlow',
    inputSchema: SearchBibleVerseInputSchema,
    outputSchema: SearchBibleVerseOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        // This should ideally not happen if the prompt is well-defined and the model behaves.
        // Fallback in case of unexpected empty output from LLM.
        console.error("LLM returned empty output for searchBibleVerseFlow. Query:", input.query);
        return {
            book: "Filipenses",
            chapter: 4,
            verse: 13,
            text: "Tudo posso naquele que me fortalece.",
            found: false,
        };
    }
    return output;
  }
);
