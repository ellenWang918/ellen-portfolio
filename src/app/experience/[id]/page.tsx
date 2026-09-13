import Link from "next/link";
import { notFound } from "next/navigation";
import { DesktopWindow } from "@/components/desktop-window";
import { MetadataSection } from "@/components/experience/metadata-section";
import { projects } from "@/content/projects";
import { ConfidentialNotice } from "@/components/confidential-notice";
import { ProjectHero, ProjectStory, ProjectTags } from "@/components/project-presentation";

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
          <ProjectHero project={project} />
          <ProjectTags project={project} />
          <h1 id="project-title">{project.title}</h1>
          <MetadataSection items={project.metadata} />
          <ProjectStory project={project} />
          {project.confidential ? <ConfidentialNotice /> : null}
        </article>
      </DesktopWindow>
    </main>
  );
}
