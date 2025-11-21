import type { BotThreat, ItemRarity } from "@/types/dataset";
import { getRarityBadgeClasses, getThreatBadgeClasses } from "@/lib/colors";

interface ThreatBadgeProps {
  threat: BotThreat;
}

export function ThreatBadge({ threat }: ThreatBadgeProps) {
  return <span className={`px-4 py-2 rounded font-medium ${getThreatBadgeClasses(threat)}`}>{threat} Threat</span>;
}

interface RarityBadgeProps {
  rarity: ItemRarity;
}

export function RarityBadge({ rarity }: RarityBadgeProps) {
  return <span className={`px-3 py-1 rounded text-sm font-medium ${getRarityBadgeClasses(rarity)}`}>{rarity}</span>;
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
