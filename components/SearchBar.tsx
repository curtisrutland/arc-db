"use client";

import { useState, useMemo } from "react";

interface SearchBarProps<T> {
  items: T[];
  searchKeys: (keyof T | string)[];
  onFilter: (filteredItems: T[]) => void;
  placeholder?: string;
}

export function SearchBar<T>({
  items,
  searchKeys,
  onFilter,
  placeholder = "Search...",
}: SearchBarProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return items.filter((item) => {
      return searchKeys.some((key) => {
        const value = getNestedValue(item, key as string);
        if (value === null || value === undefined) return false;

        // Handle different value types
        if (typeof value === "string") {
          return value.toLowerCase().includes(lowerSearchTerm);
        }
        if (typeof value === "number") {
          return value.toString().includes(lowerSearchTerm);
        }
        if (Array.isArray(value)) {
          return value.some((v) =>
            String(v).toLowerCase().includes(lowerSearchTerm)
          );
        }
        // Handle objects with 'en' property (LocalizedString)
        if (typeof value === "object" && value !== null && "en" in value) {
          return String(value.en).toLowerCase().includes(lowerSearchTerm);
        }

        return false;
      });
    });
  }, [items, searchKeys, searchTerm]);

  // Update parent component with filtered results
  useMemo(() => {
    onFilter(filteredItems);
  }, [filteredItems, onFilter]);

  return (
    <div className="mb-6">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 focus:border-transparent transition-all"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 dark:text-zinc-500"
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
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
            aria-label="Clear search"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {searchTerm && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Found {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

// Helper function to get nested property values
function getNestedValue(obj: any, path: string): any {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value === null || value === undefined) return null;
    value = value[key];
  }

  return value;
}
