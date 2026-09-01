import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { MockTask, TaskStatus } from "@/lib/mock-admin-data";
import type { TaskInput } from "@/lib/admin-tasks-store";

const typeChips = ["Join Channel", "Visit Website", "Survey", "Custom"];

const editStatuses: { key: TaskStatus; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "active", label: "Active" },
  { key: "paused", label: "Paused" },
  { key: "completed", label: "Completed" },
  { key: "archived", label: "Archived" },
];

const newStatuses: { key: TaskStatus; label: string }[] = [
  { key: "draft", label: "Draft" },
  { key: "active", label: "Active" },
];

function pillClass(active: boolean) {
  return active
    ? "rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-all"
    : "rounded-full border border-border/40 bg-card px-4 py-2 text-sm font-semibold text-muted-foreground shadow-soft transition-all";
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

export function TaskForm({
  mode,
  task,
  submitLabel,
  onSubmit,
}: {
  mode: "new" | "edit";
  task?: MockTask;
  submitLabel: string;
  onSubmit: (input: TaskInput) => void;
}) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [type, setType] = useState(task?.type ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [proofInstructions, setProofInstructions] = useState(task?.proofInstructions ?? "");
  const [rewardAmount, setRewardAmount] = useState(
    task ? String(task.rewardAmount) : "",
  );
  const [totalSlots, setTotalSlots] = useState(task ? String(task.totalSlots) : "");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "draft");

  const reward = Number(rewardAmount);
  const slots = Number(totalSlots);
  const valid =
    title.trim().length > 0 &&
    type.trim().length > 0 &&
    proofInstructions.trim().length > 0 &&
    Number.isFinite(reward) &&
    reward > 0 &&
    Number.isFinite(slots) &&
    slots > 0;

  const statuses = mode === "edit" ? editStatuses : newStatuses;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    onSubmit({
      title: title.trim(),
      type: type.trim(),
      description: description.trim(),
      proofInstructions: proofInstructions.trim(),
      rewardAmount: reward,
      totalSlots: Math.floor(slots),
      status,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
      <section className="space-y-5 rounded-3xl bg-card p-5 shadow-card">
        <Field label="Title" htmlFor="title">
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Join our Telegram Channel"
            className="rounded-2xl"
          />
        </Field>

        <Field label="Type" htmlFor="type">
          <Input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Join Channel"
            className="rounded-2xl"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {typeChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setType(chip)}
                className="rounded-full border border-border/40 bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-transform active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Description (optional)" htmlFor="description">
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What the user will see on the task list."
            className="min-h-24 rounded-2xl"
          />
        </Field>

        <Field label="Proof Instructions" htmlFor="proofInstructions">
          <Textarea
            id="proofInstructions"
            value={proofInstructions}
            onChange={(e) => setProofInstructions(e.target.value)}
            placeholder="Tell the user exactly what proof to submit."
            className="min-h-24 rounded-2xl"
          />
        </Field>

        <Field label="Reward Amount" htmlFor="rewardAmount">
          <div className="flex items-center gap-3">
            <Input
              id="rewardAmount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.05"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              placeholder="1.50"
              className="rounded-2xl"
            />
            <span className="shrink-0 text-sm font-bold text-muted-foreground">USDT</span>
          </div>
        </Field>

        <Field label="Total Slots" htmlFor="totalSlots">
          <Input
            id="totalSlots"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={totalSlots}
            onChange={(e) => setTotalSlots(e.target.value)}
            placeholder="200"
            className="rounded-2xl"
          />
          {mode === "edit" && task ? (
            <p className="mt-2 text-xs font-medium text-muted-foreground">
              {task.remainingSlots} of {task.totalSlots} slots remaining
            </p>
          ) : null}
        </Field>

        <div>
          <p className="mb-2 text-sm font-semibold text-foreground">Status</p>
          <div className="flex flex-wrap gap-2">
            {statuses.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setStatus(key)}
                className={pillClass(status === key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={!valid}
        className="w-full rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
      >
        {submitLabel}
      </button>
    </form>
  );
}
