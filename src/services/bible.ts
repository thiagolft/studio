import { searchBibleVerse, type SearchBibleVerseOutput } from '@/ai/flows/search-bible-verse-flow';

/**
 * Representa um versículo bíblico.
 */
export interface Verse {
  /**
   * O livro da Bíblia.
   */
  book: string;
  /**
   * O capítulo do versículo.
   */
  chapter: number;
  /**
   * O número do versículo.
   */
  verse: number;
  /**
   * O texto do versículo.
   */
  text: string;
}

/**
 * Recupera de forma assíncrona um versículo bíblico com base em uma consulta de pesquisa usando Genkit AI.
 *
 * @param query A consulta de pesquisa (ex: "João 3:16", "amor", "fé").
 * @returns Uma promessa que resolve para um objeto Verse, ou null se ocorrer um erro grave ou nenhum texto for retornado.
 */
export async function getVerse(query: string): Promise<Verse | null> {
  console.log(`Buscando versículo para: "${query}" (usando Genkit AI)`);
  
  try {
    // Simulate network delay for loading state visibility - can be removed for production
    // await new Promise(resolve => setTimeout(resolve, 500));

    const result: SearchBibleVerseOutput = await searchBibleVerse({ query });

    if (result && result.text) { // Check if text is populated, as per prompt instructions
      return {
        book: result.book,
        chapter: result.chapter,
        verse: result.verse,
        text: result.text,
        // The 'found' field from SearchBibleVerseOutput can be used by the caller if needed,
        // but for now, as long as we have text, we return a Verse.
      };
    }
    // If LLM returns no text, even for a fallback, treat as not found by the action.
    console.warn(`Genkit flow returned no text for query: "${query}". Result:`, result);
    return null;
  } catch (error) {
    console.error(`Erro ao buscar versículo com Genkit para "${query}":`, error);
    // Propagate the error to be handled by the server action, which has a generic error message.
    throw error; 
  }
}
