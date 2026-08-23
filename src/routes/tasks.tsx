import { createFileRoute, Link } from "@tanstack/react-router";
import { Send, Globe, ClipboardList, Star, ChevronRight, CircleDollarSign } from "lucide-react";
import { mockTasks } from "@/lib/mock-data";

const taskMeta: Record<
  string,
  { icon: typeof Send; tint: string }
> = {
  "Join Channel": { icon: Send, tint: "bg-primary/10 text-primary" },
  "Visit Website": { icon: Globe, tint: "bg-sky-500/10 text-sky-600" },
  Survey: { icon: ClipboardList, tint: "bg-amber-500/10 text-amber-600" },
  Custom: { icon: Star, tint: "bg-emerald-500/10 text-emerald-600" },
};

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — TaskEther" },
      { name: "description", content: "Complete tasks and earn USDT rewards on TaskEther." },
      { property: "og:title", content: "Tasks — TaskEther" },
      {
        property: "og:description",
        content: "Complete tasks and earn USDT rewards on TaskEther.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-28">
      <header className="px-5 pt-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Tasks</h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Complete tasks and earn rewards
        </p>
      </header>

      <main className="mt-5 space-y-3 px-5">
        {mockTasks.map((task) => {
          const meta = taskMeta[task.type] ?? {
            icon: Star,
            tint: "bg-muted text-muted-foreground",
          };
          return (
            <Link
              key={task.id}
              to="/tasks/$taskId"
              params={{ taskId: task.id }}
              className="flex items-center gap-4 rounded-3xl bg-card p-4 shadow-card transition-transform active:scale-[0.99]"
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${meta.tint}`}
              >
                <meta.icon size={22} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-bold text-foreground">{task.title}</p>
                <p className="mt-0.5 text-xs font-medium text-muted-foreground">{task.type}</p>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                  <CircleDollarSign size={16} />
                  +{task.rewardAmount.toFixed(2)} USDT
                </span>
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
}
