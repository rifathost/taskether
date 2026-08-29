/**
 * Mock admin auth flag.
 * TODO (real version): replace with a real server-side session check.
 * In-memory only — intentionally does not survive a page refresh.
 */
import { useSyncExternalStore } from "react";

let loggedIn = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function setAdminLoggedIn(value: boolean) {
  loggedIn = value;
  emit();
}

export function isAdminLoggedIn() {
  return loggedIn;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useAdminLoggedIn() {
  return useSyncExternalStore(
    subscribe,
    () => loggedIn,
    () => false,
  );
}
