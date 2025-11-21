import { Workstation } from "@/types/dataset";

interface WorkstationHoverCardProps {
  workstation: Workstation;
}

export function WorkstationHoverCard({
  workstation,
}: WorkstationHoverCardProps) {
  return (
    <div className="absolute left-0 top-full mt-2 z-50 w-80 pointer-events-none">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex flex-col p-3">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-2">
            {workstation.name.en}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Max Level:
            </span>
            <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-xs font-medium text-zinc-900 dark:text-zinc-50">
              {workstation.maxLevel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
