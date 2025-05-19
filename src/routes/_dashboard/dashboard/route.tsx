import { DashboardModule } from "@/modules/dashboard/dashboard-module";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  if (pathname !== "/dashboard") return <Outlet />;

  return <DashboardModule />;
}
