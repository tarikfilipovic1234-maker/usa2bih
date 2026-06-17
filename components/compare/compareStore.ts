"use client";

import { useSyncExternalStore } from "react";

const KEY = "u2b_compare";
const MAX = 4;

let listeners: (() => void)[] = [];

function read(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(KEY) ?? "";
}

function write(ids: string[]) {
  window.localStorage.setItem(KEY, ids.join(","));
  listeners.forEach((l) => l());
}

function ids(): string[] {
  return read().split(",").filter(Boolean);
}

export function toggleCompare(id: string) {
  const current = ids();
  const i = current.indexOf(id);
  if (i >= 0) current.splice(i, 1);
  else {
    if (current.length >= MAX) return;
    current.push(id);
  }
  write(current);
}

export function clearCompare() {
  write([]);
}

function subscribe(cb: () => void) {
  listeners.push(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
    window.removeEventListener("storage", cb);
  };
}

/** Returns the comma-joined snapshot (stable primitive) for useSyncExternalStore. */
function getSnapshot() {
  return read();
}
function getServerSnapshot() {
  return "";
}

/** Reactive hook: list of compared ids + helpers. */
export function useCompare() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const list = snapshot.split(",").filter(Boolean);
  return {
    ids: list,
    count: list.length,
    max: MAX,
    has: (id: string) => list.includes(id),
    toggle: toggleCompare,
    clear: clearCompare,
  };
}
