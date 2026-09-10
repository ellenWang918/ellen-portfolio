import { FolderCard } from "@/components/folder-card";

export function SideProjectSection() {
  return (
    <section aria-labelledby="side-project-heading" className="experience-section side-project-section mx-auto flex w-[calc(100%_-_2_*_var(--space-gutter))] max-w-content flex-col items-start text-left">
      <h2 id="side-project-heading">Side Project</h2>
      <ul className="folder-card-grid">
        <li>
          <FolderCard title="coming soon" />
        </li>
      </ul>
    </section>
  );
}
