import Link from "next/link";

export const metadata = {
  title: "ARCDb - ARC Raiders Database",
};

export default function Home() {
  const entities = [
    {
      title: "Items",
      description: "Browse weapons, consumables, resources, and crafting materials",
      href: "/items",
      icon: "🎒",
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700",
    },
    {
      title: "Bots",
      description: "Explore enemy units, their weaknesses, drops, and locations",
      href: "/bots",
      icon: "🤖",
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700",
    },
    {
      title: "Quests",
      description: "View missions, objectives, rewards, and quest chains",
      href: "/quests",
      icon: "📋",
      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700",
    },
    {
      title: "Workstations",
      description: "Check crafting benches and their upgrade requirements",
      href: "/workstations",
      icon: "🔨",
      color: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
              ARC Raiders Database
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Your comprehensive guide to items, bots, quests, and workstations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {entities.map((entity) => (
              <Link
                key={entity.href}
                href={entity.href}
                className={`block p-6 rounded-lg border-2 transition-all hover:shadow-lg ${entity.color}`}
              >
                <div className="text-4xl mb-3">{entity.icon}</div>
                <h2 className="text-2xl font-bold mb-2 text-zinc-900 dark:text-zinc-50">
                  {entity.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                  {entity.description}
                </p>
              </Link>
            ))}
          </div>

          <footer className="text-center pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              <Link
                href="/attributions"
                className="hover:text-zinc-700 dark:hover:text-zinc-300 underline"
              >
                Data Attributions
              </Link>
              {" · "}
              Unofficial fan-made database for ARC Raiders
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
