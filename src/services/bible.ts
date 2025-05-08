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
 * Recupera de forma assíncrona um versículo bíblico com base em uma consulta de pesquisa.
 * Esta é uma implementação simulada.
 *
 * @param query A consulta de pesquisa (ex: "João 3:16", "amor", "fé").
 * @returns Uma promessa que resolve para um objeto Verse.
 */
export async function getVerse(query: string): Promise<Verse> {
  console.log(`Buscando versículo para: "${query}" (simulado)`);
  
  // Simulação de uma chamada de API com um pequeno atraso
  await new Promise(resolve => setTimeout(resolve, 500));

  const queryLower = query.toLowerCase();

  if (queryLower.includes("joão 3:16") || queryLower.includes("deus amou o mundo")) {
    return {
      book: 'João',
      chapter: 3,
      verse: 16,
      text: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.',
    };
  } else if (queryLower.includes("salmos 23") || queryLower.includes("senhor é meu pastor")) {
    return {
      book: 'Salmos',
      chapter: 23,
      verse: 1,
      text: 'O Senhor é o meu pastor; nada me faltará.',
    };
  } else if (queryLower.includes("fé") || queryLower.includes("hebreus 11:1")) {
    return {
      book: 'Hebreus',
      chapter: 11,
      verse: 1,
      text: 'Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.',
    };
  } else if (queryLower.includes("amor")) {
     return {
      book: '1 Coríntios',
      chapter: 13,
      verse: 4,
      text: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.',
    };
  }


  // Versículo padrão caso a busca não corresponda a nada específico
  return {
    book: 'Filipenses',
    chapter: 4,
    verse: 13,
    text: 'Tudo posso naquele que me fortalece.',
  };
}
