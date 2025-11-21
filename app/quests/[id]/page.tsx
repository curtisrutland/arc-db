import { getQuestById } from "@/lib/dataset";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DetailPageContainer } from "@/components/DetailPageContainer";
import { XPBadge } from "@/components/Badge";
import { InfoSection } from "@/components/InfoSection";
import { TagList } from "@/components/TagList";
import { ItemLink } from "@/components/Links";

interface QuestPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuestPage({ params }: QuestPageProps) {
  const { id } = await params;
  const quest = getQuestById(id);

  if (!quest) {
    notFound();
  }

  return (
    <DetailPageContainer>
      <Breadcrumb items={[{ label: "Quests", href: "/quests" }, { label: quest.name.en }]} />

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">{quest.name.en}</h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">Trader: {quest.trader}</p>
            </div>
            {quest.xp > 0 && <XPBadge xp={quest.xp} />}
          </div>

          <div className="space-y-6">
            <InfoSection title="Objectives">
              <ul className="space-y-2">
                {quest.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3 text-zinc-700 dark:text-zinc-300">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {index + 1}
                    </span>
                    <span>{objective.en}</span>
                  </li>
                ))}
              </ul>
            </InfoSection>

            {quest.requiredItemIds && quest.requiredItemIds.length > 0 && (
              <InfoSection title="Required Items" variant="warning">
                <div className="space-y-2">
                  {quest.requiredItemIds.map((requiredItem) => (
                    <div
                      key={requiredItem.itemId}
                      className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded border border-amber-200 dark:border-amber-800"
                    >
                      <span className="text-zinc-700 dark:text-zinc-300">
                        <ItemLink itemId={requiredItem.itemId} />
                      </span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">× {requiredItem.quantity}</span>
                    </div>
                  ))}
                </div>
              </InfoSection>
            )}

            {quest.rewardItemIds.length > 0 && (
              <InfoSection title="Rewards" variant="success">
                <div className="space-y-2">
                  {quest.rewardItemIds.map((reward) => (
                    <div
                      key={reward.itemId}
                      className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded border border-green-200 dark:border-green-800"
                    >
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {/* {reward.itemId.replace(/_/g, " ")} */}
                        <ItemLink itemId={reward.itemId} />
                      </span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">× {reward.quantity}</span>
                    </div>
                  ))}
                </div>
              </InfoSection>
            )}

            {quest.previousQuestIds.length > 0 && (
              <InfoSection title="Requires Completion Of">
                <TagList
                  tags={quest.previousQuestIds.map((prevId) => ({
                    id: prevId,
                    label: getQuestById(prevId)?.name?.en ?? prevId,
                    href: `/quests/${prevId}`,
                  }))}
                />
              </InfoSection>
            )}

            {quest.nextQuestIds.length > 0 && (
              <InfoSection title="Unlocks Quests">
                <TagList
                  tags={quest.nextQuestIds.map((nextId) => ({
                    id: nextId,
                    label: getQuestById(nextId)?.name?.en ?? nextId,
                    href: `/quests/${nextId}`,
                  }))}
                />
              </InfoSection>
            )}

            <p className="text-xs text-zinc-400 dark:text-zinc-600">Last updated: {quest.updatedAt}</p>
          </div>
        </div>
      </div>
    </DetailPageContainer>
  );
}
