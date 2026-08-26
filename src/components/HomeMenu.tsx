import { useEffect, useState } from "react";
import { RefreshCw, History, Users, ChevronRight, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface HomeMenuProps {
  open: boolean;
  onClose: () => void;
}

const items = [
  {
    id: "refresh",
    icon: RefreshCw,
    title: "Refresh balance",
    subtitle: "Sync your latest USDT balance",
  },
  {
    id: "history",
    icon: History,
    title: "History",
    subtitle: "See your earnings and payouts",
  },
  {
    id: "invite",
    icon: Users,
    title: "Invite friends",
    subtitle: "Share your referral link",
  },
];

export function HomeMenu({ open, onClose }: HomeMenuProps) {
  const navigate = useNavigate();
  const [render, setRender] = useState(open);
  const [show, setShow] = useState(open);

  useEffect(() => {
    if (open) {
      setRender(true);
      // Force a reflow so the transition plays from the closed state.
      requestAnimationFrame(() => setShow(true));
    } else {
      setShow(false);
      const timer = setTimeout(() => setRender(false), 250);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleItem = (id: string) => {
    onClose();
    if (id === "refresh") {
      toast("✓ Balance synced");
    } else if (id === "history") {
      setTimeout(() => navigate({ to: "/history" }), 200);
    } else if (id === "invite") {
      setTimeout(() => navigate({ to: "/referral" }), 200);
    }
  };

  if (!render) return null;

  return (
    <div className="fixed inset-0 z-40">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
          show ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Sheet */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-50 rounded-t-[2rem] bg-card p-5 shadow-nav transition-transform duration-[250ms] ease-out",
          show ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Menu</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItem(item.id)}
              className="flex w-full items-center gap-4 rounded-2xl bg-secondary p-4 text-left transition-transform active:scale-[0.99]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <item.icon size={20} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
              <ChevronRight size={18} className="shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-2xl bg-gradient-primary py-3.5 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
