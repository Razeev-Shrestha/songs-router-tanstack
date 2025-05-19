import { ModalDialog } from "@/components/modal-dialog";
import { Form } from "@/components/ui/form";
import { GenreForm } from "@/modules/dashboard/genres/genre-form";
import {
  genreSchema,
  type GenreType,
  getGenreByIdQueryOptions,
  useUpdateGenre,
} from "@/modules/dashboard/genres/genre.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  createFileRoute,
  useLocation,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/dashboard/genres/$id/edit")({
  component: EditGenre,
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(getGenreByIdQueryOptions(+id)),
});

function EditGenre() {
  const pathname = useLocation({
    select: (state) => state.pathname,
  });
  const data = Route.useLoaderData();
  const id = useParams({
    from: "/_dashboard/dashboard/genres/$id/edit",
    select: (params) => Number(params.id),
  });
  const { mutate, isPending } = useUpdateGenre(id);

  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<GenreType>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(genreSchema),
  });

  const onFormSubmit = form.handleSubmit((d) =>
    mutate(d, {
      onSuccess: (payload) => {
        if (payload.error) return toast.error(payload.error.message);

        toast("Genre updated successfully.");
        router.invalidate({ sync: true });
        queryClient.invalidateQueries({
          predicate: (q) => q.queryKey[0] === "genre",
        });
        router.navigate({ to: "/dashboard/genres" });
      },
    })
  );

  const onOpenChange = (v: boolean) => {
    if (!v) router.navigate({ to: "/dashboard/genres" });
  };

  const onCancel = () => {
    form.reset();
    router.navigate({ to: "/dashboard/genres" });
  };

  useEffect(() => {
    if (data?.data[0]) {
      form.setValue("title", data.data[0].title);
      form.setValue("description", data?.data[0]?.description);
    }
  }, [data?.data[0]]);

  return (
    <ModalDialog
      open={pathname.includes("edit")}
      onOpenStateChange={onOpenChange}
      title="Update genre"
      description="
            Fill in the details to update."
      form="update-genre"
      onCancelTrigger={onCancel}
      isPending={isPending}
    >
      <Form {...form}>
        <form
          id="update-genre"
          onSubmit={onFormSubmit}
          className="flex flex-col gap-2"
        >
          <GenreForm />
        </form>
      </Form>
    </ModalDialog>
  );
}
