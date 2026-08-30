import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send, Globe, ClipboardList, Star } from "lucide-react";
import { useSubmissions } from "@/lib/admin-submissions-store";
import type { SubmissionStatus } from "@/lib/mock-admin-data";

const taskMeta: Record<string, { icon: typeof Send; tint: string }> = {
  "Join Channel": { icon: Send, tint: "bg-primary/10 text-primary" },
  "Visit Website": { icon: Globe, tint: "bg-sky-500/10 text-sky-600" },
  Survey: { icon: ClipboardList, tint: "bg-amber-500/10 text-amber-600" },
  Custom: { icon: Star, tint: "bg-emerald-500/10 text-emerald-600" },
};

const filters = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
] as const;

const badgeClass: Record<SubmissionStatus, string> = {
  pending: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

export const Route = createFileRoute("/admin/submissions/")({
  head: () => ({
    meta: [
      { title: "Submissions — TaskEther Admin" },
      { name: "description", content: "Review task proof submissions from users." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Submissions — TaskEther Admin" },
      { property: "og:description", content: "Review task proof submissions from users." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SubmissionsQueuePage,
});

function SubmissionsQueuePage() {
  const submissions = useSubmissions();
  const [filter, setFilter] = useState<SubmissionStatus>("pending");
  const filtered = submissions.filter((s) => s.status === filter);

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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Submissions</h1>
      </header>

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
            <p className="text-base font-semibold text-foreground">
              No {filter} submissions
            </p>
          </div>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((s) => {
            const meta = taskMeta[s.taskType] ?? {
              icon: Star,
              tint: "bg-muted text-muted-foreground",
            };
            return (
              <li key={s.id}>
                <Link
                  to="/admin/submissions/$submissionId"
                  params={{ submissionId: s.id }}
                  className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-card transition-transform active:scale-[0.99]"
                >
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${meta.tint}`}
                  >
                    <meta.icon size={22} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-bold text-foreground">
                      {s.taskTitle}
                    </p>
                    <p className="mt-0.5 truncate text-xs font-medium text-muted-foreground">
                      @{s.username}
                    </p>
                    <p className="mt-1 text-xs font-medium text-muted-foreground">
                      {s.submittedAt}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="text-sm font-bold text-success">
                      +{s.rewardAmount.toFixed(2)} USDT
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeClass[s.status]}`}
                    >
                      {s.status}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
