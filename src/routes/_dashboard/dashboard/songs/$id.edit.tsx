import { ModalDialog } from "@/components/modal-dialog";
import { Form } from "@/components/ui/form";
import { genreQueryOptions } from "@/modules/dashboard/genres/genre.service";
import { SongsForm } from "@/modules/dashboard/songs/song-form";
import {
  artistsQueryOptions,
  songByIdQueryOptions,
  songsSchema,
  useUpdateSong,
  useUpdateSongGenre,
  type SongsType,
} from "@/modules/dashboard/songs/songs.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useLocation,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/dashboard/songs/$id/edit")({
  component: EditSong,
  loader: async ({ context: { queryClient }, params: { id } }) => ({
    song: await queryClient.ensureQueryData(songByIdQueryOptions(+id)),
    artists: await queryClient.ensureQueryData(artistsQueryOptions),
    genres: await queryClient.ensureQueryData(genreQueryOptions),
  }),
});

function EditSong() {
  const pathname = useLocation({
    select: (state) => state.pathname,
  });
  const id = useParams({
    from: "/_dashboard/dashboard/songs/$id/edit",
    select: (params) => Number(params.id),
  });

  const data = Route.useLoaderData();

  const router = useRouter();
  const queryClient = useQueryClient();
  const addSong = useUpdateSong(id);
  const updateGenre = useUpdateSongGenre();

  const form = useForm<SongsType>({
    defaultValues: {
      title: "",
      duration: 0,
      description: "",
      genre_id: [],
    },
    resolver: zodResolver(songsSchema),
  });

  const onOpenChange = (v: boolean) => {
    if (!v) router.navigate({ to: "/dashboard/songs" });
  };

  const onFormSubmit = form.handleSubmit((d) => {
    addSong.mutate(
      {
        artist_id: d.artist_id,
        description: d.description,
        duration: d.duration,
        released_year: d.released_year,
        title: d.title,
      },
      {
        onSuccess: (payload) => {
          updateGenre.mutate(
            {
              songId: payload.data[0].id,
              genreId: d.genre_id,
            },
            {
              onSuccess: (payload) => {
                if (payload.data.error)
                  return toast.error(payload.error.message);

                toast.success("Song updated successfully.");

                form.reset();
                queryClient.invalidateQueries({
                  predicate: (q) => q.queryKey[0] === "songs",
                });
                router.navigate({ to: "/dashboard/songs" });
              },
            }
          );
        },
      }
    );
  });

  const onCancel = () => {
    form.reset();
    router.navigate({ to: "/dashboard/songs" });
  };

  useEffect(() => {
    if (data && data.song) {
      const song = data.song.data[0];

      console.log(song);

      form.setValue("title", song.title);
      form.setValue("description", song.description);
      form.setValue("duration", song.duration);
      form.setValue("released_year", song.released_year);
      form.setValue("artist_id", song.artists.id);
      form.setValue(
        "genre_id",
        song.genres.map((genre: { id: number }) => genre.id)
      );
    }
  }, [data]);

  return (
    <ModalDialog
      open={pathname.includes("edit")}
      onOpenStateChange={onOpenChange}
      title="Add new song"
      description="
        Fill in the details to update song."
      form="update-song"
      onCancelTrigger={onCancel}
      isPending={addSong.isPending || updateGenre.isPending}
    >
      <Form {...form}>
        <form
          id="update-song"
          onSubmit={onFormSubmit}
          className="flex flex-col gap-2"
        >
          <SongsForm />
        </form>
      </Form>
    </ModalDialog>
  );
}
