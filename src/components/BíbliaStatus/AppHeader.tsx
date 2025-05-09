
import { BookOpenText } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="w-full flex flex-col items-center py-6">
      <div className="flex items-center space-x-3">
        <BookOpenText className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Bíblia Status
        </h1>
      </div>
      <p className="mt-2 text-lg text-muted-foreground">
        Seu versículo diário para inspirar e compartilhar.
        Busque seu versículo do dia — entregue com carinho por Amanda de Freitas Barbosa.
      </p>
    </header>
  );
}
