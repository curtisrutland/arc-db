import Link from "next/link";
import Image from "next/image";
import type { Bot } from "@/types/dataset";

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
        <Image
          src={`/images/${bot.image}`}
          alt={bot.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold text-xl mb-2 text-zinc-900 dark:text-zinc-50">
          {bot.name}
        </h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {bot.type}
          </span>
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              bot.threat === "Critical"
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : bot.threat === "High"
                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                : bot.threat === "Medium"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            {bot.threat} Threat
          </span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {bot.description}
        </p>
      </div>
    </Link>
  );
}
