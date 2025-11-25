import Link from "next/link";

import { GameBoard } from "@/components/wordle/game/game-board";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="container flex h-dvh max-w-2xl flex-col items-center justify-center">
      <GameBoard
        guesses={["error", "404:("]}
        evals={[Array(5).fill("absent"), ["present", "present", "present", undefined, undefined]]}
        currentGuess=""
      />

      <p className="text-muted-foreground mt-8 text-sm leading-tight">{"Page not found"}</p>

      <Link href="/">
        <Button variant="default" size="lg" className="mt-8 font-semibold">
          <Home />
          {"Go home"}
        </Button>
      </Link>
    </main>
  );
}
