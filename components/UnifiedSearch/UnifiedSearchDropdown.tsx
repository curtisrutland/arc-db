"use client";

import { useEffect, useRef } from "react";
import { Item, Bot, Quest, Workstation } from "@/types/dataset";
import { ItemResultCard } from "./ItemResultCard";
import { BotResultCard } from "./BotResultCard";
import { QuestResultCard } from "./QuestResultCard";
import { WorkstationResultCard } from "./WorkstationResultCard";

type SearchEntity = Item | Bot | Quest | Workstation;
type EntityType = "items" | "bots" | "quests" | "workstations";

interface UnifiedSearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  results: SearchEntity[];
  entityType: EntityType;
}

function isItem(entity: SearchEntity): entity is Item {
  return "rarity" in entity && "type" in entity;
}

function isBot(entity: SearchEntity): entity is Bot {
  return "threat" in entity && "drops" in entity;
}

function isQuest(entity: SearchEntity): entity is Quest {
  return "trader" in entity && "objectives" in entity;
}

function isWorkstation(entity: SearchEntity): entity is Workstation {
  return "maxLevel" in entity && "levels" in entity;
}

export function UnifiedSearchDropdown({
  isOpen,
  onClose,
  searchTerm,
  results,
  entityType,
}: UnifiedSearchDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !searchTerm) return null;

  const entityLabel = entityType.charAt(0).toUpperCase() + entityType.slice(1);

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {results.length} {entityLabel.toLowerCase()} result
          {results.length !== 1 ? "s" : ""} for &quot;{searchTerm}&quot;
        </p>
      </div>

      {/* Results */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {results.length === 0 ? (
          <div className="text-center py-8 px-4">
            <svg
              className="w-12 h-12 mx-auto text-zinc-400 dark:text-zinc-600 mb-3"
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
            <p className="text-zinc-500 dark:text-zinc-400">
              No {entityLabel.toLowerCase()} found matching your search.
            </p>
            <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">
              Try different keywords or check your spelling
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 p-4">
            {results.map((entity) => {
              if (isItem(entity)) {
                return <ItemResultCard key={entity.id} item={entity} onClose={onClose} />;
              }

              if (isBot(entity)) {
                return <BotResultCard key={entity.id} bot={entity} onClose={onClose} />;
              }

              if (isQuest(entity)) {
                return <QuestResultCard key={entity.id} quest={entity} onClose={onClose} />;
              }

              if (isWorkstation(entity)) {
                return (
                  <WorkstationResultCard
                    key={entity.id}
                    workstation={entity}
                    onClose={onClose}
                  />
                );
              }

              return null;
            })}
          </div>
        )}
      </div>

      {results.length > 0 && (
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Press ESC to close
          </p>
        </div>
      )}
    </div>
  );
}
