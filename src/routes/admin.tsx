import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: AdminRootLayout,
});

function AdminRootLayout() {
  return <Outlet />;
}
