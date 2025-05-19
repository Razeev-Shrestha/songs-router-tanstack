import { DeleteDialog } from "@/components/delete-dialog";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDisclosure } from "@/hooks/use-disclosure";
import { Fragment } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteSong, useDeleteSongFromGenre } from "./songs.service";
type SongActionProps = {
  id: number;
};
export const SongAction = ({ id }: SongActionProps) => {
  const deleteDisclosure = useDisclosure();
  const deleteSong = useDeleteSong();
  const deleteSongFromGenre = useDeleteSongFromGenre();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onAction = () => {
    deleteSongFromGenre.mutate(
      { id },
      {
        onSuccess: (payload) => {
          if (payload.error) return toast.error(payload.error.message);

          deleteSong.mutate(
            { id },
            {
              onSuccess: (payload) => {
                if (payload.error) return toast.error(payload.error.message);

                toast.success("Song deleted successfully.");
                queryClient.invalidateQueries({
                  predicate: (q) => q.queryKey[0] === "songs",
                });
                deleteDisclosure.onClose();
              },
            }
          );
        },
      }
    );
  };

  return (
    <Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icon icon="horizontal" className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              navigate({
                to: "/dashboard/songs/$id/edit",
                params: { id: String(id) },
              })
            }
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={deleteDisclosure.onOpen}
            className="text-red-500"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        isPending={deleteSongFromGenre.isPending || deleteSong.isPending}
        disclosure={deleteDisclosure}
        onCancel={deleteDisclosure.onClose}
        onContinue={onAction}
      />
    </Fragment>
  );
};
