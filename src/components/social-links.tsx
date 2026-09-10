export type SocialLink = {
  label: string;
  href?: string;
};

type SocialLinksProps = {
  links: readonly SocialLink[];
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <nav className="social-links" aria-label="Social and contact links">
      <ul className="social-links__list">
        {links.map(({ label, href }) => (
          <li key={label}>
            {href ? (
              <a
                className="social-links__link"
                href={href}
                aria-label={label}
                data-cursor-no-label="true"
                data-cursor-opacity="0.5"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {label}
              </a>
            ) : (
              <span className="social-links__link" role="img" aria-label={label} data-cursor-no-label="true">
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
