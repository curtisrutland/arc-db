"use client";

import { useState } from "react";
import Link from "next/link";
import { getWorkstationById } from "@/lib/dataset";
import { WorkstationHoverCard } from "./WorkstationHoverCard";

interface WorkstationLinkProps {
  workstationId: string;
  className?: string;
}

export function WorkstationLink({
  workstationId,
  className,
}: WorkstationLinkProps) {
  const [isHovered, setIsHovered] = useState(false);
  const workstation = getWorkstationById(workstationId);

  if (!workstation) {
    return <span className={className}>{workstationId}</span>;
  }

  return (
    <span className="relative inline-block">
      <Link
        href={`/workstations/${workstationId}`}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {workstation.name.en}
      </Link>

      {isHovered && <WorkstationHoverCard workstation={workstation} />}
    </span>
  );
}
