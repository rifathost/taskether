import { Loader2 } from "lucide-react";
import logoAsset from "@/assets/taskether-logo.png.asset.json";

/**
 * Branded full-screen loading state.
 *
 * Not wired to anything yet — all screens still read local mock data. Drop this
 * in as a route `pendingComponent` or a query loading fallback once real
 * data-fetching lands.
 */
export function LoadingScreen({ label }: { label?: string }) {
  return (
    <div className="grid min-h-screen place-items-center page-px">
      <div className="flex flex-col items-center">
        <img
          src={logoAsset.url}
          alt="TaskEther logo"
          className="h-20 w-20 rounded-3xl object-contain"
        />
        <Loader2 size={26} className="mt-6 animate-spin-slow text-primary" strokeWidth={2.5} />
        {label ? (
          <p className="mt-4 text-sm font-medium text-muted-foreground">{label}</p>
        ) : null}
      </div>
    </div>
  );
}
