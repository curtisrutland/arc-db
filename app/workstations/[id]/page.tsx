import { getWorkstationById } from "@/lib/dataset";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { DetailPageContainer } from "@/components/DetailPageContainer";
import { LevelBadge } from "@/components/Badge";
import { ItemLink } from "@/components/Links";

interface WorkstationPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkstationPage({ params }: WorkstationPageProps) {
  const { id } = await params;
  const station = getWorkstationById(id);

  if (!station) {
    notFound();
  }

  return (
    <DetailPageContainer>
      <Breadcrumb items={[{ label: "Workstations", href: "/workstations" }, { label: station.name.en }]} />

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">{station.name.en}</h1>
            <LevelBadge level={station.maxLevel} />
          </div>

          <div className="space-y-6">
            {station.levels.map((level) => (
              <div
                key={level.level}
                className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
              >
                <h3 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-50">Level {level.level}</h3>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-3">Requirements:</p>
                  <div className="space-y-2">
                    {level.requirementItemIds.map((req) => (
                      <div
                        key={req.itemId}
                        className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700"
                      >
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {/* {req.itemId.replace(/_/g, " ")} */}
                          <ItemLink itemId={req.itemId} />
                        </span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-50">× {req.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DetailPageContainer>
  );
}
