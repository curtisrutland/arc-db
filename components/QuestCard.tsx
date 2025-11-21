import Link from "next/link";
import type { Quest } from "@/types/dataset";

interface QuestCardProps {
  quest: Quest;
}

export function QuestCard({ quest }: QuestCardProps) {
  return (
    <Link
      href={`/quests/${quest.id}`}
      className="block p-5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
    >
      <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-zinc-50">
        {quest.name.en}
      </h3>
      <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <span>{quest.objectives.length} objective(s)</span>
        {quest.xp > 0 && <span>{quest.xp} XP</span>}
      </div>
      {quest.rewardItemIds.length > 0 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
          {quest.rewardItemIds.length} reward item(s)
        </p>
      )}
    </Link>
  );
}
