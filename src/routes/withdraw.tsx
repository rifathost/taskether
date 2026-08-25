import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowUp, Wallet } from "lucide-react";
import { mockUser } from "@/lib/mock-data";

// Config constants — easy to swap for real backend config later.
const WITHDRAW_FEE_RATE = 0.1;
const MIN_WITHDRAWAL_USDT = 10;
const AVAILABLE_USDT = parseFloat(mockUser.balanceUsdt);

export const Route = createFileRoute("/withdraw")({
  head: () => ({
    meta: [
      { title: "Withdraw — TaskEther" },
      { name: "description", content: "Withdraw your USDT earnings over the TRC20 network." },
      { property: "og:title", content: "Withdraw — TaskEther" },
      { property: "og:description", content: "Withdraw your USDT earnings over the TRC20 network." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WithdrawPage,
});

function WithdrawPage() {
  const [walletAddress, setWalletAddress] = useState(mockUser.walletAddress);
  const [amount, setAmount] = useState("");

  const numericAmount = parseFloat(amount) || 0;
  const fee = numericAmount * WITHDRAW_FEE_RATE;
  const netPayout = numericAmount - fee;

  return (
    <div className="mx-auto min-h-screen w-full max-w-md px-5 pb-28 pt-5">
      <header className="flex items-center gap-3">
        <Link
          to="/"
          aria-label="Back"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Withdraw</h1>
      </header>

      <p className="mt-5 text-sm font-medium text-muted-foreground">
        Available: {AVAILABLE_USDT.toFixed(2)} USDT
      </p>

      <section className="mt-4 space-y-4 rounded-3xl bg-card p-5 shadow-card">
        {/* Wallet address */}
        <div>
          <label htmlFor="wallet" className="mb-2 block text-sm font-semibold text-foreground">
            TRC20 Wallet Address
          </label>
          <div className="flex items-center rounded-2xl border border-input bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-ring">
            <Wallet size={18} className="mr-3 shrink-0 text-muted-foreground" />
            <input
              id="wallet"
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="T..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="mb-2 block text-sm font-semibold text-foreground">
            Amount
          </label>
          <div className="flex items-center rounded-2xl border border-input bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-ring">
            <input
              id="amount"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <span className="ml-2 text-sm font-semibold text-muted-foreground">USDT</span>
          </div>
          <p className="mt-2 text-xs font-medium text-muted-foreground">
            Minimum withdrawal: {MIN_WITHDRAWAL_USDT} USDT
          </p>
        </div>
      </section>

      {/* Live breakdown */}
      <section className="mt-5 rounded-3xl bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Fee ({Math.round(WITHDRAW_FEE_RATE * 100)}%)</span>
          <span className="text-sm font-semibold text-foreground">{fee.toFixed(2)} USDT</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <span className="text-base font-bold text-foreground">Net Payout</span>
          <span className="text-xl font-bold text-foreground">{netPayout.toFixed(2)} USDT</span>
        </div>
      </section>

      {/* Warning */}
      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-amber-500/10 p-4 text-amber-700">
        <AlertTriangle size={20} className="mt-0.5 shrink-0" />
        <p className="text-sm leading-relaxed">
          Crypto withdrawals can&apos;t be reversed. Double-check your wallet address before submitting.
        </p>
      </div>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero active:scale-[0.98]"
      >
        <ArrowUp size={20} />
        Request Withdrawal
      </button>
    </div>
  );
}
