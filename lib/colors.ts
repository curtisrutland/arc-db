import type { ItemRarity } from "@/types/dataset";

/**
 * Centralized color constants for item rarities
 * Ensures consistency across all components (badges, gradients, etc.)
 */

/**
 * RGBA color values for each rarity tier
 * Based on Tailwind CSS color palette
 */
export const RARITY_COLORS = {
  Legendary: "rgba(249, 115, 22, OPACITY)", // orange-600
  Epic: "rgba(168, 85, 247, OPACITY)",      // purple-500
  Rare: "rgba(59, 130, 246, OPACITY)",      // blue-500
  Uncommon: "rgba(34, 197, 94, OPACITY)",   // green-500
  Common: "rgba(113, 113, 122, OPACITY)",   // zinc-500
} as const;

/**
 * Tailwind CSS classes for rarity badges
 */
export const RARITY_BADGE_CLASSES = {
  Legendary: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Epic: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Rare: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Uncommon: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Common: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
} as const;

/**
 * Linear gradient backgrounds for item images
 * Creates a subtle color wash based on rarity
 */
const RARITY_GRADIENTS = {
  Legendary: "linear-gradient(135deg, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0.05) 100%)",
  Epic: "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(168, 85, 247, 0.05) 100%)",
  Rare: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0.05) 100%)",
  Uncommon: "linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(34, 197, 94, 0.05) 100%)",
  Common: "linear-gradient(135deg, rgba(113, 113, 122, 0.3) 0%, rgba(113, 113, 122, 0.05) 100%)",
} as const;

/**
 * Get the linear gradient background for a given rarity
 * @param rarity - The item rarity level
 * @returns CSS linear-gradient string
 */
export function getRarityGradient(rarity: ItemRarity): string {
  return RARITY_GRADIENTS[rarity];
}

/**
 * Get the Tailwind CSS classes for a rarity badge
 * @param rarity - The item rarity level
 * @returns Space-separated CSS class string
 */
export function getRarityBadgeClasses(rarity: ItemRarity): string {
  return RARITY_BADGE_CLASSES[rarity];
}
