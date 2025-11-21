import Image from "next/image";
import type { Item } from "@/types/dataset";

interface ItemImageProps {
  item: Item;
  /** Additional CSS classes for the container */
  className?: string;
  /** Padding class for the image (e.g., "p-2", "p-8") */
  padding?: string;
  /** Size variant - affects default styling if no className provided */
  size?: "sm" | "md" | "lg";
}

function isBlueprint(item: Item) {
  return item.id.includes("blueprint");
}

export function ItemImage({
  item,
  className,
  padding = "p-2",
  size = "md"
}: ItemImageProps) {
  const blueprint = isBlueprint(item);

  // Default sizes if no className is provided
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "aspect-square",
    lg: "aspect-square"
  };

  // Responsive sizes hints for Next.js Image optimization
  const imageSizes = {
    sm: "64px",
    md: "(min-width: 768px) 50vw, 100vw",
    lg: "(min-width: 768px) 50vw, 100vw"
  };

  const containerClass = className || `${sizeClasses[size]} relative bg-zinc-100 dark:bg-zinc-800 rounded`;

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
          : undefined
      }
    >
      <Image
        src={`/images/${item.image}`}
        alt={item.name.en}
        fill
        sizes={imageSizes[size]}
        className={`object-contain ${padding}`}
      />
    </div>
  );
}
