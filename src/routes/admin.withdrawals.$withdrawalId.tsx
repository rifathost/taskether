import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, CircleDollarSign, Copy, Check, User, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useWithdrawals, completeWithdrawal, cancelWithdrawal } from "@/lib/admin-withdrawals-store";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/withdrawals/$withdrawalId")({
  head: () => ({
    meta: [
      { title: "Withdrawal Details — TaskEther Admin" },
      { name: "description", content: "Review and process a USDT withdrawal request." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Withdrawal Details — TaskEther Admin" },
      { property: "og:description", content: "Review and process a USDT withdrawal request." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WithdrawalDetailPage,
});

function WithdrawalDetailPage() {
  const { withdrawalId } = Route.useParams();
  const withdrawals = useWithdrawals();
  const navigate = useNavigate();
  const [completeOpen, setCompleteOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const withdrawal = withdrawals.find((w) => w.id === withdrawalId);
  if (!withdrawal) {
    throw notFound();
  }

  async function copyToClipboard(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  function handleComplete() {
    completeWithdrawal(withdrawalId, txHash.trim() || undefined);
    setCompleteOpen(false);
    toast("✓ Withdrawal marked completed");
    navigate({ to: "/admin/withdrawals" });
  }

  function handleCancel() {
    cancelWithdrawal(withdrawalId, "Cancelled by admin.");
    setCancelOpen(false);
    toast("Withdrawal cancelled");
    navigate({ to: "/admin/withdrawals" });
  }

  return (
    <div className="mx-auto w-full max-w-md page-px pb-16 pt-5">
      <header className="flex items-center gap-3">
        <Link
          to="/admin/withdrawals"
          aria-label="Back"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Withdrawal Details
        </h1>
      </header>

      {/* Amount card */}
      <section className="mt-6 rounded-3xl bg-card p-6 text-center shadow-card">
        <p className="flex items-center justify-center gap-1.5 text-3xl font-bold text-foreground">
          <CircleDollarSign size={28} />
          {withdrawal.netPayout.toFixed(2)} USDT
        </p>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          Gross: {withdrawal.amount.toFixed(2)} USDT · Fee: {withdrawal.fee.toFixed(2)} USDT
        </p>
      </section>

      {/* Recipient card */}
      <section className="mt-5 rounded-3xl bg-card p-5 shadow-card">
        <div className="flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <User size={20} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-foreground">
              @{withdrawal.username}
            </p>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">
              Requested {withdrawal.requestedAt}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
          <code className="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
            {withdrawal.walletAddress}
          </code>
          <button
            type="button"
            onClick={() => copyToClipboard(withdrawal.walletAddress, "wallet")}
            aria-label="Copy wallet address"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary active:scale-95"
          >
            {copied === "wallet" ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </section>

      {/* Action area */}
      {withdrawal.status === "pending" ? (
        <>
          <div className="mt-5 space-y-3">
            <button
              type="button"
              onClick={() => setCompleteOpen(true)}
              className="w-full rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98]"
            >
              Mark as Completed
            </button>
            <button
              type="button"
              onClick={() => setCancelOpen(true)}
              className="w-full rounded-2xl border border-destructive py-4 text-base font-semibold text-destructive transition-transform active:scale-[0.98]"
            >
              Cancel Request
            </button>
          </div>

          <Drawer open={completeOpen} onOpenChange={setCompleteOpen}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Mark withdrawal as completed</DrawerTitle>
                <DrawerDescription>
                  Paste the on-chain transaction hash if available.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <label htmlFor="txHash" className="mb-2 block text-sm font-semibold text-foreground">
                  Transaction Hash (optional)
                </label>
                <Input
                  id="txHash"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="0x…"
                  className="rounded-2xl font-mono"
                />
              </div>
              <DrawerFooter>
                <button
                  type="button"
                  onClick={handleComplete}
                  className="w-full rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98]"
                >
                  Confirm
                </button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel this withdrawal request?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. The user will need to submit a new request.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep it</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancel}
                  className="rounded-2xl bg-destructive text-destructive-foreground"
                >
                  Cancel Request
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : withdrawal.status === "completed" ? (
        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-3xl bg-success/10 p-5">
            <CheckCircle2 size={22} className="shrink-0 text-success" />
            <p className="text-sm font-semibold text-success">
              This withdrawal was completed.
            </p>
          </div>
          {withdrawal.txHash ? (
            <div className="flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3">
              <code className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
                {withdrawal.txHash}
              </code>
              <button
                type="button"
                onClick={() => copyToClipboard(withdrawal.txHash!, "tx")}
                aria-label="Copy transaction hash"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary active:scale-95"
              >
                {copied === "tx" ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-5 flex items-center gap-3 rounded-3xl bg-destructive/10 p-5">
          <XCircle size={22} className="shrink-0 text-destructive" />
          <p className="text-sm font-semibold text-destructive">
            This withdrawal request was cancelled.
          </p>
        </div>
      )}
    </div>
  );
}
