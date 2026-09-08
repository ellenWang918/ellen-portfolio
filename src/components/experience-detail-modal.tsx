"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { MetadataSection } from "@/components/experience/metadata-section";
import { DesktopWindow } from "@/components/desktop-window";
import { Tag } from "@/components/tag";
import { ConfidentialNotice } from "@/components/confidential-notice";
import { SidebarItem } from "@/components/sidebar-item";

function ProjectHeader({ project, titleId }: { project: Project; titleId: string }) {
  return <header className="experience-modal__hero-section">
    {project.tags?.length ? <ul className="experience-modal__tags" aria-label="Project tags">{project.tags.map((tag) => <li key={tag}><Tag>{tag}</Tag></li>)}</ul> : null}
    <h2 id={titleId}>{project.title}</h2>
    <p className="experience-modal__summary">{project.summary}</p>
  </header>;
}

function ProjectHero({ project }: { project: Project }) {
  return project.hero ? <Image className="experience-modal__hero" src={project.hero.src} alt={project.hero.alt} width={960} height={238} /> : null;
}

function StorySection({ project }: { project: Project }) {
  const { story } = project;
  return <section className="experience-modal__story"><h3>{story.header}</h3><p>{story.content}</p></section>;
}

export function ExperienceDetailModal({ project, projects = [], onProjectSelect, onClose, returnFocusRef }: { project: Project | null; projects?: readonly Project[]; onProjectSelect: (id: string) => void; onClose: () => void; returnFocusRef: React.RefObject<HTMLElement | null> }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousOverflowRef = useRef("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const titleId = useId();
  const isOpen = project !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const trigger = returnFocusRef.current;
    const previousOverflow = document.body.style.overflow;
    previousOverflowRef.current = previousOverflow;
    dialog.showModal();
    const initialFocusTarget = Array.from(dialog.querySelectorAll<HTMLElement>("button, a[href]"))
      .find((element) => element.getClientRects().length > 0);
    initialFocusTarget?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflowRef.current || "auto";
      if (trigger?.isConnected) trigger.focus();
    };
  }, [isOpen, returnFocusRef]);
  useEffect(() => {
    if (!isOpen) document.body.style.overflow = "auto";
  }, [isOpen]);
  if (!project) return null;
  const closeModal = () => {
    document.body.style.overflow = previousOverflowRef.current || "auto";
    window.setTimeout(() => { document.body.style.overflow = previousOverflowRef.current || "auto"; }, 0);
    onClose();
  };
  const sidebarIcons: Record<string, string> = {
    "design-system-palms": "/projects/design-system-icon.svg",
    "rapid-discovery-ism": "/projects/rapid-discovery-icon.svg",
    "feature-improvement-sps": "/projects/feature-improvement-icon.svg",
    "customer-data-analysis-commercial": "/projects/customer-data-analysis-icon.svg",
    "business-process-improvement-plm": "/projects/service-design-icon.svg",
  };
  const sidebar = <nav className="experience-modal__project-nav" aria-label="Experience projects"><p>Projects</p><ul>{projects.map((item) => <li key={item.id}><SidebarItem type="button" icon={sidebarIcons[item.id] ? <Image src={sidebarIcons[item.id]} alt="" width={20} height={20} /> : undefined} aria-current={item.id === project.id ? "page" : undefined} onClick={() => { setIsMenuOpen(false); onProjectSelect(item.id); }}>{item.folderTitle}</SidebarItem></li>)}</ul></nav>;
  return (
    <dialog
      ref={dialogRef}
      className="experience-modal"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); closeModal(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        // Wrap at the boundaries instead of letting Tab move to browser chrome.
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]',
        )).filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => { if (event.target === event.currentTarget) closeModal(); }}
    >
      <DesktopWindow title="~ellenwang/experience" sidebar={sidebar}>
        <div className="experience-modal__content">
          <ProjectHero project={project} />
          <div className="experience-modal__details">
            <ProjectHeader project={project} titleId={titleId} />
            <MetadataSection items={project.metadata} />
            <StorySection project={project} />
            {project.confidential ? <ConfidentialNotice /> : null}
          </div>
        </div>
        <button className="experience-modal__menu-toggle" type="button" aria-label={project.title} aria-expanded={isMenuOpen} aria-controls="experience-project-menu" onClick={() => setIsMenuOpen((open) => !open)}>
          {isMenuOpen ? "Close projects" : project.title}
        </button>
      </DesktopWindow>
    </dialog>
  );
}
