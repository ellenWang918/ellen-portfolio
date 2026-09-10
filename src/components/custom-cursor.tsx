"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const HOVER_SIZE = 36;
const INTERACTIVE = "a, button, [data-cursor-hover], .folder-card";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const syncContainer = () => {
      const openDialog = document.querySelector<HTMLElement>("dialog[open]");
      const nextContainer = openDialog ?? document.body;
      setContainer((currentContainer) => currentContainer === nextContainer ? currentContainer : nextContainer);
    };

    syncContainer();
    const observer = new MutationObserver(syncContainer);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true, attributeFilter: ["open"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !container) return;

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const target = { x: -100, y: -100 };
    let isRunning = false;
    let hovered: Element | null = null;
    let visible = false;

    const setHover = (element: Element | null) => {
      if (!element) {
        if (!hovered) return;
        hovered = null;
        cursor.dataset.text = "false";
        cursor.dataset.email = "false";
        cursor.dataset.small = "false";
        cursor.dataset.grab = "false";
        if (visible) cursor.style.opacity = "1";
        cursor.dataset.hover = "false";
        return;
      }
      const label = labelRef.current;
      const text = element.getAttribute("data-cursor-label")
        ?? element.closest(".tooltip")?.querySelector('[role="tooltip"]')?.textContent
        ?? element.getAttribute("aria-label") ?? element.textContent?.trim() ?? "";
      const isSmallSubject = Boolean(element.closest(".social-links__link, .experience-modal__confidential a"));
      const suppressLabel = Boolean(element.closest("[data-cursor-no-label]"));
      const isGrabCursor = element.closest('[data-cursor-type="grab"]') !== null;
      const cursorOpacity = element.closest("[data-cursor-opacity]")?.getAttribute("data-cursor-opacity")
        ?? (isSmallSubject ? "0.5" : "1");
      cursor.dataset.small = isSmallSubject ? "true" : "false";
      cursor.dataset.grab = isGrabCursor ? "true" : "false";
      cursor.style.opacity = isGrabCursor ? "0" : cursorOpacity;
      if (element === hovered && label?.textContent === text) return;
      hovered = element;
      if (label) {
        label.textContent = text;
        const isEmail = text.trim().toLowerCase() === "copy email";
        cursor.dataset.email = !suppressLabel && isEmail ? "true" : "false";
        cursor.style.setProperty("--cursor-width", `${Math.max(HOVER_SIZE, Math.min(label.scrollWidth + (isEmail ? 24 : 0), 180) + 24)}px`);
      }
      cursor.dataset.hover = suppressLabel ? "false" : "true";
      cursor.dataset.text = suppressLabel ? "false" : "true";
    };

    const updatePosition = () => {
      cursor.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (visible) setHover(document.elementFromPoint(target.x, target.y)?.closest(INTERACTIVE) ?? null);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") { hide(); return; }
      target.x = event.clientX;
      target.y = event.clientY;
      visible = true;
      document.body.classList.add("has-custom-cursor");
      cursor.style.opacity = "1";
      updatePosition();
    };

    const release = () => { cursor.dataset.pressed = "false"; };
    const press = (event: PointerEvent) => {
      if (event.pointerType === "mouse") cursor.dataset.pressed = "true";
      else hide();
    };
    const hide = () => {
      visible = false;
      document.body.classList.remove("has-custom-cursor");
      setHover(null);
      cursor.style.opacity = "0";
      release();
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    const start = () => {
      if (isRunning) return;
      isRunning = true;
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerout", handlePointerOut);
      window.addEventListener("pointerdown", press);
      window.addEventListener("pointerup", release);
      window.addEventListener("pointercancel", hide);
      window.addEventListener("blur", hide);
    };

    const stop = () => {
      if (!isRunning) return;
      isRunning = false;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", hide);
      window.removeEventListener("blur", hide);
      hide();
    };

    const sync = () => {
      if (finePointerQuery.matches && !reducedMotionQuery.matches) start();
      else stop();
    };

    finePointerQuery.addEventListener("change", sync);
    reducedMotionQuery.addEventListener("change", sync);
    sync();

    return () => {
      stop();
      finePointerQuery.removeEventListener("change", sync);
      reducedMotionQuery.removeEventListener("change", sync);
    };
  }, [container]);

  if (!container) return null;
  return createPortal(
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <div className="custom-cursor__pill">
        <Image className="custom-cursor__email-icon" src="/email.svg" alt="" aria-hidden="true" width={16} height={16} />
        <span ref={labelRef} className="custom-cursor__label" />
      </div>
    </div>,
    container,
  );
}
