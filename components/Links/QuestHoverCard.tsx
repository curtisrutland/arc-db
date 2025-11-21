import { Quest } from "@/types/dataset";

interface QuestHoverCardProps {
  quest: Quest;
}

export function QuestHoverCard({ quest }: QuestHoverCardProps) {
  return (
    <div className="absolute left-0 top-full mt-2 z-50 w-80 pointer-events-none">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex flex-col p-3">
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
        </div>
      </div>
    </div>
  );
}
