import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import logoAsset from "@/assets/taskether-logo.png.asset.json";
import { setAdminLoggedIn } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Access — TaskEther" },
      { name: "description", content: "Administrator sign-in for the TaskEther dashboard." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Access — TaskEther" },
      { property: "og:description", content: "Administrator sign-in for the TaskEther dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const [passphrase, setPassphrase] = useState("");
  const navigate = useNavigate();

  // Mock only: any non-empty value logs in. Real validation lands in the backend phase.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passphrase.trim()) return;
    setAdminLoggedIn(true);
    navigate({ to: "/admin" });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background page-px">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl bg-card p-7 text-center shadow-card"
      >
        <img
          src={logoAsset.url}
          alt="TaskEther logo"
          className="mx-auto h-14 w-14 rounded-2xl object-contain"
        />
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Admin Access</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter your passphrase to continue</p>

        <div className="mt-6 flex items-center rounded-2xl border border-input bg-background px-4 py-3 text-left focus-within:ring-2 focus-within:ring-ring">
          <Lock size={18} className="mr-3 shrink-0 text-muted-foreground" />
          <input
            type="password"
            value={passphrase}
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Passphrase"
            aria-label="Passphrase"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-5 w-full rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98]"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
