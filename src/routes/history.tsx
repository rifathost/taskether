import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowDownLeft,
  ArrowUpRight,
  CheckSquare,
  Users,
  Wallet,
} from "lucide-react";
import { mockTransactions, type MockTransaction } from "@/lib/mock-data";

const filters = [
  { key: "all", label: "All" },
  { key: "earnings", label: "Earnings" },
  { key: "withdrawals", label: "Withdrawals" },
] as const;

type FilterKey = (typeof filters)[number]["key"];

const earningsTypes = new Set<
  MockTransaction["type"]
>(["task_reward", "referral", "p2p_received"]);

const iconMeta: Record<
  MockTransaction["type"],
  { icon: typeof CheckSquare; className: string }
> = {
  task_reward: { icon: CheckSquare, className: "bg-primary/10 text-primary" },
  referral: {
    icon: Users,
    className: "bg-secondary text-secondary-foreground",
  },
  p2p_received: {
    icon: ArrowDownLeft,
    className: "bg-accent text-accent-foreground",
  },
  p2p_sent: {
    icon: ArrowUpRight,
    className: "bg-muted text-muted-foreground",
  },
  withdrawal: {
    icon: Wallet,
    className: "bg-muted text-muted-foreground",
  },
};

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — TaskEther" },
      { name: "description", content: "Review your TaskEther earnings and payout history." },
      { property: "og:title", content: "History — TaskEther" },
      {
        property: "og:description",
        content: "Review your TaskEther earnings and payout history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = mockTransactions.filter((tx) => {
    if (filter === "all") return true;
    if (filter === "earnings") return earningsTypes.has(tx.type);
    return tx.type === "withdrawal";
  });

  return (
    <div className="mx-auto min-h-screen w-full max-w-md page-px pb-28 pt-5">
      <header className="relative flex items-center justify-center py-2">
        <Link
          to="/"
          aria-label="Back"
          className="absolute left-0 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">History</h1>
      </header>

      {/* Filter pills */}
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

      {/* Transaction list */}
      <ul className="mt-6 space-y-3">
        {filtered.map((tx) => {
          const { icon: Icon, className: iconBg } = iconMeta[tx.type];
          const incoming = tx.amount > 0;
          const amount = Math.abs(tx.amount).toFixed(2);

          return (
            <li
              key={tx.id}
              className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-card transition-transform active:scale-[0.99]"
            >
              <div
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${iconBg}`}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{tx.label}</p>
                <p className="mt-0.5 text-xs font-medium text-muted-foreground">{tx.time}</p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                <span
                  className={
                    incoming
                      ? "text-sm font-bold text-success"
                      : "text-sm font-bold text-foreground"
                  }
                >
                  {incoming ? "+" : "−"}
                  {amount} USDT
                </span>
                {tx.type === "withdrawal" && tx.status && (
                  <span
                    className={
                      tx.status === "Completed"
                        ? "rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-success"
                        : "rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-warning"
                    }
                  >
                    {tx.status}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
