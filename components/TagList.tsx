import Link from "next/link";

interface Tag {
  id: string;
  label: string;
  href?: string;
}

interface TagListProps {
  tags: Tag[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) =>
        tag.href ? (
          <Link
            key={tag.id}
            href={tag.href}
            className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded text-sm text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600"
          >
            {tag.label}
          </Link>
        ) : (
          <span
            key={tag.id}
            className="px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded text-sm text-zinc-700 dark:text-zinc-300"
          >
            {tag.label}
          </span>
        )
      )}
    </div>
  );
}
