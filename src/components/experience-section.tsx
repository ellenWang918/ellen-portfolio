import { FolderCard, type FolderCardProps } from "@/components/folder-card";

export type ExperienceItem = FolderCardProps & { id: string };

type ExperienceSectionProps = {
  items: readonly ExperienceItem[];
};

export function ExperienceSection({ items }: ExperienceSectionProps) {
  return (
    <section
      aria-labelledby="experience-heading"
      className="experience-section mx-auto flex w-[calc(100%_-_2_*_var(--space-gutter))] max-w-content flex-col items-start text-left"
    >
      <h2 id="experience-heading">Experience</h2>
      <ul className="folder-card-grid">
        {items.map(({ id, ...folder }) => (
          <li key={id}>
            <FolderCard {...folder} />
          </li>
        ))}
      </ul>
    </section>
  );
}
