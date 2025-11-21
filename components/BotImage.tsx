import Image from "next/image";
import type { Bot } from "@/types/dataset";

interface BotImageProps {
  bot: Bot;
  /** Additional CSS classes for the container */
  className?: string;
  /** Size variant - affects default styling if no className provided */
  size?: "sm" | "md" | "lg";
  /** Object fit style for the image */
  objectFit?: "cover" | "contain";
}

export function BotImage({
  bot,
  className,
  size = "md",
  objectFit = "cover"
}: BotImageProps) {
  // Default sizes if no className is provided
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "aspect-video",
    lg: "aspect-video"
  };

  // Responsive sizes hints for Next.js Image optimization
  const imageSizes = {
    sm: "64px",
    md: "(min-width: 768px) 50vw, 100vw",
    lg: "100vw"
  };

  const containerClass = className || `${sizeClasses[size]} relative bg-zinc-100 dark:bg-zinc-800 ${size === "sm" ? "rounded" : ""}`;

  return (
    <div className={containerClass}>
      <Image
        src={`/images/${bot.image}`}
        alt={bot.name}
        fill
        sizes={imageSizes[size]}
        className={`object-${objectFit} ${size === "sm" ? "rounded" : ""}`}
      />
    </div>
  );
}
