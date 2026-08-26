import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, FileText, Wallet } from "lucide-react";
import { mockUser } from "@/lib/mock-data";

function truncateAddress(address: string) {
  if (address.length <= 16) return address;
  return `${address.slice(0, 10)}...${address.slice(-6)}`;
}

const initial = mockUser.name.charAt(0).toUpperCase();

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — TaskEther" },
      { name: "description", content: "View your TaskEther profile, wallet address, and payment history." },
      { property: "og:title", content: "Profile — TaskEther" },
      {
        property: "og:description",
        content: "View your TaskEther profile, wallet address, and payment history.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: function ProfilePage() {
    return (
      <main className="mx-auto min-h-screen w-full max-w-md pb-28 pt-5 page-px">
        <header className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Profile</h1>
        </header>

        {/* Single-block fade: everything below the header reveals as one unit. */}
        <div className="animate-block-fade">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-primary p-6 shadow-hero">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold text-primary-foreground backdrop-blur-sm">
              {initial}
            </div>
            <h2 className="text-2xl font-bold text-primary-foreground">{mockUser.name}</h2>
            <p className="mt-1 text-sm font-medium text-primary-foreground/80">
              {mockUser.telegramHandle}
            </p>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-3xl bg-card shadow-card">
          <Link
            to="/withdraw"
            className="flex items-center gap-4 border-b border-border/50 p-4 active:bg-accent/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <Wallet size={20} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-foreground">Wallet Address</p>
              <p className="mt-0.5 truncate text-sm font-medium text-muted-foreground">
                {truncateAddress(mockUser.walletAddress)}
              </p>
            </div>
            <ChevronRight size={20} className="shrink-0 text-muted-foreground" />
          </Link>

          <Link
            to="/history"
            className="flex items-center gap-4 p-4 active:bg-accent/50"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <FileText size={20} strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-foreground">Payment History</p>
            </div>
            <ChevronRight size={20} className="shrink-0 text-muted-foreground" />
          </Link>
        </section>

        <p className="mt-12 text-center text-sm font-medium text-muted-foreground">
          Earn from anywhere. Get paid in USDT.
        </p>
        </div>
      </main>
    );
  },
});
