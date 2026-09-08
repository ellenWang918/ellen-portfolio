import type { ReactNode } from "react";

export type DesktopWindowProps = { title: string; sidebar: ReactNode; children: ReactNode };

export function DesktopWindow({ title, sidebar, children }: DesktopWindowProps) {
  return <section className="desktop-window">
    <header className="desktop-window__titlebar"><h2>{title}</h2><div className="desktop-window__controls" aria-hidden="true"><span /><span /><span /></div></header>
    <div className="desktop-window__body"><aside className="desktop-window__sidebar">{sidebar}</aside><div className="desktop-window__content">{children}</div></div>
  </section>;
}
