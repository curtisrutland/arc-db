import Link from "next/link";
import type { Map } from "@/types/dataset";
import { MapImage } from "../MapImage";

interface MapCardProps {
  map: Map;
}

export function MapCard({ map }: MapCardProps) {
  return (
    <Link
      href={`/maps/${map.id}`}
      className="block bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors overflow-hidden"
    >
      <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800">
        <MapImage map={map} className="aspect-video relative bg-zinc-100 dark:bg-zinc-800" />
        {/* <Image src={`/images${map.image}`} alt={map.name.en} fill className="object-cover" /> */}
      </div>
      <div className="p-4">
        <h2 className="font-bold text-xl text-zinc-900 dark:text-zinc-50">{map.name.en}</h2>
      </div>
    </Link>
  );
}
