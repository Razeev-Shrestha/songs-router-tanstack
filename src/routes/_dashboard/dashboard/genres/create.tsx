import { ModalDialog } from "@/components/modal-dialog";
import { Form } from "@/components/ui/form";
import { GenreForm } from "@/modules/dashboard/genres/genre-form";
import {
  genreSchema,
  useAddGenre,
  type GenreType,
} from "@/modules/dashboard/genres/genre.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";

import {
  createFileRoute,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createFileRoute("/_dashboard/dashboard/genres/create")({
  component: AddGenre,
});

function AddGenre() {
  const pathname = useLocation({
    select: (state) => state.pathname,
  });
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useAddGenre();
  const form = useForm<GenreType>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(genreSchema),
  });

  const onFormSubmit = form.handleSubmit((data) =>
    mutate(data, {
      onSuccess: (payload) => {
        if (payload.error) return toast.error(payload.error.message);

        toast("Genre created successfully.");
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

  return (
    <ModalDialog
      open={pathname.includes("create")}
      onOpenStateChange={onOpenChange}
      title="Add new genre"
      description="
            Fill in the details to add a new genre to your collection."
      form="add-genre"
      onCancelTrigger={onCancel}
      isPending={isPending}
    >
      <Form {...form}>
        <form
          id="add-genre"
          onSubmit={onFormSubmit}
          className="flex flex-col gap-2"
        >
          <GenreForm />
        </form>
      </Form>
    </ModalDialog>
  );
}
