import { Facts } from "@/components/about/facts";
import { FooterDrawing } from "@/components/about/footer-drawing";
import { AboutHeader } from "@/components/about/header";
import { aboutDrawing, aboutFacts, aboutHeader } from "@/content/about";

export default function AboutPage() {
  return <main id="main-content" className="about-page" data-page="about"><AboutHeader {...aboutHeader} /><Facts title="Quick facts about me" items={aboutFacts} /><FooterDrawing {...aboutDrawing} /></main>;
}
