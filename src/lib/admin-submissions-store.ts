/**
 * In-memory submissions store for the admin review queue.
 * TODO (real version): replace with server state (query + mutation).
 * Intentionally does not persist across a page refresh.
 */
import { useSyncExternalStore } from "react";
import { mockSubmissions, type MockSubmission } from "./mock-admin-data";

let submissions: MockSubmission[] = mockSubmissions.map((s) => ({ ...s }));
const listeners = new Set<() => void>();

function emit() {
  submissions = [...submissions];
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return submissions;
}

export function useSubmissions() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function approveSubmission(id: string) {
  submissions = submissions.map((s) => {
    if (s.id !== id) return s;
    const { rejectionReason: _omit, ...rest } = s;
    return { ...rest, status: "approved" as const };
  });
  emit();
}

export function rejectSubmission(id: string, reason: string) {
  submissions = submissions.map((s) =>
    s.id === id ? { ...s, status: "rejected" as const, rejectionReason: reason } : s,
  );
  emit();
}
