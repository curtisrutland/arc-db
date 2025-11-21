import { getWorkstations } from "@/lib/dataset";
import { WorkstationCard } from "@/components/WorkstationCard";

export default function WorkstationsPage() {
  const workstations = getWorkstations();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Workstations
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workstations.map((station) => (
            <WorkstationCard key={station.id} workstation={station} />
          ))}
        </div>
      </div>
    </div>
  );
}
