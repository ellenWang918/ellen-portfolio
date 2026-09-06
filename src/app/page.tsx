import { ExperienceSection } from "@/components/experience-section";
import { HangingLamp } from "@/components/hanging-lamp";
import { IntroSection } from "@/components/intro-section";
import { experiences, intro } from "@/content/home";

export default function Home() {
  return (
    <main id="main-content">
      <HangingLamp />
      <IntroSection {...intro} />
      <ExperienceSection items={experiences} />
    </main>
  );
}
