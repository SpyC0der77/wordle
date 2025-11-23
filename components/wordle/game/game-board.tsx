import { cn } from "@/lib/utils";

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

interface GameBoardProps {
  guesses: string[];
  evals: ("correct" | "present" | "absent")[][];
  currentGuess: string;
}

export function GameBoard({ guesses, evals, currentGuess }: GameBoardProps) {
  const flatEvals = evals.flat();

  return (
    <div className="grid grid-cols-5 gap-2">
      {guesses
        .map((guess) => guess.split(""))
        .flat()
        .map((letter, letterIndex) => (
          <GameBoardCell key={letterIndex} letter={letter} evaluation={flatEvals[letterIndex]} />
        ))}

      {currentGuess.split("").map((letter, letterIndex) => (
        <GameBoardCell key={letterIndex} letter={letter} />
      ))}

      {Array.from({
        length: WORD_LENGTH * MAX_GUESSES - guesses.length * WORD_LENGTH - currentGuess.length,
      }).map((_, index) => (
        <GameBoardCell key={index} letter="" />
      ))}
    </div>
  );
}

function GameBoardCell({
  letter,
  evaluation,
}: {
  letter: string;
  evaluation?: "correct" | "present" | "absent";
}) {
  return (
    <div
      className={cn(
        "flex size-14 items-center justify-center border text-3xl font-bold uppercase xl:size-18",
        {
          "bg-correct text-correct-foreground": evaluation === "correct",
          "bg-present text-present-foreground": evaluation === "present",
          "bg-absent text-absent-foreground": evaluation === "absent",
        },
        evaluation ? "border-transparent" : letter !== "" ? "border-primary" : "border-border"
      )}
    >
      {letter}
    </div>
  );
}
