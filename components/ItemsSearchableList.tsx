"use client";

import { useState, useCallback } from "react";
import { Item } from "@/types/dataset";
import { SearchBar } from "@/components/SearchBar";
import { ItemCard } from "@/components/ItemCard";

interface ItemsSearchableListProps {
  items: Item[];
}

export function ItemsSearchableList({ items }: ItemsSearchableListProps) {
  const [filteredItems, setFilteredItems] = useState(items);

  const handleFilter = useCallback((filtered: Item[]) => {
    setFilteredItems(filtered);
  }, []);

  return (
    <>
      <SearchBar
        items={items}
        searchKeys={["name.en", "description.en", "type", "rarity"]}
        onFilter={handleFilter}
        placeholder="Search items by name, type, rarity..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            No items found matching your search.
          </p>
        </div>
      )}
    </>
  );
}
