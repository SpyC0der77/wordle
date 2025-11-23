"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowBigRight, Dices } from "lucide-react";
import { toast } from "sonner";

const WORDLE_START_DATE = new Date(2021, 5, 19); // June 19, 2021 (month is 0-indexed)

export function DatePicker({
  selectedDate,
  modal = false,
}: {
  selectedDate: Date;
  modal?: boolean;
}) {
  const router = useRouter();

  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today

  const handleSelect = (date: Date) => {
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    toast.dismiss();

    if (date.toDateString() === today.toDateString()) {
      // Redirect to today (homepage)
      router.push("/");
      return;
    }
    // Redirect to the selected date
    router.push(`/${year}/${month}/${day}`);
  };

  const handleToday = () => {
    handleSelect(today);
  };

  const handleRandom = () => {
    const randomDate = new Date(
      WORDLE_START_DATE.getTime() + Math.random() * (today.getTime() - WORDLE_START_DATE.getTime())
    );
    handleSelect(randomDate);
  };

  const handlePrevious = () => {
    const previousDate = new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000);
    handleSelect(previousDate);
  };

  const handleNext = () => {
    const nextDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);
    handleSelect(nextDate);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className={cn("flex justify-between gap-2", modal && "px-3")}>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="default"
            className="px-2.5! font-semibold"
            onClick={handleToday}
          >
            Today
          </Button>

          <Button variant="outline" size="icon" onClick={handleRandom}>
            <Dices className="size-5" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={selectedDate.toDateString() === WORDLE_START_DATE.toDateString()}
          >
            <ArrowBigLeft className="size-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={selectedDate.toDateString() === today.toDateString()}
          >
            <ArrowBigRight className="size-5" />
          </Button>
        </div>
      </div>

      <Calendar
        className={cn("h-170 w-full xl:h-97", !modal && "border-border rounded-xl border")}
        mode="single"
        captionLayout="dropdown"
        hidden={{ before: WORDLE_START_DATE, after: today }}
        startMonth={WORDLE_START_DATE}
        endMonth={today}
        defaultMonth={selectedDate}
        selected={selectedDate}
        onSelect={handleSelect}
        required
      />
    </div>
  );
}
