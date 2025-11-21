"use client";

import { useEffect, useRef } from "react";
import { Item, Bot, Quest, Workstation } from "@/types/dataset";
import { ItemResultCard } from "./ItemResultCard";
import { BotResultCard } from "./BotResultCard";
import { QuestResultCard } from "./QuestResultCard";
import { WorkstationResultCard } from "./WorkstationResultCard";

interface AllResults {
  items: Item[];
  bots: Bot[];
  quests: Quest[];
  workstations: Workstation[];
}

interface UnifiedSearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  allResults: AllResults;
}

export function UnifiedSearchDropdown({
  isOpen,
  onClose,
  searchTerm,
  allResults,
}: UnifiedSearchDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const totalResults =
    allResults.items.length +
    allResults.bots.length +
    allResults.quests.length +
    allResults.workstations.length;

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

  return (
    <>
      {/* Mobile: Fixed full-width overlay */}
      <div
        ref={dropdownRef}
        className="sm:hidden fixed left-0 right-0 top-[calc(100vh-100vh+theme(spacing.32))] bottom-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 overflow-hidden z-50"
        style={{
          top: '64px',
        }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {totalResults} result{totalResults !== 1 ? "s" : ""} for &quot;{searchTerm}&quot;
          </p>
        </div>

        {/* Results */}
        <div className="h-full overflow-y-auto pb-20">
          {totalResults === 0 ? (
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
                No results found matching your search.
              </p>
              <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* Items Section */}
              {allResults.items.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-2">
                    Items ({allResults.items.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {allResults.items.map((item) => (
                      <ItemResultCard key={item.id} item={item} onClose={onClose} />
                    ))}
                  </div>
                </div>
              )}

              {/* ARCs Section */}
              {allResults.bots.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-2">
                    ARCs ({allResults.bots.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {allResults.bots.map((bot) => (
                      <BotResultCard key={bot.id} bot={bot} onClose={onClose} />
                    ))}
                  </div>
                </div>
              )}

              {/* Quests Section */}
              {allResults.quests.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-2">
                    Quests ({allResults.quests.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {allResults.quests.map((quest) => (
                      <QuestResultCard key={quest.id} quest={quest} onClose={onClose} />
                    ))}
                  </div>
                </div>
              )}

              {/* Workstations Section */}
              {allResults.workstations.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-2">
                    Workstations ({allResults.workstations.length})
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {allResults.workstations.map((workstation) => (
                      <WorkstationResultCard
                        key={workstation.id}
                        workstation={workstation}
                        onClose={onClose}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Regular dropdown */}
      <div
        className="hidden sm:block absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50"
      >
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {totalResults} result{totalResults !== 1 ? "s" : ""} for &quot;{searchTerm}&quot;
        </p>
      </div>

      {/* Results */}
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
        {totalResults === 0 ? (
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
              No results found matching your search.
            </p>
            <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">
              Try different keywords or check your spelling
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {/* Items Section */}
            {allResults.items.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-2">
                  Items ({allResults.items.length})
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {allResults.items.map((item) => (
                    <ItemResultCard key={item.id} item={item} onClose={onClose} />
                  ))}
                </div>
              </div>
            )}

            {/* ARCs Section */}
            {allResults.bots.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-2">
                  ARCs ({allResults.bots.length})
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {allResults.bots.map((bot) => (
                    <BotResultCard key={bot.id} bot={bot} onClose={onClose} />
                  ))}
                </div>
              </div>
            )}

            {/* Quests Section */}
            {allResults.quests.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-2">
                  Quests ({allResults.quests.length})
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {allResults.quests.map((quest) => (
                    <QuestResultCard key={quest.id} quest={quest} onClose={onClose} />
                  ))}
                </div>
              </div>
            )}

            {/* Workstations Section */}
            {allResults.workstations.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2 px-2">
                  Workstations ({allResults.workstations.length})
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {allResults.workstations.map((workstation) => (
                    <WorkstationResultCard
                      key={workstation.id}
                      workstation={workstation}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {totalResults > 0 && (
        <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Press ESC to close
          </p>
        </div>
      )}
      </div>
    </>
  );
}
