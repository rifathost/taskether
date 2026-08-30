import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Send,
  Globe,
  ClipboardList,
  Star,
  CircleDollarSign,
  ExternalLink,
  User,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  useSubmissions,
  approveSubmission,
  rejectSubmission,
} from "@/lib/admin-submissions-store";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";

const taskMeta: Record<string, { icon: typeof Send; tint: string }> = {
  "Join Channel": { icon: Send, tint: "bg-primary/10 text-primary" },
  "Visit Website": { icon: Globe, tint: "bg-sky-500/10 text-sky-600" },
  Survey: { icon: ClipboardList, tint: "bg-amber-500/10 text-amber-600" },
  Custom: { icon: Star, tint: "bg-emerald-500/10 text-emerald-600" },
};

export const Route = createFileRoute("/admin/submissions/$submissionId")({
  head: () => ({
    meta: [
      { title: "Review Submission — TaskEther Admin" },
      { name: "description", content: "Review and act on a task proof submission." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Review Submission — TaskEther Admin" },
      { property: "og:description", content: "Review and act on a task proof submission." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewSubmissionPage,
});

function ReviewSubmissionPage() {
  const { submissionId } = Route.useParams();
  const submissions = useSubmissions();
  const navigate = useNavigate();
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");

  const submission = submissions.find((s) => s.id === submissionId);
  if (!submission) {
    throw notFound();
  }

  const meta = taskMeta[submission.taskType] ?? {
    icon: Star,
    tint: "bg-muted text-muted-foreground",
  };

  function handleApprove() {
    approveSubmission(submissionId);
    toast("✓ Submission approved");
    navigate({ to: "/admin/submissions" });
  }

  function handleReject() {
    const trimmed = reason.trim();
    if (!trimmed) return;
    rejectSubmission(submissionId, trimmed);
    setRejectOpen(false);
    toast("Submission rejected");
    navigate({ to: "/admin/submissions" });
  }

  return (
    <div className="mx-auto w-full max-w-md page-px pb-16 pt-5">
      <header className="flex items-center gap-3">
        <Link
          to="/admin/submissions"
          aria-label="Back"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Review Submission
        </h1>
      </header>

      <section className="mt-6 rounded-3xl bg-card p-6 text-center shadow-card">
        <span className={`mx-auto grid h-16 w-16 place-items-center rounded-3xl ${meta.tint}`}>
          <meta.icon size={28} />
        </span>
        <h2 className="mt-4 text-xl font-bold leading-snug text-foreground">
          {submission.taskTitle}
        </h2>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {submission.taskType}
        </p>
        <p className="mt-5 flex items-center justify-center gap-1.5 text-2xl font-bold text-success">
          <CircleDollarSign size={26} />+{submission.rewardAmount.toFixed(2)} USDT
        </p>
      </section>

      <section className="mt-5 flex items-center gap-4 rounded-3xl bg-card p-5 shadow-card">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground">
          <User size={20} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-foreground">
            @{submission.username}
          </p>
          <p className="mt-0.5 text-xs font-medium text-muted-foreground">
            Submitted {submission.submittedAt}
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-3xl bg-card p-5 shadow-card">
        <h3 className="text-base font-bold text-foreground">Submitted Proof</h3>
        {submission.proofType === "link" ? (
          <a
            href={submission.proofContent}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-3 rounded-2xl bg-secondary px-4 py-3 transition-transform active:scale-[0.99]"
          >
            <ExternalLink size={18} className="shrink-0 text-primary" />
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-primary">
              {submission.proofContent}
            </span>
          </a>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {submission.proofContent}
          </p>
        )}
      </section>

      {submission.status === "pending" ? (
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={() => setRejectOpen(true)}
            className="flex-1 rounded-2xl border border-destructive py-4 text-base font-semibold text-destructive transition-transform active:scale-[0.98]"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="flex-1 rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98]"
          >
            Approve
          </button>
        </div>
      ) : submission.status === "approved" ? (
        <div className="mt-5 flex items-center gap-3 rounded-3xl bg-success/10 p-5">
          <CheckCircle2 size={22} className="shrink-0 text-success" />
          <p className="text-sm font-semibold text-success">
            This submission was approved.
          </p>
        </div>
      ) : (
        <div className="mt-5 rounded-3xl bg-destructive/10 p-5">
          <div className="flex items-center gap-3">
            <XCircle size={22} className="shrink-0 text-destructive" />
            <p className="text-sm font-semibold text-destructive">
              This submission was rejected.
            </p>
          </div>
          {submission.rejectionReason ? (
            <p className="mt-2 pl-9 text-sm leading-relaxed text-destructive/80">
              {submission.rejectionReason}
            </p>
          ) : null}
        </div>
      )}

      <Drawer open={rejectOpen} onOpenChange={setRejectOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Reject submission</DrawerTitle>
            <DrawerDescription>
              Tell the user why this proof wasn't accepted.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              placeholder="Reason for rejection..."
              className="resize-none rounded-2xl"
            />
          </div>
          <DrawerFooter>
            <button
              type="button"
              disabled={!reason.trim()}
              onClick={handleReject}
              className="w-full rounded-2xl bg-destructive py-4 text-base font-semibold text-destructive-foreground transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              Confirm Rejection
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
