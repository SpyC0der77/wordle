import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github } from "lucide-react";

export function About({ modal = false }: { modal?: boolean }) {
  return (
    <div>
      <div className={cn("", !modal && "border-border rounded-xl border px-6 py-5")}>
        <div className="flex items-center gap-4">
          {/* <img src="/logo-linkai.png" alt="Linkai" className="size-10 rounded-sm" /> */}

          <div>
            <h1 className="text-lg leading-tight font-extrabold">{"Wordle Archive"}</h1>

            <p className="text-muted-foreground mt-1 text-sm leading-tight">
              {"Play today's Wordle or catch up on past puzzles, all in one place."}
            </p>
          </div>
        </div>

        <Link href="https://github.com/linkai101/wordle" target="_blank" rel="noopener noreferrer">
          <Button variant="link" size="sm" className="mt-6 h-auto p-0! font-semibold">
            <Github className="size-4" />
            {"linkai101/wordle"}
          </Button>
        </Link>
      </div>

      {modal && <hr className="border-border mt-6" />}

      <div className="mt-6 flex items-center justify-center text-sm">
        <span>Made by</span>
        <Link href="https://linkaiwu.com" target="_blank" rel="noopener noreferrer">
          <Button
            variant="link"
            size="sm"
            className="group mt-1 ml-1.5 h-auto gap-1 p-0! font-semibold"
          >
            <img src="/logo-linkai.png" className="mr-0.5 size-4 rounded-xs" />
            {"Linkai"}
            <ArrowUpRight className="size-0 translate-y-0.5 opacity-0 transition-all duration-300 group-hover:size-4 group-hover:translate-y-0 group-hover:opacity-100" />
          </Button>
        </Link>
      </div>

      <p className="text-muted-foreground mt-1 text-center text-sm leading-tight xl:text-xs">
        {"A fan project, not affiliated with The New York Times."}
      </p>
    </div>
  );
}
