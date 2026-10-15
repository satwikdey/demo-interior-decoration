"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const query = "(max-width: 1279px)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => null;

/** CSS selects the SSR layout; hydration unmounts the unused interactive view. */
export function ResponsiveVersion({ mobile, desktop }: { mobile: ReactNode; desktop: ReactNode }) {
  const compact = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return <>
    {compact !== false && <div className="responsive-mobile">{mobile}</div>}
    {compact !== true && <div className="responsive-desktop">{desktop}</div>}
  </>;
}
