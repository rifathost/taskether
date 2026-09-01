/**
 * In-memory tasks store for admin task management.
 * TODO (real version): replace with server state (query + mutation).
 * Intentionally does not persist across a page refresh.
 */
import { useSyncExternalStore } from "react";
import { mockTasks, type MockTask, type TaskStatus } from "./mock-admin-data";

export type TaskInput = {
  title: string;
  type: string;
  description: string;
  proofInstructions: string;
  rewardAmount: number;
  totalSlots: number;
  status: TaskStatus;
};

let tasks: MockTask[] = mockTasks.map((t) => ({ ...t }));
const listeners = new Set<() => void>();

function emit() {
  tasks = [...tasks];
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return tasks;
}

export function useTasks() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function createTask(input: TaskInput) {
  const task: MockTask = {
    id: `t${Date.now()}`,
    ...input,
    remainingSlots: input.totalSlots,
    createdAt: "Just now",
  };
  tasks = [task, ...tasks];
  emit();
  return task;
}

export function updateTask(id: string, input: TaskInput) {
  tasks = tasks.map((t) => {
    if (t.id !== id) return t;
    // TODO (real version): remainingSlots is owned by the backend once
    // submissions are approved; clamp locally for the mock.
    const remainingSlots = Math.min(t.remainingSlots, input.totalSlots);
    return { ...t, ...input, remainingSlots };
  });
  emit();
}
