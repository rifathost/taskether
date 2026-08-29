import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckSquare, ChevronRight, ClipboardList, Users, Wallet } from "lucide-react";
import { mockAdminStats } from "@/lib/mock-admin-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Overview — TaskEther" },
      { name: "description", content: "Review submissions, withdrawals, users and tasks." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Overview — TaskEther" },
      { property: "og:description", content: "Review submissions, withdrawals, users and tasks." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminOverview,
});

const stats = [
  {
    label: "Pending Submissions",
    value: mockAdminStats.pendingSubmissions,
    icon: ClipboardList,
    tint: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "Pending Withdrawals",
    value: mockAdminStats.pendingWithdrawals,
    icon: Wallet,
    tint: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "Total Users",
    value: mockAdminStats.totalUsers,
    icon: Users,
    tint: "bg-primary/10 text-primary",
  },
  {
    label: "Active Tasks",
    value: mockAdminStats.activeTasks,
    icon: CheckSquare,
    tint: "bg-emerald-500/10 text-emerald-600",
  },
] as const;

const rows = [
  {
    to: "/admin/submissions",
    label: "Review Submissions",
    badge: mockAdminStats.pendingSubmissions,
  },
  {
    to: "/admin/withdrawals",
    label: "Process Withdrawals",
    badge: mockAdminStats.pendingWithdrawals,
  },
  { to: "/admin/tasks", label: "Manage Tasks", badge: 0 },
] as const;

function AdminOverview() {
  return (
    <main className="mx-auto w-full max-w-md page-px pb-16 pt-5">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Overview</h1>

      <section className="mt-4 grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-card p-4 shadow-card">
            <span
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${stat.tint}`}
            >
              <stat.icon size={20} />
            </span>
            <p className="mt-3 text-sm font-medium leading-tight text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-1 text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 space-y-3">
        {rows.map((row) => (
          <Link
            key={row.to}
            to={row.to}
            className="flex items-center justify-between rounded-3xl bg-card px-5 py-4 shadow-card transition-transform active:scale-[0.99]"
          >
            <span className="text-base font-semibold text-foreground">{row.label}</span>
            <span className="flex items-center gap-2">
              {row.badge > 0 ? (
                <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-600">
                  {row.badge}
                </span>
              ) : null}
              <ChevronRight size={20} className="text-muted-foreground" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
