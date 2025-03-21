import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="min-h-[638px] w-full h-full bg-zinc-400 mt-5" />
    </div>
  );
};

export default loading;
