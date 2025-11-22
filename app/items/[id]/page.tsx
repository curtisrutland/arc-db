import {
  getItemById,
  getWorkstationsUpgradedByItemId,
  getQuestsThatRequireItemId,
  getArcsThatDropItem,
  getItemsCraftedWithItem,
} from "@/lib/dataset";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DetailPageContainer } from "@/components/DetailPageContainer";
import { RarityBadge } from "@/components/Badge";
import { InfoSection } from "@/components/InfoSection";
import { InfoGrid, InfoItem } from "@/components/InfoGrid";
import { BotLink, ItemLink, QuestLink, WorkstationLink } from "@/components/Links";
import { ItemImage } from "@/components/Images/ItemImage";
import { Coin } from "./Coin";

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = getItemById(id);
  const workstationUpgradeIds = getWorkstationsUpgradedByItemId(id);
  const questIds = getQuestsThatRequireItemId(id);
  const dropsFrom = getArcsThatDropItem(id);
  const craftedWith = getItemsCraftedWithItem(id);

  if (!item) {
    notFound();
  }

  return (
    <DetailPageContainer>
      <Breadcrumb items={[{ label: "Items", href: "/items" }, { label: item.name.en }]} />

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="grid xl:grid-cols-2 gap-8 p-8">
          <ItemImage
            item={item}
            size="lg"
            padding="p-8"
            className="aspect-square relative bg-zinc-100 dark:bg-zinc-800 rounded-lg"
          />

          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{item.name.en}</h1>
              <RarityBadge rarity={item.rarity} />
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 mb-6">{item.description.en}</p>

            <InfoGrid>
              <InfoItem label="Type" value={item.type} />
              <InfoItem
                label="Value"
                value={
                  <span className="flex items-center gap-1">
                    <Coin />
                    {item.value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </span>
                }
              />
              <InfoItem label="Weight" value={`${item.weightKg} kg`} />
              <InfoItem label="Stack Size" value={item.stackSize} />
            </InfoGrid>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {item.recipe && (
                <InfoSection title="Recipe">
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {Object.entries(item.recipe).map(([itemId, quantity]) => (
                      <li key={itemId}>
                        {/* {itemId.replace(/_/g, " ")}: {quantity} */}
                        <ItemLink itemId={itemId} />: {quantity}
                      </li>
                    ))}
                  </ul>
                  {item.craftBench && (
                    <div className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                      {typeof item.craftBench === "string" ? (
                        <>
                          Crafted at: <WorkstationLink workstationId={item.craftBench} />
                        </>
                      ) : (
                        <>
                          Crafted at:
                          <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                            {item.craftBench.map((wsid) => (
                              <li key={wsid}>
                                <WorkstationLink workstationId={wsid} />
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  )}
                </InfoSection>
              )}

              {item.effects && (
                <InfoSection title="Effects">
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {Object.entries(item.effects).map(([key, effect]) => (
                      <li key={key}>
                        {effect.en}: {effect.value}
                      </li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {(craftedWith ?? []).length > 0 && (
                <InfoSection title="Ingredients For" variant="success">
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {craftedWith?.map((iid) => (
                      <li key={iid}>
                        <ItemLink itemId={iid} />
                      </li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {(workstationUpgradeIds ?? []).length > 0 && (
                <InfoSection title="Workstations Upgraded By Item" variant="warning">
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {workstationUpgradeIds?.map((wsid) => (
                      <li key={wsid}>
                        <WorkstationLink workstationId={wsid} />
                      </li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {(questIds ?? []).length > 0 && (
                <InfoSection title="Quests that Require this Item" variant="warning">
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {questIds?.map((questId) => (
                      <li key={questId}>
                        <QuestLink questId={questId} />
                      </li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              {(dropsFrom ?? []).length > 0 && (
                <InfoSection title="Drops from ARCs" variant="info">
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {dropsFrom?.map((arcId) => (
                      <li key={arcId}>
                        <BotLink botId={arcId} />
                      </li>
                    ))}
                  </ul>
                </InfoSection>
              )}

              <InfoSection title="Recycles Into">
                <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {Object.entries(item.recyclesInto ?? {}).map(([resource, quantity]) => (
                    <li key={resource}>
                      <ItemLink itemId={resource} />: {quantity}
                    </li>
                  ))}
                </ul>
              </InfoSection>
            </div>

            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-6">Last updated: {item.updatedAt}</p>
          </div>
        </div>
      </div>
    </DetailPageContainer>
  );
}
