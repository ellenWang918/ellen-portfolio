import type { ExperienceItem } from "@/components/experience-section";
import type { SocialLink } from "@/components/social-links";

// Content transcribed from Figma frame 307:576.
export const intro = {
  heading: "Hi, I’m Ellen Wang,",
  description:
    "A multidisciplinary designer with over two years of industry experience. I work with cross-functional teams to make sense of complex problems and turn ideas into thoughtful, practical solutions.",
  location: "Gold Coast, Australia",
};

export const experiences = [
  { id: "design-system", title: "Design System" },
  { id: "feature-improvement", title: "Feature Improvement" },
  { id: "business-process-improvement", title: "Business Process Improvement" },
  { id: "rapid-discovery", title: "Rapid discovery" },
  { id: "customer-data-analysis", title: "Customer data analysis" },
] satisfies ExperienceItem[];

export const socialLinks = [
  { label: "LinkedIn", iconSrc: "/LinkedIn.svg", href: "https://www.linkedin.com/in/zi-wang-456923171/" },
  { label: "GitHub", iconSrc: "/GitHub.svg", href: "https://github.com/ellenWang918" },
  { label: "Email", iconSrc: "/email.svg", href: "mailto:ellenwang918@gmail.com" },
] satisfies SocialLink[];
