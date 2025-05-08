
"use client";

import type { Verse } from '@/services/bible';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VerseDisplayCardProps {
  verse: Verse;
  inspirationalQuote: string;
  className?: string;
}

export function VerseDisplayCard({ verse, inspirationalQuote, className }: VerseDisplayCardProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const fullTextToCopy = `${verse.book} ${verse.chapter}:${verse.verse}\n"${verse.text}"\n\n${inspirationalQuote}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullTextToCopy);
      toast({
        title: "Conteúdo Copiado!",
        description: "O versículo e a citação foram copiados para sua área de transferência.",
      });
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset icon after 2 seconds
    } catch (err) {
      console.error("Falha ao copiar texto: ", err);
      toast({
        title: "Erro ao Copiar",
        description: "Não foi possível copiar o conteúdo. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  // Reset isCopied state if verse changes
  useEffect(() => {
    setIsCopied(false);
  }, [verse]);

  return (
    <Card className={cn("w-full shadow-xl", className)}>
      <CardHeader>
        <CardTitle className="text-2xl text-primary">
          {verse.book} {verse.chapter}:{verse.verse}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground pt-1">
          Sua dose de inspiração divina.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg leading-relaxed text-foreground">
          "{verse.text}"
        </p>
        <p className="text-base italic text-muted-foreground pt-2 border-t border-border">
          {inspirationalQuote}
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopy} className="w-full" variant="default" aria-label="Copiar versículo e citação">
          {isCopied ? <CheckCircle className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {isCopied ? "Copiado!" : "Copiar para Status"}
        </Button>
      </CardFooter>
    </Card>
  );
}
