import Link from "next/link";
import { HeaderSearch } from "@/components/HeaderSearch";
import { MobileMenu } from "@/components/MobileMenu";
import { getItems, getBots, getQuests, getWorkstations } from "@/lib/dataset";

export function Header() {
  const navLinks = [
    { href: "/items", label: "Items" },
    { href: "/bots", label: "ARCs" },
    { href: "/quests", label: "Quests" },
    { href: "/workstations", label: "Workstations" },
    { href: "/maps", label: "Maps" },
  ];

  const items = getItems();
  const bots = getBots();
  const quests = getQuests();
  const workstations = getWorkstations();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors whitespace-nowrap"
          >
            ARCDb
          </Link>

          <div className="flex-1 max-w-xl">
            <HeaderSearch
              items={items}
              bots={bots}
              quests={quests}
              workstations={workstations}
            />
          </div>

          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
