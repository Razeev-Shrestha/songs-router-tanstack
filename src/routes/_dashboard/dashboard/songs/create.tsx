import {
  createFileRoute,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  artistsQueryOptions,
  songsSchema,
  useAddSong,
  useUpdateSongGenre,
  type SongsType,
} from "@/modules/dashboard/songs/songs.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalDialog } from "@/components/modal-dialog";
import { Form } from "@/components/ui/form";
import { SongsForm } from "@/modules/dashboard/songs/song-form";
import { genreQueryOptions } from "@/modules/dashboard/genres/genre.service";

export const Route = createFileRoute("/_dashboard/dashboard/songs/create")({
  component: AddSong,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(artistsQueryOptions);
    queryClient.ensureQueryData(genreQueryOptions);
  },
});

function AddSong() {
  const pathname = useLocation({
    select: (state) => state.pathname,
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const addSong = useAddSong();
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

                toast.success("Song created successfully.");

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

  return (
    <ModalDialog
      open={pathname.includes("create")}
      onOpenStateChange={onOpenChange}
      title="Add new song"
      description="
        Fill in the details to add a new song."
      form="add-song"
      onCancelTrigger={onCancel}
      isPending={addSong.isPending || updateGenre.isPending}
    >
      <Form {...form}>
        <form
          id="add-song"
          onSubmit={onFormSubmit}
          className="flex flex-col gap-2"
        >
          <SongsForm />
        </form>
      </Form>
    </ModalDialog>
  );
}
