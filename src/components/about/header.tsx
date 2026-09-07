export type AboutHeaderProps = { title: string; description: string };

export function AboutHeader({ title, description }: AboutHeaderProps) {
  return <header className="about-header" data-section="header"><h1>{title}</h1><p>{description}</p></header>;
}
