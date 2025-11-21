import Link from "next/link";
import type { Workstation } from "@/types/dataset";

interface WorkstationCardProps {
  workstation: Workstation;
}

export function WorkstationCard({ workstation }: WorkstationCardProps) {
  return (
    <Link
      href={`/workstations/${workstation.id}`}
      className="block p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
    >
      <h2 className="font-bold text-2xl mb-3 text-zinc-900 dark:text-zinc-50">
        {workstation.name.en}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-600 dark:text-zinc-400">
          Max Level:
        </span>
        <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-sm font-medium text-zinc-900 dark:text-zinc-50">
          {workstation.maxLevel}
        </span>
      </div>
    </Link>
  );
}
