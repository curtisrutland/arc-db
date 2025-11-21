import Image from "next/image";
import { Map } from "@/types/dataset";

interface MapHoverCardProps {
  map: Map;
}

export function MapHoverCard({ map }: MapHoverCardProps) {
  return (
    <div className="absolute left-0 bottom-full mb-2 z-50 w-80 pointer-events-none">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800">
          <Image src={`/images${map.image}`} alt={map.name.en} fill className="object-cover" />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{map.name.en}</h3>
        </div>
      </div>
    </div>
  );
}
