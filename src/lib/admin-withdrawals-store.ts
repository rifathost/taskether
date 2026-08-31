/**
 * In-memory withdrawals store for the admin queue.
 * TODO (real version): replace with server state (query + mutation).
 * Intentionally does not persist across a page refresh.
 */
import { useSyncExternalStore } from "react";
import { mockWithdrawals, type MockWithdrawal } from "./mock-withdrawals-data";

let withdrawals: MockWithdrawal[] = mockWithdrawals.map((w) => ({ ...w }));
const listeners = new Set<() => void>();

function emit() {
  withdrawals = [...withdrawals];
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return withdrawals;
}

export function useWithdrawals() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function completeWithdrawal(id: string, txHash?: string) {
  withdrawals = withdrawals.map((w) => {
    if (w.id !== id) return w;
    const { cancelReason: _omit, ...rest } = w;
    return {
      ...rest,
      status: "completed" as const,
      ...(txHash ? { txHash } : {}),
    };
  });
  emit();
}

export function cancelWithdrawal(id: string, reason: string) {
  withdrawals = withdrawals.map((w) =>
    w.id === id ? { ...w, status: "cancelled" as const, cancelReason: reason } : w,
  );
  emit();
}
