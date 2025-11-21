import { ReactNode } from "react";

interface InfoGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function InfoGrid({ children, columns = 2 }: InfoGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>{children}</div>
  );
}

interface InfoItemProps {
  label: string;
  value: string | number;
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <span className="text-sm text-zinc-500 dark:text-zinc-500">{label}</span>
      <p className="font-medium text-zinc-900 dark:text-zinc-50">{value}</p>
    </div>
  );
}
