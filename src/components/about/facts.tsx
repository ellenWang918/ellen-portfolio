import { useId } from "react";

export type AboutFact = { id: string; text: string; artworkSrc?: string; artworkAlt?: string };
export type FactsProps = { title: string; items: readonly AboutFact[] };

export function Facts({ title, items }: FactsProps) {
  const titleId = `facts-title-${useId()}`;
  return <section className="facts" data-section="facts" aria-labelledby={titleId}><div className="facts__title-frame"><h2 id={titleId}><span>{title}</span></h2></div><ul>{items.map((fact) => <li key={fact.id}>{fact.artworkSrc ? <img src={fact.artworkSrc} alt={fact.artworkAlt ?? ""} /> : null}<p>{fact.text}</p></li>)}</ul></section>;
}
