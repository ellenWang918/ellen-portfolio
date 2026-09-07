import type { AboutFact } from "@/components/about/facts";

export const aboutHeader = { title: "Hey, you found my secret space!", description: "I enjoy bringing joy to people, mostly by my awesome drawing." };
export const aboutFacts = [
  { id: "cats", text: "I'm a crazy cat lover, but I don't have one (yet!)", artworkSrc: "/cat-drawing.svg" },
  { id: "coffee", text: "I make great coffee drinks", artworkSrc: "/drink drawing.svg" },
  { id: "mahjong", text: "Mahjong is my life; it's how I practice bringing clarity from chaos", artworkSrc: "/yitong-drawing.svg" },
] satisfies readonly AboutFact[];

export const aboutDrawing = { src: "/mahjong_illustration.svg", alt: "Illustration of a mahjong game" };
