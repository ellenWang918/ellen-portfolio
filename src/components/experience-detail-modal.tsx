"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import type { Project } from "@/content/projects";
import { MetadataSection } from "@/components/experience/metadata-section";
import { DesktopWindow } from "@/components/desktop-window";

function HeroSection({ project, titleId }: { project: Project; titleId: string }) {
  return <header className="experience-modal__hero-section">
    {project.hero ? <Image className="experience-modal__hero" src={project.hero.src} alt={project.hero.alt} width={960} height={238} /> : null}
    {project.tags?.length ? <ul className="experience-modal__tags" aria-label="Project tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
    <h2 id={titleId}>{project.title}</h2>
  </header>;
}

function StorySection({ project }: { project: Project }) {
  const { story } = project;
  return <section><h3>{story.header}</h3><p>{story.content}</p></section>;
}

function ConfidentialNotice() {
  return <p className="experience-modal__confidential">Some project details are confidential.</p>;
}

export function ExperienceDetailModal({ project, projects = [], onProjectSelect, onClose, returnFocusRef }: { project: Project | null; projects?: readonly Project[]; onProjectSelect: (id: string) => void; onClose: () => void; returnFocusRef: React.RefObject<HTMLElement | null> }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const isOpen = project !== null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const trigger = returnFocusRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus();
    };
  }, [isOpen, returnFocusRef]);
  if (!project) return null;
  const sidebar = <nav aria-label="Experience projects"><p>Projects</p><ul>{projects.map((item) => <li key={item.id}><button type="button" aria-current={item.id === project.id ? "page" : undefined} onClick={() => onProjectSelect(item.id)}>{item.title}</button></li>)}</ul></nav>;
  return (
    <dialog
      ref={dialogRef}
      className="experience-modal"
      aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
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
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <DesktopWindow title="~ellenwang/experience" sidebar={sidebar}>
        <button ref={closeRef} className="experience-modal__close" type="button" onClick={onClose} aria-label="Close project details">×</button>
        <HeroSection project={project} titleId={titleId} />
        <MetadataSection items={project.metadata} />
        <StorySection project={project} />
        {project.confidential ? <ConfidentialNotice /> : null}
      </DesktopWindow>
    </dialog>
  );
}
