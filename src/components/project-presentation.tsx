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
    {project.story.map(({ header, content }) => <section key={header} className={project.id === "design-system-palms" && header === "The challenge" ? "experience-modal__challenge" : project.id === "design-system-palms" && header === "The problem statement" ? "experience-modal__problem-statement" : header === "What I learned" && (project.id === "design-system-palms" || project.id === "customer-data-analysis-commercial") ? "experience-modal__learning" : undefined}>
      <h3>{header}</h3>
      {project.id === "design-system-palms" && header === "What I learned" && <h4>Don’t panic when the iceberg is bigger than expected</h4>}
      {project.id === "design-system-palms" && header === "Outcome" && <div className="experience-modal__outcome-cards" aria-label="Design system outcomes">
        <article><h4>100%</h4><p>Adoption within the team</p></article>
        <article><h4>0</h4><p>No further misalignment was reported</p></article>
        <article><h4>~30%</h4><p>Improved design efficiency</p></article>
      </div>}
      {content && content.split(/\n\s*\n/).map((block, index) => {
        const ordered = /^\d+\. /.test(block);
        if (ordered || block.startsWith("- ")) {
          const List = ordered ? "ol" : "ul";
          return <List key={index}>{block.split("\n").map((item, itemIndex) =>
            <li key={itemIndex}><StoryText text={item.replace(/^(?:- |\d+\. )/, "")} /></li>,
          )}</List>;
        }
        return <p key={index}><StoryText text={block} /></p>;
      })}
      {project.id === "design-system-palms" && header === "What I learned" && <div className="experience-modal__learning-extra">
        <h4>Do what you believe is right, and trust your team</h4>
        <p>The gap between design and the live product wasn’t unique to our product at Rio Tinto, but we were the first team to address it by embedding design reviews into the development process. Turning that idea into practice took sustained effort from our Scrum Master and Business Analyst, along with the understanding and commitment of stakeholders and the wider team.</p>
      </div>}
      {project.id === "customer-data-analysis-commercial" && header === "What I learned" && <div className="experience-modal__learning-extra">
        <h4>Asynchronous Work Needs a Clear Plan</h4>
        <p>Working across time zones made timely collaboration more challenging. I learned to plan work ahead, document decisions clearly, and include enough context for me to trace back. Without that clarity, even a small unresolved question could block progress while I waited for a response.</p>
      </div>}
      {project.id === "design-system-palms" && header === "The challenge" && <Image className="experience-modal__challenge-image" src="/projects/design-system/3-search.svg" alt="Three different search component patterns found across the product" width={1600} height={900} sizes="(max-width: 767px) 100vw, 50vw" />}
      {project.id === "design-system-palms" && header === "Outcome" && <div className="experience-modal__outcome-gallery">
        <figure>
          <Image src="/projects/design-system/01-style-system 1.png" alt="Design system foundations showing colour, typography and component states" width={1600} height={1000} sizes="(max-width: 767px) 100vw, 50vw" />
          <figcaption>Stylstic Elements</figcaption>
        </figure>
        <figure>
          <Image src="/projects/design-system/02-documentation-mockup 1.png" alt="Design system documentation showing checkbox guidance and usage examples" width={1600} height={1000} sizes="(max-width: 767px) 100vw, 50vw" />
          <figcaption>The Documentation</figcaption>
        </figure>
      </div>}
    </section>)}
  </div>;
}
