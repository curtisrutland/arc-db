"use client";

import { useState } from "react";
import Link from "next/link";
import { getBotById } from "@/lib/dataset";
import { BotHoverCard } from "./BotHoverCard";

interface BotLinkProps {
  botId: string;
  className?: string;
}

export function BotLink({ botId, className }: BotLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const bot = getBotById(botId);

  if (!bot) {
    return <span className={className}>{botId}</span>;
  }

  return (
    <span className="relative inline-block">
      <Link
        href={`/bots/${botId}`}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {bot.name}
      </Link>

      {isHovered && <BotHoverCard bot={bot} />}
    </span>
  );
}
