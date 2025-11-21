import Link from "next/link";
import Image from "next/image";
import { Bot } from "@/types/dataset";

interface BotResultCardProps {
  bot: Bot;
  onClose: () => void;
}

export function BotResultCard({ bot, onClose }: BotResultCardProps) {
  return (
    <Link
      href={`/bots/${bot.id}`}
      onClick={onClose}
      className="flex gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
    >
      <div className="w-16 h-16 flex-shrink-0 relative bg-zinc-100 dark:bg-zinc-800 rounded">
        <Image
          src={`/images/${bot.image}`}
          alt={bot.name}
          fill
          className="object-cover rounded"
        />
      </div>
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
                : bot.threat === "Medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            {bot.threat}
          </span>
        </div>
      </div>
    </Link>
  );
}
