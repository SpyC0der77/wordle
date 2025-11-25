import { WordleUI } from "@/components/wordle";
import { fetchWordleData } from "@/lib/wordle-fetch";

interface ArchivePageProps {
  params: { year: string; month: string; day: string };
}

export default async function ArchivePage({ params }: ArchivePageProps) {
  const { year: yearString, month: monthString, day: dayString } = await params;

  // Parse date
  const [year, month, day] = [parseInt(yearString), parseInt(monthString), parseInt(dayString)];
  const date = new Date(year, month - 1, day);
  date.setHours(23, 59, 59, 999); // End of day

  // Fetch Wordle data
  const wordleData = await fetchWordleData(yearString, monthString, dayString);

  return (
    <WordleUI
      date={date}
      wordleNumber={wordleData.days_since_launch ?? 0}
      solution={wordleData.solution}
    />
  );
}
