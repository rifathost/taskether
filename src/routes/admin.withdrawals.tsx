import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/withdrawals")({
  component: AdminWithdrawalsLayout,
});

function AdminWithdrawalsLayout() {
  return <Outlet />;
}
