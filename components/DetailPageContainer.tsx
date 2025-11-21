import { ReactNode } from "react";

interface DetailPageContainerProps {
  children: ReactNode;
}

export function DetailPageContainer({ children }: DetailPageContainerProps) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
