import Link from "next/link";
import Image from "next/image";

export type FolderCardProps = {
  title: string;
  href?: string;
  ariaLabel?: string;
};

export function FolderCard({ title, href, ariaLabel }: FolderCardProps) {
  const content = (
    <>
      <span className="folder-card__art" aria-hidden="true">
        <Image className="folder-card__image" src="/folderCard.svg" alt="" aria-hidden="true" width={108} height={85} />
        <span className="folder-card__tab" />
      </span>
      <span className="folder-card__title">{title}</span>
    </>
  );

  return href ? (
    <Link className="font-portfolio folder-card" href={href} aria-label={ariaLabel ?? title}>
      {content}
    </Link>
  ) : (
    <button className="font-portfolio folder-card" type="button" aria-label={ariaLabel ?? title}>
      {content}
    </button>
  );
}
