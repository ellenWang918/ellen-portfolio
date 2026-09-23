import { ExperienceSection } from "@/components/experience-section";
import { HangingLamp } from "@/components/hanging-lamp";
import { IntroSection } from "@/components/intro-section";
import { intro } from "@/content/home";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <main id="main-content">
      <HangingLamp />
      <IntroSection {...intro} />
      <Suspense fallback={<section aria-label="Experience" className="experience-section" />}>
        <ExperienceSection projects={projects} />
      </Suspense>
    </main>
  );
}
import { Suspense } from "react";
