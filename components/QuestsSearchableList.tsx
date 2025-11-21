"use client";

import { useState, useMemo } from "react";
import { Quest } from "@/types/dataset";
import { SearchBar } from "@/components/SearchBar";
import { QuestCard } from "@/components/QuestCard";
import { filterItems } from "@/lib/search";

interface QuestsSearchableListProps {
  quests: Quest[];
}

export function QuestsSearchableList({ quests }: QuestsSearchableListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuests = useMemo(
    () => filterItems(quests, searchTerm, ["name.en", "trader", "objectives"]),
    [quests, searchTerm]
  );

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
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredQuests.length}
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
