"use client";

import { useState } from "react";
import Link from "next/link";
import { getQuestById } from "@/lib/dataset";
import { QuestHoverCard } from "./QuestHoverCard";

interface QuestLinkProps {
  questId: string;
  className?: string;
}

export function QuestLink({ questId, className }: QuestLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const quest = getQuestById(questId);

  if (!quest) {
    return <span className={className}>{questId}</span>;
  }

  return (
    <span className="relative inline-block">
      <Link
        href={`/quests/${questId}`}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {quest.name.en}
      </Link>

      {isHovered && <QuestHoverCard quest={quest} />}
    </span>
  );
}
