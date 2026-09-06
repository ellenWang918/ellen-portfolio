import Image from "next/image";

type IntroSectionProps = {
  heading: string;
  description: string;
  location: string;
};

export function IntroSection({ heading, description, location }: IntroSectionProps) {
  return (
    <section
      aria-labelledby="intro-heading"
      className="font-portfolio mx-auto flex w-[calc(100%_-_2_*_var(--space-gutter))] max-w-content flex-col gap-stack text-left text-body leading-copy font-regular not-italic text-muted [overflow-wrap:anywhere]"
    >
      <h1 id="intro-heading" className="text-heading leading-copy font-regular text-ink">
        {heading}
      </h1>
      <p>{description}</p>
      <div className="flex items-center gap-icon">
        <Image src="/images/location.png" alt="" width={16} height={16} className="size-icon-size shrink-0" />
        <p>{location}</p>
      </div>
    </section>
  );
}
