import { ReactNode } from "react";

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  variant?: "default" | "warning" | "success" | "info";
}

export function InfoSection({
  title,
  children,
  variant = "default",
}: InfoSectionProps) {
  const variants = {
    default:
      "p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border-0 text-zinc-900 dark:text-zinc-50",
    warning:
      "p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-400",
    success:
      "p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-green-900 dark:text-green-400",
    info: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-400",
  };

  return (
    <div className={variants[variant]}>
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
