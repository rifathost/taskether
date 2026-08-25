import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUp, ChevronRight, CreditCard, DollarSign, Send, SquareCheck, Star } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { mockUser } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TaskEther — Earn USDT for Tasks" },
      {
        name: "description",
        content:
          "TaskEther wallet: track your USDT balance, completed tasks, level and earnings inside Telegram.",
      },
      { property: "og:title", content: "TaskEther — Earn USDT for Tasks" },
      {
        property: "og:description",
        content:
          "TaskEther wallet: track your USDT balance, completed tasks, level and earnings inside Telegram.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  {
    label: "Total Earned",
    value: mockUser.totalEarnedUsdt,
    unit: "USDT",
    icon: DollarSign,
    tint: "bg-emerald-500/10 text-emerald-600",
  },
  {
    label: "Tasks Done",
    value: mockUser.tasksDone,
    unit: "",
    icon: SquareCheck,
    tint: "bg-primary/10 text-primary",
  },
  {
    label: "Level",
    value: mockUser.level,
    unit: "",
    icon: Star,
    tint: "bg-amber-500/10 text-amber-600",
  },
  {
    label: "Available",
    value: mockUser.availableUsdt,
    unit: "USDT",
    icon: CreditCard,
    tint: "bg-sky-500/10 text-sky-600",
  },
];

function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-28">
      <AppHeader subtitle="Wallet" />

      <main className="page-px">
        {/* Hero wallet card */}
        <section className="mt-5 rounded-3xl bg-gradient-primary p-6 shadow-hero">
          <p className="text-sm font-medium text-primary-foreground/80">Total Balance</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight text-primary-foreground">
              {mockUser.balanceUsdt}
            </span>
            <span className="text-lg font-semibold text-primary-foreground/85">USDT</span>
          </p>
          <p className="mt-3 text-xs font-medium text-primary-foreground/75">
            {mockUser.minWithdrawalNote}
          </p>
        </section>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            to="/send"
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98]"
          >
            <Send size={20} />
            Send
          </Link>
          <Link
            to="/withdraw"
            className="flex items-center justify-center gap-2 rounded-2xl bg-card py-4 text-base font-semibold text-foreground shadow-soft transition-transform active:scale-[0.98]"
          >
            <ArrowUp size={20} />
            Withdraw
          </Link>
        </div>

        {/* Overview */}
        <div className="mt-7 flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground">Overview</h2>
        </div>

        <section className="mt-3 grid grid-cols-2 gap-3">
          {stats.map(({ label, value, unit, icon: Icon, tint }) => (
            <div key={label} className="rounded-3xl bg-card p-4 shadow-card">
              <div className="flex items-center gap-3">
                <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${tint}`}>
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-muted-foreground">{label}</p>
                  <p className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-foreground">{value}</span>
                    {unit ? (
                      <span className="text-xs font-semibold text-muted-foreground">{unit}</span>
                    ) : null}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <Link
          to="/history"
          className="mt-4 flex items-center justify-between rounded-3xl bg-card px-5 py-4 shadow-card transition-transform active:scale-[0.99]"
        >
          <span className="text-sm font-semibold text-foreground">View history</span>
          <ChevronRight size={18} className="text-primary" />
        </Link>
      </main>
    </div>
  );
}
