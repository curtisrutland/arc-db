import Link from "next/link";
import { Quest } from "@/types/dataset";

interface QuestResultCardProps {
  quest: Quest;
  onClose: () => void;
}

export function QuestResultCard({ quest, onClose }: QuestResultCardProps) {
  return (
    <Link
      href={`/quests/${quest.id}`}
      onClick={onClose}
      className="flex flex-col p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
    >
      <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-2">
        {quest.name.en}
      </h3>
      <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <span>{quest.objectives.length} objective(s)</span>
        {quest.xp > 0 && <span>{quest.xp} XP</span>}
        {quest.rewardItemIds.length > 0 && (
          <span>{quest.rewardItemIds.length} reward(s)</span>
        )}
      </div>
      <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
        Trader: {quest.trader}
      </span>
    </Link>
  );
}
