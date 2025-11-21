import { getQuests } from "@/lib/dataset";
import { QuestCard } from "@/components/QuestCard";

export default function QuestsPage() {
  const quests = getQuests();

  // Group quests by trader
  const questsByTrader = quests.reduce((acc, quest) => {
    if (!acc[quest.trader]) {
      acc[quest.trader] = [];
    }
    acc[quest.trader].push(quest);
    return acc;
  }, {} as Record<string, typeof quests>);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Quests
        </h1>

        {Object.entries(questsByTrader).map(([trader, traderQuests]) => (
          <div key={trader} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-zinc-200">
              {trader}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {traderQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
