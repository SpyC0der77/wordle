"use client";

import Link from "next/link";
import { useEffect } from "react";

import { GameBoard } from "@/components/wordle/game/game-board";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container flex h-dvh max-w-2xl flex-col items-center justify-center">
      <GameBoard
        guesses={["error", "500:("]}
        evals={[Array(5).fill("absent"), ["present", "present", "present", undefined, undefined]]}
        currentGuess=""
      />

      <p className="text-muted-foreground mt-8 text-sm leading-tight">
        {/* {"Something went wrong. Please try again later."} */}
        {error.message}
      </p>

      <Link href="/">
        <Button variant="default" size="lg" className="mt-8 font-semibold">
          <Home />
          {"Go home"}
        </Button>
      </Link>
    </main>
  );
}
