"use client";

import type { ReactNode } from "react";
import { useId } from "react";

type TooltipProps = {
  content: string;
  children: ReactNode;
  id?: string;
};

export function Tooltip({ content, children, id }: TooltipProps) {
  const generatedId = useId();
  const tooltipId = id ?? generatedId;

  return (
    <span
      className="tooltip"
      onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--tooltip-x", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--tooltip-y", `${event.clientY - bounds.top}px`);
      }}
    >
      {children}
      <span id={tooltipId} className="tooltip__content" role="tooltip">{content}</span>
    </span>
  );
}
