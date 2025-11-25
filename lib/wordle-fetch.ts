"use server";

import { notFound } from "next/navigation";

export async function fetchWordleData(year: string, month: string, day: string) {
  const data = await fetch(`https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`, {
    cache: "force-cache",
  });
  if (!data.ok) {
    if (data.status === 404) {
      notFound();
    }
    throw new Error(`Failed to fetch Wordle data: ${data.status}`);
  }

  try {
    const json = await data.json();
    return json;
  } catch (error) {
    throw new Error(
      `Failed to parse Wordle data: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
