
"use client";

import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import type { SearchState } from '@/lib/actions'; // Ensure this path is correct

interface SearchVerseFormProps {
  formAction: (payload: FormData) => void;
  initialQuery?: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} aria-disabled={pending} className="w-full sm:w-auto">
      <Search className="mr-2 h-4 w-4" />
      {pending ? "Buscando..." : "Buscar Versículo"}
    </Button>
  );
}

export function SearchVerseForm({ formAction, initialQuery = "" }: SearchVerseFormProps) {
  return (
    <form action={formAction} className="space-y-6 bg-card p-6 rounded-lg shadow-md">
      <div>
        <Label htmlFor="query" className="text-sm font-medium text-card-foreground sr-only">
          Busque por palavra-chave ou referência (Ex: João 3:16 ou amor)
        </Label>
        <Input
          id="query"
          type="text"
          name="query"
          placeholder="Ex: João 3:16 ou amor"
          required
          defaultValue={initialQuery}
          className="text-base h-12"
          aria-label="Busca de versículo"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
