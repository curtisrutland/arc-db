"use client";

import { useState } from "react";
import { Quest } from "@/types/dataset";
import { SearchBar } from "@/components/SearchBar";
import { QuestCard } from "@/components/QuestCard";

interface QuestsSearchableListProps {
  quests: Quest[];
}

export function QuestsSearchableList({ quests }: QuestsSearchableListProps) {
  const [filteredQuests, setFilteredQuests] = useState(quests);

  // Group quests by trader
  const questsByTrader = filteredQuests.reduce((acc, quest) => {
    if (!acc[quest.trader]) {
      acc[quest.trader] = [];
    }
    acc[quest.trader].push(quest);
    return acc;
  }, {} as Record<string, typeof quests>);

  return (
    <>
      <SearchBar
        items={quests}
        searchKeys={["name.en", "trader", "objectives"]}
        onFilter={setFilteredQuests}
        placeholder="Search quests by name, trader, objectives..."
      />

      {Object.keys(questsByTrader).length > 0 ? (
        Object.entries(questsByTrader).map(([trader, traderQuests]) => (
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
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            No quests found matching your search.
          </p>
        </div>
      )}
    </>
  );
}
