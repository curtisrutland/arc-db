import { getBots } from "@/lib/dataset";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BotsSearchableList } from "@/components/BotsSearchableList";

export const metadata = {
  title: "Bots - ARCDb",
};

export default function BotsPage() {
  const bots = getBots();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Bots" }]} />
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Bots
        </h1>
        <BotsSearchableList bots={bots} />
      </div>
    </div>
  );
}
