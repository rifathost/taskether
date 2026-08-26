import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Send, Globe, ClipboardList, Star, CircleDollarSign } from "lucide-react";
import { mockTasks } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const taskMeta: Record<
  string,
  { icon: typeof Send; tint: string }
> = {
  "Join Channel": { icon: Send, tint: "bg-primary/10 text-primary" },
  "Visit Website": { icon: Globe, tint: "bg-sky-500/10 text-sky-600" },
  Survey: { icon: ClipboardList, tint: "bg-amber-500/10 text-amber-600" },
  Custom: { icon: Star, tint: "bg-emerald-500/10 text-emerald-600" },
};

export const Route = createFileRoute("/tasks/$taskId")({
  head: ({ params }) => ({
    meta: [
      { title: `Task Details — TaskEther` },
      { name: "description", content: "Review task instructions and submit proof on TaskEther." },
      { property: "og:title", content: `Task Details — TaskEther` },
      {
        property: "og:description",
        content: "Review task instructions and submit proof on TaskEther.",
      },
    ],
  }),
  component: TaskDetailPage,
});

function TaskDetailPage() {
  const { taskId } = Route.useParams();
  const task = mockTasks.find((t) => t.id === taskId);

  if (!task) {
    throw notFound();
  }

  const meta = taskMeta[task.type] ?? {
    icon: Star,
    tint: "bg-muted text-muted-foreground",
  };
  const [proofType, setProofType] = useState<"link" | "text">("link");
  const [proofValue, setProofValue] = useState("");

  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-28 pt-5 page-px">
      <header className="flex items-center gap-3">
        <Link
          to="/tasks"
          aria-label="Back"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Task Details</h1>
      </header>

      <section className="mt-6 rounded-3xl bg-card p-6 shadow-card text-center">
        <span
          className={`mx-auto grid h-16 w-16 place-items-center rounded-3xl ${meta.tint}`}
        >
          <meta.icon size={28} />
        </span>
        <h2 className="mt-4 text-xl font-bold leading-snug text-foreground">{task.title}</h2>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{task.type}</p>
        <p className="mt-5 flex items-center justify-center gap-1.5 text-2xl font-bold text-emerald-600">
          <CircleDollarSign size={26} />
          +{task.rewardAmount.toFixed(2)} USDT
        </p>
      </section>

      <section className="mt-5 rounded-3xl bg-card p-5 shadow-card">
        <h3 className="text-base font-bold text-foreground">Instructions</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {task.instructions}
        </p>
      </section>

      <section className="mt-5 rounded-3xl bg-card p-5 shadow-card">
        <h3 className="text-base font-bold text-foreground">Submit Proof</h3>

        <div className="mt-3 flex rounded-2xl bg-secondary p-1">
          <button
            type="button"
            onClick={() => setProofType("link")}
            className={cn(
              "flex-1 rounded-xl py-2 text-sm font-semibold transition-colors",
              proofType === "link"
                ? "bg-gradient-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground"
            )}
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => setProofType("text")}
            className={cn(
              "flex-1 rounded-xl py-2 text-sm font-semibold transition-colors",
              proofType === "text"
                ? "bg-gradient-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground"
            )}
          >
            Text
          </button>
        </div>

        {proofType === "link" ? (
          <input
            type="url"
            value={proofValue}
            onChange={(e) => setProofValue(e.target.value)}
            placeholder="https://..."
            className="mt-3 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        ) : (
          <textarea
            value={proofValue}
            onChange={(e) => setProofValue(e.target.value)}
            placeholder="Describe what you did..."
            rows={4}
            className="mt-3 w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        )}

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center rounded-2xl bg-gradient-primary py-4 text-base font-semibold text-primary-foreground shadow-hero transition-transform active:scale-[0.98]"
        >
          Submit for Review
        </button>
      </section>
    </div>
  );
}
