import type { ReactNode } from "react";

export type DesktopWindowProps = { title: string; sidebar: ReactNode; children: ReactNode; onClose?: () => void };

export function DesktopWindow({ title, sidebar, children, onClose }: DesktopWindowProps) {
  return <section className="desktop-window">
    <header className="desktop-window__titlebar"><h2>{title}</h2><div className="desktop-window__controls"><button type="button" tabIndex={-1} aria-label="Close window" onClick={onClose} /><span aria-hidden="true" /><span aria-hidden="true" /></div></header>
    <div className="desktop-window__body"><aside id="experience-project-menu" className="desktop-window__sidebar">{sidebar}</aside><div className="desktop-window__content">{children}</div></div>
  </section>;
}
