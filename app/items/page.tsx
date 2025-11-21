import { getItems } from "@/lib/dataset";
import { Breadcrumb } from "@/components/Breadcrumb";
import { ItemsSearchableList } from "@/components/SearchableLists/ItemsSearchableList";

export const metadata = {
  title: "Items - ARCDb",
};

export default function ItemsPage() {
  const items = getItems();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Items" }]} />
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          Items
        </h1>
        <ItemsSearchableList items={items} />
      </div>
    </div>
  );
}
