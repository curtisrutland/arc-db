import Link from "next/link";
import { Workstation } from "@/types/dataset";

interface WorkstationResultCardProps {
  workstation: Workstation;
  onClose: () => void;
}

export function WorkstationResultCard({
  workstation,
  onClose,
}: WorkstationResultCardProps) {
  return (
    <Link
      href={`/workstations/${workstation.id}`}
      onClick={onClose}
      className="flex flex-col p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
    >
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
    </Link>
  );
}
