"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePendulum } from "./usePendulum";
import styles from "./Pendant.module.css";

export type PendantProps = { isOn?: boolean; label?: string; id?: string; className?: string; onActivate?: () => void };

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function Pendant({ isOn = false, label, id, className, onActivate }: PendantProps = {}) {
  const reducedMotion = usePrefersReducedMotion();
  const { surfaceRef, bodyRef, onPointerDown, onPointerMove, onPointerUp, onPointerLeave } = usePendulum(reducedMotion);
  const state = isOn ? "on" : "off";
  return <button ref={surfaceRef} id={id} type="button" className={[styles.root, className].filter(Boolean).join(" ")} data-component="pendent" data-state={state} data-light-state={state} data-sound-target="pendent" data-parallax-target="pendent" aria-label={label ?? "Pendant light"} onClick={onActivate} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerLeave}>
    <Image ref={bodyRef} className={styles.body} src={isOn ? "/pendent_on.svg" : "/pendent_off.svg"} alt="" width={90} height={216} priority draggable={false} />
  </button>;
}
