import type { ProjectMetadata } from "@/content/projects";

export type MetadataSectionProps = { items: readonly ProjectMetadata[] };

export function MetadataSection({ items }: MetadataSectionProps) {
  return <dl className="experience-modal__metadata">
    {items.map((item) => <div key={`${item.label}-${item.value}`}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}
  </dl>;
}
