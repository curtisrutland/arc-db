import { getItemById } from "@/lib/dataset";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DetailPageContainer } from "@/components/DetailPageContainer";
import { RarityBadge } from "@/components/Badge";
import { InfoSection } from "@/components/InfoSection";
import { InfoGrid, InfoItem } from "@/components/InfoGrid";

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { id } = await params;
  const item = getItemById(id);

  if (!item) {
    notFound();
  }

  return (
    <DetailPageContainer>
      <Breadcrumb
        items={[{ label: "Items", href: "/items" }, { label: item.name.en }]}
      />

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          <div className="aspect-square relative bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <Image
              src={`/images/${item.image}`}
              alt={item.name.en}
              fill
              className="object-contain p-8"
            />
          </div>

          <div>
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
                {item.name.en}
              </h1>
              <RarityBadge rarity={item.rarity} />
            </div>

            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {item.description.en}
            </p>

            <div className="space-y-4">
              <InfoGrid>
                <InfoItem label="Type" value={item.type} />
                <InfoItem label="Value" value={item.value} />
                <InfoItem label="Weight" value={`${item.weightKg} kg`} />
                <InfoItem label="Stack Size" value={item.stackSize} />
              </InfoGrid>

              {item.recipe && (
                <div className="mt-6">
                  <InfoSection title="Recipe">
                    <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {Object.entries(item.recipe).map(([itemId, quantity]) => (
                        <li key={itemId}>
                          {itemId.replace(/_/g, " ")}: {quantity}
                        </li>
                      ))}
                    </ul>
                    {item.craftBench && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
                        Crafted at: {item.craftBench.replace(/_/g, " ")}
                      </p>
                    )}
                  </InfoSection>
                </div>
              )}

              {item.effects && (
                <div className="mt-6">
                  <InfoSection title="Effects">
                    <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {Object.entries(item.effects).map(([key, effect]) => (
                        <li key={key}>
                          {effect.en}: {effect.value}
                        </li>
                      ))}
                    </ul>
                  </InfoSection>
                </div>
              )}

              <div className="mt-6">
                <InfoSection title="Recycles Into">
                  <ul className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {Object.entries(item.recyclesInto ?? {}).map(
                      ([resource, quantity]) => (
                        <li key={resource}>
                          {resource.replace(/_/g, " ")}: {quantity}
                        </li>
                      )
                    )}
                  </ul>
                </InfoSection>
              </div>
            </div>

            <p className="text-xs text-zinc-400 dark:text-zinc-600 mt-6">
              Last updated: {item.updatedAt}
            </p>
          </div>
        </div>
      </div>
    </DetailPageContainer>
  );
}
