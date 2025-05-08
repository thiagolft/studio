
"use server";

import { getVerse, type Verse } from '@/services/bible';

export interface SearchState {
  verse?: Verse;
  error?: string;
  query?: string; // To know what was searched
  timestamp?: number; // To help differentiate states if query is the same
}

export async function searchVerseAction(
  prevState: SearchState | undefined,
  formData: FormData
): Promise<SearchState> {
  const query = formData.get("query") as string;

  if (!query || query.trim() === "") {
    return { error: "Por favor, insira um termo de busca.", timestamp: Date.now() };
  }

  try {
    // Simulate network delay for loading state visibility
    // await new Promise(resolve => setTimeout(resolve, 1000)); 
    const verse = await getVerse(query);
    if (!verse || !verse.text) {
      return { error: "Versículo não encontrado. Tente outra busca.", query, timestamp: Date.now() };
    }
    return { verse, query, timestamp: Date.now() };
  } catch (e) {
    console.error("SearchVerseAction Error:", e);
    return { error: "Ocorreu um erro ao buscar o versículo. Tente novamente.", query, timestamp: Date.now() };
  }
}
