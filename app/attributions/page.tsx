import { DetailPageContainer } from "@/components/DetailPageContainer";
import { BackLink } from "@/components/BackLink";
import Link from "next/link";

export const metadata = {
  title: "Attributions - ARCDb",
};

export default function AttributionsPage() {
  return (
    <DetailPageContainer>
      <BackLink href="/" label="Back to Home" />

      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Attributions
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Data Sources
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                The game data and images used in this database are sourced from
                the following repositories:
              </p>

              <div className="space-y-4">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-zinc-50">
                    RaidTheory/arcraiders-data
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Primary data source for ARC Raiders game information
                  </p>
                  <Link
                    href="https://github.com/RaidTheory/arcraiders-data"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    https://github.com/RaidTheory/arcraiders-data
                  </Link>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-zinc-50">
                    SirOMGitsYOU/arcraiders-data
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    Additional data and image contributions (patch-4 branch)
                  </p>
                  <Link
                    href="https://github.com/SirOMGitsYOU/arcraiders-data/tree/patch-4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    https://github.com/SirOMGitsYOU/arcraiders-data/tree/patch-4
                  </Link>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Content Attribution
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  All game data, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 mb-4">
                  <li>Bot information, statistics, and images</li>
                  <li>Item data, recipes, and images</li>
                  <li>Quest objectives and rewards</li>
                  <li>Workstation upgrade requirements</li>
                  <li>Map information and previews</li>
                </ul>
                <p className="text-zinc-700 dark:text-zinc-300">
                  This content is sourced from the repositories listed above and
                  is provided for informational and educational purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Game Copyright
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300">
                ARC Raiders is a trademark and property of Embark Studios AB.
                All game content, assets, and intellectual property rights
                belong to their respective owners. This database is an
                unofficial fan-made project and is not affiliated with or
                endorsed by Embark Studios AB.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
                Website
              </h2>
              <p className="text-zinc-700 dark:text-zinc-300">
                This database website was built using Next.js, React, and
                Tailwind CSS. The source code and component architecture were
                developed independently for this project.
              </p>
            </section>
          </div>
        </div>
      </div>
    </DetailPageContainer>
  );
}
