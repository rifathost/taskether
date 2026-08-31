import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Wallet } from "lucide-react";
import { useWithdrawals } from "@/lib/admin-withdrawals-store";
import type { WithdrawalStatus } from "@/lib/mock-withdrawals-data";

const filters = [
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
] as const;

const badgeClass: Record<WithdrawalStatus, string> = {
  pending: "bg-warning/10 text-warning",
  completed: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
};

function truncateWallet(address: string) {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const Route = createFileRoute("/admin/withdrawals/")({
  head: () => ({
    meta: [
      { title: "Withdrawals — TaskEther Admin" },
      { name: "description", content: "Process pending USDT withdrawal requests." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Withdrawals — TaskEther Admin" },
      { property: "og:description", content: "Process pending USDT withdrawal requests." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WithdrawalsQueuePage,
});

function WithdrawalsQueuePage() {
  const withdrawals = useWithdrawals();
  const [filter, setFilter] = useState<WithdrawalStatus>("pending");
  const filtered = withdrawals.filter((w) => w.status === filter);

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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Withdrawals</h1>
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
              No {filter} withdrawals
            </p>
          </div>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((w) => (
            <li key={w.id}>
              <Link
                to="/admin/withdrawals/$withdrawalId"
                params={{ withdrawalId: w.id }}
                className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-card transition-transform active:scale-[0.99]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-muted text-muted-foreground">
                  <Wallet size={22} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-bold text-foreground">
                    @{w.username}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-xs font-medium text-muted-foreground">
                    {truncateWallet(w.walletAddress)}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {w.requestedAt}
                  </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="text-sm font-bold text-foreground">
                    {w.netPayout.toFixed(2)} USDT
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeClass[w.status]}`}
                  >
                    {w.status}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
