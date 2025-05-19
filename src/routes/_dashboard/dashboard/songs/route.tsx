import { SongModule } from "@/modules/dashboard/songs/song-module";
import { songsQueryOptions } from "@/modules/dashboard/songs/songs.service";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/songs")({
  component: SongPage,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(songsQueryOptions),
});

function SongPage() {
  return (
    <>
      <SongModule />
      <Outlet />
    </>
  );
}
