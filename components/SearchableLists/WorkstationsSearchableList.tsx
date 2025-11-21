"use client";

import { useState, useMemo } from "react";
import { Workstation } from "@/types/dataset";
import { SearchBar } from "@/components/SearchBar";
import { WorkstationCard } from "@/components/Cards/WorkstationCard";
import { filterItems } from "@/lib/search";

interface WorkstationsSearchableListProps {
  workstations: Workstation[];
}

export function WorkstationsSearchableList({
  workstations,
}: WorkstationsSearchableListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkstations = useMemo(
    () => filterItems(workstations, searchTerm, ["name.en", "maxLevel"]),
    [workstations, searchTerm]
  );

  return (
    <>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        resultCount={filteredWorkstations.length}
        placeholder="Search workstations by name..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkstations.map((station) => (
          <WorkstationCard key={station.id} workstation={station} />
        ))}
      </div>

      {filteredWorkstations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            No workstations found matching your search.
          </p>
        </div>
      )}
    </>
  );
}
