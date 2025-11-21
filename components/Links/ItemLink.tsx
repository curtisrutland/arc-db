"use client";

import { useState } from "react";
import Link from "next/link";
import { getItemById } from "@/lib/dataset";
import { ItemHoverCard } from "./ItemHoverCard";

interface ItemLinkProps {
  itemId: string;
  className?: string;
}

export function ItemLink({ itemId, className }: ItemLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const item = getItemById(itemId);

  if (!item) {
    return <span className={className}>{itemId}</span>;
  }

  return (
    <span className="relative inline-block">
      <Link
        href={`/items/${itemId}`}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {item.name.en}
      </Link>

      {isHovered && <ItemHoverCard item={item} />}
    </span>
  );
}
