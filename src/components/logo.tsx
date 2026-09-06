import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Ellen Wang — home">
      <Image src="/logo_in_circle.svg" alt="Ellen Wang" width={33} height={33} priority />
    </Link>
  );
}
