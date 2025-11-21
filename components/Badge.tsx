import type { BotThreat, ItemRarity } from "@/types/dataset";

interface ThreatBadgeProps {
  threat: BotThreat;
}

export function ThreatBadge({ threat }: ThreatBadgeProps) {
  const colors = {
    Extreme: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    High: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Moderate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    Low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return <span className={`px-4 py-2 rounded font-medium ${colors[threat]}`}>{threat} Threat</span>;
}

interface RarityBadgeProps {
  rarity: ItemRarity;
}

export function RarityBadge({ rarity }: RarityBadgeProps) {
  const colors = {
    Legendary: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Epic: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Rare: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Uncommon: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Common: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
  };

  return <span className={`px-3 py-1 rounded text-sm font-medium ${colors[rarity]}`}>{rarity}</span>;
}

interface XPBadgeProps {
  xp: number;
}

export function XPBadge({ xp }: XPBadgeProps) {
  return (
    <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded font-medium">
      {xp} XP
    </span>
  );
}

interface LevelBadgeProps {
  level: number;
}

export function LevelBadge({ level }: LevelBadgeProps) {
  return (
    <span className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded font-medium text-zinc-900 dark:text-zinc-50">
      Max Level {level}
    </span>
  );
}
