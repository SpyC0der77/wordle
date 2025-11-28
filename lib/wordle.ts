import WORD_LIST from "./wordlist.json";

export function isValidWord(word: string) {
  return WORD_LIST.includes(word);
}

export function evaluateGuess(guess: string, solution: string) {
  const remainingLetters = new Map<string, number>();
  for (const letter of solution) {
    remainingLetters.set(letter, (remainingLetters.get(letter) ?? 0) + 1);
  }

  const result: ("correct" | "present" | "absent")[] = [];

  // First pass: mark all exact matches (correct)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === solution[i]) {
      const remainingCount = remainingLetters.get(guess[i]) ?? 0;
      remainingLetters.set(guess[i], remainingCount - 1);
      result.push("correct");
      continue;
    }

    result.push("absent"); // Placeholder, will be updated in second pass
  }

  // Second pass: mark remaining letters as present if they exist
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") {
      continue;
    }

    const remainingCount = remainingLetters.get(guess[i]);
    if (remainingCount !== undefined && remainingCount > 0) {
      remainingLetters.set(guess[i], remainingCount - 1);
      result[i] = "present";
    } else {
      result[i] = "absent";
    }
  }

  return result;
}
