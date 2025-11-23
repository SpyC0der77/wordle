import { notFound } from "next/navigation";
import { WordleUI } from "@/components/wordle";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Get today's date
  // TODO: get today's server from client
  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today
  const year = today.getFullYear().toString().padStart(4, "0");
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");

  // Fetch today's Wordle data
  const data = await fetch(`https://www.nytimes.com/svc/wordle/v2/${year}-${month}-${day}.json`, {
    cache: "force-cache",
  });
  if (!data.ok) {
    if (data.status === 404) {
      notFound();
    }
    throw new Error(`Failed to fetch Wordle data: ${data.status}`);
  }
  const json = await data.json();

  return (
    <WordleUI date={today} wordleNumber={json.days_since_launch ?? 0} solution={json.solution} />
  );
}
