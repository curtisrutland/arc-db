import { Bot } from "@/types/dataset";
import { BotImage } from "@/components/Images/BotImage";

interface BotHoverCardProps {
  bot: Bot;
}

export function BotHoverCard({ bot }: BotHoverCardProps) {
  return (
    <div className="absolute left-0 top-full mt-2 z-50 w-80 pointer-events-none">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex gap-3 p-3">
          <BotImage bot={bot} size="sm" className="w-16 h-16 flex-shrink-0 relative bg-zinc-100 dark:bg-zinc-800 rounded" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 truncate">
              {bot.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
              {bot.description}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {bot.type}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs ${
                  bot.threat === "Critical"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : bot.threat === "High"
                    ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                    : bot.threat === "Moderate"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                }`}
              >
                {bot.threat}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
