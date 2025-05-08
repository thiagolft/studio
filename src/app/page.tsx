
"use client";

import { useActionState, useEffect, useState, useMemo } from 'react';
import { AppHeader } from '@/components/BíbliaStatus/AppHeader';
import { SearchVerseForm } from '@/components/BíbliaStatus/SearchVerseForm';
import { VerseDisplayCard } from '@/components/BíbliaStatus/VerseDisplayCard';
import { searchVerseAction, type SearchState } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// A generic inspirational quote or one tied to a theme
const inspirationalQuotes = [
  "Que a palavra de Cristo habite ricamente em vocês. (Colossenses 3:16a)",
  "O Senhor é meu pastor; nada me faltará. (Salmos 23:1)",
  "Tudo posso naquele que me fortalece. (Filipenses 4:13)",
  "A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos. (Hebreus 11:1)",
  "Ame o Senhor, o seu Deus, de todo o seu coração, de toda unresponsive sua alma e de todas as suas forças. (Deuteronômio 6:5)"
];

export default function BibliaStatusPage() {
  const [formState, formAction] = useActionState<SearchState | undefined, FormData>(searchVerseAction, undefined);
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Randomly select an inspirational quote once on component mount or when verse changes
  const selectedInspirationalQuote = useMemo(() => {
    if (typeof window !== 'undefined') { // Ensure Math.random runs client-side
        return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
    }
    return inspirationalQuotes[0]; // Default for SSR, though useEffect will correct it
  }, [formState?.verse]); // Re-select if verse changes, to give variety

  const [clientSideQuote, setClientSideQuote] = useState(inspirationalQuotes[0]);

  useEffect(() => {
    // For client-side selection to avoid hydration mismatch with Math.random
    setClientSideQuote(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);
  }, [formState?.verse]);


  useEffect(() => {
    // Determine loading state based on formState changes
    // This is a bit of a heuristic: if a query exists but no verse or error yet, assume loading.
    // However, useFormStatus within the form is more accurate for the button's pending state.
    // This isLoading here is for the card skeleton.
    if (formState?.query && !formState.verse && !formState.error) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }

    // Handle fade-in animation trigger
    if (formState?.verse || formState?.error) {
      setShowContent(true);
    } else if (!formState?.query) { // If it's initial load or form reset
      setShowContent(false);
    }
    // If query changes but results are not in yet, content might briefly hide then show.
    // This is okay as it resets the animation.
  }, [formState]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 font-sans selection:bg-primary/30">
      <AppHeader />
      <main className="w-full max-w-lg mt-6 md:mt-8 space-y-8 flex-grow">
        <SearchVerseForm formAction={formAction} initialQuery={formState?.query} />

        <Separator />
        
        <div className="min-h-[200px]"> {/* Placeholder height to reduce layout shift */}
          {isLoading && (
            <div className="space-y-4 animate-pulse">
              <Skeleton className="h-8 w-3/4 mx-auto" />
              <Skeleton className="h-6 w-1/2 mx-auto" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-10 w-full mt-2" />
            </div>
          )}
          {formState?.error && !isLoading && (
            <p className="text-destructive text-center p-4 bg-destructive/10 rounded-md animate-in fade-in-0 duration-300">
              {formState.error}
            </p>
          )}
          {formState?.verse && !isLoading && showContent && (
            <VerseDisplayCard 
              key={formState.timestamp} // Force re-mount for animation on new result
              verse={formState.verse} 
              inspirationalQuote={clientSideQuote}
              className="animate-in fade-in-0 slide-in-from-bottom-10 duration-700 ease-out" 
            />
          )}
          {!formState && !isLoading && ( // Initial state, before any search
             <p className="text-center text-muted-foreground pt-8 text-lg">
               Comece sua jornada espiritual.<br/> Digite um termo ou referência bíblica para buscar.
             </p>
          )}
        </div>
      </main>
      <footer className="py-8 text-center text-muted-foreground text-sm">
        <p>Feito com <span className="text-red-500">❤️</span> para minha namorada.</p>
        <p>&copy; {new Date().getFullYear()} Bíblia Status. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

