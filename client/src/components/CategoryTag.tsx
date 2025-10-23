type Props = { cat: string; className?: string };

export function CategoryTag({ cat, className }: Props) {
  return (
    <span data-cat={cat} className={`tag inline-flex items-center rounded px-2 py-1 text-xs text-neutral-text ${className ?? ''}`}>
      {cat}
    </span>
  );
}
