import { getBotById } from "@/lib/dataset";
import { notFound } from "next/navigation";
import Image from "next/image";
import { BackLink } from "@/components/BackLink";
import { DetailPageContainer } from "@/components/DetailPageContainer";
import { ThreatBadge } from "@/components/Badge";
import { InfoSection } from "@/components/InfoSection";
import { InfoGrid, InfoItem } from "@/components/InfoGrid";
import { TagList } from "@/components/TagList";

interface BotPageProps {
  params: Promise<{ id: string }>;
}

export default async function BotPage({ params }: BotPageProps) {
  const { id } = await params;
  const bot = getBotById(id);

  if (!bot) {
    notFound();
  }

  return (
    <DetailPageContainer>
      <BackLink href="/bots" label="Back to Bots" />

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="aspect-video relative bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={`/images/${bot.image}`}
            alt={bot.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {bot.name}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                {bot.type}
              </p>
            </div>
            <ThreatBadge threat={bot.threat} />
          </div>

          <p className="text-zinc-700 dark:text-zinc-300 mb-6 text-lg">
            {bot.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <InfoSection title="Weakness" variant="warning">
              <p className="text-amber-800 dark:text-amber-300">
                {bot.weakness}
              </p>
            </InfoSection>

            <InfoSection title="XP Rewards">
              <InfoGrid>
                <InfoItem label="Destroy" value={`${bot.destroyXp} XP`} />
                <InfoItem label="Loot" value={`${bot.lootXp} XP`} />
              </InfoGrid>
            </InfoSection>
          </div>

          <div className="mt-6">
            <InfoSection title="Drops">
              <TagList
                tags={bot.drops.map((drop) => ({
                  id: drop,
                  label: drop.replace(/_/g, " "),
                }))}
              />
            </InfoSection>
          </div>

          <div className="mt-6">
            <InfoSection title="Found On Maps">
              <TagList
                tags={bot.maps.map((map) => ({
                  id: map,
                  label: map.replace(/_/g, " "),
                }))}
              />
            </InfoSection>
          </div>
        </div>
      </div>
    </DetailPageContainer>
  );
}
