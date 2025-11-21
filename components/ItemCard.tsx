import Link from "next/link";
import Image from "next/image";
import type { Item } from "@/types/dataset";

interface ItemCardProps {
  item: Item;
}

function isBlueprint(item: Item) {
  return item.id.includes("blueprint");
}

export function ItemCard({ item }: ItemCardProps) {
  const blueprint = isBlueprint(item);

  return (
    <Link
      href={`/items/${item.id}`}
      className="block p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
    >
      <div
        className="aspect-square relative mb-3 bg-zinc-100 dark:bg-zinc-800 rounded"
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
          className="object-contain p-2"
        />
      </div>
      <h2 className="font-semibold text-lg mb-1 text-zinc-900 dark:text-zinc-50">
        {item.name.en}
      </h2>
      <div className="flex items-center justify-between text-sm">
        <span
          className={`px-2 py-1 rounded ${
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
        <span className="text-zinc-600 dark:text-zinc-400">{item.type}</span>
      </div>
    </Link>
  );
}
