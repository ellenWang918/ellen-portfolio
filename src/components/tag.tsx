import type { ReactNode } from "react";

export type TagProps = { children: ReactNode };

export function Tag({ children }: TagProps) {
  return <span className="tag">{children}</span>;
}
