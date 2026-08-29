import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut } from "lucide-react";
import logoAsset from "@/assets/taskether-logo.png.asset.json";
import { setAdminLoggedIn, useAdminLoggedIn } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const loggedIn = useAdminLoggedIn();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (!isLogin && !loggedIn) {
      navigate({ to: "/admin/login", replace: true });
    }
  }, [isLogin, loggedIn, navigate]);

  if (isLogin) return <Outlet />;
  if (!loggedIn) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3 page-px py-4">
          <Link to="/admin" className="flex items-center gap-2.5">
            <img
              src={logoAsset.url}
              alt="TaskEther logo"
              className="h-9 w-9 rounded-xl object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-foreground">TaskEther</span>
            <span className="rounded-full bg-gradient-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
              Admin
            </span>
          </Link>
          <button
            type="button"
            aria-label="Log out"
            onClick={() => {
              setAdminLoggedIn(false);
              navigate({ to: "/admin/login", replace: true });
            }}
            className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft transition-transform active:scale-[0.98]"
          >
            <LogOut size={20} className="text-foreground" />
          </button>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
