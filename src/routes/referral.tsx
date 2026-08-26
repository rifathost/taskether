import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, DollarSign, Trophy, Users } from "lucide-react";
import { mockMyReferrals, mockReferral, mockTopReferrers } from "@/lib/mock-data";

export const Route = createFileRoute("/referral")({
  head: () => ({
    meta: [
      { title: "Referral — TaskEther" },
      {
        name: "description",
        content: "Invite friends to TaskEther and earn 7% commission on what they earn.",
      },
      { property: "og:title", content: "Referral — TaskEther" },
      {
        property: "og:description",
        content: "Invite friends to TaskEther and earn 7% commission on what they earn.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReferralPage,
});

function Avatar({ name }: { name: string }) {
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-base font-bold uppercase text-primary">
      {name.charAt(0)}
    </span>
  );
}

function ReferralPage() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(`https://${mockReferral.link}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-28">
      <header className="page-px pt-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Referral</h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Invite friends, earn together.
        </p>
      </header>

      {/* Single-block fade: everything below the header reveals as one unit. */}
      <main className="mt-5 animate-block-fade space-y-6 page-px">
        {/* Hero */}
        <section className="rounded-3xl bg-gradient-primary p-6 shadow-hero">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground">
            Earn together
          </h2>
          <p className="mt-2 text-sm font-medium text-primary-foreground/85">
            {mockReferral.commissionNote}
          </p>
        </section>

        {/* Referral link */}
        <section className="rounded-3xl bg-card p-5 shadow-card">
          <p className="text-base font-bold text-foreground">Your Referral Link</p>
          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-muted px-4 py-3">
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-muted-foreground">
              {mockReferral.link}
            </span>
            <button
              type="button"
              onClick={copyLink}
              aria-label="Copy referral link"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary active:scale-95"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Users size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight text-muted-foreground">
                  Total Referrals
                </p>
                <p className="text-xl font-bold text-foreground">{mockReferral.totalReferrals}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl bg-card p-4 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <DollarSign size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight text-muted-foreground">
                  Total Commission
                </p>
                <p className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-foreground">
                    {mockReferral.totalCommissionUsdt}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">USDT</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your referrals */}
        <section>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Your Referrals</h2>
          <div className="mt-3 space-y-3">
            {mockMyReferrals.map((person) => (
              <div
                key={person.name}
                className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card transition-transform active:scale-[0.99]"
              >
                <Avatar name={person.name} />
                <p className="min-w-0 flex-1 truncate text-base font-bold text-foreground">
                  {person.name}
                </p>
                <p className="shrink-0 text-sm font-bold text-emerald-600">
                  {person.commissionUsdt} USDT
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Top referrers */}
        <section>
          <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
            <Trophy size={20} className="text-amber-500" />
            Top Referrers
          </h2>
          <div className="mt-3 space-y-3">
            {mockTopReferrers.map((person, index) => (
              <div
                key={person.name}
                className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card transition-transform active:scale-[0.99]"
              >
                <span className="w-5 shrink-0 text-sm font-bold text-muted-foreground">
                  {index + 1}
                </span>
                <Avatar name={person.name} />
                <p className="min-w-0 flex-1 truncate text-base font-bold text-foreground">
                  {person.name}
                </p>
                <p className="shrink-0 text-sm font-semibold text-muted-foreground">
                  {person.referrals} referrals
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
