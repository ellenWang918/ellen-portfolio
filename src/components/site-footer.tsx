import { SocialLinks } from "@/components/social-links";
import { socialLinks } from "@/content/home";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <SocialLinks links={socialLinks} />
    </footer>
  );
}
