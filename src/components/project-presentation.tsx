import Image from "next/image";
import type { Project } from "@/content/projects";
import { Tag } from "@/components/tag";

export function ProjectHero({ project }: { project: Project }) {
  return project.hero ? <Image className="experience-modal__hero" src={project.hero.src} alt={project.hero.alt} width={960} height={238} priority /> : null;
}

export function ProjectTags({ project }: { project: Project }) {
  return project.tags.length ? <ul className="experience-modal__tags" aria-label="Project tags">{project.tags.map((tag) => <li key={tag}><Tag>{tag}</Tag></li>)}</ul> : null;
}

export function ProjectStory({ project }: { project: Project }) {
  const { story } = project;
  return <section className="experience-modal__story">
    <h3>{story.header}</h3>
    <p>{story.content}</p>
    {story.subheader && story.subcontent ? <><h4>{story.subheader}</h4><p>{story.subcontent}</p></> : null}
    {story.subheader2 && story.subcontent2 ? <><h4>{story.subheader2}</h4><p>{story.subcontent2}</p></> : null}
  </section>;
}
