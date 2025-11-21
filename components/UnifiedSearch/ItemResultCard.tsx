import Link from "next/link";
import { Item } from "@/types/dataset";
import { ItemImage } from "@/components/ItemImage";

interface ItemResultCardProps {
  item: Item;
  onClose: () => void;
}

export function ItemResultCard({ item, onClose }: ItemResultCardProps) {
  return (
    <Link
      href={`/items/${item.id}`}
      onClick={onClose}
      className="flex gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
    >
      <ItemImage item={item} size="sm" padding="p-1" className="w-16 h-16 flex-shrink-0 relative bg-zinc-100 dark:bg-zinc-800 rounded" />
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
}
