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
  for (let i = 0; i < guess.length; i++) {
    const remainingCount = remainingLetters.get(guess[i]);

    if (remainingCount === undefined || remainingCount === 0) {
      // Absent letter
      result.push("absent");
    } else if (guess[i] === solution[i]) {
      // Correct letter
      remainingLetters.set(guess[i], remainingCount - 1);
      result.push("correct");
    } else {
      // Present letter
      remainingLetters.set(guess[i], remainingCount - 1);
      result.push("present");
    }
  }
  return result;
}
