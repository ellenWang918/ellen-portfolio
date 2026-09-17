import Image from "next/image";
import type { Project } from "@/content/projects";
import { Tag } from "@/components/tag";

export function ProjectHero({ project }: { project: Project }) {
  return project.hero ? <Image className="experience-modal__hero" src={project.hero.src} alt={project.hero.alt} width={960} height={238} priority /> : null;
}

export function ProjectTags({ project }: { project: Project }) {
  return project.tags.length ? <ul className="experience-modal__tags" aria-label="Project tags">{project.tags.map((tag) => <li key={tag}><Tag>{tag}</Tag></li>)}</ul> : null;
}

function StoryText({ text }: { text: string }) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith("**") ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
  );
}

export function ProjectStory({ project }: { project: Project }) {
  return <div className="experience-modal__story">
    {project.story.map(({ header, content }) => <section key={header}>
      <h3>{header}</h3>
      {content.split(/\n\s*\n/).map((block, index) => {
        const ordered = /^\d+\. /.test(block);
        if (ordered || block.startsWith("- ")) {
          const List = ordered ? "ol" : "ul";
          return <List key={index}>{block.split("\n").map((item, itemIndex) =>
            <li key={itemIndex}><StoryText text={item.replace(/^(?:- |\d+\. )/, "")} /></li>,
          )}</List>;
        }
        return <p key={index}><StoryText text={block} /></p>;
      })}
    </section>)}
  </div>;
}
