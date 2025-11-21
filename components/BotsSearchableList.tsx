"use client";

import { useState, useMemo } from "react";
import { Bot } from "@/types/dataset";
import { SearchBar } from "@/components/SearchBar";
import { BotCard } from "@/components/BotCard";
import { filterItems } from "@/lib/search";

interface BotsSearchableListProps {
  bots: Bot[];
}

export function BotsSearchableList({ bots }: BotsSearchableListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBots = useMemo(
    () =>
      filterItems(bots, searchTerm, [
        "name",
        "type",
        "threat",
        "description",
        "weakness",
      ]),
    [bots, searchTerm]
  );

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredBots.length}
        placeholder="Search bots by name, type, threat level..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot) => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>

      {filteredBots.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            No bots found matching your search.
          </p>
        </div>
      )}
    </>
  );
}
