import Image from "next/image";

export type FooterDrawingProps = { src: string; alt?: string };

export function FooterDrawing({ src, alt = "" }: FooterDrawingProps) {
  return <footer className="footer-drawing" data-section="footer-drawing"><Image src={src} alt={alt} width={1129} height={279} /></footer>;
}
