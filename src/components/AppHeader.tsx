import { Bell, MoreVertical } from "lucide-react";
import logoAsset from "@/assets/taskether-logo.png.asset.json";
import { mockUser } from "@/lib/mock-data";

export function AppHeader({ subtitle }: { subtitle?: string }) {
  return (
    <header className="flex items-center justify-between gap-3 page-px pt-5">
      <div className="flex items-center gap-2.5">
        <img
          src={logoAsset.url}
          alt="TaskEther logo"
          className="h-9 w-9 rounded-xl object-contain"
        />
        <div className="leading-tight">
          <h1 className="text-lg font-bold tracking-tight text-foreground">TaskEther</h1>
          {subtitle ? (
            <p className="text-xs font-medium text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <Bell size={20} className="text-foreground" />
          {mockUser.notifications > 0 ? (
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-destructive" />
          ) : null}
        </button>
        <button
          type="button"
          aria-label="More options"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <MoreVertical size={20} className="text-foreground" />
        </button>
      </div>
    </header>
  );
}
