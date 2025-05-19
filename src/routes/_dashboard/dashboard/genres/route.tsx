import { GenreModule } from "@/modules/dashboard/genres/genre-module";
import { genreQueryOptions } from "@/modules/dashboard/genres/genre.service";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/genres")({
  component: GenrePage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(genreQueryOptions),
});

function GenrePage() {
  return (
    <>
      <GenreModule />
      <Outlet />
    </>
  );
}
