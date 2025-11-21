import Link from "next/link";
import type { Bot } from "@/types/dataset";
import { ThreatBadge } from "../Badge";
import { BotImage } from "../Images/BotImage";

interface BotCardProps {
  bot: Bot;
}

export function BotCard({ bot }: BotCardProps) {
  return (
    <Link
      href={`/bots/${bot.id}`}
      className="block bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors overflow-hidden"
    >
      <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800">
        <BotImage bot={bot} />
      </div>
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2 text-zinc-900 dark:text-zinc-50">{bot.name}</h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">{bot.type}</span>
          <ThreatBadge threat={bot.threat} />
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{bot.description}</p>
      </div>
    </Link>
  );
}
