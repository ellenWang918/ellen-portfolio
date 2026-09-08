"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FolderCard } from "@/components/folder-card";
import { ExperienceDetailModal } from "@/components/experience-detail-modal";
import type { Project } from "@/content/projects";

type ExperienceSectionProps = {
  projects: readonly Project[];
};

export function ExperienceSection({ projects }: ExperienceSectionProps) {
  const activeRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("project");
  const selected = selectedId ? projects.find((project) => project.id === selectedId) ?? null : null;
  useEffect(() => {
    if (!selectedId) {
      document.body.style.overflow = "auto";
      activeRef.current?.focus();
    }
  }, [selectedId]);
  const setSelectedId = (id: string | null) => {
    if (!id) {
      activeRef.current?.focus();
    }
    const next = id ? `/?project=${encodeURIComponent(id)}` : "/";
    router.replace(next, { scroll: false });
  };
  return (
    <section
      aria-labelledby="experience-heading"
      className="experience-section mx-auto flex w-[calc(100%_-_2_*_var(--space-gutter))] max-w-content flex-col items-start text-left"
    >
      <h2 id="experience-heading">Experience</h2>
      <ul className="folder-card-grid">
        {projects.map(({ id, folderTitle }) => (
          <li key={id}>
            <FolderCard title={folderTitle} isActive={selectedId === id} onSelect={() => { activeRef.current = document.activeElement as HTMLElement; setSelectedId(id); }} />
          </li>
        ))}
      </ul>
      <ExperienceDetailModal project={pathname === "/" ? selected : null} projects={projects} onProjectSelect={setSelectedId} onClose={() => setSelectedId(null)} returnFocusRef={activeRef} />
    </section>
  );
}
