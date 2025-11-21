"use client";

import { useState, useMemo, useCallback } from "react";
import { Item, Bot, Quest, Workstation } from "@/types/dataset";
import { filterItems } from "@/lib/search";
import { UnifiedSearchDropdown } from "@/components/UnifiedSearch";

type EntityType = "items" | "bots" | "quests" | "workstations";

interface HeaderSearchProps {
  items: Item[];
  bots: Bot[];
  quests: Quest[];
  workstations: Workstation[];
}

export function HeaderSearch({
  items,
  bots,
  quests,
  workstations,
}: HeaderSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [entityType, setEntityType] = useState<EntityType>("items");

  const filteredResults = useMemo(() => {
    switch (entityType) {
      case "items":
        return filterItems(items, searchTerm, [
          "name.en",
          "description.en",
          "type",
          "rarity",
        ]);
      case "bots":
        return filterItems(bots, searchTerm, [
          "name",
          "description",
          "type",
          "threat",
        ]);
      case "quests":
        return filterItems(quests, searchTerm, ["name.en", "trader"]);
      case "workstations":
        return filterItems(workstations, searchTerm, ["name.en"]);
      default:
        return [];
    }
  }, [entityType, items, bots, quests, workstations, searchTerm]);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    if (term.trim()) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, []);

  const handleCloseDropdown = useCallback(() => {
    setIsDropdownOpen(false);
    setSearchTerm("");
  }, []);

  const handleFocus = useCallback(() => {
    if (searchTerm.trim()) {
      setIsDropdownOpen(true);
    }
  }, [searchTerm]);

  const handleEntityTypeChange = useCallback((type: EntityType) => {
    setEntityType(type);
    setSearchTerm("");
    setIsDropdownOpen(false);
  }, []);

  const entityTypeConfig = {
    items: { label: "Items", placeholder: "Search items by name, type, rarity..." },
    bots: { label: "Bots", placeholder: "Search bots by name, type, threat..." },
    quests: { label: "Quests", placeholder: "Search quests by name, trader..." },
    workstations: {
      label: "Workstations",
      placeholder: "Search workstations by name...",
    },
  };

  return (
    <div className="relative w-full flex gap-2">
      {/* Entity Type Dropdown */}
      <div className="relative">
        <select
          value={entityType}
          onChange={(e) => handleEntityTypeChange(e.target.value as EntityType)}
          className="h-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-transparent transition-all text-sm font-medium appearance-none pr-8 cursor-pointer"
        >
          <option value="items">Items</option>
          <option value="bots">Bots</option>
          <option value="quests">Quests</option>
          <option value="workstations">Workstations</option>
        </select>
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Search Input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={entityTypeConfig[entityType].placeholder}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-transparent transition-all text-sm"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchTerm && (
          <button
            onClick={handleCloseDropdown}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        <UnifiedSearchDropdown
          isOpen={isDropdownOpen}
          onClose={handleCloseDropdown}
          searchTerm={searchTerm}
          results={filteredResults}
          entityType={entityType}
        />
      </div>
    </div>
  );
}
