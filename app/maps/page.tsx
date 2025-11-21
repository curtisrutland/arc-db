import { getMaps } from "@/lib/dataset";
import { MapCard } from "@/components/Cards/MapCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DetailPageContainer } from "@/components/DetailPageContainer";

export default function MapsPage() {
  const maps = getMaps();

  return (
    <DetailPageContainer>
      <Breadcrumb items={[{ label: "Maps" }]} />

      <div className="mb-6">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Maps</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Explore all available maps in ARC Raiders. Each map offers unique terrain, resources, and challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maps.map((map) => (
          <MapCard key={map.id} map={map} />
        ))}
      </div>
    </DetailPageContainer>
  );
}
