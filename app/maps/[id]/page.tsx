import { getMapById, getBots } from "@/lib/dataset";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DetailPageContainer } from "@/components/DetailPageContainer";
import { InfoSection } from "@/components/InfoSection";
import { BotCard } from "@/components/Cards/BotCard";
import { MapImage } from "@/components/Images/MapImage";

interface MapPageProps {
  params: Promise<{ id: string }>;
}

export default async function MapPage({ params }: MapPageProps) {
  const { id } = await params;
  const map = getMapById(id);

  if (!map) {
    notFound();
  }

  // Get all bots that appear on this map
  const allBots = getBots();
  const botsOnMap = allBots.filter((bot) => bot.maps.includes(id));

  return (
    <DetailPageContainer>
      <Breadcrumb items={[{ label: "Maps", href: "/maps" }, { label: map.name.en }]} />

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800">
          {/* <Image src={`/images${map.image}`} alt={map.name.en} fill className="object-cover" /> */}
          <MapImage map={map} />
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">{map.name.en}</h1>

          {botsOnMap.length > 0 && (
            <div className="mt-6">
              <InfoSection title="ARCs Found on This Map">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {botsOnMap.map((bot) => (
                    <BotCard key={bot.id} bot={bot} />
                  ))}
                </div>
              </InfoSection>
            </div>
          )}
        </div>
      </div>
    </DetailPageContainer>
  );
}
