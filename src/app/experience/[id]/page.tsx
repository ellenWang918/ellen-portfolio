import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DesktopWindow } from "@/components/desktop-window";
import { MetadataSection } from "@/components/experience/metadata-section";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map(({ id }) => ({ id }));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();

  return (
    <main id="main-content" className="experience-page">
      <DesktopWindow title={project.title} sidebar={<Link href="/">← Back to experience</Link>}>
        <article aria-labelledby="project-title">
          {project.hero ? <Image className="experience-modal__hero" src={project.hero.src} alt={project.hero.alt} width={960} height={238} priority /> : null}
          {project.tags?.length ? <ul className="experience-modal__tags" aria-label="Project tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
          <h1 id="project-title">{project.title}</h1>
          <MetadataSection items={project.metadata} />
          <section><h2>{project.story.header}</h2><p>{project.story.content}</p></section>
          {project.confidential ? <p className="experience-modal__confidential">Some project details are confidential.</p> : null}
        </article>
      </DesktopWindow>
    </main>
  );
}
