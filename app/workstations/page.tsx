import { getWorkstations } from "@/lib/dataset";
import { Breadcrumb } from "@/components/Breadcrumb";
import { WorkstationsSearchableList } from "@/components/SearchableLists/WorkstationsSearchableList";

export const metadata = {
  title: "Workstations - ARCDb",
};

export default function WorkstationsPage() {
  const workstations = getWorkstations();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Workstations" }]} />
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Workstations
        </h1>
        <WorkstationsSearchableList workstations={workstations} />
      </div>
    </div>
  );
}
