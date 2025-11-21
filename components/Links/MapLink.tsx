"use client";

import { useState } from "react";
import Link from "next/link";
import { getMapById } from "@/lib/dataset";
import { MapHoverCard } from "./MapHoverCard";

interface MapLinkProps {
  mapId: string;
  className?: string;
}

export function MapLink({ mapId, className }: MapLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const map = getMapById(mapId);

  if (!map) {
    return <span className={className}>{mapId}</span>;
  }

  return (
    <span className="relative inline-block">
      <Link
        href={`/maps/${mapId}`}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {map.name.en}
      </Link>

      {isHovered && <MapHoverCard map={map} />}
    </span>
  );
}
