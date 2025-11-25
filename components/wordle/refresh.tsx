"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Refresh() {
  function handleRefresh() {
    window.location.reload();
  }

  return (
    <Button variant="outline" size="icon" className="size-9 xl:size-10" onClick={handleRefresh}>
      <RefreshCcw className="size-5" />
    </Button>
  );
}
