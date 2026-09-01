import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send, Globe, ClipboardList, Star, Plus } from "lucide-react";
import { useTasks } from "@/lib/admin-tasks-store";
import type { TaskStatus } from "@/lib/mock-admin-data";

const taskMeta: Record<string, { icon: typeof Send; tint: string }> = {
  "Join Channel": { icon: Send, tint: "bg-primary/10 text-primary" },
  "Visit Website": { icon: Globe, tint: "bg-sky-500/10 text-sky-600" },
  Survey: { icon: ClipboardList, tint: "bg-amber-500/10 text-amber-600" },
  Custom: { icon: Star, tint: "bg-emerald-500/10 text-emerald-600" },
};

const filters = [
  { key: "active", label: "Active" },
  { key: "draft", label: "Draft" },
  { key: "ended", label: "Ended" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const endedStatuses: TaskStatus[] = ["paused", "completed", "archived"];

const badgeClass: Record<TaskStatus, string> = {
  draft: "bg-warning/10 text-warning",
  active: "bg-success/10 text-success",
  paused: "bg-muted text-muted-foreground",
  completed: "bg-primary/10 text-primary",
  archived: "bg-destructive/10 text-destructive",
};

export const Route = createFileRoute("/admin/tasks/")({
  head: () => ({
    meta: [
      { title: "Tasks — TaskEther Admin" },
      { name: "description", content: "Create and manage the tasks users can complete." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Tasks — TaskEther Admin" },
      { property: "og:description", content: "Create and manage the tasks users can complete." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TasksListPage,
});

function TasksListPage() {
  const tasks = useTasks();
  const [filter, setFilter] = useState<FilterKey>("active");
  const filtered = tasks.filter((t) =>
    filter === "ended" ? endedStatuses.includes(t.status) : t.status === filter,
  );

  return (
    <div className="mx-auto w-full max-w-md page-px pb-16 pt-5">
      <header className="flex items-center gap-3">
        <Link
          to="/admin"
          aria-label="Back"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
      </header>

      <Link
        to="/admin/tasks/new"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98]"
      >
        <Plus size={20} />
        Create Task
      </Link>

      <div className="mt-6 flex items-center gap-2">
        {filters.map(({ key, label }) => {
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={
                active
                  ? "rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-all"
                  : "rounded-full border border-border/40 bg-card px-5 py-2 text-sm font-semibold text-muted-foreground shadow-soft transition-all"
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 flex justify-center">
          <div className="rounded-3xl bg-card px-8 py-10 text-center shadow-soft">
            <p className="text-base font-semibold text-foreground">No {filter} tasks</p>
          </div>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((t) => {
            const meta = taskMeta[t.type] ?? {
              icon: Star,
              tint: "bg-muted text-muted-foreground",
            };
            return (
              <li key={t.id}>
                <Link
                  to="/admin/tasks/$taskId"
                  params={{ taskId: t.id }}
                  className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-card transition-transform active:scale-[0.99]"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${meta.tint}`}
                  >
                    <meta.icon size={22} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-bold text-foreground">{t.title}</p>
                    <p className="mt-0.5 truncate text-xs font-medium text-muted-foreground">
                      {t.type}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      +{t.rewardAmount.toFixed(2)} USDT · {t.remainingSlots} of {t.totalSlots}{" "}
                      slots
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeClass[t.status]}`}
                  >
                    {t.status}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
