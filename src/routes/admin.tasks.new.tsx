import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { TaskForm } from "@/components/admin/TaskForm";
import { createTask } from "@/lib/admin-tasks-store";

export const Route = createFileRoute("/admin/tasks/new")({
  head: () => ({
    meta: [
      { title: "Create Task — TaskEther Admin" },
      { name: "description", content: "Create a new task for TaskEther users." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Create Task — TaskEther Admin" },
      { property: "og:description", content: "Create a new task for TaskEther users." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreateTaskPage,
});

function CreateTaskPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-md page-px pb-16 pt-5">
      <header className="flex items-center gap-3">
        <Link
          to="/admin/tasks"
          aria-label="Back"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Task</h1>
      </header>

      <TaskForm
        mode="new"
        submitLabel="Create Task"
        onSubmit={(input) => {
          createTask(input);
          toast("✓ Task created");
          navigate({ to: "/admin/tasks" });
        }}
      />
    </div>
  );
}
