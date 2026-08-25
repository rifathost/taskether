import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { mockUser } from "@/lib/mock-data";

// Config constants — easy to swap for real backend config later.
const SEND_FEE_RATE = 0.13;
const AVAILABLE_USDT = parseFloat(mockUser.balanceUsdt);

export const Route = createFileRoute("/send")({
  head: () => ({
    meta: [
      { title: "Send USDT — TaskEther" },
      { name: "description", content: "Send USDT from your TaskEther wallet." },
      { property: "og:title", content: "Send USDT — TaskEther" },
      { property: "og:description", content: "Send USDT from your TaskEther wallet." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SendPage,
});

function SendPage() {
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");

  const numericAmount = parseFloat(amount) || 0;
  const recipientGets = numericAmount * (1 - SEND_FEE_RATE);

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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Send</h1>
      </header>

      <p className="mt-5 text-sm font-medium text-muted-foreground">
        Available: {AVAILABLE_USDT.toFixed(2)} USDT
      </p>

      <section className="mt-4 space-y-4 rounded-3xl bg-card p-5 shadow-card">
        {/* Recipient */}
        <div>
          <label htmlFor="recipient" className="mb-2 block text-sm font-semibold text-foreground">
            Recipient
          </label>
          <div className="flex items-center rounded-2xl border border-input bg-background px-4 py-3 focus-within:ring-2 focus-within:ring-ring">
            <span className="mr-2 text-sm font-semibold text-muted-foreground">@</span>
            <input
              id="recipient"
              type="text"
              inputMode="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
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
        </div>
      </section>

      {/* Live preview */}
      <section className="mt-5 rounded-3xl bg-card p-5 shadow-card">
        <p className="text-sm font-medium text-muted-foreground">Recipient receives</p>
        <p className="mt-1 text-3xl font-bold text-foreground">
          {recipientGets.toFixed(2)} <span className="text-lg font-semibold text-muted-foreground">USDT</span>
        </p>
        <p className="mt-2 text-xs font-medium text-muted-foreground">
          {Math.round(SEND_FEE_RATE * 100)}% P2P fee applies
        </p>
      </section>

      <button
        type="button"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero active:scale-[0.98]"
      >
        <Send size={20} />
        Send
      </button>
    </div>
  );
}
