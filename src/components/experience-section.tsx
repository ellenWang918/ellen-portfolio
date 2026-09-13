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
    if (selectedId) return;

    document.body.style.overflow = "auto";
    const frame = window.requestAnimationFrame(() => activeRef.current?.focus());

    return () => window.cancelAnimationFrame(frame);
  }, [selectedId]);

  const setSelectedId = (id: string | null) => {
    router.replace(id ? `/?project=${encodeURIComponent(id)}` : "/", { scroll: false });
  };

  return (
    <section aria-labelledby="experience-heading" className="experience-section mx-auto flex w-[calc(100%_-_2_*_var(--space-gutter))] max-w-content flex-col items-start text-left">
      <h2 id="experience-heading">Experience</h2>
      <ul className="folder-card-grid">
        {projects.map(({ id, folderTitle, folderArtwork }) => (
          <li key={id}>
            <FolderCard
              title={folderTitle}
              cursorLabel="↗ View"
              artworkSrc={folderArtwork?.src}
              artworkAlt={folderArtwork?.alt}
              isActive={selectedId === id}
              onSelect={(event) => {
                activeRef.current = event.currentTarget;
                setSelectedId(id);
              }}
            />
          </li>
        ))}
      </ul>
      <ExperienceDetailModal project={pathname === "/" ? selected : null} projects={projects} onProjectSelect={setSelectedId} onClose={() => setSelectedId(null)} returnFocusRef={activeRef} />
    </section>
  );
}
