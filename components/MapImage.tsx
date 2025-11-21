import Image from "next/image";
import type { Map } from "@/types/dataset";

interface MapImageProps {
  map: Map;
  /** Additional CSS classes for the container */
  className?: string;
  /** Size variant - affects default styling if no className provided */
  size?: "sm" | "md" | "lg";
}

export function MapImage({
  map,
  className,
  size = "md"
}: MapImageProps) {
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

  const containerClass = className || `${sizeClasses[size]} relative bg-zinc-100 dark:bg-zinc-800`;

  return (
    <div className={containerClass}>
      <Image
        src={`/images${map.image}`}
        alt={map.name.en}
        fill
        sizes={imageSizes[size]}
        className="object-cover"
      />
    </div>
  );
}
