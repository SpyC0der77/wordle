"use client";

import { useEffect, useState } from "react";
import { WordleUI, WordleUILoading } from "@/components/wordle";
import { fetchWordleData } from "@/lib/wordle-fetch";

export default function HomePage() {
  const [date, setDate] = useState<Date | null>(null);
  const [wordleData, setWordleData] = useState<{
    days_since_launch?: number;
    solution: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Get today's date from the client
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today
    setDate(today);

    const year = today.getFullYear().toString().padStart(4, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");

    // Fetch today's Wordle data
    fetchWordleData(year, month, day)
      .then((data) => {
        setWordleData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      });
  }, []);

  // Throw error during render to trigger error boundary
  if (error) {
    throw error;
  }

  if (loading || !date || !wordleData) {
    return <WordleUILoading />;
  }

  return (
    <WordleUI
      date={date}
      wordleNumber={wordleData.days_since_launch ?? 0}
      solution={wordleData.solution}
    />
  );
}
