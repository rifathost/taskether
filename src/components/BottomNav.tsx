import { Link, useRouterState } from "@tanstack/react-router";
import { Home, CheckSquare, Star, Users, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/level", label: "Level", icon: Star },
  { to: "/referral", label: "Referral", icon: Users },
  { to: "/profile", label: "Profile", icon: User },
] as const;

const hiddenOn = ["/send", "/withdraw", "/history"];

// Performance note: tab navigation is already client-side — every tab is a
// TanStack Router <Link> (no full page reloads), routes have no loaders, and
// all screens render from local mock data, so nothing is re-fetched on mount.
// Tab switches cost only a React re-render plus the 180ms page fade.
export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (hiddenOn.includes(pathname) || pathname.startsWith("/admin")) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/40 bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-nav backdrop-blur">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className="flex flex-col items-center gap-1 rounded-xl py-1.5 transition-colors"
              >
                <Icon
                  size={24}
                  strokeWidth={active ? 2.4 : 1.8}
                  className={active ? "text-primary" : "text-muted-foreground"}
                />
                <span
                  className={
                    active
                      ? "text-[11px] font-semibold text-primary"
                      : "text-[11px] font-medium text-muted-foreground"
                  }
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
