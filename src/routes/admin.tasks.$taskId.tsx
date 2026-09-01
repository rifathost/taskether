import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { TaskForm } from "@/components/admin/TaskForm";
import { useTasks, updateTask } from "@/lib/admin-tasks-store";

export const Route = createFileRoute("/admin/tasks/$taskId")({
  head: () => ({
    meta: [
      { title: "Edit Task — TaskEther Admin" },
      { name: "description", content: "Edit an existing TaskEther task." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Edit Task — TaskEther Admin" },
      { property: "og:description", content: "Edit an existing TaskEther task." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditTaskPage,
});

function EditTaskPage() {
  const { taskId } = Route.useParams();
  const tasks = useTasks();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    throw notFound();
  }

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
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Task</h1>
      </header>

      <TaskForm
        mode="edit"
        task={task}
        submitLabel="Save Changes"
        onSubmit={(input) => {
          updateTask(taskId, input);
          toast("✓ Task updated");
          navigate({ to: "/admin/tasks" });
        }}
      />
    </div>
  );
}
