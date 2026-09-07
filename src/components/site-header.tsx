"use client";

import { Logo } from "@/components/logo";
import { usePathname, useRouter } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="site-header">
      {pathname === "/about" ? (
        <button className="site-header__back" type="button" onClick={() => router.push("/")} aria-label="Back to homepage">
          <span aria-hidden="true">←</span> Back
        </button>
      ) : <Logo />}
    </header>
  );
}
