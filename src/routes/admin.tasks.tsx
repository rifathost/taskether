import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/tasks")({
  component: AdminTasksLayout,
});

function AdminTasksLayout() {
  return <Outlet />;
}
