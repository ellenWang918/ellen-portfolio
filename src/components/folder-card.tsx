"use client";

import { useId } from "react";
import { Tooltip } from "@/components/tooltip";

export type FolderCardProps = { title: string; ariaLabel?: string; onSelect?: () => void; isActive?: boolean; tooltip?: string; cursorLabel?: string };

function FolderCardArtwork() {
  return (
    <svg className="folder-card__svg" viewBox="0 0 108 86" aria-hidden="true" focusable="false">
      <path className="folder-card__back" d="M0 21.5547C0.29109 16.3913 -0.169734 11.0518 0.10964 5.87326C0.252486 3.22569 2.0723 0.404208 5.01837 0.204434C9.60501 -0.106579 14.3215 0.0300817 18.9242 0.0288786L27.9888 0.0302398C34.365 0.0332158 38.408 -0.288244 42.564 4.96618C44.1515 6.9732 46.1618 9.16028 47.8341 11.1577C51.7751 11.3033 56.8416 11.1576 60.8943 11.1571L87.373 11.1506C91.5302 11.1481 95.6958 11.1452 99.8527 11.1547C101.92 11.1594 104.147 11.325 105.5 12.3798C107 13.8229 106.751 17.1103 107 18.6797C106.04 18.8812 103.887 18.626 101.5 18.652C84.5044 18.8367 68.4843 18.3569 51.5 18.652C50.4526 18.5763 51.5 18.652 48.5 18.652C44.5 18.652 47 18.652 42 18.652C35 18.6797 31.7764 18.6387 27.3722 18.652L11.7845 18.6797C9.06874 18.6795 4.66635 18.4091 2.31355 19.4446L1.93444 19.3447C1.59045 20.1716 1.00669 21.3799 0.337659 22C0.109394 21.8346 0.117325 21.7996 0 21.5547Z" fill="#F6B71E" />
      <path className="folder-card__front" d="M0.0353059 22.8566C0.0322875 22.4796 -0.00443351 16.7347 0.0353059 16.4404C0.5 13 1.5 12 4.31167 12.0405C7.12334 12.081 7 12.0398 9.62579 12.0405C14.2238 12.0417 13.8973 12.0411 18.5 12.0398L29.5 12.0405C35.8762 12.0436 33.5 12.0405 40 12.0405C47 12.0405 45.5 11.9494 47.8694 12.0405C51.8104 12.192 56.8769 12.0403 60.9296 12.0398L87.4083 12.0331C91.5655 12.0304 95.7311 12.0275 99.888 12.0374C103.597 12.0461 105.799 12.6274 107.122 16.4404C107.588 18.339 107.238 27.941 107.237 30.4156L107.24 62.0761L107.243 74.2432C107.244 75.5157 107.358 78.9442 107.118 79.9842C106.345 83.3944 104.29 84.8461 100.89 84.8774C93.2941 84.9475 85.6972 84.9174 78.1003 84.9149L34.5109 84.9157L14.436 84.9161C12.7307 84.9162 10.8791 84.869 9.18467 84.921C5.32469 85.0397 1.65292 84.8805 0.278101 80.4753C-0.0927637 79.5007 0.0447513 78.0069 0.085938 76.9481C-0.107935 64.4457 0.0863161 51.4619 0.089854 38.9171L0.10366 29.5545C0.123209 27.2689 0.10366 25.5437 0.0353059 22.8566Z" fill="#FFD86C" />
    </svg>
  );
}

export function FolderCard({ title, ariaLabel, onSelect, isActive = false, tooltip, cursorLabel }: FolderCardProps) {
  const tooltipId = useId();
  const content = <><span className="folder-card__art"><FolderCardArtwork /></span><span className="folder-card__title">{title}</span></>;
  const card = <button className="font-portfolio folder-card" type="button" aria-label={ariaLabel ?? title} data-cursor-label={cursorLabel} aria-describedby={tooltip ? tooltipId : undefined} aria-haspopup={onSelect ? "dialog" : undefined} aria-expanded={onSelect ? isActive : undefined} onClick={onSelect}>{content}</button>;
  return tooltip ? <Tooltip content={tooltip} id={tooltipId}>{card}</Tooltip> : card;
}
