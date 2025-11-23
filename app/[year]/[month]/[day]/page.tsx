import { notFound } from "next/navigation";
import { WordleUI } from "@/components/wordle";

interface ArchivePageProps {
  params: { year: string; month: string; day: string };
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { year: yearString, month: monthString, day: dayString } = await params;

  // Fetch Wordle data
  const data = await fetch(
    `https://www.nytimes.com/svc/wordle/v2/${yearString}-${monthString}-${dayString}.json`,
    { cache: "force-cache" }
  );
  if (!data.ok) {
    if (data.status === 404) {
      notFound();
    }
    throw new Error(`Failed to fetch Wordle data: ${data.status}`);
  }
  const json = await data.json();

  // Parse date
  const [year, month, day] = [parseInt(yearString), parseInt(monthString), parseInt(dayString)];
  const date = new Date(year, month - 1, day);
  date.setHours(23, 59, 59, 999); // End of day

  return (
    <WordleUI date={date} wordleNumber={json.days_since_launch ?? 0} solution={json.solution} />
  );
}
