export type FooterDrawingProps = { src: string; alt?: string };

export function FooterDrawing({ src, alt = "" }: FooterDrawingProps) {
  return <footer className="footer-drawing" data-section="footer-drawing"><img src={src} alt={alt} /></footer>;
}
