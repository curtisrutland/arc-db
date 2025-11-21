import Image from "next/image";
import type { Item } from "@/types/dataset";
import { getRarityGradient } from "@/lib/colors";

interface ItemImageProps {
  item: Item;
  /** Additional CSS classes for the container */
  className?: string;
  /** Padding class for the image (e.g., "p-2", "p-8") */
  padding?: string;
  /** Size variant - affects default styling if no className provided */
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "w-16 h-16",
  md: "aspect-square",
  lg: "aspect-square"
} as const;

const IMAGE_SIZES = {
  sm: "64px",
  md: "(min-width: 768px) 50vw, 100vw",
  lg: "(min-width: 768px) 50vw, 100vw"
} as const;

function isBlueprint(item: Item): boolean {
  return item.type === "Blueprint";
}

/**
 * Displays an item image with appropriate rarity-based gradient background.
 * Blueprint items receive a special blueprint background texture instead.
 */
export function ItemImage({
  item,
  className,
  padding = "p-2",
  size = "md"
}: ItemImageProps) {
  const blueprint = isBlueprint(item);
  const containerClass = className || `${SIZE_CLASSES[size]} relative bg-zinc-100 dark:bg-zinc-800 rounded`;

  return (
    <div
      className={containerClass}
      style={
        blueprint
          ? {
              backgroundImage: "url(/images/blueprint_bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              backgroundImage: getRarityGradient(item.rarity),
            }
      }
    >
      <Image
        src={`/images/${item.image}`}
        alt={`${item.name.en} (${item.rarity}${blueprint ? ' blueprint' : ''})`}
        fill
        sizes={IMAGE_SIZES[size]}
        className={`object-contain ${padding}`}
      />
    </div>
  );
}
