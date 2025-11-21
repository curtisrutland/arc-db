import { getQuests } from "@/lib/dataset";
import { Breadcrumb } from "@/components/Breadcrumb";
import { QuestsSearchableList } from "@/components/SearchableLists/QuestsSearchableList";

export const metadata = {
  title: "Quests - ARCDb",
};

export default function QuestsPage() {
  const quests = getQuests();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Quests" }]} />
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Quests
        </h1>
        <QuestsSearchableList quests={quests} />
      </div>
    </div>
  );
}
