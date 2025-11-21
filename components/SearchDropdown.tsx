"use client";

import { useEffect, useRef } from "react";
import { Item } from "@/types/dataset";
import Link from "next/link";
import Image from "next/image";

interface SearchDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  results: Item[];
}

function isBlueprint(item: Item) {
  return item.id.includes("blueprint");
}

export function SearchDropdown({
  isOpen,
  onClose,
  searchTerm,
  results,
}: SearchDropdownProps) {
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

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden z-50"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;
          {searchTerm}&quot;
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
              No items found matching your search.
            </p>
            <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">
              Try different keywords or check your spelling
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
            {results.map((item) => {
              const blueprint = isBlueprint(item);

              return (
                <Link
                  key={item.id}
                  href={`/items/${item.id}`}
                  onClick={onClose}
                  className="flex gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
                >
                  <div
                    className="w-16 h-16 flex-shrink-0 relative bg-zinc-100 dark:bg-zinc-800 rounded"
                    style={
                      blueprint
                        ? {
                            backgroundImage: "url(/images/blueprint_bg.png)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : undefined
                    }
                  >
                    <Image
                      src={`/images/${item.image}`}
                      alt={item.name.en}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 truncate">
                      {item.name.en}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                      {item.description.en}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          item.rarity === "Legendary"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : item.rarity === "Epic"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                            : item.rarity === "Rare"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : item.rarity === "Uncommon"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {item.rarity}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </Link>
              );
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
