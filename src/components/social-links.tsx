import Image from "next/image";

export type SocialLink = {
  label: string;
  iconSrc: string;
  href?: string;
};

type SocialLinksProps = {
  links: readonly SocialLink[];
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <nav className="social-links" aria-label="Social and contact links">
      <ul className="social-links__list">
        {links.map(({ label, iconSrc, href }) => (
          <li key={label}>
            {href ? (
              <a
                className="social-links__link"
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Image className="social-links__icon" src={iconSrc} alt="" aria-hidden="true" width={25} height={25} />
              </a>
            ) : (
              <span className="social-links__link" role="img" aria-label={label}>
                <Image className="social-links__icon" src={iconSrc} alt="" aria-hidden="true" width={25} height={25} />
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
