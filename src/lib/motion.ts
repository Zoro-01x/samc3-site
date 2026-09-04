"use client";

/** Respect the user's OS-level "reduce motion" setting globally. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on small screens — used to drop heavy stagger and keep fade-ins light. */
export function isSmallScreen(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}
