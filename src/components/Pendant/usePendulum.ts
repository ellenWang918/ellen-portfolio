"use client";

import { useCallback, useEffect, useRef } from "react";
import { isSettled, MAX_ANGLE, stepPendulum, type PendulumState } from "./physics";

type Point = { x: number; y: number; time: number };
type PendantPointerEvent = React.PointerEvent<HTMLAnchorElement>;

const PIVOT_X = 36;
const IDLE_AMPLITUDE = (1.5 * Math.PI) / 180;
const MAX_HOVER_ANGLE = 0.02;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getPointerAngle(event: PendantPointerEvent, rect: DOMRect) {
  return Math.atan2(event.clientX - rect.left - PIVOT_X, -(event.clientY - rect.top));
}

function getAngularVelocity(samples: Point[], rect: DOMRect) {
  const first = samples[0];
  const last = samples[samples.length - 1];
  if (!first || !last || last.time <= first.time) return 0;

  const pivotX = rect.left + PIVOT_X;
  const pivotY = rect.top;
  const radius = Math.max(1, Math.hypot(last.x - pivotX, last.y - pivotY));
  // Tangential velocity divided by radius gives angular velocity.
  const tangent = ((last.x - first.x) * (-(last.y - pivotY)) - (last.y - first.y) * (last.x - pivotX)) / radius;
  return clamp(tangent / ((last.time - first.time) / 1000) / radius, -8, 8);
}

export function usePendulum(reducedMotion: boolean) {
  const surfaceRef = useRef<HTMLAnchorElement>(null);
  const bodyRef = useRef<HTMLImageElement>(null);
  const stateRef = useRef<PendulumState>({ angle: 0, angularVelocity: 0 });
  const frameRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const samplesRef = useRef<Point[]>([]);
  const idleStartedRef = useRef<number | null>(null);
  const hoverTargetRef = useRef(0);
  const grabOffsetRef = useRef(0);
  const lastPointerAngleRef = useRef(0);
  const continuousPointerAngleRef = useRef(0);
  const didDragRef = useRef(false);
  const reducedMotionRef = useRef(reducedMotion);
  reducedMotionRef.current = reducedMotion;

  const render = useCallback(() => {
    if (bodyRef.current) bodyRef.current.style.transform = `rotate(${stateRef.current.angle}rad)`;
  }, []);

  const stopAnimation = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    lastFrameRef.current = null;
  }, []);

  const animate = useCallback((time: number) => {
    if (draggingRef.current) return;
    const previousTime = lastFrameRef.current ?? time;
    const deltaSeconds = Math.min((time - previousTime) / 1000, 0.032);
    lastFrameRef.current = time;

    if (reducedMotionRef.current) {
      stateRef.current.angle *= Math.max(0, 1 - deltaSeconds * 12);
      stateRef.current.angularVelocity = 0;
    } else if (idleStartedRef.current !== null) {
      const idleAngle = Math.sin((time - idleStartedRef.current) / 1500) * IDLE_AMPLITUDE;
      stateRef.current.angle += (idleAngle + hoverTargetRef.current - stateRef.current.angle) * Math.min(1, deltaSeconds * 8);
    } else {
      stateRef.current = stepPendulum(stateRef.current, deltaSeconds);
      if (isSettled(stateRef.current)) idleStartedRef.current ??= time;
    }

    render();
    if (!reducedMotionRef.current || Math.abs(stateRef.current.angle) > 0.001) {
      frameRef.current = requestAnimationFrame(animate);
    } else {
      stopAnimation();
    }
  }, [render, stopAnimation]);

  const startAnimation = useCallback(() => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const onPointerDown = useCallback((event: PendantPointerEvent) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
    draggingRef.current = true;
    didDragRef.current = false;
    idleStartedRef.current = null;
    stopAnimation();

    const angle = getPointerAngle(event, rect);
    grabOffsetRef.current = stateRef.current.angle - angle;
    lastPointerAngleRef.current = angle;
    continuousPointerAngleRef.current = angle;
    samplesRef.current = [{ x: event.clientX, y: event.clientY, time: performance.now() }];
  }, [stopAnimation]);

  const onPointerMove = useCallback((event: PendantPointerEvent) => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return;
    const angle = getPointerAngle(event, rect);

    if (!draggingRef.current) {
      hoverTargetRef.current = clamp(angle * 0.08, -MAX_HOVER_ANGLE, MAX_HOVER_ANGLE);
      return;
    }

    event.preventDefault();
    const start = samplesRef.current[0];
    if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 4) didDragRef.current = true;
    const samples = samplesRef.current;
    samples.push({ x: event.clientX, y: event.clientY, time: performance.now() });
    if (samples.length > 4) samples.shift();

    // Unwrap atan2's ±π seam so pointer capture never causes a directional jump.
    const delta = Math.atan2(Math.sin(angle - lastPointerAngleRef.current), Math.cos(angle - lastPointerAngleRef.current));
    continuousPointerAngleRef.current += delta;
    lastPointerAngleRef.current = angle;
    stateRef.current.angle = clamp(continuousPointerAngleRef.current + grabOffsetRef.current, -MAX_ANGLE, MAX_ANGLE);
    render();
  }, [render]);

  const onPointerUp = useCallback((event: PendantPointerEvent) => {
    if (!draggingRef.current) return;
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (rect) stateRef.current.angularVelocity = getAngularVelocity(samplesRef.current, rect);

    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    lastFrameRef.current = null;
    startAnimation();
  }, [startAnimation]);

  const onPointerLeave = useCallback(() => {
    if (!draggingRef.current) hoverTargetRef.current = 0;
  }, []);

  useEffect(() => {
    startAnimation();
    return stopAnimation;
  }, [startAnimation, stopAnimation]);

  return { surfaceRef, bodyRef, didDragRef, onPointerDown, onPointerMove, onPointerUp, onPointerLeave };
}
